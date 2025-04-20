"use client";
import React, { useRef, useState,useEffect } from "react";
import SessionEditor from "./SessionEditor";
import { getSchedule, submitSchedule } from "@/app/actions/schedule";
import styles from "../page.module.css";
import "../../globals.css";
import { FaPlus } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { revalidatePath } from "next/cache";

export default function Form({ initialSchedule, initalDates, locations,papers}) {
  const router = useRouter();

  const [schedule, setSched] = useState(initialSchedule);
  const [deletedSessions, setDeleted] = useState([]);
  let newSessions = schedule

  const handleDelete = (id) => {
    // const deleted = schedule.find(s => s.id == id)
    const newDeleted = deletedSessions
    newDeleted.push(id)
    setDeleted(newDeleted)
  const updated = schedule.filter(s => s.id != id)
    setSched(updated)
  };

  function getSessionData(name, value, index) {
    const existing = newSessions.findIndex((s) => s.id === index);

    if (existing >= 0) {
      newSessions[existing][name] = value;
    } else {
      const s = { id: index };
      s[name] = value;
      newSessions.push(s);
    }
  }

  function getPresentationData(name, sessionId,value, index){
    const existingSession = newSessions.findIndex((s) => s.id === sessionId);

    if ( existingSession>= 0) {
      const existingPresentation = newSessions[existingSession].presentations[index]
      
      if(existingPresentation != undefined){
        newSessions[existingSession].presentations[index][name] = value;
      }
      else{
        const p = { id: index };
        p[name] = value;
        newSessions[existingSession].presentations.push(p);
      }
    }
  }

  const addSession = async (e) => {
    const newSchedules = [...schedule];
    const sess = { "title": "", "date": "", "location": "", "presentations": [] };
    newSchedules.push(sess);
    setSched(newSchedules)
  }
  return (
    <>
      <header className={styles.schedule_header}>
        <h2>Confrence Schedule</h2>
          <button type="button" className={["button",styles.add_btn, styles.button].join(' ')} onClick={addSession}> <FaPlus></FaPlus>New Session</button>
      </header>

      <form id="scheduleForm "className={styles.form} action={ async () => {
        await submitSchedule(newSessions,deletedSessions);
        router.push('/schedule/view')
      }}>
        <div>{schedule.length > 0 ? schedule.map((sched) => <SessionEditor initialSession={sched} id={sched.id} key={sched.id} dates={initalDates} locations={locations} papers={papers} handleDelete={handleDelete} getSessionData={getSessionData} getPresentationData={getPresentationData}></SessionEditor>) : <p className="unavailable">No Sessions found.</p>}</div>
        <input type="submit" value="Submit" className={[styles.button, "button"].join(" ")}></input>
      </form>
    </>
  );
}
