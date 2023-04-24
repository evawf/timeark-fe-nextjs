import axios from "axios";
import React from "react";
import TimeEntry from "@/types/timeEntry";
axios.defaults.withCredentials = true;

interface Props {
  taskId: string;
  startTime: string;
}

export default async function AddNewTimeEntry(timeEntry: Props) {
  try {
    console.log("newTime: ", timeEntry);
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/timeentries/startTimeEntry`,
      timeEntry
    );
    console.log(res.data);
    return res.data;
  } catch (err) {
    console.log("msg: ", err);
  }
}
