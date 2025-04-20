import React from "react";
import styles from "../page.module.css";
import Presentation from "./Presentation";
import { FaCalendar, FaMapMarker } from "react-icons/fa";

export default function Session({ session }) {
  return (
    <div className={styles.session_card}>
      <div className={styles.session_header}>
        <h3>{session.title}</h3>
        <div className={styles.date_location}>
          <p>
            {" "}
            <FaCalendar></FaCalendar> {session.date}{" "}
          </p>
          <p>
            {" "}
            <FaMapMarker></FaMapMarker> {session.location}
          </p>
        </div>
      </div>
      <div className="presentList" id="presentList">
        {session.presentations.length > 0 ? 
          session.presentations.map((pres) => <Presentation presentation={pres} key={pres.id}></Presentation>) 
          : <p className="unavailable">No Presentations found.</p>}
      </div>
      <hr></hr>
    </div>
  );
}
