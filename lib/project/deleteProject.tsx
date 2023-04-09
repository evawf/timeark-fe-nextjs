import axios from "axios";
import React from "react";

axios.defaults.withCredentials = true;

export default async function deleteProject(id: string) {
  try {
    const projectId: number = Number(id);
    const res = await axios.delete(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/projects/${projectId}/delete`
    );
    return res.data;
  } catch (err) {
    console.log("msg: ", err);
  }
}
