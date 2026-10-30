import Head from "next/head";
import Navbar from "@/components/Navbar";
import OfferHero from "@/components/get-my-offer/OfferHero";
import {
  AboutWebHomes,
  BuyingAreas,
  OfferHowItWorks,
  OfferCta,
} from "@/components/get-my-offer/OfferSections";
import Testimonials from "@/components/home/Testimonials";
import Footer from "@/components/Footer";

export default function GetMyOffer() {
  return (
    <>
      <Head>
        <title>Get My Offer | Webhomes</title>
        <meta
          name="description"
          content="Submit your property details to The Web Homes and get a no-obligation offer range. We buy houses as-is in FL, TN, AL, TX, GA, NC, SC and MI."
        />
      </Head>
      <Navbar />
      <OfferHero />
      <AboutWebHomes />
      <BuyingAreas />
      <OfferHowItWorks />
      <OfferCta />
      <Testimonials />
      <Footer />
    </>
  );
}
