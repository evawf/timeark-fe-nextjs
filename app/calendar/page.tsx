"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import getTimeEntries from "@/lib/time/fetchTimeEntries";
import moment from "moment";
import TimeEntry from "@/types/timeEntry";

//************ Full Calendar ************/
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";

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
  const today = moment().format("YYYY-MM-DD");
  const [date, setDate] = useState(today);
  const [timeEntryList, setTimeEntryList] = useState<TimeEntry[]>([]);
  const router = useRouter();
  const [open, setOpen] = React.useState<boolean>(false);

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
    console.log("res from backend: ", res);
    if (res.times) {
      const timeData = res.times;
      setTimeEntryList(timeData);
    }
    return;
  };

  // Handle add new time entry: form -> select client - select project - select task - input start time
  const handleAddNewTimeEntry = async (date: string) => {
    console.log("clicked date: ", date);
    // open model window and show form
    setOpen(true);

    return;
  };

  // Handle view time entry & update & delete time entry
  const handleEditTimeEntry = async (timeEntryId: string) => {
    console.log("task name: ", timeEntryId);

    return;
  };

  useEffect(() => {
    let isAuth = localStorage.getItem("isAuth");
    isAuth === "true" ? handleGetTimeEntries() : router.push("/login");
  }, []);

  console.log("timeEntry list: ", timeEntryList);

  return (
    <div>
      <p>Calendar current date: {date && <>{date}</>} page</p>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
        initialView="timeGridWeek"
        headerToolbar={{
          // center: "dayGridMonth,timeGridWeek,timeGridDay NEW",
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
        dateClick={(e) => handleAddNewTimeEntry(e.dateStr)}
        eventClick={(e) => handleEditTimeEntry(e.event.id)}
        height={"800px"}
      />

      {/* Add new time entry form */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog
          aria-labelledby="basic-modal-dialog-title"
          aria-describedby="basic-modal-dialog-description"
          sx={{ maxWidth: 500 }}
        >
          <Typography id="basic-modal-dialog-title" component="h2">
            Create new project
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
            }}
          >
            <Stack spacing={2}>
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input autoFocus required />
              </FormControl>
              <FormControl>
                <FormLabel>Description</FormLabel>
                <Input required />
              </FormControl>
              <Button type="submit">Submit</Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    </div>
  );
}
