import React from "react";
import "../../globals.css";
import Form from "./components/Form";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { accountsRepo } from "../../api/repos/users-repo";
export default async function Home() {
  //for checking the user - temporarily disabled for testing
  const session = await getServerSession(authOptions);

  const user = await accountsRepo.getAccountByEmail(session.user.email);
  if (user) {
    if (user.role == "author") {
      return (
        <>
          <header>
            <h1 className="title">Submit a Paper</h1>
          </header>
          <Form></Form>
        </>
      );
    }else{
      return (
        <>
          <p>Must be a author to submit paper</p>
        </>
      );
    }
  } else if (session.user.name&&session&&!user) {
    return (
      <>
        <header>
          <h1 className="title">Submit a Paper</h1>
        </header>
        <Form></Form>
      </>
    );
  } else {
    return (
      <>
        <p>Must be a author to submit paper</p>
      </>
    );
  }
  // return (
  //   <>
  //     <header>
  //       <h1 className="title">Submit a Paper</h1>
  //     </header>
  //     <Form></Form>
  //   </>
  // );
}
