import React from "react";
import axios from "axios";
import Project from "@/types/project";

export default async function UpdateProject(project: Project, id: string) {
  try {
    const projectId: Number = Number(id);
    const res = await axios.put(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/projects/${projectId}/update`,
      project
    );

    return res.data;
  } catch (err) {
    console.log("msg: ", err);
  }
}
