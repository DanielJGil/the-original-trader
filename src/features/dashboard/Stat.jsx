function Stat({ icon, title, value, color }) {
  return (
    <div className="border rounded-md flex pl-3 pr-3 items-center justify-center ">
      <div>
        <div
          className={`row-span-full aspect-square rounded-full flex items-center justify-center w-16 text-3xl bg-${color}-100 text-${color}-700`}
        >
          {icon}
        </div>
      </div>

      <div className="p-3">
        <h5 className="self-end text-xl uppercase tracking-wide font-semibold">
          {title}
        </h5>
        <p className="text-3xl leading-none font-medium">{value}</p>
      </div>
    </div>
  );
}

export default Stat;
