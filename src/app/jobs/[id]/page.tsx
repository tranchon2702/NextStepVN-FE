import Footer from "@/components/footer";
import Header from "@/components/header";
import JobDetail from "@/components/pages/jobDetail";
import ScrollToTop from "@/components/ScrollToTop";
import HeaderScrollEffect from "@/components/HeaderScrollEffect";

export const metadata = {
  title: "Chi Tiết Việc Làm - Next Step Vietnam",
  description: "Xem chi tiết vị trí tuyển dụng và ứng tuyển ngay",
};

export default function JobDetailPage() {
  return (
    <>
      {/* Header Scroll Effect */}
      <HeaderScrollEffect />

      {/* Header */}
      <Header />

      {/* Job Detail Content */}
      <JobDetail />

      {/* Footer */}
      <Footer />

      {/* Scroll to Top Button */}
      <ScrollToTop />
    </>
  );
}




