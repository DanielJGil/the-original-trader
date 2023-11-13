import { useDarkMode } from "../../context/DarkModeContext";

function Stat({ icon, title, value, textColor, bgColor }) {
  const { isDarkMode } = useDarkMode();

  const border = !isDarkMode ? "border" : "";
  const background = isDarkMode ? "bg-[#18212f]" : "";

  return (
    <div
      className={`${border} ${background} flex  w-full rounded-md items-center`}
    >
      <div className="pl-3">
        <div
          className={`row-span-full aspect-square rounded-full flex items-center justify-center w-16 text-3xl ${bgColor} ${textColor}`}
        >
          {icon}
        </div>
      </div>

      <div className="p-4 space-y-1 ">
        <h5 className="self-end text-md text-slate-500 uppercase tracking-wide font-semibold">
          {title}
        </h5>
        <p className="text-2xl leading-none font-medium">{value}</p>
      </div>
    </div>
  );
}

export default Stat;
