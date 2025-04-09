"use client";

import { usePathname, useRouter } from "next/navigation";

const Select = () => {
  const pathname = usePathname();
  const router = useRouter();

  const currentLocale = pathname.split("/")[1];

  const handleChange = (lang: string) => {
    const segments = pathname.split("/");
    segments[1] = lang;
    router.push(segments.join("/"));
  };

  return (
    <div className='flex items-center justify-center'>
      <select
        onChange={(e) => handleChange(e.target.value)}
        className='border border-sky-blue-design rounded-md p-1.5 bg-sky-blue-design text-secondary'
        defaultValue={currentLocale}>
        <option value='en'>EN</option>
        <option value='fr'>FR</option>
      </select>
    </div>
  );
};

export default Select;
