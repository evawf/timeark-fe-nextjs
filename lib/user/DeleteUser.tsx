import React from "react";
import axios from "axios";

axios.defaults.withCredentials = true;

export default async function DeleteUser(id: string) {
  try {
    const userId: number = Number(id);
    console.log("user id from front end: ", userId);
    const res = await axios.delete(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${userId}/delete`
    );

    console.log("res data: ", res.data);
    if (res.data) {
      return res.data;
    }
  } catch (err) {
    console.log("msg: ", err);
  }
}
