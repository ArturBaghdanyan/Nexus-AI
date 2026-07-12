import { HistoryItem } from "@/src/types/historyType";

const HistoryAnalyze = ({ data }: { data: HistoryItem[] }) => {
  return (
    <aside className="w-[30%] h-[100vh] border-r-1 transition-shadow transition duration-300 shadow-md p-4 bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100">
      <h2 className="text-green-600">History Analysis</h2>

      <ul className="list-style-type-none flex flex-col text-start">
        {data.map((item) => (
          <li
            key={item.id}
            className="cursor-pointer rounded-lg border p-3 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition"
          >
            <h3 className="font-semibold">{item.name}</h3>
            <p className="text-xs text-zinc-500">{item.summary}</p>
            <div className="flex justify-between mt-2">
              <span className="text-green-600 font-bold">{item.score || 0}/100</span>

              <span className="text-xs">
                {new Date(item.created_at).toLocaleDateString()}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default HistoryAnalyze;
