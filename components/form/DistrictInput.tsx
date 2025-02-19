'use client'
import React from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { districts } from "@/utils/mockdata/districtdata";
import { useStore } from "@/utils/store/storemap";

const DistrictInput = ({ defaultValue }: { defaultValue?: string }) => {
  
  const name = "district";
  const setDistrict = useStore((state)=> state.setDistrict)

  const handleChange = (value : string) =>{
    const selectedDirstrict = districts.find((data)=> data.districtname === value)
    // console.log(selectedDirstrict)
    if(selectedDirstrict){
      setDistrict(selectedDirstrict)
    }
  }

  return (
    <div>
      <Label htmlFor={name} className="capitalize ">
        {name}
      </Label>
      <Select
        defaultValue={defaultValue || districts[0].districtname}
        name={name}
        required
        onValueChange={handleChange}
      >
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {districts.map((item) => {
            return (
              <SelectItem key={item.id} value={item.districtname}>
                <span className="flex items-center gap-x-4">
                  {item.districtname}
                </span>
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
};

export default DistrictInput;
