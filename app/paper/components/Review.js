import React, { useRef } from "react";
import styles from "../review/page.module.css";
import AuthorCard from "./AuthorCard";
import "../../globals.css";
import { FaAngleDown } from "react-icons/fa";
import { SubmitReview } from "@/app/actions/paper";

export default function Review({userId,paperId}) {
  const formRef = useRef()
  return (
    <form id="reviewForm" className={styles.form} action={async (formData) => {
      await SubmitReview(formData, userId,paperId)
      formRef.current.reset()
  }}ref={formRef}>
      <h4 className="title">Paper Review</h4>
      <hr></hr>
      <fieldset className={styles.fieldset}>
        <div>
          <label htmlFor="overallRating">1- Please evaluate the research paper according to these choices:</label>
          <br></br>
          <input type="radio" id="stronglyAccept" name="overallRating" defaultValue={2} required />
          <label htmlFor="stronglyAccept">Strongly accept</label>
          <br />
          <input type="radio" id="accept" name="overallRating" defaultValue={1} />
          <label htmlFor="accpet">Accept</label>
          <br />
          <input type="radio" id="borderline" name="overallRating" defaultValue={0} />
          <label htmlFor="borderline">Borderline</label>
          <br />
          <input type="radio" id="reject" name="overallRating" defaultValue={-1} />
          <label htmlFor="reject">Reject</label>
          <br />
          <input type="radio" id="stronglyreject" name="overallRating" defaultValue={-2} />
          <label htmlFor="stronglyReject">Strongly reject</label>
          <br />
        </div>
        <br></br>
        <div>
          <label htmlFor="contribution">2- How was the paper contribution?</label>
          <br></br>
          <input type="radio" id="major&sig" name="contribution" defaultValue={5} required />
          <label htmlFor="major&sig">A major and significant contribution</label>
          <br />
          <input type="radio" id="clear" name="contribution" defaultValue={4} />
          <label htmlFor="clear">A clear contribution</label>
          <br />
          <input type="radio" id="minor" name="contribution" defaultValue={3} />
          <label htmlFor="minor">A minor contribution</label>
          <br />
          <input type="radio" id="noObv1" name="contribution" defaultValue={2} />
          <label htmlFor="noObv1">No obvious contribution</label>
          <br />
          <input type="radio" id="noObv2" name="contribution" defaultValue={1} />
          <label htmlFor="noObv2">No contribution at all</label>
          <br />
        </div>
        <br></br>
        <div className={styles.textarea}>
          <label htmlFor="strength">Paper Strengths: </label>
          <textarea id="strength" name="strength" className={styles.textinput} required></textarea>
        </div>
        <br></br>
        <div className={styles.textarea}>
          <label htmlFor="weakness">Paper Weakness: </label>
          <textarea id="weakness" name="weakness" className={styles.textinput} required></textarea>
        </div>
      </fieldset>
      <input type="submit" value="Submit" className={[styles.button, "button"].join(" ")}></input>
    </form>
  );
}
