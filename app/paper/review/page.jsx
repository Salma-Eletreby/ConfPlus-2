import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import ReviewContainer from "../components/ReviewContainer";
import { getPaperByReviewer } from "../../actions/paper";
import { accountsRepo } from "../../api/repos/users-repo";
import styles from "./page.module.css";
export default async function Page() {
  const session = await getServerSession(authOptions);

  const user = await accountsRepo.getAccountByEmail(session.user.email);
  if (user) {
    const papers = await getPaperByReviewer(user.id);
    if (user.role == "reviewer") {
      return (
        <main className={styles.main}>
          <ReviewContainer papers={papers} userId={user.id} />
        </main>
      );
    }else{
      return (
        <main className={styles.main}>
          <p>Must be a reviewer to review paper</p>
        </main>
      );
    }
  } else {
    return (
      <main className={styles.main}>
        <p>Must be a reviewer to review paper</p>
      </main>
    );
  }
}
