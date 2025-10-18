import Footer from "@/components/footer";
import Header from "@/components/header";
import CandidatesList from "@/components/pages/candidatesList";
import ScrollToTop from "@/components/ScrollToTop";
import HeaderScrollEffect from "@/components/HeaderScrollEffect";

export const metadata = {
  title: "Danh Sách Ứng Viên - Next Step Vietnam",
  description: "Tìm kiếm và lựa chọn ứng viên phù hợp",
};

export default function CandidatesPage() {
  return (
    <>
      {/* Header Scroll Effect */}
      <HeaderScrollEffect />

      {/* Header */}
      <Header />

      {/* Candidates List Content */}
      <CandidatesList />

      {/* Footer */}
      <Footer />

      {/* Scroll to Top Button */}
      <ScrollToTop />
    </>
  );
}


