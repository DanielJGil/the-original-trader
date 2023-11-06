import { Button } from "@mui/material";
import { useSearchParams } from "react-router-dom";

function Filter({ filterField, options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter = searchParams.get(filterField) || options.at(0).value;

  function handleClick(value) {
    searchParams.set(filterField, value);
    if (searchParams.get("page")) searchParams.set("page", 1);

    setSearchParams(searchParams);
  }

  return (
    <div className="border rounded-sm  flex gap-[0.8rem]">
      {options.map((option) => (
        <Button
          onClick={() => handleClick(option.value)}
          key={option.value}
          // active={option.value === currentFilter}
          disabled={option.value === currentFilter}
        >
          {option.label}
        </Button>
      ))}
    </div>
  );
}

export default Filter;
