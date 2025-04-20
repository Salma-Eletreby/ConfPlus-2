import fs from "fs-extra";
import path from "path";
import { getPaperById, papersRepo } from "./papers-repo";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import { readJSON } from "../utils";

const filePath = "data/schedule.json";

/* export async function getSchedule(date) {
  let schedule = await readJSON(filePath);

  if (date) {
    schedule = schedule.filter((s) => s.date == date);
  }

  // Get the paper for each presentation in the schedule
  const scheduleWithPaperDetails = [];
  for await (const session of schedule) {
    //for (let i = 0; i < schedule.size; i++) {
    const presentations = [];
    for await (const presentation of session.presentations) {
      const paper = await getPaperById(presentation.paperId);
      //const { title, authors } = await getPaperById(presentation.paperId);
      presentation.title = paper.title;
      const presenter = paper.authors.find((a) => a.isPresenter);
      presentation.presenter = `${presenter.firstName}  ${presenter.lastName}`;
      presentation.authors = paper.authors;
      presentations.push(presentation);
    }
    session.presentations = presentations;
    scheduleWithPaperDetails.push(session);
  }
  return scheduleWithPaperDetails;
} */

class SchedRepo {
  constructor() {
    this.filePath = path.join(process.cwd(), "data/schedule.json");
  }

  async getConfDates() {
    try {
      const dates = await prisma.confDate.findMany();
      return dates;
    } catch (error) {
      console.log(error);
      return { error: error.message };
    }
  }

  async getLocations() {
    try {
      const Locations = await prisma.Location.findMany();
      return Locations;
    } catch (error) {
      console.log(error);
      return { error: error.message };
    }
  }

  async getSession(id) {
    console.log("getPaperById called");
    const Session = await prisma.Schedule.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (id) return Session;
    else return { errorMessage: "paper does not exit" };
  }
  async getSchedule(date) {
    try {
      if (!date || date === "All") {
        const allSchedule = await prisma.session.findMany({
          include: {
            presentations: true,
            date: {
              select: {
                date: true,
              },
            },
            location: {
              select: {
                location: true,
              },
            },
          },
        });
        //  console.log(JSON.stringify(allSchedule,null,2))
        return allSchedule;
      } else {
        date = this.getDates(date);
        const specificSchedule = await prisma.session.findMany({
          include: {
            presentations: true,
            date: {
              select: {
                date: true,
              },
            },
            location: {
              select: {
                location: true,
              },
            },
          },
          where: {
            dateId: date.id,
          },
        });
        console.log(JSON.stringify(specificSchedule, null, 2));
        return specificSchedule;
      }
    } catch (error) {
      console.error("Error retrieving schedule:", error);
      throw error;
    }
  }

  async getConfDates() {
    try {
      const dates = await prisma.confDate.findMany({
        select: {
          date: true,
        },
      });
      //return dates
      return dates;
    } catch (error) {
      console.log(error);
      return { error: error.message };
    }
  }
  async getDates(date) {
    try {
      const dates = await prisma.confDate.find({
        where: {
          date: date,
        },
      });
      //return dates
      return dates;
    } catch (error) {
      console.log(error);
      return { error: error.message };
    }
  }

  /*  async getSchedule() {
    const sched = await fs.readJSON(this.filePath);
    return sched;
  }
 */
  async addSession(session) {
    try {
      const newSession = await prisma.session.create({
        data: session,
      });
      return newSession;
    } catch (error) {
      return { error: error.message };
    }
  }
  async addPresentation(sessID, presentation) {
    const addedPresentation = await prisma.presentation.create({
      where: { sessID },
      data: presentation,
    });
    return addPresentation;
  }

  async updatePresentation(sessID, presentation) {
    const updatedPresentation = await prisma.presentation.update({
      where: { sessID },
      data: presentation,
    });

    if (updatedPresentation) return "updated successfully";

    return "Unable to update account because it does not exist";
  }

  async deleteSession(id) {
    try {
      const count = await prisma.session.delete({
        where: {
          id: parseInt(id),
        },
      });
      return "deleted successfully";
    } catch (err) {
      console.log(err);
      return "Unable to delete session because it does not exist";
    }
  }

  async deletePresentation(id) {
    try {
      const count = await prisma.presentation.delete({
        where: {
          paperId: parseInt(id),
        },
      });
      return "deleted successfully";
    } catch (err) {
      console.log(err);
      return "Unable to delete presentation because it does not exist";
    }
  }

  async deleteSchedule() {
    try {
      await prisma.schedule.deleteMany();
      return `all records have been deleted`;
    } catch (error) {
      return { error: error.message };
    }
  }

  async numSessions() {
    const numSessions = await prisma.schedule.count();
    return numSessions;
  }
  async presentationPerSession() {
    const totalPresentations = await prisma.presentation.count();
    const totalSessions = await prisma.session.count();
    const averageCount = totalPresentations / totalSessions;
    return averageCount;
  }
}

export const schedRepo = new SchedRepo();
//schedRepo.getSchedule();
//schedRepo.getLocations();
schedRepo.getConfDates();
console.log("hello");
