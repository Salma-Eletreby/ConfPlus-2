import fs from "fs-extra";
import path from "path";
import { accountsRepo } from "./users-repo";
import { readJSON } from "../utils";
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient();

const filePath = "data/papers.json";
export const getPapers = async () => await readJSON(filePath);

export async function getPaperById(id) {
  const papers = await getPapers();
  return papers.find((p) => p.id == id);
}

class PapersRepo {
  constructor() {
    this.filePath = path.join(process.cwd(), "/data/papers.json");
  }

  async getPapers() {
    try {
      const papers = await prisma.paper.findMany();
      return papers;
    } catch (error) {
      console.log(error);
      return { error: error.message };
    }
  }

  async getPaperByReviewer(reviewerID) {
    const papers = await prisma.paper.findMany({
      where: {
        reviewers: {
          id: reviewerID,
        },
      },
    });

    return papers;
  }
  async getPaperById(id) {
    console.log("getPaperById called");
    const paper = await prisma.paper.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (id) return paper;
    else return { errorMessage: "paper does not exit" };
  }

  async getAcceptedPapers() {
    try {
      const papers = await prisma.paper.count({
        where: {
          reviews: {
            some: {
              overallRating: {
                gt: 1,
              },
            },
          },
        },
      });

      return papers;
    } catch (error) {
      return { error: error.message };
    }
  }
  async getSubmittedPpers() {
    try {
      const submittedPpers = await prisma.paper.count();

      return submittedPpers;
    } catch (error) {
      return { error: error.message };
    }
  }
  async getRejectedPapers() {
    try {
      const rejected =
        (await this.getSubmittedPpers()) - (await this.getAcceptedPapers());

      return rejected;
    } catch (error) {
      return { error: error.message };
    }
  }

  async getAvgAuthorPerPaper() {
    try {
      const totAuthorsForPapers = await prisma.author.count()
    const totalPapers = await prisma.paper.count()
    const averageCount = totAuthorsForPapers / totalPapers;
    console.log(averageCount);
    return averageCount
    } catch (error) {
      return { error: error.message };
    }
  }
  async getNoSessions() {
    try {
      const sessions = await prisma.session.count()
      
      return sessions;
    } catch (error) {
      return { error: error.message };
    }
  }
  async presentationPerSession() {
    const totalPresentations = await prisma.presentation.count()
    const totalSessions = await prisma.session.count()
    const averageCount = totalPresentations / totalSessions;
    console.log(averageCount);
    return averageCount
  }
  async getReviews(paperId) {
    try {
      const reviews = await prisma.review.findMany({
        where: paperId,
      });

      if (!reviews) {
        console.log(`Reviews for paper with id ${paperId} not found`);
      }

      return reviews;
    } catch (error) {
      return { error: error.message };
    }
  }

  async getReviewofUser(paperId, userId) {
    const review = await prisma.review.findFirst({
      where: {
        paperId: paperId,
        reviewerId: userId,
      },
    });

    return review;
  }
  async addReview(review) {
    try {
      const newReview = await prisma.review.create({
        data: review,
      });
      return newReview;
    } catch (error) {
      return { error: error.message };
    }
  }

  async updateReview(review, paperId) {
    const updatedReview = await prisma.review.update({
      where: { paperId },
      data: review,
    });

    if (updatedReview) return "updated successfully";

    return "Unable to update review because it does not exist";
  }

  async addPaper(paper) {
    try {
      const newPaper = await prisma.paper.create({
        data: paper,
      });
      return newPaper;
    } catch (error) {
      return { error: error.message };
    }
  }

  async togglePresented(id) {
    const paper = await this.getPaperById(id);
    const updatedPaper = await prisma.paper.update({
      where: { id: parseInt(id) },
      data: { isPresented: !paper.isPresented },
    });

    return updatedPaper.isPresented;
  }

  async updatePaper(paper, paperId) {
    console.log("updatePaper called", paperId);
    const updatedPaper = await prisma.review.update({
      where: { paperId },
      data: paper,
    });
    return updatedPaper;
  }

 
  async numberAuthorPaper() {
    const numberAuthorPaper = await prisma.author.groupBy({
      where: paperId,
      count: true,
    });
    return numberAuthorPaper;
  }
}

export const papersRepo = new PapersRepo();

//import { getRandomReviewers } from "@/app/api/users/users-repo"
