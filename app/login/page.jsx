"use client";
import { signIn } from "next-auth/react";
import styles from "./page.module.css";

import { getAccountByEmail } from "../actions/user"
export default function Login(params) {
  async function handleGitHubLogin() {
    const result = await signIn("github", {
      callbackUrl: "http://localhost:3000/paper/submit",
    });
  }
  async function handleSpotifyLogin() {
    signIn("spotify", { callbackUrl: "http://localhost:3000/paper/submit" });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const email = event.currentTarget.email.value;
    const password = event.currentTarget.password.value;
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (result?.error) {
      console.log(result.error);
    } else {
      // Successful login
       const user = await getAccountByEmail(email)

      console.log(user);

      if (user.role === "organizer") {
        window.location.href = "/schedule/modify";
      } else if (user.role === "reviewer") {
        window.location.href = "/paper/review";
      } else if (user.role === "author") {
        window.location.href = "/paper/submit";
      }
    }
  }
  return (
    <div className={styles.container}>
      {/* show error message */}
      <h2 className={styles.loginTitle}>Log in</h2>
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email </label>
          <input
            id="email"
            type="email"
            placeholder="me@example.com"
            name="email"
            required
          />
        </div>

        <div>
          <label htmlFor="password">Password </label>
          <input
            id="password"
            type="password"
            placeholder="password"
            name="password"
            required
          />
        </div>
        <button
          className={[styles.btn, styles.btnHtmlForm].join(" ")}
          type="submit"
          value="Log in"
        >
          Log in
        </button>
        {!params.searchParams.error ? (
          ""
        ) : (
          <div className="text-danger">
            {" "}
            <i className="fa fa fa-arrow-alt-circle-right">
              User Name or Password Is Wrong
            </i>
          </div>
        )}

        <button type="button" onClick={handleGitHubLogin}>
          Sign in with Github
        </button>

        <button type="button" onClick={handleSpotifyLogin}>
          Sign in with Spotify
        </button>
      </form>
    </div>
  );
}
