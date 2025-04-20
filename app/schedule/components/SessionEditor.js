"use client";

import React, { useState } from "react";
import styles from "../page.module.css";
import PresentationEditor from "./PresentationEditor";
import { FaCalendar, FaMapMarker } from "react-icons/fa";
import { FaPlus } from 'react-icons/fa';
import { revalidatePath } from "next/cache";

export default function SessionEditor({ initialSession, id,dates, locations, papers,handleDelete, getSessionData, getPresentationData}) {
  const [session, setSession] = useState(initialSession)
  const [presentations, setPresentations] = useState(initialSession.presentations);

  const addPresentation = async (e) => {
    const pres={ }
    const newPres = [...presentations, pres];
    setPresentations(newPres)
  }

  const deletePresentation = (index) => {
    const deleted = presentations.splice(index,1)
    const updated = presentations.filter(p => p != deleted)
    
    setPresentations(updated)
    };

  
  return (
    <div className={styles.session_card} name="sessionCard">
      <input type="hidden" name="id" value={id} />
      <div className={styles.session_header}>
        <h3>Title</h3>
        <input type="text" name="title" defaultValue={session.title} onBlur={(event) => getSessionData(event.target.name, event.target.value, id)} required></input>
        <div className={styles.date_location}>
          <p>
            <FaCalendar></FaCalendar> Date:{" "}
            <select name="date" id="date" onBlur={(event) => getSessionData(event.target.name, event.target.value, id)} required>
              {dates.map((date, index) => (
                <option value={date} key={index} selected={date === session.date}>
                  {date}
                </option>
              ))}
            </select>
          </p>
          <p>
            <FaMapMarker></FaMapMarker> Location: {" "}
            <select name="location" id="location" onBlur={(event) => getSessionData(event.target.name, event.target.value, id)} required>
            {locations.map((location, index) => (
                <option value={location} key={index} selected={location === session.location}>
                  {location}
                </option>
              ))}
            </select>
          </p>
        </div>
        <div>
        <button type="button" className={["button",styles.add_btn, styles.button].join(' ')} onClick={addPresentation}> <FaPlus></FaPlus>New presentation</button>
        <button type="button" className={["button",styles.add_btn, styles.button].join(' ')} onClick={() => handleDelete(id)} >Delete Session</button>
        </div>
      </div>
      <div className="presentList" id="presentList">
        {presentations.length > 0 ? presentations.map((pres,index) => <PresentationEditor initialpresentation={pres} key={index} index={index} papers={papers} sessionId ={id} onDelete={deletePresentation} getPresentationData={getPresentationData}></PresentationEditor>) : <p className="unavailable">No Presentations found.</p>}
      </div>
      {/* <input type="submit" value="Save" className={[styles.button, "button"].join(" ")} onClick={handleClick}></input> */}
      <hr></hr>
    </div>
  );
}
