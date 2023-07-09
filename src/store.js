import { create } from "zustand";

const initialState = {
  color: "255, 255, 255",
  currentTexture: "robiniaBranson",
};

export const useAppStore = create((set) => ({
  ...initialState,

  // function to update the different fields inside the store
  update: (options) => set((state) => ({ ...state, ...options })),
}));
