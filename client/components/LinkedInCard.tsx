import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";
import { FaLinkedin } from "react-icons/fa";

const LinkedInCard = () => {
  const t = useTranslations("quote");

  return (
    <div className='shadow-lg w-[90%] md:w-[374px] h-auto p-2.5 rounded-2xl my-12'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <Image
            src='/assets/person.svg'
            width={42}
            height={42}
            alt='thomas daniel'
          />
          <div className=''>
            <p className='text-sm font-medium text-dark-blue-design'>
              Thomas daniel
            </p>
            <p className='text-dark-blue-design text-xs'>{t("role")}</p>
          </div>
        </div>
        <FaLinkedin className='text-mid-blue-design w-6 h-6  ' />
      </div>
      <p className='my-2 text-sm text-dark-blue-design'>{t("docQuote")}</p>
    </div>
  );
};

export default LinkedInCard;
