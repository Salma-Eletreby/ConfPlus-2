import React from "react";
import Form from "../components/Form";
import { getSchedule, getDates, getLocations } from "../../actions/schedule";
import { getAcceptedPapers } from "@/app/actions/paper";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { accountsRepo } from "../../api/repos/users-repo";
export default async function page() {
  const initialSchedule = await getSchedule();
  const dates = await getDates();
  const initialLocation = await getLocations();
  const papers = await getAcceptedPapers();
  const session = await getServerSession(authOptions);

  const user = await accountsRepo.getAccountByEmail(session.user.email);
  if (user) {
    if (user.role == "organizer") {
      return (
        <>
          <Form
            initialSchedule={initialSchedule}
            initalDates={dates}
            locations={initialLocation}
            papers={papers}
          ></Form>
        </>
      );
    } else {
      return (
        <>
          <p>Must be a organizer to modify schedule</p>
        </>
      );
    }
  } else {
    return (
      <>
        <p>Must be a organizer to modify schedule</p>
      </>
    );
  }
  // return (
  //   <>
  //     <Form
  //       initialSchedule={initialSchedule}
  //       initalDates={dates}
  //       locations={initialLocation}
  //       papers={papers}
  //     ></Form>
  //   </>
  // )
}
