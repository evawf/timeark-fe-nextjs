"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import GetSingleProject from "@/lib/project/fetchSingleProject";
import GetProjectTasks from "@/lib/task/fetchProjectTasks";
import Project from "@/types/project";
import Task from "@/types/task";
import DeleteProject from "@/lib/project/deleteProject";
import AddNewTask from "@/lib/task/addNewTask";
import updateTask from "@/lib/task/updateTask";
import deleteTask from "@/lib/task/deleteTask";

interface ProjectId {
  id: string;
}

export default function ProjectPage({ params }: ProjectId | any) {
  const router = useRouter();
  const [project, setProject] = useState<Project>();
  const [taskList, setTaskList] = useState<Task[]>([]);
  const [showNewTaskForm, setShowNewTaskForm] = useState(false);
  const [showUpdateTaskForm, setShowUpdateTaskForm] = useState(false);
  const [taskToBeUpdated, setTaskToBeUpdated] = useState<Task>();
  const [newTask, setNewTask] = useState<Task>({
    id: "",
    name: "",
    categoryName: "",
    projectId: params.id,
    isDone: false,
    isDeleted: false,
  });

  const getSingleProjectData = async () => {
    const getProj = await GetSingleProject(params.id);
    const getTasks = await GetProjectTasks(params.id);

    setProject(getProj.project);
    setTaskList(getTasks.tasks);

    return;
  };

  useEffect(() => {
    let isAuth = localStorage.getItem("isAuth");
    isAuth === "true" ? getSingleProjectData() : router.push("/login");
  }, []);

  const deleteProject = () => {
    alert("Are you sure to delete this project?");
    let input = prompt("Input 'Y' to confirm.");
    if (input === "Y") {
      DeleteProject(params.id);
      alert("Your project has been deleted!");
    }
    return router.push("/projects");
  };

  // *********************** Add New Task ***********************
  const showNewTaskFormSection = () => {
    setShowNewTaskForm(true);
  };

  const handleChange = (e: any) => {
    e.preventDefault();
    const { id, value } = e.target;
    setNewTask({
      ...newTask,
      [e.target.id]: value,
    });
  };

  const handleAddNewTask = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await AddNewTask(newTask);
    setTaskList([...taskList, res.newTask]);
  };

  // *********************** Update Single Task ***********************
  const handleUpdateTask = (taskId: string) => {
    setShowUpdateTaskForm(true);
    const task = taskList.filter((t) => {
      if (t.id === taskId) {
        return t;
      }
    });
    setTaskToBeUpdated(task[0]);
  };

  const handleSubmitUpdatedTask = async (e: React.FormEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      name: { value: string };
      categoryName: { value: string };
      isDone: { value: string };
    };

    const udpatedTaskData: Task | any = {
      id: taskToBeUpdated?.id,
      name: target.name.value,
      categoryName: target.categoryName.value,
      isDone: JSON.parse(target.isDone.value),
    };

    console.log("udpatedTaskData: ", udpatedTaskData);
    const res = await updateTask(udpatedTaskData);
    console.log("res from backend : ", res);
    const updatedTask = res.task;
    let tasks = taskList.map((t) => {
      if (t.id === updatedTask.id) {
        t = updatedTask;
      }
      return t;
    });

    console.log("updated taskList: ", tasks);
    setTaskList(tasks);
    setShowUpdateTaskForm(false);
    return;
  };

  // *********************** Delete Single Task ***********************

  const handleDeleteTask = async (taskId: string) => {
    const res = await deleteTask(taskId);
    console.log("res from backend: ", res);
    console.log("tasklist: ", taskList);
    if (res.msg === "Task deleted!") {
      const tasks = taskList.filter((t) => t.id !== taskId);
      setTaskList(tasks);
    } else {
      alert("Something went wrong!");
    }
    return;
  };

  return (
    <div>
      Project Page:
      <div>
        {project ? (
          <div>
            <div>Name: {project.name}</div>
            <div>Description: {project.description}</div>
            <div>Budget(S$): {project.budget}</div>
            <div>Rate(S$/hour): {project.ratePerHour}</div>
            <div>Due Date: {project.dueDate}</div>
            <div>
              Categories:
              {/* <ul> */}
              {project.categories.map((cat: string, idx: number) => (
                <p key={`cat-${idx}`}>{cat}</p>
              ))}
              {/* </ul> */}
            </div>
            <button
              onClick={() => router.push(`/projects/${params.id}/update`)}
            >
              Update Project
            </button>
            <br />
            <button onClick={() => deleteProject()}>Delete Project</button>
            <br />

            {/* ====================== Task List ====================== */}
            <div>Task List: </div>
            <div>
              {taskList ? (
                <div>
                  <ul>
                    {taskList.map((t, idx) => (
                      <li key={`task${idx}`}>
                        <span> Name: {t.name} |</span>

                        <span>| Category: {t.categoryName} |</span>
                        <span>
                          | Status: {t.isDone ? "Done" : "In process"}
                        </span>
                        <span>
                          <button onClick={() => handleUpdateTask(t.id)}>
                            Update Task
                          </button>{" "}
                          |
                        </span>
                        <span>
                          |{" "}
                          <button onClick={() => handleDeleteTask(t.id)}>
                            Delete Task
                          </button>
                        </span>
                      </li>
                    ))}
                  </ul>
                  <button onClick={() => showNewTaskFormSection()}>
                    Add Task
                  </button>
                </div>
              ) : (
                <div>
                  <p>You haven't added any task yet.</p>
                  <button onClick={() => showNewTaskFormSection()}>
                    Add Task
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div>Loading</div>
        )}
      </div>
      <div>
        {showNewTaskForm && (
          <div>
            {/* ====================== New Task Form ====================== */}
            <p>Add New Task Form</p>
            <form
              action=""
              onSubmit={(e: React.SyntheticEvent) => handleAddNewTask(e)}
            >
              <label htmlFor="">Task Name: </label>
              <input type="text" id="name" onChange={handleChange} />
              <br />
              <label htmlFor="">Task category: </label>
              <select
                name="categoryName"
                id="categoryName"
                onChange={handleChange}
              >
                <option value="">-- Select a category --</option>
                {project?.categories.map((c, idx) => (
                  <option value={c} key={`${c}${idx}`}>
                    {c}
                  </option>
                ))}
              </select>
              <br />
              <button type="submit">Submit</button>
            </form>
          </div>
        )}
      </div>
      <div>
        {/* ====================== Update Single Task Form ====================== */}
        {showUpdateTaskForm && (
          <div>
            <p>Update Task</p>
            <form
              action=""
              onSubmit={(e: React.SyntheticEvent) => handleSubmitUpdatedTask(e)}
            >
              <label htmlFor="">Task Name: </label>
              <input
                type="text"
                id="name"
                defaultValue={taskToBeUpdated?.name}
              />
              <br />
              <label htmlFor="">Task category: </label>
              <select
                name="categoryName"
                id="categoryName"
                onChange={handleChange}
              >
                <option value="">-- Select a category --</option>
                {project?.categories.map((c, idx) => (
                  <option value={c} key={`${c}${idx}`}>
                    {c}
                  </option>
                ))}
              </select>
              <br />
              <label htmlFor="">Task status: </label>
              <select name="" id="isDone">
                <option value={"false"}>In process</option>
                <option value={"true"}>Done</option>
              </select>
              <br />
              <button type="submit">Update Task</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
