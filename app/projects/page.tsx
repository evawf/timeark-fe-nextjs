"use client";
import React, { useState, useEffect } from "react";
import Project from "../../types/project";
import { useRouter } from "next/navigation";
import Link from "next/link";
import getProjects from "../../lib/project/fetchProjects";
import Sidebar from "../components/Sidebar";
import moment from "moment";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";

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
    <Box sx={{ marginTop: "64px", display: "flex", flexDirection: "row" }}>
      <Sidebar />
      <Box sx={{ width: "100%", margin: 2 }}>
        <Box>
          <h2 style={{ textAlign: "center" }}>My Projects </h2>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            margin: 2,
          }}
        >
          <Button
            variant="contained"
            size="small"
            color="success"
            onClick={() => router.push("/projects/newProject")}
          >
            + New Project
          </Button>
        </Box>

        {projectList ? (
          <section>
            {projectList.length !== 0 ? (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                {projectList.map((project) => (
                  <Card
                    key={project.id}
                    sx={{
                      width: 200,
                      height: 200,
                      margin: 1,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      backgroundColor: "lightblue",
                    }}
                  >
                    {/* <Link href={`/projects/${project.id}`}>{project.name}</Link> */}
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="body1"
                        component="div"
                        sx={{ textAlign: "center" }}
                      >
                        {project.name}
                      </Typography>
                      <Typography variant="body2">
                        Budget(S$): {Number(project.budget).toFixed(2)}
                      </Typography>
                      <Typography variant="body2">
                        Due Date: {moment(project.dueDate).format("YYYY-MM-DD")}
                      </Typography>
                      <Typography>
                        Rate/hour(S$): {Number(project.ratePerHour).toFixed(2)}
                      </Typography>
                    </CardContent>
                    <CardActions sx={{ justifyContent: "center", mb: 2 }}>
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => router.push(`/projects/${project.id}`)}
                      >
                        Learn More
                      </Button>
                    </CardActions>
                  </Card>
                ))}
              </Box>
            ) : (
              <Box>
                <h4>You haven't added any project yet!</h4>
                <Button onClick={() => router.push("projects/newProject")}>
                  New Project
                </Button>
              </Box>
            )}
          </section>
        ) : (
          <>Loading</>
        )}
      </Box>
    </Box>
  );
}
