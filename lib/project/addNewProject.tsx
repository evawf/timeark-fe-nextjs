import React from "react";
import axios from "axios";
import Project from "@/types/project";

axios.defaults.withCredentials = true;

export default async function AddNewProject(project: Project) {
  try {
    const newProject = {
      name: project.name,
      description: project.description,
      budget: Number(project.budget),
      ratePerHour: Number(project.ratePerHour),
      dueDate: new Date(project.dueDate),
      categories: project.categories.split(","),
      clientId: Number(project.clientId),
    };
    console.log("newProject sent to backend: ", newProject);
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/projects/newProject`,
      newProject
    );

    return res.data;
  } catch (err) {
    console.log("msg: ", err);
  }
}
