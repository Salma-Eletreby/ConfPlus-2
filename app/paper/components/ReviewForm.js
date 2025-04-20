import React from "react";
import styles from "../review/page.module.css";
import AuthorCard from "./AuthorCard";
import "../../globals.css";
import { FaAngleDown } from "react-icons/fa";
import PaperDetails from "./PaperDetails"
import Review from "./Review"

export default function ReviewForm({ paper, userId }) {
  return (
    <>
        <PaperDetails paper={paper}></PaperDetails>
        <Review userId={userId} paperId={paper.id}></Review>
    </>
  );
}
