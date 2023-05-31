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
import Sidebar from "@/app/components/Sidebar";
import moment from "moment";
import Divider from "@mui/material/Divider";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";

//************ Form ************/
import Select from "@mui/joy/Select";
import MenuItem from "@mui/material/MenuItem";
import Option from "@mui/joy/Option";
import Stack from "@mui/joy/Stack";
import InputLabel from "@mui/material/InputLabel";
import NativeSelect from "@mui/material/NativeSelect";
import InputBase from "@mui/material/InputBase";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

interface ProjectId {
  id: string | number;
}

export default function ProjectPage({ params }: { params: { id: string } }) {
  const [open, setOpen] = useState<boolean>(false);
  const [openUpdate, setOpenUpdate] = useState<boolean>(false);
  const router = useRouter();
  const [project, setProject] = useState<Project>();
  const [taskList, setTaskList] = useState<Task[]>([]);
  const [showUpdateTaskForm, setShowUpdateTaskForm] = useState(false);
  const [taskToBeUpdated, setTaskToBeUpdated] = useState<Task>();
  const [newTask, setNewTask] = useState<Task>({
    id: "",
    name: "",
    categoryName: project ? String(project?.categories[0]) : "",
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
  // const showNewTaskFormSection = () => {
  //   // setShowNewTaskForm(true);
  //   setOpen(true);
  // };

  const handleCloseNewTaskEntryWindow = () => {
    setOpen(false);
  };

  const handleChange = (e: any) => {
    e.preventDefault();
    const { name, value } = e.target;
    setNewTask({
      ...newTask,
      [e.target.name]: String(value),
    });
  };

  const handleAddNewTask = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("new task: ", newTask);
    const res = await AddNewTask(newTask);
    setTaskList([...taskList, res.newTask]);
  };

  // *********************** Update Single Task ***********************

  const handleCloseUpdateTaskEntryWindow = () => {
    setOpenUpdate(false);
  };

  const handleUpdateTask = (taskId: string) => {
    // setShowUpdateTaskForm(true);
    setOpenUpdate(true);
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
    <Box sx={{ marginTop: "64px", display: "flex", flexDirection: "row" }}>
      <Sidebar />
      <Box sx={{ width: "100%", margin: 2 }}>
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
                width: "100%",
                margin: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                backgroundColor: "lightblue",
              }}
            >
              <CardContent sx={{ alignContent: "center", margin: 1 }}>
                <Typography
                  variant="body1"
                  color="text.primary"
                  sx={{ textAlign: "start" }}
                >
                  Project Name: {project.name}
                </Typography>
                <Typography
                  variant="body1"
                  color="text.primary"
                  sx={{ textAlign: "start" }}
                >
                  Description: {project.description}
                </Typography>
                <Typography
                  variant="body1"
                  color="text.primary"
                  sx={{ textAlign: "start" }}
                >
                  Budget(S$): {project.budget}
                </Typography>
                <Typography
                  variant="body1"
                  color="text.primary"
                  sx={{ textAlign: "start" }}
                >
                  Rate(S$/hour): {project.ratePerHour}
                </Typography>
                <Typography
                  variant="body1"
                  color="text.primary"
                  sx={{ textAlign: "start" }}
                >
                  Due Date: {moment(project.dueDate).format("YYYY-MM-DD")}
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "row" }}>
                  Categories:
                  {/* <ul> */}
                  {project.categories.map((cat: string, idx: number) => (
                    <Typography
                      key={`cat-${idx}`}
                      variant="body1"
                      color="text.secondary"
                      sx={{
                        textAlign: "start",
                        ml: 1,
                        mr: 1,
                        backgroundColor: "gray",
                        p: 0.5,
                        borderRadius: 1,
                      }}
                    >
                      {cat}
                    </Typography>
                  ))}
                  {/* </ul> */}
                </Box>
              </CardContent>
              <CardActions sx={{ justifyContent: "center", mb: 2 }}>
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => router.push(`/projects/${params.id}/update`)}
                >
                  Update Project
                </Button>
                <br />
                <Button
                  onClick={() => deleteProject()}
                  variant="contained"
                  color="secondary"
                >
                  Delete Project
                </Button>
                <br />
              </CardActions>

              {/* ====================== Task List ====================== */}
              <Divider sx={{ mt: 5 }} />
              <Box sx={{ alignContent: "center", m: 6 }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    my: 1,
                  }}
                >
                  <Typography sx={{ textAlign: "center" }} variant="h5">
                    Project Task List
                  </Typography>
                  <Button
                    // onClick={() => showNewTaskFormSection()}
                    onClick={() => setOpen(true)}
                    color="success"
                    variant="contained"
                  >
                    Add Task
                  </Button>
                </Box>
                <TableContainer component={Paper}>
                  <Table sx={{ width: "100%" }} aria-label="customized table">
                    <TableHead>
                      <TableRow>
                        <StyledTableCell>Task Name</StyledTableCell>
                        <StyledTableCell align="right">
                          Task Category
                        </StyledTableCell>
                        <StyledTableCell align="right">Status</StyledTableCell>
                        <StyledTableCell align="right">Update</StyledTableCell>
                        <StyledTableCell align="right">Delete</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {taskList ? (
                        <>
                          {taskList.map((t, idx) => (
                            <StyledTableRow key={`task${idx}`}>
                              <StyledTableCell component="th" scope="row">
                                {t.name}
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                {t.categoryName}
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                {t.isDone ? "Done" : "In process"}
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                <EditNoteIcon
                                  onClick={() => handleUpdateTask(t.id)}
                                />
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                <DeleteForeverIcon
                                  onClick={() => handleDeleteTask(t.id)}
                                />
                              </StyledTableCell>
                            </StyledTableRow>
                          ))}
                        </>
                      ) : (
                        <StyledTableRow>
                          <StyledTableCell component="th" scope="row">
                            You haven't added any task yet.
                          </StyledTableCell>
                        </StyledTableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </Card>
          </Box>
        ) : (
          <Box>Loading</Box>
        )}
      </Box>

      {/* ====================== New Task Form ====================== */}

      <Modal open={open} onClose={() => handleCloseNewTaskEntryWindow()}>
        <ModalDialog
          aria-labelledby="basic-modal-dialog-title"
          aria-describedby="basic-modal-dialog-description"
          sx={{ maxWidth: 500 }}
        >
          <Typography
            id="basic-modal-dialog-title"
            component="h2"
            style={{ fontWeight: "bold", textAlign: "center" }}
          >
            Add New Task
          </Typography>
          <form
            onSubmit={(e: React.SyntheticEvent) => {
              handleAddNewTask(e);
              setOpen(false);
            }}
          >
            <Stack spacing={2}>
              <FormControl>
                <label htmlFor="">Name: </label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl>
                <label htmlFor="">Category: </label>
                <select
                  name="categoryName"
                  id="categoryName"
                  onChange={handleChange}
                  style={{
                    height: "40px",
                    borderRadius: "9px",
                    border: "1px solid lightgray",
                  }}
                >
                  <option value="" style={{ textAlign: "center" }}>
                    -- Select a category --
                  </option>
                  {project?.categories.map((c, idx) => (
                    <option
                      value={c}
                      key={`${c}${idx}`}
                      style={{ textAlign: "center" }}
                    >
                      {c}
                    </option>
                  ))}
                </select>
              </FormControl>

              <FormControl>
                <Button type="submit" color={"success"} variant={"contained"}>
                  Submit
                </Button>
              </FormControl>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>

      {/* ====================== Update Single Task Form ====================== */}
      <Modal
        open={openUpdate}
        onClose={() => handleCloseUpdateTaskEntryWindow()}
      >
        <ModalDialog>
          <Typography
            id="basic-modal-dialog-title"
            component="h2"
            style={{ fontWeight: "bold", textAlign: "center" }}
          >
            Update Task
          </Typography>
          <form
            action=""
            onSubmit={(e: React.SyntheticEvent) => {
              handleSubmitUpdatedTask(e);
              setOpenUpdate(false);
            }}
          >
            <Stack spacing={2}>
              <FormControl>
                <label htmlFor="">Task Name: </label>
                <input
                  type="text"
                  id="name"
                  defaultValue={taskToBeUpdated?.name}
                  style={{
                    height: "40px",
                    borderRadius: "9px",
                    border: "1px solid lightgray",
                    padding: "5px",
                  }}
                />
              </FormControl>
              <FormControl>
                <label htmlFor="">Task category: </label>
                <select
                  name="categoryName"
                  id="categoryName"
                  onChange={handleChange}
                  style={{
                    height: "40px",
                    borderRadius: "9px",
                    border: "1px solid lightgray",
                  }}
                >
                  <option value="" style={{ textAlign: "center" }}>
                    -- Select a category --
                  </option>
                  {project?.categories.map((c, idx) => (
                    <option
                      value={c}
                      key={`${c}${idx}`}
                      style={{ textAlign: "center" }}
                    >
                      {c}
                    </option>
                  ))}
                </select>
              </FormControl>
              <FormControl>
                <label htmlFor="">Task status: </label>
                <select
                  name=""
                  id="isDone"
                  style={{
                    height: "40px",
                    borderRadius: "9px",
                    border: "1px solid lightgray",
                  }}
                >
                  <option value={"false"}>In process</option>
                  <option value={"true"}>Done</option>
                </select>
              </FormControl>
              <FormControl>
                <Button type="submit" color={"success"} variant={"contained"}>
                  Update Task
                </Button>
              </FormControl>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    </Box>
  );
}
