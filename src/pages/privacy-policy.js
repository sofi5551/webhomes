import Head from "next/head";
import { useRef, useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import PolicyHero from "@/components/policy/PolicyHero";
import Footer from "@/components/Footer";

const h2Style = {
  color: "#183961",
  fontWeight: "700",
  fontSize: "clamp(18px, 2vw, 24px)",
  margin: "0 0 12px",
};

const pStyle = {
  color: "#444",
  fontSize: "clamp(13px, 1.1vw, 16px)",
  lineHeight: 1.8,
  margin: "0 0 20px",
};

const liStyle = {
  color: "#5aa6d1",
  fontSize: "clamp(13px, 1.1vw, 16px)",
  lineHeight: 1.8,
  marginBottom: "6px",
};

const liTextStyle = { color: "#444" };

function Fade({ children, style }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); observer.disconnect(); }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: "opacity 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export default function PrivacyPolicy() {
  return (
    <>
      <Head>
        <title>Privacy Policy | Webhomes</title>
      </Head>
      <Navbar />
      <PolicyHero title="Privacy Policy" />

      <section style={{ backgroundColor: "#ffffff", padding: "clamp(40px, 6vw, 80px) clamp(20px, 6.5vw, 80px)" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>

          <Fade>
            <p style={pStyle}>
              This Privacy Policy ("Policy") outlines the privacy practices of <strong>Webhomes LLC</strong> ("we," "us," or "our") and explains how we collect, use, and disclose personal information when you interact with our website and services. By checking the box and providing your consent, you expressly agree to the terms of this Policy and authorize us to send SMS messages to the phone number you provide.
            </p>
          </Fade>

          <Fade><h2 style={h2Style}>What Information Do We Collect?</h2></Fade>
          <Fade>
            <p style={pStyle}>
              We collect information from you when you initiate contact with us. We have made it clear, at the time of that contact, whether it comes from filling out a form, requesting information, or submitting property information.
            </p>
          </Fade>
          <Fade>
            <p style={pStyle}>
              We may collect information about your computer, including your IP address, operating system, and browser type using Google Analytics to improve browsing for everyone. This does not identify any individual.
            </p>
          </Fade>
          <Fade>
            <p style={pStyle}>
              When registering on our site, as appropriate, you may be asked to enter your name, e-mail address, mailing address, or phone number. You may, however, visit our site anonymously.
            </p>
          </Fade>

          <Fade><h2 style={h2Style}>Collection of Personal Information</h2></Fade>
          <Fade>
            <p style={pStyle}>
              We collect personal information directly from you or from trusted third-party sources. The types of personal information we may collect include:
            </p>
          </Fade>
          <Fade>
            <ul style={{ paddingLeft: "20px", margin: "0 0 24px" }}>
              {[
                "Contact information (e.g., name, email address, phone number)",
                "Property details (e.g., address, property features)",
                "Financial information (e.g., mortgage details)",
                "Any other information voluntarily provided by you",
              ].map((item) => (
                <li key={item} style={liStyle}>
                  <span style={liTextStyle}>{item}</span>
                </li>
              ))}
            </ul>
          </Fade>

          <Fade><h2 style={h2Style}>Use of Personal Information</h2></Fade>
          <Fade>
            <p style={pStyle}>We use the personal information we collect to:</p>
          </Fade>
          <Fade>
            <ul style={{ paddingLeft: "20px", margin: "0 0 24px" }}>
              {[
                "Process transactions and inquiries",
                "Communicate via email, text, or phone",
                "Respond to inquiries and/or other requests or questions",
                "Improve our website and services",
              ].map((item) => (
                <li key={item} style={liStyle}>
                  <span style={liTextStyle}>{item}</span>
                </li>
              ))}
            </ul>
          </Fade>
          <Fade>
            <p style={pStyle}>
              Your information, whether public or private, will not be sold, exchanged, transferred, or given to any other company for any reason whatsoever, without your consent, other than for the express purpose of delivering the product or service requested.
            </p>
          </Fade>

          <Fade><h2 style={h2Style}>How Do We Protect Your Information?</h2></Fade>
          <Fade>
            <p style={pStyle}>
              We implement a variety of security measures to maintain the safety of your personal information when you enter, submit, or access your personal information.
            </p>
          </Fade>

          <Fade><h2 style={h2Style}>Do We Disclose Any Information to Outside Parties?</h2></Fade>
          <Fade>
            <p style={pStyle}>
              We do not sell, trade, or otherwise transfer to outside parties your personally identifiable information. This does not include trusted third parties who assist us in operating our website, conducting our business, or servicing you, so long as those parties agree to keep this information confidential. We may also release your information when we believe release is appropriate to comply with the law, enforce our site policies, or protect ours or others&apos; rights, property, or safety.
            </p>
          </Fade>

          <Fade><h2 style={h2Style}>Third-Party Links</h2></Fade>
          <Fade>
            <p style={pStyle}>
              At our discretion, we may include or offer third-party products or services on our website. These third-party sites have separate and independent privacy policies. We therefore have no responsibility or liability for the content and activities of these linked sites. Nonetheless, we seek to protect the integrity of our site and welcome any feedback about these sites.
            </p>
          </Fade>

          <Fade><h2 style={h2Style}>Third-Party Services</h2></Fade>
          <Fade>
            <p style={pStyle}>
              In general, the third-party providers used by us will only collect, use, and disclose your information to the extent necessary to allow them to perform the services they provide to us. Certain third-party service providers, such as payment gateways and other payment transaction processors, have their own privacy policies with respect to the information we are required to provide to them for your purchase-related transactions.
            </p>
          </Fade>

          <Fade><h2 style={h2Style}>Remarketing</h2></Fade>
          <Fade>
            <p style={pStyle}>
              Webhomes LLC may use third-party vendor re-marketing tracking cookies, including but not limited to the Google AdWords tracking cookie. This means we will continue to show ads to you across the internet, specifically on the Google Content Network (GCN). We respect your privacy and are not collecting any identifiable information through the use of Google or any other third-party remarketing system.
            </p>
          </Fade>

          <Fade><h2 style={h2Style}>California Online Privacy Protection Act Compliance</h2></Fade>
          <Fade>
            <p style={pStyle}>
              Because we value your privacy, we have taken the necessary precautions to be in compliance with the California Online Privacy Protection Act. We therefore will not distribute your personal information to outside parties without your consent.
            </p>
          </Fade>

          <Fade><h2 style={h2Style}>Children&apos;s Online Privacy Protection Act Compliance</h2></Fade>
          <Fade>
            <p style={pStyle}>
              We are in compliance with the requirements of COPPA (Children&apos;s Online Privacy Protection Act), and we do not collect any information from anyone under 13 years of age. Our website, products, and services are all directed to people who are at least 13 years old or older.
            </p>
          </Fade>

          <Fade><h2 style={h2Style}>Personal, Financial, and Property Information</h2></Fade>
          <Fade>
            <p style={pStyle}>
              Our company is a real estate services firm that may require you to submit certain information so we can help you in your situation. This information may include your contact info, information about your property, or in some cases financial information needed to help us analyze your property and situation. This information is for our use only and will not be shared with outside parties unless required to help us solve your real estate situation.
            </p>
          </Fade>

          <Fade><h2 style={h2Style}>Online Privacy Policy Only</h2></Fade>
          <Fade>
            <p style={pStyle}>
              This online privacy policy applies only to information collected through our website and not to information collected offline.
            </p>
          </Fade>

          <Fade><h2 style={h2Style}>Changes to Our Privacy Policy</h2></Fade>
          <Fade>
            <p style={pStyle}>
              If we decide to change our privacy policy, we will post those changes on this page.
            </p>
          </Fade>

          <Fade><h2 style={h2Style}>Contacting Us</h2></Fade>
          <Fade>
            <p style={{ ...pStyle, margin: 0 }}>
              If you have any questions about these Terms, Policies, or our practices, please contact us at:
            </p>
            <p style={{ ...pStyle, margin: "8px 0 0" }}>
              <strong style={{ color: "#183961" }}>Email:</strong>{" "}
              <a href="mailto:webhomes.support@gmail.com" style={{ color: "#5aa6d1", textDecoration: "none" }}>
                webhomes.support@gmail.com
              </a>
              <br />
              <strong style={{ color: "#183961" }}>Phone:</strong>{" "}
              <a href="tel:3014011947" style={{ color: "#5aa6d1", textDecoration: "none" }}>
                (301) 401-1947
              </a>
            </p>
          </Fade>

        </div>
      </section>

      <Footer />
    </>
  );
}
