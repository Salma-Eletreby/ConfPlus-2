import React from 'react'
import {FaClock} from 'react-icons/fa'
import styles from "../page.module.css"
import '../../globals.css'

export default function Presentation({presentation}) {
  return (
    <div className={[styles.presentation_card, "card",styles.card].join(" ")}>
            <div className={styles.title_button}>
              <h4>{presentation.title}</h4>
            </div>
            <p> <FaClock></FaClock> {presentation.startTime} - {presentation.endTime}</p>
            <p className={styles.presenter}>Presenter: {presentation.presenter}</p>
    </div>
  )
}
