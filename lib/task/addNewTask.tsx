import axios from "axios";
import React from "react";
import Task from "@/types/task";
axios.defaults.withCredentials = true;

export default async function AddNewTask(task: Task) {
  try {
    const newTask = {
      name: task.name,
      isDone: false,
      categoryName: task.categoryName,
      projectId: task.projectId,
      isDeleted: false,
    };

    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/tasks/newTask`,
      newTask
    );
    console.log("res backend data: ", res.data);
    return res.data;
  } catch (err) {
    console.log("msg: ", err);
  }
}
