"use client";

import Image from "next/image";
import Link from "next/link";
import ClientOnly from "./ClientOnly";
import { useEffect, useState } from "react";
import { BACKEND_DOMAIN } from "@/api/config";

interface SocialLinks {
  facebook: string;
  instagram: string;
  youtube: string;
}

export default function Footer() {
  const [socialLinks, setSocialLinks] = useState<SocialLinks>({
    facebook: "https://facebook.com/saigon3jeans",
    instagram: "https://instagram.com/saigon3jeans", 
    youtube: "https://youtube.com/@saigon3jeans"
  });

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const response = await fetch(`${BACKEND_DOMAIN}/api/contact/info`, { cache: 'no-store' });
        const data = await response.json();
        if (data.success && data.data?.socialLinks) {
          setSocialLinks(data.data.socialLinks);
        }
      } catch (error) {
        console.error('Error fetching contact info:', error);
      }
    };

    fetchContactInfo();
  }, []);
  return (
    <ClientOnly>
    <footer className="nextstep-footer">
      <div className="footer-main">
        <div className="container">
          <div className="row">
            {/* Logo & Slogan */}
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="footer-brand">
                <Image
                  src="/images/LogoNexxtStepVN.png"
                  alt="Next Step Viet Nam Logo"
                  className="footer-logo mb-3"
                  width={200}
                  height={70}
                />
                <p className="footer-slogan">
                  NEXT STEP VIET NAM<br />
                  <span className="slogan-sub">Viết tiếp tương lai cùng bạn!</span>
                </p>
                <p className="footer-commitment">
                  Chúng tôi cam kết kết nối doanh nghiệp Nhật và đồng hành kỹ sư sau khi qua Nhật làm việc.
                </p>
                <div className="footer-social">
                  <Link href={socialLinks.facebook || "https://facebook.com"} target="_blank" rel="noopener noreferrer" className="social-link">
                    <i className="fab fa-facebook-f"></i>
                  </Link>
                  <Link href={socialLinks.instagram || "https://instagram.com"} target="_blank" rel="noopener noreferrer" className="social-link">
                    <i className="fab fa-instagram"></i>
                  </Link>
                  <Link href={socialLinks.youtube || "https://youtube.com"} target="_blank" rel="noopener noreferrer" className="social-link">
                    <i className="fab fa-youtube"></i>
                  </Link>
                </div>
              </div>
            </div>

            {/* Thông tin liên hệ */}
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="footer-section">
                <h5 className="footer-title">THÔNG TIN LIÊN HỆ</h5>
                <ul className="footer-contact-list">
                  <li>
                    <i className="fas fa-map-marker-alt"></i>
                    <span>75B Đường Cách Mạng Tháng 8,<br />Phường Lái Thiêu, TP. HCM</span>
                  </li>
                  <li>
                    <i className="fas fa-phone"></i>
                    <a href="tel:0937548534">0937 548 534</a>
                  </li>
                  <li>
                    <i className="fas fa-envelope"></i>
                    <a href="mailto:info@nextstepviet.com">info@nextstepviet.com</a>
                  </li>
                  <li>
                    <i className="fas fa-globe"></i>
                    <a href="https://www.nextstepviet.com" target="_blank" rel="noopener noreferrer">www.nextstepviet.com</a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Quick Links */}
            <div className="col-lg-4 col-md-12 mb-4">
              <div className="row">
                <div className="col-6">
                  <div className="footer-section">
                    <h5 className="footer-title">GIỚI THIỆU</h5>
                    <ul className="footer-links">
                      <li><Link href="/overview">Tổng quan</Link></li>
                      <li><Link href="/vision">Tầm nhìn chiến lược</Link></li>
                      <li><Link href="/mission">Sứ mệnh</Link></li>
                    </ul>
                  </div>
                </div>
                <div className="col-6">
                  <div className="footer-section">
                    <h5 className="footer-title">DỊCH VỤ</h5>
                    <ul className="footer-links">
                      <li><Link href="/for-engineers">Dành cho kỹ sư</Link></li>
                      <li><Link href="/for-recruiters">Dành cho nhà tuyển dụng</Link></li>
                      <li><Link href="/recruitment">Tuyển dụng</Link></li>
                      <li><Link href="/news">Tin tức</Link></li>
                      <li><Link href="/contact">Liên hệ</Link></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 text-center text-md-start">
              <p className="mb-0">© 2025 Next Step Viet Nam. All rights reserved.</p>
            </div>
            <div className="col-md-6 text-center text-md-end">
              <p className="mb-0">
                <Link href="/privacy-policy" className="footer-bottom-link">Chính sách bảo mật</Link>
                <span className="mx-2">|</span>
                <Link href="/terms" className="footer-bottom-link">Điều khoản sử dụng</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
    </ClientOnly>
  );
}
