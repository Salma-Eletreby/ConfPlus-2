import fs from "fs-extra";
import path from "path";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { accountsRepo } from "./users-repo";
import { readJSON } from "../utils";

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
    const papers = await fs.readJSON(this.filePath);
    return papers;
  }

  async getPaperByReviewer(reviewerID){
    const papers = await fs.readJSON(this.filePath);

    const filteredPapers = papers.filter((p) =>
      p.reviewers.some((r) => r == reviewerID)
    );
    return filteredPapers;
  }

  async getPaperById(id) {
    const papers = await this.getPapers();
    return papers.find((a) => a.id == id);
  }

  async getPresentation(paperId){
    const presentation={};

    const paper = await this.getPaperById(paperId);
    presentation.title = paper.title;
    const presenter = paper.authors.find((a) => a.isPresenter);
    presentation.presenter = `${presenter.firstName}  ${presenter.lastName}`;
    presentation.authors = paper.authors;

    return presentation
  }

  async getAcceptedPapers() {
    const papers = await this.getPapers();
    return papers.filter((p) => {
      const sum = this.getSumOverallEvaluation(p);
      return sum != null && sum >= 2;
    });
  }

  getSumOverallEvaluation(paper) {
    return paper.reviews.reduce((sum, review) => sum + review.overallRating, 0);
  }

  async getReviews(paperId) {
    const paper = await this.getPaperById(paperId);
    return paper.reviews;
  }

  async getReviewofUser(paperId,userId){
    const reviews = await this.getReviews(paperId)
    const belong = reviews.find(r => r.userID == userId)
    return belong
  }
  async addReview(paperId, review) {
    const paper = await this.getPaperById(paperId);
    paper.reviews.push(review);
    await this.updatePaper(paper);
  }

  async updateReview(paperId, review) {
    const paper = await this.getPaperById(paperId);
    const index = paper.reviews.findIndex((r) => r.userID == review.userID);
    paper.reviews[index] = review;
    await this.updatePaper(paper);
  }

  async addPaper(paper) {
    const papers = await this.getPapers();
    paper.id = Math.floor(Math.random() * 150);
    paper.reviewers = await accountsRepo.getRandomReviewersID(); //assign paper to random reviewers
    paper.isPresented = false;
    paper.reviews = [];
    papers.push(paper);
    await fs.writeJSON(this.filePath, papers);
  }
  async togglePresented(id) {
    const paper = await this.getPaperById(id);
    paper.isPresented = !paper.isPresented;
    await this.updatePaper(paper);
    return paper.isPresented;
  }

  async updatePaper(paper) {
    const papers = await this.getPapers();
    const index = papers.findIndex((a) => a.id == paper.id);
    papers[index] = paper;
    await fs.writeFile(this.filePath, JSON.stringify(papers, null, 2));
    return paper;
  }
}

export const papersRepo = new PapersRepo();

