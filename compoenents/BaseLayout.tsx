import Head from "next/head";
import ExampleNav from "./Nav";
import styles from "../styles/Home.module.css";
import { Container } from "reactstrap";

const BaseLayout = props => (
  <div>
    <Head>
      <title>Sample Project</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main>
      <ExampleNav />
      <Container>
        <h1>Search GitHub</h1>

        {props.children}
      </Container>
    </main>

    <footer className={styles.footer}>
      <a
        href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
        target="_blank"
        rel="noopener noreferrer"
      >
        Powered by{" "}
        <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
      </a>
    </footer>
  </div>
);

export default BaseLayout;
