import React from "react";
import styles from "./page.module.css"
import SignInOut from "./SignInOut";
import Link from "next/link";

export default function NavBar() {
  return (
    <nav>
      <img src="../images/logo.png" alt="" />
      <ul>
        <li>
          <Link href="/" className={styles.link}>
            Home
          </Link>
        </li>
        <li>
          <Link href="./schedule/view" className={styles.link}>
            Schedule
          </Link>
        </li>
        <li>
          <Link href="./report" className={styles.link}>
            Report
          </Link>
        </li>
        <li>
          <SignInOut></SignInOut>
        </li>
      </ul>
    </nav>
  );
}
