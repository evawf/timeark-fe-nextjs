"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import GetSingleProject from "@/lib/project/fetchSingleProject";
import GetProjectTasks from "@/lib/task/fetchProjectTasks";
import Project from "@/types/project";
import Task from "@/types/task";
import DeleteProject from "@/lib/project/deleteProject";

interface ProjectId {
  id: string;
}

export default function ProjectPage({ params }: ProjectId | any) {
  const router = useRouter();
  const [project, setProject] = useState<Project>();
  const [taskList, setTaskList] = useState<Task[]>([]);

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
              {project.categories.map((cat, idx) => (
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
                          <button>Update Task</button> |
                        </span>
                        <span>
                          | <button>Delete Task</button>
                        </span>
                      </li>
                    ))}
                  </ul>
                  <button>Add Task</button>
                </div>
              ) : (
                <>You haven't added any task yet.</>
              )}
            </div>
          </div>
        ) : (
          <div>Loading</div>
        )}
      </div>
    </div>
  );
}
