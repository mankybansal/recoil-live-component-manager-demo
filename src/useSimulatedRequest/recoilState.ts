import { atom } from "recoil";
import { recoilKeys } from "../recoilKeys";

export const loadingState = atom({
  key: recoilKeys.loadingState,
  default: false
});
