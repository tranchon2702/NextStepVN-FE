import Footer from "@/components/footer";
import Header from "@/components/header";
import Overview from "@/components/pages/overview";
import ScrollToTop from "@/components/ScrollToTop";
import HeaderScrollEffect from "@/components/HeaderScrollEffect";
import { BACKEND_DOMAIN } from '@/api/config';

// Revalidate every 60 seconds for better performance
export const revalidate = 60;

export default async function OverviewPage() {
  const res = await fetch(`${BACKEND_DOMAIN}/api/overview/data`, { 
    next: { revalidate: 60 } 
  });
  const apiData = await res.json();
  const overviewData = apiData.success ? apiData.data : null;
  return (
    <>
      {/* Header Scroll Effect */}
      <HeaderScrollEffect />

      {/* Header */}
      <Header />

      {/* Overview */}
      <Overview overviewData={overviewData} />

      {/* Footer */}
      <Footer />

      {/* Scroll to Top Button */}
      <ScrollToTop />
    </>
  );
}
