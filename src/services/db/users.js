import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase/config";
import bcrypt from "bcryptjs-react";
import { getAuth } from "firebase/auth";

export class User {
  constructor(fullname, password, email) {
    this.fullname = fullname;
    this.password = password;
    this.email = email;
  }
  async addUser() {
    try {
      const hash = await bcrypt.hash(this.password, 12);

      return await addDoc(collection(db, "users"), {
        user: this.fullname,
        email: this.email,
        password: hash || "",
      });
    } catch (error) {
      new Error(`error from addUser ${error.message}`);
    }
  }
  async retriveUsers() {
    console.log(getAuth());
  }
}
