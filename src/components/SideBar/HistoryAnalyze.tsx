type HistoryItem = {
  url: string;
  name: string;
};

const HistoryAnalyze = ({ data }: { data: HistoryItem[] }) => {
  return (
    <aside className="w-[30%] h-[100vh] border-r-1 transition-shadow transition duration-300 shadow-md p-4 bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100">
      <h2 className="text-green-600">History Analyzes</h2>

      <ul className="list-style-type-none flex flex-col text-start">
        {data.map((item, index) => (
          <li key={index} className="mb-2">
            <a href={item.url} className="text-blue-500 hover:underline text-[12px]">
              {item.url}
              {/* {item.name} */}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default HistoryAnalyze;
