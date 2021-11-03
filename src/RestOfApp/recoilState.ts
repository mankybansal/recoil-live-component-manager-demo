import { atom } from "recoil";
import { recoilKeys } from "../recoilKeys";

export const clickTotalState = atom({
  key: recoilKeys.clickTotalState,
  default: 0
});
