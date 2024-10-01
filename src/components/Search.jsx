import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";

function Search({ clasName }) {
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();
  const handleChangeSearch = (e) => {
    setSearchText(e.target.value);
  };

  const handleSubmit = (e) => {
    if (e.key === "Enter" && searchText.trim()) {
      console.log(searchText);
      return navigate(`/search?q=${encodeURIComponent(searchText.trim())}`);
    }
  };

  return (
    <div className={twMerge("", clasName)}>
      <Input
        placeholder="Tìm kiếm bạn bè"
        className="bg-background"
        value={searchText}
        onChange={handleChangeSearch}
        onKeyPress={handleSubmit}
      />
    </div>
  );
}

export default Search;
