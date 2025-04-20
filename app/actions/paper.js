"use server";

import { papersRepo } from "../api/repos/papers-repo";
import { revalidatePath } from "next/cache";

export const getPaperByReviewer = async (id) => {
  const data = await papersRepo.getPaperByReviewer(id);
  return data;
};

export const getPaperById = async (id) => {
  const data = await papersRepo.getPaperById(id);
  return data;
};

export const getAcceptedPapers = async () => {
  const data = await papersRepo.getAcceptedPapers();
  return data;
};

export const getPresentation = async (id) => {
  if(id == "paper")
    return ;
  else{
    const data = await papersRepo.getPresentation(id);
    return data;
  }
};

export const SubmitReview = async (formData, userId, paperId) => {
  const data = {};
  data.userID = userId;

  for (const [key, value] of formData) {
    data[key] = value;
  }

  const isNew = await papersRepo.getReviewofUser(paperId, userId);
  if (isNew != undefined) {
    await papersRepo.updateReview(paperId, data);
  } else {
    await papersRepo.addReview(paperId, data);
  }
};
export async function submitPaper(formData , authors) {
  // const authors = [a]
  const {title, abstract, paperPDF} = Object.fromEntries(formData.entries())
  const paperURL = paperPDF.name
  const paper = {title, abstract, paperURL, authors}
  console.log(paper);
  await papersRepo.addPaper(paper)
}
