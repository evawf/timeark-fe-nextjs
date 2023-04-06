"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import GetSingleProject from "@/lib/project/fetchSingleProject";
import Project from "@/types/project";
import UpdateProject from "@/lib/project/updateProject";

interface ProjectId {
  id: string;
}

export default function UpdateProject({ params }: ProjectId | any) {
  const router = useRouter();
  const [project, setProject] = useState<Project>();

  const getSingleProjectData = async () => {
    const res = await GetSingleProject(params.id);
    setProject(res.project);
    return;
  };

  useEffect(() => {
    let isAuth = localStorage.getItem("isAuth");
    isAuth === "true" ? getSingleProjectData() : router.push("/login");
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      name: { value: string };
      description: { value: string };
      budget: { value: number };
      ratePerHour: { value: number };
      dueDate: { value: Date };
      categories: { value: [] };
    };

    const updatedProjectData: Project | any = {
      name: target.name.value,
      description: target.description.value,
      budget: target.budget.value,
      ratePerHour: target.ratePerHour.value,
      dueDate: target.dueDate.value,
      categories: target.categories.value.split(","),
    };

    console.log("updatedProjectData: ", updatedProjectData);
    const res = await UpdateProject(updatedProjectData, params.id);

    console.log("res from backend: ", res);
  };

  return (
    <div>
      Update Project page
      {project ? (
        <div>
          <form onSubmit={(e: React.SyntheticEvent) => handleSubmit(e)}>
            <label htmlFor="">Name: </label>
            <input type="text" id="name" defaultValue={project.name} />
            <br />
            <label htmlFor="">Description: </label>
            <input
              type="text"
              id="description"
              defaultValue={project.description}
            />
            <br />
            <label htmlFor="">Budget: </label>
            <input type="text" id="budget" defaultValue={project.budget} />
            <br />
            <label htmlFor="">Rate($S/Hour): </label>
            <input
              type="text"
              id="ratePerHour"
              defaultValue={project.ratePerHour}
            />
            <br />
            <label htmlFor="">Due Date: </label>
            <input type="text" id="dueDate" defaultValue={project.dueDate} />
            <br />
            <label htmlFor="">Categories: </label>
            <input
              type="text"
              id="categories"
              defaultValue={project.categories}
            />
          </form>
        </div>
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
}
