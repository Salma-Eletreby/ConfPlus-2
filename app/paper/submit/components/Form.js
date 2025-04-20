"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "../page.module.css";
import "../../../globals.css";
import PaperDetails from "./PaperDetails";
import AutherInput from "./AuthorInput";
import AuthorInput from "./AuthorInput";
import { submitPaper } from "../../../actions/paper";

export default function Form() {
  const [authorCount, setCount] = useState(1);
  const [shouldSubmit, setShouldSubmit] = useState(false);
  let authors = [];

  const addAuthor = () => {
    setCount(authorCount + 1);
  };

  const removeAuthor = () => {
    setCount(authorCount - 1);
  };

  function getAuthorData(name, value, index) {
    const existing = authors.findIndex((a) => a.id === index);

    if (existing >= 0) {
      authors[existing][name] = value;
    } else {
      const a = { id: index };
      a[name] = value;
      authors.push(a);
    }
  }

  return (
    <main className={[styles.formsMain, styles.main, "main"].join(" ")}>
      {shouldSubmit == true ? (
        <p>Paper Successfully submitted</p>
      ) : (
        <form
          id="submitPaperForm"
          action={async (formData) => {
            await submitPaper(formData, authors);

            setShouldSubmit(true)
          }}
        >
          <fieldset className={styles.fieldset}>
            <PaperDetails></PaperDetails>
            <br />
            <label htmlFor="authors">Author(s):</label>
            <div className={styles.authorsList} id="authorsList">
              {Array.from({ length: authorCount }, (_, index) => index + 1).map((iterator) => (
                <AuthorInput key={iterator} iterator={iterator} getAuthorData={getAuthorData} />
              ))}
            </div>
            <div className={styles.authorBtns}>
              <button type="button" className={[styles.button, "button"].join(" ")} onClick={addAuthor}>
                +
              </button>
              <button type="button" className={[styles.button, "button"].join(" ")} onClick={removeAuthor}>
                -
              </button>
            </div>
          </fieldset>

          <fieldset className={styles.fieldset}>
            <label htmlFor="paperPDF">Upload your paper as PDF:</label>
            <input type="file" name="paperPDF" id="paperPDF" />
          </fieldset>
          <input type="submit" value="Submit" className={[styles.button, "button"].join(" ")} />
        </form>
      )}
    </main>
  );
}
