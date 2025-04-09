import Image from "next/image";
import Link from "next/link";

const DocOnline = () => {
  const docAvailable = false;
  return (
    <Link href='/admin' className='relative hidden md:flex'>
      <Image
        src='/assets/doc.svg'
        width={50}
        height={50}
        className='object-cover'
        alt='Is Doctor Available ?'
      />
      <div
        className={`w-4 h-4 rounded-full absolute top-0 right-0 ${
          docAvailable ? "bg-green-500" : "bg-red-500"
        }`}></div>
    </Link>
  );
};

export default DocOnline;
