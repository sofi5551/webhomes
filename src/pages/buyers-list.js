import Head from "next/head";
import Navbar from "@/components/Navbar";
import BuyersListHero from "@/components/buyers-list/BuyersListHero";
import BuyersListForm from "@/components/buyers-list/BuyersListForm";
import Testimonials from "@/components/home/Testimonials";
import Footer from "@/components/Footer";

export default function BuyersList() {
  return (
    <>
      <Head>
        <title>Join Our Buyers List | Webhomes</title>
      </Head>
      <Navbar />
      <BuyersListHero />
      <BuyersListForm />
      <Testimonials bgColor="#F0F0F0" cardBg="#ffffff" />
      <Footer />
    </>
  );
}
