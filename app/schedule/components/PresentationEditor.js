"use client"

import React, { useState } from 'react'
import {FaClock} from 'react-icons/fa'
import styles from "../page.module.css"
import '../../globals.css'
import { getPresentation } from '@/app/actions/paper'

export default function PresentationEditor({initialpresentation ,index,papers, onDelete, getPresentationData, sessionId}) {
  const [presentation, setPresentation] = useState({...initialpresentation})

  async function handlePaperChange(event){
    const newPres = await getPresentation(event.target.value)
    getPresentationData(event.target.name, sessionId, event.target.value, index)
    newPres.startTime = presentation.startTime
    newPres.endTime = presentation.endTime
    setPresentation(newPres)
  }

  return (
    <div className={[styles.presentation_card, "card",styles.card].join(" ")} name="presentationCard">
            <div className={styles.title_button}>
              <h4>Paper title</h4>
              <select name="paperId" id="paper" onChange={(event) => handlePaperChange(event)} required defaultValue={presentation.paperId}>
              {papers.map((paper, id) => (
                <option value={paper.id} key={id}>
                  {paper.title}
                </option>
              ))}
            </select>
            </div>
            <p> <FaClock></FaClock> Start Time - End Time</p>
            <input type="time" defaultValue= {presentation.startTime} required name="startTime" onBlur={(event) => getPresentationData(event.target.name, sessionId, event.target.value, index)}/> -
            <input type="time" defaultValue= {presentation.endTime} required name="endTime" onBlur={(event) => getPresentationData(event.target.name, sessionId, event.target.value, index)}/>
            <label htmlFor='presenter'>Presenter: </label>
            <input type="text" value =  {presentation.presenter} className={styles.presenter} name="presenter"/>
            <button type="button" className={["button",styles.add_btn, styles.button].join(' ')} onClick={() => onDelete(index)} >Delete Presentation</button>
    </div>
  )
}
