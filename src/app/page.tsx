"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

interface TableRowProps {
  date: string;
  place: string;
  city: string;
  state: string;
  price: string;
  location: string;
}

export default function Home() {
  const [events, setEvents] = useState<TableRowProps[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch("/api/notion");
      const data: TableRowProps[] = await res.json();
      setEvents(data);
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };

  const TableRow: React.FC<TableRowProps> = ({
    date,
    place,
    city,
    state,
    price,
    location,
  }) => {
    return (
      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
        <th
          scope="row"
          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
          {date}
        </th>
        <td className="px-6 py-4">
          <h3 className="font-bold">{place}</h3>
          <p>
            {city}/{state}
          </p>
        </td>
        <td className="px-6 py-4">{price}</td>
        <td className="px-6 py-4">
          <Link href={location || ""}>See Location</Link>
        </td>
      </tr>
    );
  };

  return (
    <div className="relative bg-[url(/images/background.jpg)] bg-cover bg-no-repeat bg-[right_5px]  md:bg-cover w-full h-dvh md:bg-fixed">
      <div className=" absolute w-full h-full z-0 bg-white/20  backdrop-blur-none"></div>
      <section className="relative z-10 flex justify-center items-center md:grid md:grid-cols-2 w-full h-dvh ">
        <div className="flex flex-col justify-center items-center">
          <Image
            src={"/images/mr-hat-logo_2.png"}
            alt="logo"
            width={600}
            height={600}
          />
        </div>
        <div></div>
      </section>

      <section className="bg-white w-full h-dvh p-8  md:p-20  ">
        <h1 className="text-4xl font-bold">Próximos Eventos</h1>

        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Fecha
                </th>
                <th scope="col" className="px-6 py-3">
                  Lugar
                </th>
                <th scope="col" className="px-6 py-3">
                  Precio
                </th>
                <th scope="col" className="px-6 py-3">
                  Ubicación
                </th>
              </tr>
            </thead>
            <tbody>
              {events.map((event, index) => (
                <TableRow
                  key={index}
                  date={event.date}
                  place={event.place}
                  city={event.city}
                  state={event.state}
                  price={event.price}
                  location={event.location}
                />
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <section>
        <h1 className="text-4xl font-bold">Contacto</h1>

        <Link href="https://wa.me/34631175925" target="_blank">
          {/* <Image
            alt="Chat on WhatsApp"
            src="/assets/WhatsAppButtonWhiteLarge.svg"
            width={300}
            height={300}
            className="shadow-md rounded-lg"
          /> */}
          Click Here
        </Link>
      </section>

      <section>
        <footer className="footer footer-center bg-primary text-primary-content p-10 flex flex-col justify-center items-center gap-8">
          <Image
            src={"/images/mr-hat-logo-crop.png"}
            alt="logo"
            width={100}
            height={100}
          />

          <p>Copyright © {new Date().getFullYear()} - All right reserved</p>

          <nav>
            <div className="grid grid-flow-col gap-4">
              <a>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="fill-current"
                >
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                </svg>
              </a>
              <a>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="fill-current"
                >
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
                </svg>
              </a>
              <a>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="fill-current"
                >
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
                </svg>
              </a>
            </div>
          </nav>
        </footer>
      </section>
    </div>
  );
}
