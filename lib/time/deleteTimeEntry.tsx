import axios from "axios";
import React from "react";
import Task from "@/types/task";
axios.defaults.withCredentials = true;

export default async function deleteTimeEntry(timeEntryId: string) {
  try {
    const res = await axios.delete(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/timeentries/${timeEntryId}/delete`
    );
    return res.data;
  } catch (err) {
    console.log("msg: ", err);
  }
}
