import React from "react";
import axios from "axios";
axios.defaults.withCredentials = true;

export default async function getTimeEntries(selectedDate: string) {
  try {
    console.log("selected date: ", selectedDate);
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/timeentries/${selectedDate}`
    );
    return res.data;
  } catch (err) {
    console.log("msg: ", err);
  }
}
