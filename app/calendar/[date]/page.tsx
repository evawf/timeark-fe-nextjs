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

// Styling CSS
import "./styles.css";
// import bootstrap5Plugin from "@fullcalendar/bootstrap5";
// import "bootstrap/dist/css/bootstrap.css";
// import "bootstrap-icons/font/bootstrap-icons.css";

interface Date {
  date: string;
}

export default function PickedDate({ params }: Date | any) {
  const today = moment().format("YYYY-MM-DD");
  console.log("today: ", typeof today);
  const [date, setDate] = useState(today);
  const [timeEntryList, setTimeEntryList] = useState<TimeEntry[]>([]);
  const router = useRouter();
  const events = [
    {
      title: "event2",
      start: "2023-04-18T16:00:00",
      end: "2023-04-18T17:00:00",
    },
  ];

  const handleGetTimeEntries = async () => {
    const res = await getTimeEntries(today);
    console.log("res from backend: ", res);
    if (res.times) {
      const timeData = res.times;

      setTimeEntryList(timeData);
    }
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
        plugins={[
          dayGridPlugin,
          timeGridPlugin,
          interactionPlugin,
          // bootstrap5Plugin,
          listPlugin,
        ]}
        // themeSystem="bootstrap5"
        themeSystem="bootstrap5"
        initialView="timeGridWeek"
        headerToolbar={{
          // center: "dayGridMonth,timeGridWeek,timeGridDay NEW",
          left: "prev,next today",
          center: "NEW",
          right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
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
        dateClick={(e) => console.log(e.dateStr)}
        eventClick={(e) => console.log(e.event.title)}
        height={"100vh"}
      />
    </div>
  );
}
