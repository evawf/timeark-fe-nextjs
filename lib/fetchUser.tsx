import React from "react";
import axios from "axios";

axios.defaults.withCredentials = true;

export default async function GetUserProfile(id: string) {
  try {
    const userId: number = Number(id);
    console.log("user id from front end: ", userId);
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${userId}`
    );

    console.log("backend res: ", res);

    return res.data;
  } catch (err) {
    console.log("msg: ", err);
  }
}
