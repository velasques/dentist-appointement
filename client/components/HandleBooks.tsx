"use client";

import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
const HandleBooks = ({
  displayStatus,
  name,
  id,
}: {
  displayStatus: string;
  name: string;
  id: string | number | undefined;
}) => {
  const route = useRouter();
  const acceptHandler = async () => {
    try {
      await axios.put(`https://api-dental.molaraiche.com/api/booking/${id}`, {
        status: "approved",
      });
      toast.success(`${name} has been Accepted`);
      route.refresh();
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log("An unknown error occurred");
      }
    }
  };
  const rejectHandler = async () => {
    try {
      await axios.put(`https://api-dental.molaraiche.com/api/booking/${id}`, {
        status: "rejected",
      });
      toast.error(`${name} has been Rejected`);
      route.refresh();
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log("An unknown error occurred");
      }
    }
  };

  return (
    <td className='flex justify-end gap-4 px-6 py-4 font-medium'>
      {displayStatus === "pending" && (
        <>
          <button
            onClick={acceptHandler}
            className='bg-sky-blue-design text-secondary py-2.5 px-4 rounded w-full text-center cursor-pointer'>
            Accept
          </button>

          <button
            onClick={rejectHandler}
            className='bg-red-500 text-secondary py-2.5 px-4 rounded w-full text-center cursor-pointer'>
            Reject
          </button>
        </>
      )}
      {displayStatus === "rejected" && (
        <button className='bg-gray-500 text-secondary py-2.5 px-4 rounded w-full text-center cursor-not-allowed'>
          Managed
        </button>
      )}
      {displayStatus === "approved" && (
        <button className='bg-gray-500 text-secondary py-2.5 px-4 rounded w-full text-center cursor-not-allowed'>
          Managed
        </button>
      )}
    </td>
  );
};

export default HandleBooks;
