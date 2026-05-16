import Head from "next/head";
import Navbar from "@/components/Navbar";
import ContactHero from "@/components/contact/ContactHero";
import ContactForm from "@/components/contact/ContactForm";
import Footer from "@/components/Footer";

export default function Contact() {
  return (
    <>
      <Head>
        <title>Contact Us | Webhomes</title>
      </Head>
      <Navbar />
      <ContactHero />
      <ContactForm />
      <Footer />
    </>
  );
}
