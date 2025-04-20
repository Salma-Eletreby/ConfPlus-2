"use client";
import React, { useState } from "react";
import Session from "./Session";
import { getSchedule } from "@/app/actions/schedule";
import styles from "../page.module.css";
import "../../globals.css";
import { FaPlus } from 'react-icons/fa';

export default function SessionContainer({ initialSchedule, initalDates, userId }) {
  const [schedule, setSched] = useState(initialSchedule);

  const handleDateChange = async (e) => setSched(await getSchedule(e.target.value));

  return (
    <>
      <header className={styles.schedule_header}>
        <h2>Confrence Schedule</h2>
          <select name="dates" id="dates" onChange={handleDateChange}>
            <option value="">All</option>
            {initalDates.map((date, index) => (
              <option value={date} key={index}>
                {date}
              </option>
            ))}
          </select>
      </header>

      <div>{schedule.length > 0 ? schedule.map((sched) => <Session session={sched} key={sched.id}></Session>) : <p className="unavailable">No Sessions found.</p>}</div>
    </>
  );
}
