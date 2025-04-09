"use client";
import React, { useState } from "react";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "./ui/button";
import { useTranslations } from "next-intl";
import axios from "axios";
import { toast } from "react-toastify";

interface formType {
  name: string;
  email: string;
  phone: string;
  date: Date | null;
  message: string;
}

interface errorType {
  name?: string;
  email?: string;
  phone?: string;
  date?: string;
  message?: string;
}

const BookForm = () => {
  const [form, setForm] = useState<formType>({
    name: "",
    email: "",
    phone: "",
    date: null,
    message: "",
  });

  const [errors, setErrors] = useState<errorType>({});
  const [startDate, setStartDate] = useState<Date | null>(null);

  const changeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = (): errorType => {
    const newErrors: errorType = {};

    if (!form.name.trim()) newErrors.name = "Full name is required";
    if (!form.message.trim()) newErrors.message = "Message is required";
    if (!form.date) newErrors.date = "Date is required";

    if (!form.phone && !form.email) {
      newErrors.phone = "Phone or email is required";
      newErrors.email = "Phone or email is required";
    }

    if (form.phone && !isValidPhoneNumber(form.phone)) {
      newErrors.phone = "Phone number is invalid";
    }

    return newErrors;
  };
  const d = useTranslations("submitForBook");

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    const addToForm = await axios.post(
      "https://api-dental.molaraiche.com/api/booking/demandBook",
      form,
      {
        withCredentials: true,
      }
    );
    toast.success(d("msg"));
    setForm({
      name: "",
      email: "",
      phone: "",
      date: null,
      message: "",
    });
    setErrors({});
  };
  const t = useTranslations("formHolder");
  return (
    <div className='flex flex-col items-center justify-center'>
      <h1 className='text-4xl text-center font-bold my-4'> {t("title")} </h1>
      <form className='w-full' onSubmit={submitHandler}>
        <div className='flex flex-col my-2'>
          <label htmlFor='fullName' className='pl-2 font-medium'>
            {t("form.name")}
          </label>
          <input
            type='text'
            id='name'
            name='name'
            value={form.name}
            placeholder={t("form.name")}
            onChange={changeHandler}
            className='h-10 w-full p-2.5 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500'
          />
          {errors.name && (
            <span className='text-red-500 text-sm pl-2'>{errors.name}</span>
          )}
        </div>

        <div className='flex flex-col my-2'>
          <label htmlFor='phoneNumber' className='pl-2 font-medium'>
            {t("form.phone")}
          </label>
          <PhoneInput
            defaultCountry='MA'
            id='phoneNumber'
            name='phone'
            autoComplete='true'
            placeholder={t("form.phone")}
            value={form.phone}
            onChange={(value) =>
              setForm((prev) => ({ ...prev, phone: value || "" }))
            }
            className='custom-phone-input input'
          />
          {errors.phone && (
            <span className='text-red-500 text-sm pl-2'>{errors.phone}</span>
          )}
        </div>

        <div className='flex flex-col my-2'>
          <label htmlFor='email' className='pl-2 font-medium'>
            {t("form.email")}
          </label>
          <input
            type='email'
            id='email'
            name='email'
            value={form.email}
            placeholder={t("form.email")}
            onChange={changeHandler}
            className='h-10 w-full p-2.5 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500'
          />
          {errors.email && (
            <span className='text-red-500 text-sm pl-2'>{errors.email}</span>
          )}
        </div>

        <div className='flex flex-col my-2'>
          <label htmlFor='message' className='pl-2 font-medium'>
            {t("form.message")}
          </label>
          <textarea
            id='message'
            name='message'
            value={form.message}
            onChange={changeHandler}
            placeholder={t("form.message")}
            className='w-full p-2.5 rounded border h-16 max-h-28 border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500'
          />
          {errors.message && (
            <span className='text-red-500 text-sm pl-2'>{errors.message}</span>
          )}
        </div>

        <div className='flex flex-col my-2'>
          <label htmlFor='date' className='pl-2 font-medium'>
            {t("form.date")}
          </label>
          <DatePicker
            selected={startDate}
            onChange={(date) => {
              setStartDate(date);
              setForm((prev) => ({
                ...prev,
                date: date || null,
              }));
            }}
            showTimeSelect
            timeFormat='HH:mm'
            timeIntervals={15}
            value={form.date as unknown as string}
            dateFormat='Pp'
            placeholderText={t("form.date")}
            className='h-10 w-full p-2.5 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500'
          />
          {errors.date && (
            <span className='text-red-500 text-sm pl-2'>{errors.date}</span>
          )}
        </div>

        <div className='flex items-center justify-center my-3'>
          <Button
            type='submit'
            className='bg-sky-blue-design text-secondary w-[150px] h-10 hover:opacity-70'>
            {t("form.send")}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BookForm;
