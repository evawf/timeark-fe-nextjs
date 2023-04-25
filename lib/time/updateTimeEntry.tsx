import axios from "axios";
import React from "react";
import Task from "@/types/task";
axios.defaults.withCredentials = true;

interface Props {
  id: string;
  endTime: string;
  startTime: string;
}

export default async function updateTimeEntry(updatedTimeEntry: Props) {
  try {
    const res = await axios.put(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/timeentries/${updatedTimeEntry.id}/update`,
      updatedTimeEntry
    );
    return res.data;
  } catch (err) {
    console.log("msg: ", err);
  }
}
