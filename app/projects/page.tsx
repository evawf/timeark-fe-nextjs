"use client";
import React, { useState, useEffect } from "react";
import Project from "../../types/project";
import { useRouter } from "next/navigation";
import Link from "next/link";
import getProjects from "../../lib/project/fetchProjects";
import Sidebar from "../components/Sidebar";

export default function Projects() {
  const [projectList, setProjectList] = useState<Project[]>([]);
  const router = useRouter();

  const getProjectsData = async () => {
    const res = await getProjects();
    setProjectList(res.projects);
    return;
  };

  useEffect(() => {
    let isAuth = localStorage.getItem("isAuth");
    isAuth === "true" ? getProjectsData() : router.push("/login");
  }, []);

  return (
    <div>
      <Sidebar />
      <h2>My Projects: </h2>

      <div>
        <button onClick={() => router.push("/projects/newProject")}>
          Add New Project
        </button>
      </div>

      {projectList ? (
        <section>
          {projectList.length !== 0 ? (
            <ul>
              {projectList.map((project) => (
                <li key={project.id}>
                  <Link href={`/projects/${project.id}`}>{project.name}</Link>
                </li>
              ))}
            </ul>
          ) : (
            <div>
              <h4>You haven't added any project yet!</h4>
              <button onClick={() => router.push("projects/newProject")}>
                New Project
              </button>
            </div>
          )}
        </section>
      ) : (
        <>Loading</>
      )}
    </div>
  );
}
