import "../globals.css"
import * as repo from "../actions/report"
export default async function Home() {
    //placeholders will be replaced once prisma is created
    const submittedPapers = await repo.getSubmittedPpers();
    const acceptedPapers =  await repo.getAcceptedPapers();
    const rejectedPapers =  await repo.getRejectedPapers();
    const avgAuthors =  await repo.getAvgAuthorPerPaper();
    const numSessions =  await repo.getNoSessions();
    const avgPresentations = await repo.presentationPerSession();

    return(
        <>
            <h3 className="title">Conference Statistics Report</h3>

            <label htmlFor="submit">Submitted Papers: </label>
            <input name="submit" value={submittedPapers}></input>
            <br></br>
            <br></br>
            <label htmlFor="accept">Accepted Papers: </label>
            <input name="accept" value={acceptedPapers}></input>
            <br></br>
            <br></br>
            <label htmlFor="reject">Rejected Papers: </label>
            <input name="reject" value={rejectedPapers}></input>
            <br></br>
            <br></br>
            <label htmlFor="author">Average Number of Authors per paper: </label>
            <input name="author" value={avgAuthors}></input>
            <br></br>
            <br></br>
            <label htmlFor="session">Number of conference sessions: </label>
            <input name="session" value={numSessions}></input>
            <br></br>
            <br></br>
            <label htmlFor="presentation">Average number of Pesentations per session: </label>
            <input name="presentation" value={avgPresentations}></input>
            <br></br>
            <br></br>
        </>
    )
}