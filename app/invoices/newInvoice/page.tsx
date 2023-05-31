"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import addNewInvoice from "@/lib/invoice/addNewInvoice";
import getProjects from "@/lib/project/fetchProjects";
import Project from "@/types/project";
import moment from "moment";
import Sidebar from "@/app/components/Sidebar";

//************ Form ************/
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";

import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import Stack from "@mui/joy/Stack";
import Add from "@mui/icons-material/Add";
import Typography from "@mui/joy/Typography";
import { el } from "date-fns/locale";

export default function NewInvoice() {
  const router = useRouter();
  const [projectList, setProjectList] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(1);
  const [selectedYear, setSelectedYear] = useState(
    Number(moment().format("YYYY"))
  );

  const currentYear: number = Number(moment().format("YYYY"));
  const defaultMonth: number = Number(moment().format("MM")) - 1;
  const monthOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const yearOptions = [currentYear, currentYear - 1, currentYear - 2];

  const handleGetProjects = async () => {
    const res = await getProjects();
    return setProjectList(res.projects);
  };

  const generateNewInvoice = async (e: React.FormEvent) => {
    e.preventDefault();
    const invoiceReqInfo = {
      month: selectedMonth,
      year: selectedYear,
      projectId: Number(selectedProject),
    };
    const res = await addNewInvoice(invoiceReqInfo);
    if (res.msg) {
      alert(res.msg);
    } else {
      router.push(`/invoices/${res.newInvoice.id}`);
    }
  };

  useEffect(() => {
    let isAuth = localStorage.getItem("isAuth");
    isAuth === "true" ? handleGetProjects() : router.push("/login");
  }, []);

  return (
    <Box sx={{ marginTop: "64px", display: "flex", flexDirection: "row" }}>
      <Sidebar />
      <Box sx={{ width: "100%", margin: 2 }}>
        <h4 style={{ textAlign: "center" }}>Create New Invioce</h4>
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
              <form
                action=""
                onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
                  event.preventDefault();
                  generateNewInvoice(event);
                }}
              >
                <Stack spacing={2} sx={{ maxWidth: 400 }}>
                  <FormControl>
                    <FormLabel>Select Project: </FormLabel>
                    {projectList.length ? (
                      <Select
                        placeholder="Select a project"
                        onChange={(e, newValue) => {
                          setSelectedProject(String(newValue));
                        }}
                      >
                        {projectList.map((p) => (
                          <Option value={p.id} key={p.id}>
                            {p.name}({p.client.name})
                          </Option>
                        ))}
                      </Select>
                    ) : (
                      <>
                        <Button
                          color="primary"
                          sx={{ mt: 2, height: "50px" }}
                          onClick={() => router.push("/projects/newProject")}
                        >
                          Add New Project
                        </Button>
                      </>
                    )}
                  </FormControl>
                  <FormControl>
                    <FormLabel>Select Year: </FormLabel>
                    <Select
                      defaultValue={currentYear}
                      onChange={(e, newValue) => {
                        setSelectedYear(Number(newValue));
                      }}
                    >
                      {yearOptions.map((y, idx) => (
                        <Option value={y} key={idx}>
                          {y}
                        </Option>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl>
                    <FormLabel>Select Month: </FormLabel>
                    <Select
                      defaultValue={defaultMonth}
                      onChange={(e, newValue) => {
                        setSelectedMonth(Number(newValue));
                      }}
                    >
                      {monthOptions.map((m, idx) => (
                        <Option value={m} key={idx}>
                          {m}
                        </Option>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl>
                    <Button type="submit" color="success">
                      Generate Invoice
                    </Button>
                  </FormControl>
                </Stack>
              </form>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
}
