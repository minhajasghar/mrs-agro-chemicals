import HtmlWrapper from "@/components/HtmlWrapper";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <HtmlWrapper>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </HtmlWrapper>
  );
}
