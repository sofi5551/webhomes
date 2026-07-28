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

const h3Style = {
  color: "#183961",
  fontWeight: "700",
  fontSize: "clamp(15px, 1.5vw, 19px)",
  margin: "0 0 10px",
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

const dividerStyle = {
  border: "none",
  borderTop: "2px solid #e8edf3",
  margin: "40px 0",
};

function Fade({ children }) {
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
      }}
    >
      {children}
    </div>
  );
}

export default function TermsConditions() {
  return (
    <>
      <Head>
        <title>Terms &amp; Conditions | Webhomes</title>
      </Head>
      <Navbar />
      <PolicyHero title="Terms & Conditions" />

      <section style={{ backgroundColor: "#ffffff", padding: "clamp(40px, 6vw, 80px) clamp(20px, 6.5vw, 80px)" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>

          {/* ── Terms & Conditions ── */}
          <div id="top">
            <Fade><h2 style={h2Style}>Introduction</h2></Fade>
            <Fade>
              <p style={pStyle}>
                Welcome to <strong>Webhomes LLC</strong> (the "Site"), operated by Webhomes LLC ("we," "us," or "our"). These Terms and Conditions ("Terms") govern your access to and use of the Site and services provided herein. By accessing or using our Site, you agree to be bound by these Terms. If you do not agree with these Terms, please do not use our Site.
              </p>
            </Fade>

            <Fade><h2 style={h2Style}>Acceptance of Terms</h2></Fade>
            <Fade>
              <p style={pStyle}>
                By accessing, browsing, or using this Site, you acknowledge that you have read, understood, and agree to be bound by these Terms, including any modifications made from time to time.
              </p>
            </Fade>

            <Fade><h2 style={h2Style}>Description of Services</h2></Fade>
            <Fade>
              <p style={pStyle}>
                The primary purpose of this Site is lead generation. Our call-to-action (CTA) invites property owners and interested parties to contact us for further information regarding selling their property. All communications, submissions, and inquiries made through this Site are intended solely for this purpose.
              </p>
            </Fade>

            <Fade><h2 style={h2Style}>Communication and Lead Generation</h2></Fade>
            <Fade>
              <ul style={{ paddingLeft: "20px", margin: "0 0 24px" }}>
                {[
                  "Contact Submissions: When you provide your contact information or details about your property, you consent to receive communications from us regarding potential property purchase opportunities and related information.",
                  "No Guarantee: Submitting information through the Site does not guarantee that we will purchase your property or make any offer. Our responses and offers are subject to our review and evaluation process.",
                  "Scope of Use: All communications initiated via the Site are solely for inquiries related to property selling and are not intended for any other purpose.",
                ].map((item) => (
                  <li key={item} style={liStyle}>
                    <span style={liTextStyle}>{item}</span>
                  </li>
                ))}
              </ul>
            </Fade>

            <Fade><h2 style={h2Style}>User Responsibilities</h2></Fade>
            <Fade>
              <ul style={{ paddingLeft: "20px", margin: "0 0 24px" }}>
                {[
                  "You represent and warrant that any information you provide is accurate, complete, and truthful.",
                  "You agree to use the Site only for its intended purpose and in compliance with all applicable laws and regulations.",
                  "You are responsible for maintaining the confidentiality of any account or personal information provided to us.",
                ].map((item) => (
                  <li key={item} style={liStyle}>
                    <span style={liTextStyle}>{item}</span>
                  </li>
                ))}
              </ul>
            </Fade>

            <Fade><h2 style={h2Style}>Intellectual Property</h2></Fade>
            <Fade>
              <p style={pStyle}>
                All content on this Site, including text, graphics, logos, images, and software, is the property of Webhomes LLC or its licensors and is protected by applicable intellectual property laws. You may not reproduce, modify, distribute, or otherwise use any content without our express written consent.
              </p>
            </Fade>

            <Fade><h2 style={h2Style}>Privacy</h2></Fade>
            <Fade>
              <p style={pStyle}>
                Your use of the Site is also governed by our Privacy Policy, which explains how we collect, use, and protect your personal information. By using the Site, you consent to the practices described in the Privacy Policy.
              </p>
            </Fade>

            <Fade><h2 style={h2Style}>Disclaimer of Warranties</h2></Fade>
            <Fade>
              <p style={pStyle}>
                The Site and all information, products, and services provided on or through the Site are provided "as is" without any warranties of any kind, either express or implied. We do not warrant that the Site will be uninterrupted, error-free, or completely secure. Your use of the Site is at your own risk.
              </p>
            </Fade>

            <Fade><h2 style={h2Style}>Limitation of Liability</h2></Fade>
            <Fade>
              <p style={pStyle}>
                To the fullest extent permitted by law, Webhomes LLC, its officers, directors, employees, and agents shall not be liable for any direct, indirect, incidental, consequential, or special damages arising out of or in connection with your use of the Site or any communication made through it. This limitation applies regardless of the cause of action and even if we have been advised of the possibility of such damages.
              </p>
            </Fade>

            <Fade><h2 style={h2Style}>Indemnification</h2></Fade>
            <Fade>
              <p style={pStyle}>
                You agree to indemnify, defend, and hold harmless Webhomes LLC, its affiliates, officers, agents, and employees from any claims, liabilities, damages, losses, or expenses (including reasonable attorneys&apos; fees) arising out of or related to your use of the Site, violation of these Terms, or infringement of any intellectual property or other rights of any person or entity.
              </p>
            </Fade>

            <Fade><h2 style={h2Style}>Links to Third-Party Sites</h2></Fade>
            <Fade>
              <p style={pStyle}>
                Our Site may contain links to third-party websites for your convenience. These links do not imply endorsement or responsibility for the content, products, or services available on such sites. You access third-party sites at your own risk.
              </p>
            </Fade>

            <Fade><h2 style={h2Style}>Governing Law and Dispute Resolution</h2></Fade>
            <Fade>
              <p style={pStyle}>
                These Terms shall be governed by and construed in accordance with the laws of the state in which Webhomes LLC is organized, without regard to its conflict of law principles. Any disputes arising from these Terms or your use of the Site shall be resolved exclusively in the appropriate state or federal courts located within that jurisdiction.
              </p>
            </Fade>

            <Fade><h2 style={h2Style}>Modifications to the Terms</h2></Fade>
            <Fade>
              <p style={pStyle}>
                We reserve the right to modify or update these Terms at any time without prior notice. Your continued use of the Site following any changes constitutes your acceptance of the new Terms. It is your responsibility to review these Terms periodically for any modifications.
              </p>
            </Fade>

            <Fade><h2 style={h2Style}>Termination</h2></Fade>
            <Fade>
              <p style={pStyle}>
                We may suspend or terminate your access to the Site at our sole discretion, with or without notice, for conduct that we believe violates these Terms or is harmful to other users or our business interests.
              </p>
            </Fade>

            <Fade><h2 style={h2Style}>Contact Information</h2></Fade>
            <Fade>
              <p style={{ ...pStyle, margin: 0 }}>
                If you have any questions about these Terms or our practices, please contact us at:
              </p>
              <p style={{ ...pStyle, margin: "8px 0 0" }}>
                <strong style={{ color: "#183961" }}>Email:</strong>{" "}
                <a href="mailto:info@thewebhomes.com" style={{ color: "#5aa6d1", textDecoration: "none" }}>
                  info@thewebhomes.com
                </a>
                <br />
                <strong style={{ color: "#183961" }}>Phone:</strong>{" "}
                <a href="tel:5733129899" style={{ color: "#5aa6d1", textDecoration: "none" }}>
                  (573) 312-9899
                </a>
              </p>
            </Fade>
          </div>

          <Fade><hr style={dividerStyle} /></Fade>

          {/* ── Messaging Terms & Conditions ── */}
          <div id="messaging-terms">
            <Fade>
              <h2 style={{ ...h2Style, marginBottom: "20px" }}>Webhomes LLC Messaging Terms &amp; Conditions</h2>
            </Fade>
            <Fade>
              <p style={pStyle}>
                You agree to receive recurring automated promotional and personalized marketing text (e.g., SMS and MMS) messages from <strong>Webhomes LLC</strong>, including text messages that may be sent using an automatic telephone dialing system, to the mobile telephone number you provided when signing up or any other number that you designate. Consent to receive automated marketing text messages is not a condition of any purchase. Msg &amp; Data rates may apply. Message frequency will vary. Webhomes LLC reserves the right to alter the frequency of messages sent at any time. Webhomes LLC also reserves the right to change the short code or phone number from which messages are sent and we will notify you when we do so. Not all mobile devices or handsets may be supported and our messages may not be deliverable in all areas. Webhomes LLC, its service providers, and the mobile carriers supported by the program are not liable for delayed or undelivered messages.
              </p>
            </Fade>
            <Fade>
              <p style={pStyle}>
                We are able to deliver messages to the following mobile phone carriers: AT&amp;T, Verizon Wireless, Sprint, T-Mobile, and other major national and regional carriers.
              </p>
            </Fade>

            <Fade><h3 style={h3Style}>Cancellation</h3></Fade>
            <Fade>
              <p style={pStyle}>
                Text the keywords <strong>STOP, END, CANCEL, UNSUBSCRIBE</strong> or <strong>QUIT</strong> to cancel. After texting one of these keywords you will receive one additional message confirming that your request has been processed. You acknowledge that our text message platform may not recognize and respond to unsubscribe requests that do not include these keyword commands.
              </p>
            </Fade>

            <Fade><h3 style={h3Style}>Help</h3></Fade>
            <Fade>
              <p style={pStyle}>Text the keyword <strong>HELP</strong> to return customer care contact information.</p>
            </Fade>

            <Fade><h3 style={h3Style}>Customer Care</h3></Fade>
            <Fade>
              <p style={pStyle}>
                If you are experiencing any problems, please email us at{" "}
                <a href="mailto:info@thewebhomes.com" style={{ color: "#5aa6d1", textDecoration: "none" }}>
                  info@thewebhomes.com
                </a>.
              </p>
            </Fade>

            <Fade><h3 style={h3Style}>Other Terms</h3></Fade>
            <Fade>
              <p style={pStyle}>
                These Messaging Terms &amp; Conditions are a part of and subject to our Terms of Use and our Privacy Policy. By participating in our text message program, you agree to our Terms Documents. To the extent that a conflict exists between these Messaging Terms &amp; Conditions and our Terms of Use, these Messaging Terms &amp; Conditions will control.
              </p>
            </Fade>
          </div>

          <Fade><hr style={dividerStyle} /></Fade>

          {/* ── Messaging Privacy Policy ── */}
          <div id="messaging-privacy">
            <Fade>
              <h2 style={{ ...h2Style, marginBottom: "20px" }}>Messaging Privacy Policy</h2>
            </Fade>
            <Fade>
              <p style={pStyle}>
                This Messaging Program Privacy Policy explains how <strong>Webhomes LLC</strong> collects and uses information about you in relation to its text message marketing program (the "Messaging Service").
              </p>
            </Fade>

            <Fade><h3 style={h3Style}>Collection of Information</h3></Fade>
            <Fade>
              <p style={pStyle}>
                We collect various information on our behalf from and about you, including information you directly provide when you use the Messaging Service. For example, we collect the phone number and email address you provided when signing up. When you send messages via the Messaging Service, we will also collect your messaging history and any information included in those messages.
              </p>
            </Fade>
            <Fade>
              <p style={pStyle}>
                We may also collect information about you using cookies or similar technologies. Cookies enable personalization of your experience on the Messaging Service (e.g., sending you personalized text messages such as shopping cart reminders).
              </p>
            </Fade>

            <Fade><h3 style={h3Style}>Use of Information</h3></Fade>
            <Fade>
              <p style={pStyle}>
                We use your information to deliver, analyze, maintain, and support the Messaging Service. We may also use your information to enhance the Messaging Service features and customize and personalize your experiences.
              </p>
            </Fade>

            <Fade><h3 style={h3Style}>Sharing of Information</h3></Fade>
            <Fade>
              <p style={pStyle}>We may share, transfer, or disclose your information in the following circumstances:</p>
            </Fade>
            <Fade>
              <ul style={{ paddingLeft: "20px", margin: "0 0 24px" }}>
                {[
                  "Service Providers: We may share your information with third parties to help us provide the Messaging Service to you.",
                  "Legal Requirement: We may disclose your information to comply with applicable law and legal processes, respond to requests from public and government authorities, enforce a contract with us, or protect our rights, privacy, safety, or property.",
                ].map((item) => (
                  <li key={item} style={liStyle}>
                    <span style={liTextStyle}>{item}</span>
                  </li>
                ))}
              </ul>
            </Fade>
            <Fade>
              <p style={pStyle}>
                <strong>No mobile information will be shared with third parties/affiliates for marketing/promotional purposes.</strong> All the above categories exclude text messaging originator opt-in data and consent. This information will not be shared with any third parties.
              </p>
            </Fade>

            <Fade><h3 style={h3Style}>Protection of Information</h3></Fade>
            <Fade>
              <p style={pStyle}>
                We take a variety of physical, technical, administrative, and organizational security measures based on the sensitivity of the information we collect to protect your information against accidental or unlawful destruction, alteration, unauthorized disclosure, or access. No online activity can be guaranteed to be 100% secure. We do not accept liability for unintentional disclosure.
              </p>
            </Fade>

            <Fade><h3 style={h3Style}>Retention of Information</h3></Fade>
            <Fade>
              <p style={pStyle}>
                We retain your information for as long as you participate in the Messaging Service or as needed to comply with applicable legal obligations. We will also retain and use your information as necessary to resolve disputes, protect us and our customers, and enforce our agreements.
              </p>
            </Fade>

            <Fade><h3 style={h3Style}>Choices and Controls</h3></Fade>
            <Fade>
              <p style={pStyle}>
                Consent to receive automated marketing text messages is not a condition of any purchase. You can opt-out of receiving further commercial text messages by responding to any of our text messages with any of the following replies: <strong>STOP, END, CANCEL, UNSUBSCRIBE,</strong> or <strong>QUIT</strong>.
              </p>
            </Fade>

            <Fade><h3 style={h3Style}>Text Message Campaign Data Selling</h3></Fade>
            <Fade>
              <p style={pStyle}>
                If you sign up to receive text messages from us, we will not sell personal information collected specifically in connection with such service, including your mobile telephone number or consent data, to any third party, and we will not share such personal information with any third party for cross-context behavioral advertising or targeted advertising purposes.
              </p>
            </Fade>
          </div>

        </div>
      </section>

      <Footer />
    </>
  );
}
