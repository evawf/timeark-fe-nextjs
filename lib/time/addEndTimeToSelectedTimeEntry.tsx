import axios from "axios";
import React from "react";
import Task from "@/types/task";
axios.defaults.withCredentials = true;

interface Props {
  id: string;
  endTime: string;
}

export default async function addEndTimeToSelectedTimeEntry(timeEntry: Props) {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/timeentries/endTimeEntry`,
      timeEntry
    );

    return res.data;
  } catch (err) {
    console.log("msg: ", err);
  }
}
