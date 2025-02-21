'use client'
import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

const Search = () => {
  const seachParams = useSearchParams();
  const { replace } = useRouter();

  const [search, setSearch] = useState(
    seachParams.get("search")?.toString() || ""
  );

  const handleSearch = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(seachParams);
    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }
    replace(`/?${params.toString()}`);
  }, 400);

  useEffect(() => {
    if (!seachParams.get("search")) {
      setSearch("");
    }
  }, [seachParams.get("search")]);

  return (
    <Input
      type="text"
      placeholder="Sach camping"
      className="max-w-xs"
      onChange={(e) => {
        setSearch(e.target.value)
        handleSearch(e.target.value);
      }}
      value={search}
    />
  );
};

export default Search;
