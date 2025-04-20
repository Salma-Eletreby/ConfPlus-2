import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
class AccountsRepo {
  constructor() {}
  async getAccounts() {
    try {
      const Users = await prisma.user.findMany();

      return Users;
    } catch (error) {
      console.log(error);
      return { error: error.message };
    }
  }

  async getAccountById(id) {
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    console.log(user);
    return user;
  }

  async getAccountByEmail(email) {
    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    console.log(user);
    return user;
  }
  async getAccountsOfRole(role) {
    const users = await prisma.user.findMany({
      where: {
        role: role,
      },
    });

    return users;
  }

  async getRandomReviewersID() {
    const reviewers = await this.getAccountsOfRole("reviewer");
    const randomReviewers = [];
    for (let i = 0; i < 2; i++) {
      const index = Math.floor(Math.random() * reviewers.length);
      randomReviewers.push(reviewers[index].id);
      reviewers.splice(index, 1);
    }

    return randomReviewers;
  }
  async getUser(email, password) {
    try {
      const user = await this.getAccountByEmail(email);

      if (!user) return { error: "User does not exist" };

      if (password != user.password) return { error: "Password is incorrect" };
      console.log("Inside get User");
      console.log(user);
      delete user.password;
      return user;
    } catch (error) {
      return { error: error.message };
    }
  }
}
export const accountsRepo = new AccountsRepo();
