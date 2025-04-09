import { getAllBooks } from "@/app/api/api";
import HandleBooks from "@/components/HandleBooks";
import moment from "moment";
import { FaCalendarAlt } from "react-icons/fa";
import { NumberTicker } from "@/components/magicui/number-ticker";
import Logout from "@/components/Logout";
import { FaInstagramSquare, FaFacebook, FaTiktok } from "react-icons/fa";
import { TiWorld } from "react-icons/ti";
import Link from "next/link";
import Select from "@/components/Select";
import { getTranslations } from "next-intl/server";

interface bookType {
  _id?: string;
  name: string;
  phone?: string;
  email?: string;
  date: string;
  message: string;
  status: string;
}

const Dashboard = async () => {
  const books = await getAllBooks();
  const pendingCount = books.filter(
    (b: bookType) => b.status === "pending"
  ).length;

  const t = await getTranslations("dashboard");

  return (
    <section className='container mx-auto px-4 font-poppins'>
      <div className='h-[10vh] flex items-center justify-between text-xl md:text-4xl font-medium'>
        <h2>
          {t("greeting")}
          <span className='text-sky-blue-design font-semibold mx-1'>
            {t("docName")}
          </span>
        </h2>
        <Select />
      </div>
      <div className='h-[10vh] flex  items-center justify-between'>
        <div className=''>
          {t("requestsNumber")}

          <span className='font-semibold'>
            <NumberTicker
              value={pendingCount}
              className=' font-bold tracking-tighter text-sky-blue-design mx-2 text-xl'
            />
          </span>
        </div>
        <div className=''>
          <div className='flex items-center justify-center gap-3'>
            <span className='flex items-center gap-1'>
              <FaCalendarAlt className='w-6 h-6' />
            </span>
            <span className='font-medium'>{moment().format("LL")}</span>
          </div>
        </div>
      </div>
      <div className='h-[70vh]'>
        {books.length > 0 ? (
          <div className=''>
            <table className='w-full border-collapse bg-white text-left text-sm text-gray-500'>
              <thead className='bg-gray-50'>
                <tr>
                  <th
                    scope='col'
                    className='px-6 py-4 font-medium text-gray-900'>
                    {t("name")}
                  </th>
                  <th
                    scope='col'
                    className='px-6 py-4 font-medium text-gray-900'>
                    {t("date")}
                  </th>
                  <th
                    scope='col'
                    className='px-6 py-4 font-medium text-gray-900'>
                    {t("email")}
                  </th>
                  <th
                    scope='col'
                    className='px-6 py-4 font-medium text-gray-900'>
                    {t("phone")}
                  </th>
                  <th
                    scope='col'
                    className='px-6 py-4 font-medium text-gray-900'>
                    {t("message")}
                  </th>
                  <th
                    scope='col'
                    className='px-6 py-4 font-medium text-gray-900'>
                    {t("status")}
                  </th>
                  <th
                    scope='col'
                    className='px-6 py-4 font-medium text-gray-900'></th>
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-100 border-t border-gray-100'>
                {books.map((book: bookType) => (
                  <tr key={book._id}>
                    <th className='px-6 py-4 font-medium text-gray-900'>
                      {book.name}
                    </th>
                    <td className='px-6 py-4'>
                      {moment(book.date).add(3, "days").calendar()}
                    </td>

                    <td className='px-6 py-4'>
                      {book.email ? book.email : `${t("noMail")}`}
                    </td>
                    <td className='px-6 py-4'>
                      {book.phone ? book.phone : `${t("noPhone")}`}
                    </td>
                    <td className='px-6 py-4'>{book.message}</td>
                    <td className='px-6 py-4'>
                      <span
                        className={`inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold ${
                          (book.status === `${t("pending")}` &&
                            "bg-gray-600") ||
                          (book.status === `${t("approved")}` &&
                            "bg-green-600 text-secondary") ||
                          (book.status === `${t("rejected")}` &&
                            "bg-red-600 text-secondary")
                        }`}>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          viewBox='0 0 20 20'
                          fill='currentColor'
                          className='h-3 w-3'>
                          <path
                            fill-rule='evenodd'
                            d='M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z'
                            clip-rule='evenodd'
                          />
                        </svg>
                        {book.status}
                      </span>
                    </td>
                    <HandleBooks
                      displayStatus={book.status}
                      name={book.name}
                      id={book._id}
                    />
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className='flex items-center justify-center h-[50vh]'>
            <h3 className='text-3xl text-center'>{t("noReqYet")}</h3>
          </div>
        )}
      </div>
      <div className='h-[10vh]'>
        <div className='flex items-center gap-3'>
          <Link href='/' target='_blank' title='Website Link'>
            <TiWorld className='w-6 h-6 text-dark-blue-design hover:scale-150 ease-in-out duration-200 hover:text-sky-blue-design' />
          </Link>
          <Link
            href='https://www.instagram.com/molaraiche/'
            target='_blank'
            title='Instagram Link'>
            <FaInstagramSquare className='w-6 h-6 text-dark-blue-design hover:scale-150 ease-in-out duration-200 hover:text-sky-blue-design' />
          </Link>
          <Link
            href='https://www.tiktok.com/@molaraiche'
            target='_blank'
            title='Tiktok Link'>
            <FaTiktok className='w-6 h-6 text-dark-blue-design hover:scale-150 ease-in-out duration-200 hover:text-sky-blue-design' />
          </Link>
          <Link
            href='https://www.facebook.com/molaraiche'
            target='_blank'
            title='Facebook Link'>
            <FaFacebook className='w-6 h-6 text-dark-blue-design hover:scale-150 ease-in-out duration-200 hover:text-sky-blue-design' />
          </Link>
        </div>
        <Logout />
      </div>
    </section>
  );
};

export default Dashboard;
