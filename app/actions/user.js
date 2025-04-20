'use server'

import { accountsRepo } from "../api/repos/users-repo"
export const getAccountByEmail = async (email) => {
    const data = await accountsRepo.getAccountByEmail(email)
    return data

}