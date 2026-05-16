import Head from "next/head";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/home/HeroSection";
import HowItWorks from "@/components/home/HowItWorks";
import Testimonials from "@/components/home/Testimonials";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Head>
        <title>Webhomes | We Buy Homes All Over The USA</title>
      </Head>
      <Navbar />
      <HeroSection />
      <HowItWorks />
      <Testimonials />
      <Footer />
    </>
  );
}
