"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import GetSingleProject from "@/lib/project/fetchSingleProject";
import Project from "@/types/project";
import UpdateProjectInfo from "../../../../lib/project/updateProject";
import Sidebar from "@/app/components/Sidebar";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";

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
      categories: { value: string };
    };

    const updatedProjectData: Project | any = {
      name: target.name.value,
      description: target.description.value,
      budget: target.budget.value,
      ratePerHour: target.ratePerHour.value,
      dueDate: target.dueDate.value,
      categories: target.categories.value.split(","),
    };

    const res = await UpdateProjectInfo(updatedProjectData, params.id);
    if (res.msg === "Project updated!") {
      return router.push(`/projects/${params.id}`);
    }
  };

  return (
    <Box sx={{ marginTop: "64px", display: "flex", flexDirection: "row" }}>
      <Sidebar />
      <Box sx={{ width: "100%", margin: 2 }}>
        <h2 style={{ textAlign: "center" }}>Update Project</h2>
        {project ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
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
              <br />
              <button type="submit">Update Project</button>
            </form>
          </Box>
        ) : (
          <Box>Loading</Box>
        )}
      </Box>
    </Box>
  );
}
