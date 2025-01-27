// import Image from "next/image";

interface TableRowProps {
  date: string;
  place: string;
  city: string;
  state: string;
}

export default function Home() {
  const TableRow: React.FC<TableRowProps> = ({ date, place, city, state }) => {
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
        <td className="px-6 py-4"></td>
        <td className="px-6 py-4"></td>
      </tr>
    );
  };

  return (
    <div className=" bg-[url(/images/background.jpg)] bg-cover w-full h-dvh bg-fixed ">
      <section className="grid grid-cols-2 w-full h-dvh">
        <div className="flex flex-col justify-center items-center">
          {/* <Image src={""} alt="logo" width={100} height={100} /> */}

          <h1 className="text-8xl font-bold text-white ">MR HAT</h1>
        </div>

        <div className=""></div>
      </section>

      <section className="bg-white w-full h-dvh p-20">
        <h1 className="text-4xl font-bold">proximos eventos</h1>

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
                  --
                </th>
                <th scope="col" className="px-6 py-3">
                  --
                </th>
              </tr>
            </thead>
            <tbody>
              <TableRow
                date="01/02/2025"
                place="Old School 44"
                city="Alicante"
                state="Alicante"
              />
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
