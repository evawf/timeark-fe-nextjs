"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import getTimeEntries from "@/lib/time/fetchTimeEntries";
import moment from "moment";
import TimeEntry from "@/types/timeEntry";

export default function Calendar() {
  const today = moment().format("YYYY-MM-DD");
  console.log("today: ", typeof today);
  const [date, setDate] = useState(today);
  const [timeEntryList, setTimeEntryList] = useState<TimeEntry[]>([]);
  const router = useRouter();

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

  return <div>Calendar current date: {date && <>{date}</>} page</div>;
}
