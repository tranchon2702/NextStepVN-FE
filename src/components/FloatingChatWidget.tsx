"use client";

import Image from "next/image";
import { useMemo } from "react";
import { usePathname } from "next/navigation";

export default function FloatingChatWidget() {
  const pathname = usePathname();
  // Ẩn trên trang admin/dashboard
  if (pathname?.startsWith("/admin")) {
    return null;
  }
  const zaloLink = useMemo(() => {
    const envLink = process.env.NEXT_PUBLIC_ZALO_LINK;
    const envId = process.env.NEXT_PUBLIC_ZALO_ID;
    if (envLink && envLink.startsWith("http")) return envLink;
    if (envId) return `https://zalo.me/${envId}`;
    return undefined;
  }, []);

  const messengerLink = useMemo(() => {
    const envLink = process.env.NEXT_PUBLIC_MESSENGER_LINK;
    const pageId = process.env.NEXT_PUBLIC_FACEBOOK_PAGE_ID;
    if (envLink && envLink.startsWith("http")) return envLink;
    if (pageId) return `https://m.me/${pageId}`;
    return undefined;
  }, []);

  const phoneNumber = process.env.NEXT_PUBLIC_PHONE_NUMBER || "";

  return (
    <div className="floating-chat-widget" aria-label="Floating contact options">
      {zaloLink && (
        <a
          className="floating-btn"
          href={zaloLink}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat Zalo"
          title="Zalo"
        >
          <Image
            src="/images/zalo.png"
            alt="Zalo"
            width={44}
            height={44}
            priority
          />
        </a>
      )}

      {messengerLink && (
        <a
          className="floating-btn"
          href={messengerLink}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat Facebook Messenger"
          title="Messenger"
        >
          <Image
            src="/images/facebook-messenger.png"
            alt="Messenger"
            width={44}
            height={44}
            priority
          />
        </a>
      )}

      {phoneNumber && (
        <a
          className="floating-btn phone"
          href={`tel:${phoneNumber}`}
          aria-label={`Gọi ${phoneNumber}`}
          title={`Gọi ${phoneNumber}`}
        >
          <i className="bi bi-telephone-fill" />
        </a>
      )}
    </div>
  );
}


