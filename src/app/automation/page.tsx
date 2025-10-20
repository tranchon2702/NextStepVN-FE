import Footer from "@/components/footer";
import Header from "@/components/header";
import Automation from "@/components/pages/automation";
import { BACKEND_DOMAIN } from '@/api/config';

// Revalidate every 60 seconds
export const revalidate = 60;

async function fetchAutomationItems() {
  const res = await fetch(`${BACKEND_DOMAIN}/api/automation/data`, { 
    next: { revalidate: 60 } 
  });
  const apiData = await res.json();
  if (!apiData.success) throw new Error("Failed to fetch automation data");
  // Ưu tiên lấy automationItems, fallback sang items nếu không có
  const items = Array.isArray(apiData.data?.automationItems)
    ? apiData.data.automationItems
    : apiData.data?.items || [];
  return items;
}

export default async function AutomationPage() {
  let automationItems = [];
  try {
    automationItems = await fetchAutomationItems();
  } catch {
    automationItems = [];
  }
  return (
    <>
      {/* Header */}
      <Header />
    
      {/* Automation */}
      <Automation automationItems={automationItems} />
    
      {/* Footer */}
      <Footer />
    </>
  );
}