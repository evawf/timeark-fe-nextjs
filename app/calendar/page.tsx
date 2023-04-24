"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import getTimeEntries from "@/lib/time/fetchTimeEntries";
import moment from "moment";
import TimeEntry from "@/types/timeEntry";
import Project from "@/types/project";
import getProjects from "@/lib/project/fetchProjects";
import Task from "@/types/task";
import getProjectTasks from "@/lib/task/fetchProjectTasks";
import addNewTimeEntry from "@/lib/time/addNewTimeEntry";

//************ Full Calendar ************/
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";

//************ Form ************/
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";

// Styling calendar page
import "./styles.css";

// MUI
// import * as React from "react";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import Stack from "@mui/joy/Stack";
import Add from "@mui/icons-material/Add";
import Typography from "@mui/joy/Typography";

interface Date {
  date: string;
}

export default function PickedDate({ params }: Date | any) {
  const today = moment().format("YYYY-MM-DD, h:mm:ss a");
  // const [date, setDate] = useState(today);
  const [timeEntryList, setTimeEntryList] = useState<TimeEntry[]>([]);
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const [updateForm, setUpdateForm] = useState<boolean>(false);
  const [timeEntry, setTimeEntry] = useState<TimeEntry>();
  const [projectList, setProjectList] = useState<Project[]>([]);
  const [taskOptions, setTaskOptions] = useState<Task[]>([]);
  const [selectedProject, setSelectedProject] = useState("");
  const [selectedTask, setSelectedTask] = useState("");
  // const [startTime, setStartTime] = useState(date);

  const events = timeEntryList.map((t) => {
    return {
      title: t.task.name,
      start: t.startTime,
      end: t.endTime,
      id: t.id,
    };
  });

  const handleGetTimeEntries = async () => {
    const res = await getTimeEntries();
    if (res.times) {
      const timeData = res.times;
      setTimeEntryList(timeData);
    }
    return;
  };

  // Handle add new time entry: form -> select client - select project - select task - input start time
  const handleOpenAddNewTimeEntryModal = async () => {
    // setStartTime(date);
    // open model window and show form
    setOpen(true);
    // get users project list:
    const res = await getProjects();
    setProjectList(res.projects);
    return;
  };

  const getTasksByProjectId = async (selectedProject: string) => {
    const res = await getProjectTasks(selectedProject);
    const tasks: Task[] = res.tasks;
    const undoneTasks: Task[] = tasks.filter((t) => !t.isDone);
    setTaskOptions(undoneTasks);
  };

  const handleAddNewTimeEntry = async () => {
    const newTimeEntry = {
      startTime: moment().format(),
      taskId: selectedTask,
    };
    console.log("newTimeEntry: ", newTimeEntry);
    const res = await addNewTimeEntry(newTimeEntry);
    console.log(res);
  };

  const handleCloseNewTimeEntryWindow = () => {
    setOpen(false);
    setProjectList([]);
    setTaskOptions([]);
    setSelectedProject("");
    setSelectedTask("");
  };

  // Handle view time entry & update & delete time entry
  const handleEditTimeEntry = async (timeEntryId: string) => {
    setUpdateForm(true);
    const selectedTimeEntry = timeEntryList.find(
      (t) => Number(t.id) === Number(timeEntryId)
    );
    setTimeEntry(selectedTimeEntry);

    return;
  };

  useEffect(() => {
    let isAuth = localStorage.getItem("isAuth");
    isAuth === "true" ? handleGetTimeEntries() : router.push("/login");
  }, []);

  return (
    <div>
      <p>Calendar current date: page</p>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
        initialView="timeGridWeek"
        headerToolbar={{
          left: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
          center: "NEW",
          right: "prev,next today",
        }}
        customButtons={{
          NEW: {
            text: `${today}`,
            click: () => console.log("new event"),
          },
        }}
        events={events}
        eventColor="red"
        nowIndicator
        dateClick={(e) => handleOpenAddNewTimeEntryModal()}
        eventClick={(e) => handleEditTimeEntry(e.event.id)}
        height={"800px"}
      />

      {/******************************** Add new time entry form ********************************/}
      <Modal
        open={open}
        onClose={() =>
          // setOpen(false)
          handleCloseNewTimeEntryWindow()
        }
      >
        <ModalDialog
          aria-labelledby="basic-modal-dialog-title"
          aria-describedby="basic-modal-dialog-description"
          sx={{ maxWidth: 500 }}
        >
          <Typography id="basic-modal-dialog-title" component="h2">
            Create new time entry
          </Typography>
          <Typography
            id="basic-modal-dialog-description"
            textColor="text.tertiary"
          >
            Fill in the information of the project.
          </Typography>
          <form
            onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
              event.preventDefault();
              setOpen(false);
              handleAddNewTimeEntry();
            }}
          >
            <Stack spacing={2}>
              <FormControl>
                <FormLabel>Project: </FormLabel>
                {projectList.length ? (
                  <Select
                    placeholder="Select a project"
                    sx={{ width: 240 }}
                    onChange={(e, newValue) => {
                      setSelectedProject(String(newValue));
                      getTasksByProjectId(String(newValue));
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
                    <button onClick={() => router.push("/projects/newProject")}>
                      Add New Project
                    </button>
                  </>
                )}
              </FormControl>
              <FormControl>
                {selectedProject ? (
                  <>
                    <FormLabel>Task: </FormLabel>
                    {taskOptions.length ? (
                      <Select
                        placeholder="Select a task"
                        sx={{ width: 240 }}
                        onChange={(e, newValue) =>
                          setSelectedTask(String(newValue))
                        }
                      >
                        {taskOptions.map((t) => (
                          <Option value={t.id} key={`task${t.id}`}>
                            {t.name}
                          </Option>
                        ))}
                      </Select>
                    ) : (
                      <>
                        <Button
                          onClick={() =>
                            router.push(`/projects/${selectedProject}`)
                          }
                        >
                          Add new task to selected project
                        </Button>
                      </>
                    )}
                  </>
                ) : (
                  <></>
                )}
              </FormControl>
              <FormControl>
                {selectedTask ? (
                  <>
                    <FormLabel>Start time: {today}</FormLabel>
                    {/* <Input
                      defaultValue={moment(startTime).format(
                        "YYYY-MM-DD, h:mm:ss a"
                      )}
                      onChange={(e) =>
                        setStartTime(moment(e.target.value).format())
                      }
                    /> */}
                  </>
                ) : (
                  <></>
                )}
              </FormControl>
              <Button type="submit">Submit</Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>

      {/******************************** Update time entry form ********************************/}
      <Modal open={updateForm} onClose={() => setUpdateForm(false)}>
        <ModalDialog
          aria-labelledby="basic-modal-dialog-title"
          aria-describedby="basic-modal-dialog-description"
          sx={{ maxWidth: 500 }}
        >
          <Typography id="basic-modal-dialog-title" component="h2">
            Update time entry: {timeEntry?.id}
          </Typography>
          <Typography
            id="basic-modal-dialog-description"
            textColor="text.tertiary"
          >
            Fill in the information of the project.
          </Typography>
          <form
            onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
              event.preventDefault();
              setUpdateForm(false);
            }}
          >
            <Stack spacing={2}>
              <Typography>
                Client: {timeEntry?.task.project?.client.name}
              </Typography>
              <FormLabel>Project: {timeEntry?.task.project.name}</FormLabel>
              <FormControl>
                <FormLabel>Task Name</FormLabel>
                <Input
                  autoFocus
                  required
                  defaultValue={`${timeEntry?.task.name}`}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Start Time: </FormLabel>
                <Input required defaultValue={`${timeEntry?.startTime}`} />
              </FormControl>
              <FormControl>
                <FormLabel>End Time: </FormLabel>
                <Input required defaultValue={`${timeEntry?.endTime}`} />
              </FormControl>
              <Button type="submit">Submit</Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    </div>
  );
}
