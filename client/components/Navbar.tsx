"use client";
import Link from "next/link";
import BookNow from "./BookNow";
import DocOnline from "./DocOnline";
import Select from "./Select";
import { useTranslations } from "next-intl";
import { TiThMenu } from "react-icons/ti";
import { IoClose } from "react-icons/io5";
import { useState } from "react";

const Navbar = () => {
  const [menu, setMenu] = useState(false);
  const t = useTranslations("Nav");
  const menuHandler = () => setMenu(!menu);
  const closeMenu = () => setMenu(false);
  return (
    <div className='bg-[#E6F6FE] flex items-center justify-between container mx-auto w-[90%] px-1 sm:px-4 lg:px-4 py-2 rounded-[10px] my-10 font-general'>
      <h1
        onClick={closeMenu}
        className='font-bold uppercase text-dark-blue-design text-2xl'>
        DDD
      </h1>
      <nav
        className={`flex items-center gap-4 bg-sky-blue-design absolute top-[15vh] right-0 flex-col w-full left-0 h-[70vh] justify-evenly ease-in-out duration-150 ${
          menu ? "translate-x-0" : "-translate-x-[200%]"
        } `}>
        <Link
          href='/'
          className='font-semibold text-dark-blue-design'
          onClick={closeMenu}>
          {t("1")}
        </Link>
        <Link
          href='/#'
          className='font-semibold text-dark-blue-design'
          onClick={closeMenu}>
          {t("2")}
        </Link>
        <Link
          href='/#'
          className='font-semibold text-dark-blue-design'
          onClick={closeMenu}>
          {t("3")}
        </Link>
        <Link
          href='/#'
          className='font-semibold text-dark-blue-design'
          onClick={closeMenu}>
          {t("4")}
        </Link>
        <Link
          href='/#'
          className='font-semibold text-dark-blue-design'
          onClick={closeMenu}>
          {t("5")}
        </Link>
      </nav>
      <div className='flex items-center gap-4'>
        <DocOnline />
        <BookNow />
        <Select />
        <div className='flex lg:hidden'>
          {menu ? (
            <IoClose
              className='w-6 h-6 text-dark-blue-design'
              onClick={menuHandler}
            />
          ) : (
            <TiThMenu
              className='w-6 h-6 text-dark-blue-design'
              onClick={menuHandler}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
