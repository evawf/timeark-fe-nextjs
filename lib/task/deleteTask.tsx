import React from "react";
import axios from "axios";
axios.defaults.withCredentials = true;

export default async function deleteTask(taskId: string) {
  try {
    const res = await axios.delete(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/tasks/${taskId}/delete`
    );
    return res.data;
  } catch (err) {
    console.log("msg: ", err);
  }
}
