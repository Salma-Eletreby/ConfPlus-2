import styles from "./page.module.css"

export default function Home() {
  return (
    <>
    <header>
        <h1 className={styles.title}>Welcome to ConfPlus</h1>
        <hr/>
    </header>

    <main>
        <section>
            <p>
                Welcome to ConfPlus! Conference Management App!
                <br />
                We are dedicated to providing a seamless and efficient 
                platform for managing conferences and events. 
                Our app is designed to streamline the entire conference 
                management process, from planning and organizing to registration 
                and attendee engagement.
            </p>
            <p>
                Thank you for choosing our app. We look forward to helping 
                you manage exceptional conferences!
            </p>
        </section>
    </main>
    </>
  );
}
