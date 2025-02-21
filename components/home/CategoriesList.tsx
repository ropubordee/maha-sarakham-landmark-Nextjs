import { categorydata } from "@/utils/mockdata/categorydata";
import Link from "next/link";
import React from "react";

const CategoriesList = ({
  search,
  category,
}: {
  search?: string;
  category?: string;
}) => {
  const searchTerm = search ? `&search=${search}` : "";

  return (
    <div>
      <div className="flex justify-center my-4 font-bold gap-x-6">
        {categorydata.map((item) => {

          const isActive = item.label === category

          return (
            <Link
              href={`/?category=${item.label}${searchTerm}`}
              key={item.label}
            >
              <article className={`flex flex-col justify-center items-center p-3 hover:text-primary hover:scale-110 hover:duration-200 ${isActive ? 'text-primary' : '' } `}>
                <item.icon />
                <p>{item.label}</p>
              </article>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default CategoriesList;
