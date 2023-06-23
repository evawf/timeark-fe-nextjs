import React from "react";
import User from "../../types/user";
import axios from "axios";

axios.defaults.withCredentials = true;

export default async function UpdateUserProfile(user: User | any, id: string) {
  try {
    const userId: number = Number(id);
    console.log("user id from front end: ", userId);
    const res = await axios.put(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${userId}/update`,
      user
    );

    console.log("res data: ", res.data);
    if (res.data) {
      return res.data;
    }
  } catch (err) {
    console.log("msg: ", err);
  }
}
