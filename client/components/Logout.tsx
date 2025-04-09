"use client";
import { CiLogout } from "react-icons/ci";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

const Logout = () => {
  const router = useRouter();
  const t = useTranslations("dashboard");

  const handleLogout = () => {
    Cookies.remove("token");
    router.push("/admin");
  };
  return (
    <div className='text-brand-white relative w-full'>
      <button
        onClick={handleLogout}
        className='absolute bg-red-500 text-secondary bottom-10 right-10 w-36 h-12 rounded-[10px] z-50 flex items-center justify-center gap-2 font-medium cursor-pointer'>
        <CiLogout className='w-6 h-6' />
        <span>{t("logout")}</span>
      </button>
    </div>
  );
};

export default Logout;
