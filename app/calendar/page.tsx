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
import addEndTimeToSelectedTimeEntry from "@/lib/time/addEndTimeToSelectedTimeEntry";
import updateTimeEntry from "@/lib/time/updateTimeEntry";
import deleteTimeEntry from "@/lib/time/deleteTimeEntry";

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
import { el } from "date-fns/locale";
import { stringify } from "querystring";

interface Date {
  date: string;
}

interface Props {
  id: string;
  endTime: string;
}

export default function PickedDate({ params }: Date | any) {
  const today = moment().format("YYYY-MM-DD, h:mm:ss a");
  const [timeEntryList, setTimeEntryList] = useState<TimeEntry[]>([]);
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const [updateForm, setUpdateForm] = useState<boolean>(false);
  const [timeEntry, setTimeEntry] = useState<TimeEntry>();
  const [projectList, setProjectList] = useState<Project[]>([]);
  const [taskOptions, setTaskOptions] = useState<Task[]>([]);
  const [selectedProject, setSelectedProject] = useState("");
  const [selectedTask, setSelectedTask] = useState("");

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
    const res = await addNewTimeEntry(newTimeEntry);
    const newTime: TimeEntry = res.newTimeEntry;
    setTimeEntryList([...timeEntryList, newTime]);
    return;
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

  const handleAddEndTimeToTimeEntry = async () => {
    const updatedTimeEntry = { ...timeEntry, endTime: moment().format() };
    const timeInfo: Props = {
      id: String(updatedTimeEntry.id),
      endTime: updatedTimeEntry.endTime,
    };
    // Call backend to add endTime
    const res = await addEndTimeToSelectedTimeEntry(timeInfo);
    // Update frontend timeEntry list
    if (res.msg === "Added end time for time entry.") {
      const updatedTimeEntryList: TimeEntry[] | any = timeEntryList.map((t) =>
        Number(t.id) === Number(timeInfo.id) ? updatedTimeEntry : t
      );
      setTimeEntryList(updatedTimeEntryList);
    }
  };

  const handleUpdateSelectedTimeEntry = async (e: React.FormEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      startTime: { value: string };
      endTime: { value: string };
    };

    const st = new Date(target.startTime.value);
    const et = new Date(target.endTime.value);

    if (et <= st) {
      alert("Please input correct start time and end time!");
    } else {
      const updatedTime = {
        id: String(timeEntry?.id),
        startTime: moment(st).format(),
        endTime: moment(et).format(),
      };

      const res = await updateTimeEntry(updatedTime);
      if (res.msg === "Time updated!") {
        const updatedTimeEntryList = timeEntryList.map((t) => {
          if (Number(t.id) === Number(updatedTime.id)) {
            const start: any = moment(st).format("YYYY-MM-DDTHH:mm:ssZ");
            const end: any = moment(et).format("YYYY-MM-DDTHH:mm:ssZ");
            t.startTime = start;
            t.endTime = end;
            return t;
          }
          return t;
        });
        setTimeEntryList(updatedTimeEntryList);
      }
    }
  };

  const handleDeleteTimeEntry = async () => {
    const timeEntryId: any = timeEntry?.id;
    const res = await deleteTimeEntry(timeEntryId);
    if (res.msg === "Time entry deleted") {
      const updatedTimeEntryList = timeEntryList.filter(
        (t) => t.id !== timeEntryId
      );
      setTimeEntryList(updatedTimeEntryList);
      return setUpdateForm(false);
    }
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
      <Modal open={open} onClose={() => handleCloseNewTimeEntryWindow()}>
        <ModalDialog
          aria-labelledby="basic-modal-dialog-title"
          aria-describedby="basic-modal-dialog-description"
          sx={{ maxWidth: 500 }}
        >
          <Typography id="basic-modal-dialog-title" component="h2">
            Start time tracker
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
                    {/* <FormLabel>Start time: {today}</FormLabel> */}
                    <Button type="submit">Start</Button>
                  </>
                ) : (
                  <></>
                )}
              </FormControl>
              {/* <Button type="submit">Start</Button> */}
            </Stack>
          </form>
        </ModalDialog>
      </Modal>

      {/******************************** Update, End, Delete time entry form ********************************/}
      <Modal open={updateForm} onClose={() => setUpdateForm(false)}>
        <ModalDialog
          aria-labelledby="basic-modal-dialog-title"
          aria-describedby="basic-modal-dialog-description"
          sx={{ maxWidth: 500 }}
        >
          {/* <Typography id="basic-modal-dialog-title" component="h2">
            Update time entry: {timeEntry?.id}
          </Typography>
          <Typography
            id="basic-modal-dialog-description"
            textColor="text.tertiary"
          >
            Fill in the information of the project.
          </Typography> */}

          {/******************************** Update time entry form ********************************/}

          {timeEntry?.endTime ? (
            <>
              <Typography id="basic-modal-dialog-title" component="h2">
                Update time entry: {timeEntry?.id}
              </Typography>
              <form
                onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
                  // event.preventDefault();
                  setUpdateForm(false);
                  handleUpdateSelectedTimeEntry(event);
                }}
              >
                <Stack spacing={2}>
                  <Typography>
                    Client: {timeEntry?.task.project?.client.name}
                  </Typography>
                  <FormLabel>Project: {timeEntry?.task.project.name}</FormLabel>
                  <FormControl>
                    <FormLabel>
                      Task Name: {`${timeEntry?.task.name}`}{" "}
                    </FormLabel>
                    {/* <Input
                      autoFocus
                      required
                      defaultValue={`${timeEntry?.task.name}`}
                    /> */}
                  </FormControl>
                  <FormControl>
                    <FormLabel>Start Time:</FormLabel>
                    <Input
                      required
                      type="text"
                      name="startTime"
                      defaultValue={moment(`${timeEntry?.startTime}`).format(
                        "YYYY-MM-DD, HH:mm:ss"
                      )}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>End Time: </FormLabel>
                    <Input
                      required
                      type="text"
                      name="endTime"
                      defaultValue={moment(`${timeEntry?.endTime}`).format(
                        "YYYY-MM-DD, HH:mm:ss"
                      )}
                    />
                  </FormControl>
                  <Button type="submit">Update</Button>
                  <Button
                    color={"danger"}
                    variant={"solid"}
                    onClick={() => handleDeleteTimeEntry()}
                  >
                    Delete
                  </Button>
                </Stack>
              </form>
            </>
          ) : (
            <>
              {/**************************** Add endTime to time entry form ********************************/}

              <Typography id="basic-modal-dialog-title" component="h2">
                Stop time tracker: {timeEntry?.id}
              </Typography>
              <form
                onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
                  event.preventDefault();
                  setUpdateForm(false);
                  handleAddEndTimeToTimeEntry();
                }}
              >
                <Stack spacing={2}>
                  <Typography>
                    Client: {timeEntry?.task.project?.client.name}
                  </Typography>
                  <Typography>
                    Project: {timeEntry?.task.project.name}
                  </Typography>
                  <Typography>Task Name: {timeEntry?.task.name}</Typography>
                  <Typography>
                    Start Time:{" "}
                    {moment(timeEntry?.startTime).format(
                      "YYYY-MM-DD, HH:mm:ss"
                    )}
                  </Typography>

                  {/* <FormControl>
                    <FormLabel>End Time: </FormLabel>
                    <Input required defaultValue={`${timeEntry?.endTime}`} />
                  </FormControl> */}
                  <Button type="submit">Stop</Button>
                </Stack>
              </form>
            </>
          )}
        </ModalDialog>
      </Modal>
    </div>
  );
}
