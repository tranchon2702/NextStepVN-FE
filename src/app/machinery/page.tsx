import Footer from "@/components/footer";
import Header from "@/components/header";
import Machinery from "@/components/pages/machinery";
import { BACKEND_DOMAIN } from '@/api/config';

// Revalidate every 60 seconds
export const revalidate = 60;

async function fetchMachineryData() {
  const res = await fetch(`${BACKEND_DOMAIN}/api/machinery/data`, { 
    next: { revalidate: 60 } 
  });
  const apiData = await res.json();
  if (!apiData.success) throw new Error("Failed to fetch machinery data");
  return apiData.data || null;
}

export default async function MachineryPage() {
  let machineryData = null;
  try {
    machineryData = await fetchMachineryData();
  } catch {
    machineryData = null;
  }
  return (
    <>
      {/* Header */}
      <Header />

      {/* Machinery */}
      <Machinery machineryData={machineryData} />

      {/* Footer */}
      <Footer />
    </>
  );
}
