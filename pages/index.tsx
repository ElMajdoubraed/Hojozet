import { Container } from "@material-ui/core";
import Head from "next/head";
import {
  FaqHome,
  HowHome,
  MainHome,
  StartNowHome,
  UseCaseHome,
  WhyHome,
} from "@/components/home";

export default function Home() {
  return (
    <>
      <Head>
        <title>حجوزات</title>
        <meta name="description" content="حجوزات" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <section id="main-section">
          <MainHome />
        </section>
        <section id="how-section">
          <HowHome />
        </section>
        <section id="usecase-section">
          <UseCaseHome />
        </section>
        <section id="why-section">
          <WhyHome />
        </section>
        <section id="faq-section">
          <FaqHome />
        </section>
        <section id="start-section">
          <StartNowHome />
        </section>
      </Container>
    </>
  );
}
