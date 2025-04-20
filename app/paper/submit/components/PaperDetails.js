import React from "react";
import styles from "../page.module.css"
import "../../../globals.css"

export default function PaperDetails() {
  return (
    <>
      <label htmlFor="title">Paper title:</label>
      <input type="text" placeholder="Enter the paper title" id="title" name="title" className={styles.textinput} required />
      <br />
      <div className={styles.textarea}>
        <label htmlFor="abstract">Abstract:</label>
        <textarea name="abstract" id="abstract" cols="10" rows="5" className={styles.textinput} required></textarea>
      </div>
    </>
  );
}
