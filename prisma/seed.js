
import { PrismaClient } from "@prisma/client";
import path from "path";
import { promises as fs } from "fs";

const prisma = new PrismaClient();

const papersPath = path.join(process.cwd(), "./data/papers.json");
const schedulePath = path.join(process.cwd(), "./data/schedule.json");
const confdatesPath = path.join(process.cwd(), "./data/conf-dates.json");
const institutionsPath = path.join(process.cwd(), "./data/institutions.json");
const locationsPath = path.join(process.cwd(), "./data/locations.json");
const usersPath = path.join(process.cwd(), "./data/users.json");

async function main() {
  try {
    const papers = JSON.parse(await fs.readFile(papersPath, "utf8"));
    const session = JSON.parse(await fs.readFile(schedulePath, "utf8"));
    const confdates = JSON.parse(await fs.readFile(confdatesPath, "utf8"));
    const institutions = JSON.parse(await fs.readFile(institutionsPath, "utf8"));
    const locations = JSON.parse(await fs.readFile(locationsPath, "utf8"));
    const users = JSON.parse(await fs.readFile(usersPath, "utf8"));


    for (const date of confdates) {
      await prisma.confDate.create({
        data: {
          date: date,
        },
      });
    }


    for (const institution of institutions) {
      await prisma.institution.create({
        data: {
          institution: institution,
        },
      });
    }


    for (const location of locations) {
      await prisma.location.create({
        data: {
          location: location,
        },
      });
    }







    for (const entry of session) {
      const createdConfDate = await prisma.confDate.findUnique({
        where: { id: entry.id },
      });
    
      const createdLocation = await prisma.location.findUnique({
        where: { id: entry.id },
      });
    
      const createdSchedule = await prisma.schedule.create({
        data: {
          scheduleId: 1,
          sessions: {
            create: [
              {
                title: entry.title,
                date: {
                  connect: {
                    id: createdConfDate.id,
                  },
                },
                location: {
                  connect: {
                    id: createdLocation.id,
                  },
                },
              },
            ],
          },
        },
        include: {
          sessions: true,
        },
      });
    
      const createdSessions = createdSchedule.sessions;
    
      for (const presentation of entry.presentations) {
        await prisma.presentation.create({
          data: {
            startTime: presentation.startTime,
            endTime: presentation.endTime,
            paperId: presentation.paperId,
            session: {
              connect: {
                id: createdSessions[0].id, 
              },
            },
          },
        });
      }
    }
    
    for (const user of users) {
      await prisma.user.create({
        data: {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role,
          password:user.password,
        },
      });
    }











    for (const paper of papers) {
      const authors = [];

      const reviewerIds = paper.reviewers;
      const createdPaper = await prisma.paper.create({
        data: {
          title: paper.title,
          abstract: paper.abstract,
          paperUrl: paper.paperURL,
          isPresented: paper.isPresented,
        },
      });

      for (const author of paper.authors) {
        const institution = await prisma.institution.findFirst({
          where: {
            institution: author.affiliation,
          },
        });
      
        if (institution) {
          const createdAuthor = await prisma.author.create({
            data: {
              firstName: author.firstName,
              lastName: author.lastName,
              email: author.email,
              affiliation: {
                connect: {
                  id: institution.id,
                },
              },
              isPresenter: author.isPresenter,
              paper: {
                connect: { id: createdPaper.id },
              },
            },
          });
      
          authors.push(createdAuthor);
        } else {
          console.log("Institution '${author.affiliation}' not found");
        }
      }

      const reviewerEmails = new Set(users.filter(user => user.role === "reviewer").map(user => user.email));

    
      const existingReviewers = await prisma.reviewer.findMany({
        where: {
          email: {
            in: Array.from(reviewerEmails)
          }
        }
      });
      existingReviewers.forEach(reviewer => reviewerEmails.delete(reviewer.email));
      
      
      for (const email of reviewerEmails) {
        const user = users.find(user => user.email === email);
        await prisma.reviewer.create({
          data: {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
         
          },
        });
      }

//console.log(reviewerIds)
      if (reviewerIds.length !== 2) {
        console.log('Expected 2 reviewers for each paper');
        continue; 
      }
      
  
      await prisma.paper.update({
        where: { id: createdPaper.id },
        data: {
          reviewers: {
            connect: reviewerIds.map((reviewerId) => ({ id: reviewerId })),
          },
        },
      })














     for (const review of paper.reviews) {
  await prisma.review.create({
    data: {
      reviewerId: review.userID,
      overallRating: parseInt(review.overallRating),
contribution: parseInt(review.contribution),
      weakness: review.weakness,
      strength: review.strength,
      paperId: createdPaper.id,
      paper: {
        connect: {
          id: createdPaper.id,
        },
      }, 
      reviewers: {
        connect: {
          id: review.userID,
        },
      }, 
    },
  });
}
} 

}catch (error) {
console.error(error);
} finally {
await prisma.$disconnect();
}}


await main();
