import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import LinkedInCard from "@/components/LinkedInCard";
import Image from "next/image";
import { MdPhoneInTalk } from "react-icons/md";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalTrigger,
} from "@/components/ui/animated-modal";
import BookFrom from "@/components/BookFrom";
export default function Hero() {
  const t = useTranslations("Home");
  return (
    <section className='h-[60vh] flex items-center justify-center gap-10 container mx-auto font-general my-72 sm:my-20 lg:my-32'>
      <div className='w-[90%] lg:w-1/2 px-3'>
        <h1 className='text-6xl font-semibold text-dark-blue-design'>
          {t("title")}
          <span className='text-sky-blue-design'> {t("marked")} </span>
        </h1>
        <p className='text-body w-full md:w-[531px] my-10'>{t("paragraph")}</p>
        <div className='flex flex-col md:flex-row gap-3 my-10'>
          <Modal>
            <ModalTrigger className='bg-mid-blue-design w-full md:w-[300px] h-[55px] rounded-[10px] text-secondary cursor-pointer'>
              {t("btn1")}
            </ModalTrigger>

            <ModalBody>
              <ModalContent>
                <BookFrom />
              </ModalContent>
            </ModalBody>
          </Modal>

          <Button className=' w-full md:w-[300px] h-[55px] rounded-[10px]  text-secondary flex items-center '>
            <span className='border border-[#25B4F8] flex items-center justify-center w-[50px] h-[50px] rounded-[10px]'>
              <MdPhoneInTalk className=' bg-[#E6F6FE] text-mid-blue-design w-11 h-11' />
            </span>
            <span className='flex flex-col items-start'>
              <span className='text-mid-blue-design text-sm font-semibold'>
                {t("btn2")}
              </span>
              <span className='text-dark-blue-design'>0900-78601</span>
            </span>
          </Button>
        </div>
        <div className='md:inline flex items-center justify-center'>
          <LinkedInCard />
        </div>{" "}
      </div>
      <div className=' w-1/2 hidden lg:flex'>
        <Image
          src='/assets/hero.svg'
          alt='hero img'
          width='735'
          height='676'
          className='w-full h-full'
        />
      </div>
    </section>
  );
}
