import Head from "next/head";
import Navbar from "@/components/Navbar";
import AboutHero from "@/components/about/AboutHero";
import AboutContent from "@/components/about/AboutContent";
import OurStory from "@/components/about/OurStory";
import ContactSection from "@/components/about/ContactSection";
import Footer from "@/components/Footer";

export default function AboutUs() {
  return (
    <>
      <Head>
        <title>About Us | Webhomes</title>
      </Head>
      <Navbar />
      <AboutHero />
      <AboutContent />
      <OurStory />
      <ContactSection />
      <Footer />
    </>
  );
}
