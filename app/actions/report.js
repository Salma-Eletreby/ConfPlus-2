"use server";

import { papersRepo } from "../api/primsa-repos/papers-repo";


export const getAcceptedPapers = async () => {
  const data = await papersRepo.getAcceptedPapers();
  return data;
};
export const getSubmittedPpers = async () => {
    const data = await papersRepo.getSubmittedPpers();
    return data;
  };
  
  export const getRejectedPapers = async () => {
    const data = await papersRepo.getRejectedPapers();
    return data;
  };
  
  export const getAvgAuthorPerPaper = async () => {
    const data = await papersRepo.getAvgAuthorPerPaper();
    return data;
  };
  export const getNoSessions = async () => {
    const data = await papersRepo.getNoSessions();
    return data;
  };
  export const presentationPerSession = async () => {
    const data = await papersRepo.presentationPerSession();
    return data;
  };
  
  
