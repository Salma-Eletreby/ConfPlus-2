import React from "react";
import styles from "../page.module.css";
import "../../../globals.css";

export default function AuthorInput({iterator,getAuthorData}) {
  return (
    <>
        <div className={[styles.authorCard, styles.card, "card"].join(" ")}>
          <div>
            <label htmlFor="firstName">First name:</label>
            <input type="text" placeholder="Enter the author's first name" id="firstName" name="firstName"  onBlur={(event) => getAuthorData(event.target.id, event.target.value, iterator)} className={styles.textinput} required />
          </div>
          <div>
            <label htmlFor="lanme">Last name:</label>
            <input type="text" placeholder="Enter the author's last name" id="lastName" name="lastName" className={styles.textinput} onBlur={(event) => getAuthorData(event.target.id, event.target.value,iterator)} required />
          </div>
          <div>
            <label htmlFor="email">E-mail: &#8205;</label>
            <input type="email" placeholder="Enter the author's email address" id="email" name="email" className={styles.textinput} onBlur={(event) => getAuthorData(event.target.id, event.target.value,iterator)} required />
          </div>
          <div>
            <label htmlFor="affiliation">Affiliation</label>
            <input type="text" placeholder="Enter organization's name" id="affiliation" name="affiliation" className={styles.textinput} onBlur={(event) => getAuthorData(event.target.id, event.target.value,iterator)} required />
          </div>
        </div>
    </>
  );
}
