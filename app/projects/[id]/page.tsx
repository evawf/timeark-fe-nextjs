"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import GetSingleProject from "@/lib/project/fetchSingleProject";
import Project from "@/types/project";
import DeleteProject from "@/lib/project/deleteProject";

interface ProjectId {
  id: string;
}

export default function ProjectPage({ params }: ProjectId | any) {
  const router = useRouter();
  const [project, setProject] = useState<Project>();

  const getSingleProjectData = async () => {
    console.log("call backend");
    const res = await GetSingleProject(params.id);
    console.log("single project res: ", res);
    setProject(res.project);
    return;
  };

  useEffect(() => {
    let isAuth = localStorage.getItem("isAuth");
    console.log("isAuth: ", isAuth);
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
            <div>Budget: {project.budget}</div>
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
          </div>
        ) : (
          <div>Loading</div>
        )}
      </div>
    </div>
  );
}
