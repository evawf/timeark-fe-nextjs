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
      start: "2023-04-18",
      end: "2023-04-19",
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
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        headerToolbar={{
          center: "dayGridMonth,timeGridWeek,timeGridDay NEW",
        }}
        customButtons={{
          NEW: {
            text: "NEW",
            click: () => console.log("new event"),
          },
        }}
        events={events}
        eventColor="red"
        nowIndicator
        dateClick={(e) => console.log(e.dateStr)}
        eventClick={(e) => console.log(e.event.title)}
      />
    </div>
  );
}
