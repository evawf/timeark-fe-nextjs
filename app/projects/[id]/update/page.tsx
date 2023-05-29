"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import GetSingleProject from "@/lib/project/fetchSingleProject";
import Project from "@/types/project";
import UpdateProjectInfo from "../../../../lib/project/updateProject";
import Sidebar from "@/app/components/Sidebar";
import moment from "moment";

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
            <Card
              sx={{
                width: 400,
                margin: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <CardContent>
                <form onSubmit={(e: React.SyntheticEvent) => handleSubmit(e)}>
                  <FormControl fullWidth sx={{ mt: 2 }}>
                    <InputLabel htmlFor="outlined-adornment-name">
                      Name
                    </InputLabel>
                    <OutlinedInput
                      required
                      type="text"
                      id="name"
                      defaultValue={project.name}
                      label="name"
                    />
                  </FormControl>
                  <FormControl fullWidth sx={{ mt: 2 }}>
                    <InputLabel htmlFor="outlined-adornment-description">
                      Description
                    </InputLabel>
                    <OutlinedInput
                      required
                      type="text"
                      id="description"
                      defaultValue={project.description}
                      label="description"
                      multiline
                      sx={{
                        height: 80,
                        wrap: "soft",
                      }}
                    />
                  </FormControl>
                  <FormControl fullWidth sx={{ mt: 2 }}>
                    <InputLabel htmlFor="outlined-adornment-budget">
                      Budget(S$)
                    </InputLabel>
                    <OutlinedInput
                      required
                      type="text"
                      id="budget"
                      defaultValue={project.budget}
                      label="budget(S$)"
                    />
                  </FormControl>

                  <FormControl fullWidth sx={{ mt: 2 }}>
                    <InputLabel htmlFor="outlined-adornment-ratePerHour">
                      Rate (S$/hour)
                    </InputLabel>
                    <OutlinedInput
                      required
                      type="text"
                      id="ratePerHour"
                      defaultValue={project.ratePerHour}
                      label="Rate (S$/hour)"
                    />
                  </FormControl>
                  <FormControl fullWidth sx={{ mt: 2 }}>
                    <InputLabel htmlFor="outlined-adornment-dueDate">
                      Due Date
                    </InputLabel>
                    <OutlinedInput
                      required
                      type="text"
                      id="dueDate"
                      defaultValue={moment(project.dueDate).format(
                        "YYYY-MM-DD"
                      )}
                      label="Due Date"
                    />
                  </FormControl>
                  <FormControl fullWidth sx={{ mt: 2 }}>
                    <InputLabel htmlFor="outlined-adornment-categories">
                      Categories
                    </InputLabel>
                    <OutlinedInput
                      required
                      type="text"
                      id="categories"
                      defaultValue={project.categories}
                      label="Categories"
                    />
                  </FormControl>
                  <Button
                    fullWidth
                    variant="contained"
                    color="success"
                    sx={{ mt: 2, height: "50px" }}
                    type="submit"
                  >
                    Update Project
                  </Button>
                </form>
              </CardContent>
            </Card>
          </Box>
        ) : (
          <Box>Loading</Box>
        )}
      </Box>
    </Box>
  );
}
