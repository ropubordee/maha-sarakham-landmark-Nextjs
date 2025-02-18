import React from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categorydata } from "@/utils/mockdata/categorydata";

const CategoryInput = ({ defaultValue }: { defaultValue?: string }) => {
  const name = "category";

  return (
    <div>
      <Label htmlFor={name} className="capitalize ">
    
        {name}
      </Label>
      <Select
        defaultValue={defaultValue || categorydata[0].label}
        name={name}
        required
      >
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {categorydata.map((item) => {
            return (
              <SelectItem key={item.label} value={item.label}>
                <span className="flex items-center gap-x-4">
                  <item.icon />
                  {item.label}
                </span>
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CategoryInput;
