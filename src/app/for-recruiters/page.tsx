import Footer from "@/components/footer";
import Header from "@/components/header";
import ForRecruiters from "@/components/pages/forRecruiters";
import ScrollToTop from "@/components/ScrollToTop";
import HeaderScrollEffect from "@/components/HeaderScrollEffect";

export const metadata = {
  title: "Dành Cho Nhà Tuyển Dụng - Next Step Vietnam",
  description: "Tìm kiếm ứng viên kỹ sư chất lượng cao từ Việt Nam",
};

export default function ForRecruitersPage() {
  return (
    <>
      {/* Header Scroll Effect */}
      <HeaderScrollEffect />

      {/* Header */}
      <Header />

      {/* For Recruiters Content */}
      <ForRecruiters />

      {/* Footer */}
      <Footer />

      {/* Scroll to Top Button */}
      <ScrollToTop />
    </>
  );
}
