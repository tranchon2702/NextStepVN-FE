import Footer from "@/components/footer";
import Header from "@/components/header";
import ForEngineers from "@/components/pages/forEngineers";
import ScrollToTop from "@/components/ScrollToTop";
import HeaderScrollEffect from "@/components/HeaderScrollEffect";

export const metadata = {
  title: "Dành Cho Kỹ Sư Tìm Việc - Next Step Vietnam",
  description: "Tìm kiếm cơ hội việc làm tại Nhật Bản dành cho kỹ sư Việt Nam",
};

export default function ForEngineersPage() {
  return (
    <>
      {/* Header Scroll Effect */}
      <HeaderScrollEffect />

      {/* Header */}
      <Header />

      {/* For Engineers Content */}
      <ForEngineers />

      {/* Footer */}
      <Footer />

      {/* Scroll to Top Button */}
      <ScrollToTop />
    </>
  );
}
