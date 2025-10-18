import Footer from "@/components/footer";
import Header from "@/components/header";
import Vision from "@/components/pages/vision";
import ScrollToTop from "@/components/ScrollToTop";
import HeaderScrollEffect from "@/components/HeaderScrollEffect";

export const metadata = {
  title: "Tầm Nhìn Chiến Lược - Next Step Vietnam",
  description: "Tầm nhìn chiến lược 10 năm của NEXT STEP (2025-2035) - Trở thành tập đoàn hàng đầu khu vực châu Á",
};

export default function VisionPage() {
  return (
    <>
      {/* Header Scroll Effect */}
      <HeaderScrollEffect />

      {/* Header */}
      <Header />

      {/* Vision Content */}
      <Vision />

      {/* Footer */}
      <Footer />

      {/* Scroll to Top Button */}
      <ScrollToTop />
    </>
  );
}
