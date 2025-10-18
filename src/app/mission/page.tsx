import Footer from "@/components/footer";
import Header from "@/components/header";
import Mission from "@/components/pages/mission";
import ScrollToTop from "@/components/ScrollToTop";
import HeaderScrollEffect from "@/components/HeaderScrollEffect";

export const metadata = {
  title: "Sứ Mệnh - Next Step Vietnam",
  description: "Sứ mệnh của NEXT STEP - Kết nối nhân tài Việt Nam với cơ hội nghề nghiệp tại Nhật Bản",
};

export default function MissionPage() {
  return (
    <>
      {/* Header Scroll Effect */}
      <HeaderScrollEffect />

      {/* Header */}
      <Header />

      {/* Mission Content */}
      <Mission />

      {/* Footer */}
      <Footer />

      {/* Scroll to Top Button */}
      <ScrollToTop />
    </>
  );
}
