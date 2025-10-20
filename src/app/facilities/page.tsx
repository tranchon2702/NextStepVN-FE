import Footer from "@/components/footer";
import Header from "@/components/header";
import Facilities from "@/components/pages/facilities";
import facilitiesService from "@/services/facilitiesService";
import { BACKEND_DOMAIN } from '@/api/config';

// Revalidate every 60 seconds
export const revalidate = 60;

export default async function FacilitiesPage() {
  const res = await fetch(`${BACKEND_DOMAIN}/api/facilities/data`, { 
    next: { revalidate: 60 } 
  });
  const apiData = await res.json();
  const facilitiesData = apiData.success ? apiData.data : null;
  return (
    <>
      {/* Header */}
      <Header />

      {/* Facilities */}
      <Facilities facilitiesData={facilitiesData} />

      {/* Footer */}
      <Footer />
    </>
  );
}
