import axios from "axios";
import React from "react";

axios.defaults.withCredentials = true;

export default async function GetSingleProject(id: string) {
  try {
    const projectId: number = Number(id);
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/projects/${projectId}`
    );

    console.log("backend response: ", res.data);
    return res.data;
  } catch (err) {
    console.log("msg: ", err);
  }
}
