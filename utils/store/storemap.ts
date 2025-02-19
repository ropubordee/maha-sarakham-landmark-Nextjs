import { create } from "zustand";

interface StoreType {
  district: { id : number ; districtname: string; coords: [number, number] } | null;
  setDistrict: (district: { id : number ; districtname: string; coords: [number, number] }) => void;
}

export const useStore = create<StoreType>((set) => ({
  district: null,
  setDistrict: (district) => set({ district }),
}));
