import type { Metadata } from "next";
import ContactContent from "@/components/ContactContent";

export const metadata: Metadata = {
  title: "Contact Us | MRS Agro Chemicals",
  description:
    "Reach out to MRS Agro Chemicals via phone, WhatsApp, or email. Send us a message and our team will respond promptly.",
  openGraph: {
    title: "Contact Us | MRS Agro Chemicals",
    description:
      "Reach out to MRS Agro Chemicals via phone, WhatsApp, or email.",
    type: "website",
  },
};

export default function ContactPage() {
  return <ContactContent />;
}
