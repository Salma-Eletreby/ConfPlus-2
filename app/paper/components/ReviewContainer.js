"use client"

import React, { useState } from 'react'
import styles from "../review/page.module.css"
import ReviewForm from "./ReviewForm"
import { getPaperById } from '@/app/actions/paper'

export default function ReviewContainer({papers, userId}) {
  const [paper, setPaper] = useState(papers[0])
  const handlePaperChange = async (e) => setPaper(await getPaperById(e.target.value));
  
  return (
    <>
    <header>
        <h1>Review Research Paper</h1>
      </header>
      <main className={[styles.reviewMain, styles.formsMain, styles.main].join(' ')}>
        <div className={styles.paperInfo}>
          <label htmlFor="researchPaper">Please select a Research paper to review:</label>
          <select name="paperId" id="researchPapers" required onChange={handlePaperChange}>
            {papers.map((p) => (<option value={p.id} key={p.id}>{p.title}</option>))}
          </select>
        </div>

        <div id="variablePaperArea" className={[styles.resetStyle, styles.paperReviewCont].join(' ')}>
          <ReviewForm paper={paper} userId={userId}></ReviewForm>
        </div>
      </main>
    </>
  )
}
