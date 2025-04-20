import React from "react";
import styles from "../review/page.module.css";
import AuthorCard from "./AuthorCard";
import "../../globals.css";

export default function PaperDetails({paper}) {
  return (
    <div className={styles.paperInfo}>
    <div className={styles.resetStyle}>
      <h4 className="title">Paper Information</h4>
      <hr></hr>
    </div>
    <p id="title">
      Title: &#8205; <span className={styles.title}>{paper.title}</span>{" "}
    </p>
    <p id="paperAuthor">Author(s): </p>
    <div className={styles.authorsList}>
      {paper.authors.map((author) => (
        <AuthorCard author={author} key={author.id}></AuthorCard>
      ))}
    </div>
    <div className={styles.collapsableAbstract}>
      <p id="paperAbstract" >
        Abstract: &#8205; &#8205; &#8205; {paper.abstract}
      </p>
    </div>
    <a href={paper.paperURL} target="_blank" className={[styles.button, "button"].join(' ')}>
      View PDF
    </a>
  </div>
  )
}
