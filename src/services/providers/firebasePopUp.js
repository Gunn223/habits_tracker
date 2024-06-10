import { getAuth, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase/config";
export const handlePopUpProvider = async (provider) => {
  return await signInWithPopup(auth, provider);
};
