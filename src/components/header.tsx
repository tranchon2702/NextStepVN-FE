"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import ClientOnly from "./ClientOnly";
// import { usePathname } from "next/navigation";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<{[key: string]: boolean}>({});
  const [language, setLanguage] = useState<'vi' | 'ja'>('vi');
  const [searchQuery, setSearchQuery] = useState("");
  // const pathname = usePathname();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setExpandedMenus({});
  };

  const toggleSubmenu = (menuKey: string) => {
    setExpandedMenus(prev => ({
      ...prev,
      [menuKey]: !prev[menuKey]
    }));
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'vi' ? 'ja' : 'vi');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log("Tìm kiếm:", searchQuery);
      // TODO: Implement search logic here
      // Có thể navigate đến trang tìm kiếm hoặc mở modal kết quả
    }
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        isMenuOpen &&
        !target.closest(".mobile-menu-drawer") &&
        !target.closest(".navbar-toggler")
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <ClientOnly>
      <header>
        <nav className="navbar navbar-expand-lg navbar-light">
          <div className="container">
            <Link className="navbar-brand" href="/">
              <div className="brand-container">
                <Image
                  src="/images/LogoNexxtStepVN.png"
                  alt="Next Step VN Logo"
                  className="logo"
                  width={180}
                  height={60}
                />
                <div className="brand-slogan">
                  <span className="brand-slogan-main">NEXT STEP VIET NAM</span>
                  <span className="brand-slogan-sub">Viết tiếp tương lai cùng bạn!</span>
                </div>
              </div>
            </Link>

            {/* Desktop Menu */}
            <div className="d-none d-lg-flex align-items-center">
              <ul className="navbar-nav">
                {/* GIỚI THIỆU Dropdown */}
                <li className="nav-item dropdown">
                  <span className="nav-link dropdown-toggle">
                    {language === 'vi' ? 'GIỚI THIỆU' : '紹介'}
                  </span>
                  <ul className="dropdown-menu">
                    <li>
                      <Link className="dropdown-item" href="/overview">
                        {language === 'vi' ? 'Tổng quan về công ty' : '会社概要'}
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" href="/vision">
                        {language === 'vi' ? 'Tầm nhìn chiến lược' : '戦略的ビジョン'}
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" href="/mission">
                        {language === 'vi' ? 'Sứ mệnh' : 'ミッション'}
                      </Link>
                    </li>
                  </ul>
                </li>

                {/* DỊCH VỤ CÔNG TY Dropdown */}
                <li className="nav-item dropdown">
                  <span className="nav-link dropdown-toggle">
                    {language === 'vi' ? 'DỊCH VỤ CÔNG TY' : '会社サービス'}
                  </span>
                  <ul className="dropdown-menu">
                    <li>
                      <Link className="dropdown-item" href="/for-engineers">
                        {language === 'vi' ? 'Dành cho kỹ sư tìm việc' : 'エンジニア向け求人'}
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" href="/for-recruiters">
                        {language === 'vi' ? 'Dành cho nhà tuyển dụng' : '採用担当者向け'}
                      </Link>
                    </li>
                  </ul>
                </li>

                {/* TIN TỨC */}
                <li className="nav-item">
                  <Link className="nav-link" href="/news">
                    {language === 'vi' ? 'TIN TỨC' : 'ニュース'}
                  </Link>
                </li>

                {/* LIÊN HỆ */}
                <li className="nav-item">
                  <Link className="nav-link" href="/contact">
                    {language === 'vi' ? 'LIÊN HỆ' : 'お問い合わせ'}
                  </Link>
                </li>
              </ul>

              {/* Search Bar */}
              <div className="header-search-container">
                <form onSubmit={handleSearch} className="header-search-form">
                  <input
                    type="text"
                    className="header-search-input"
                    placeholder={language === 'vi' ? 'Tìm kiếm...' : '検索...'}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="header-search-btn"
                  >
                    <i className="fas fa-search"></i>
                  </button>
                </form>
              </div>

              {/* Language Switcher - Hiển thị ngôn ngữ hiện tại */}
              <button
                className="language-switcher"
                onClick={toggleLanguage}
                aria-label="Switch language"
                title={language === 'vi' ? 'Chuyển sang tiếng Nhật' : '日本語に切り替える'}
              >
                <Image
                  src={language === 'vi' ? '/images/vn.webp' : '/images/jp.webp'}
                  alt={language === 'vi' ? 'Vietnamese' : 'Japanese'}
                  width={28}
                  height={20}
                  className="flag-icon"
                />
                <span className="language-text">
                  {language === 'vi' ? 'VN' : 'JP'}
                </span>
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="navbar-toggler d-lg-none"
              type="button"
              onClick={toggleMenu}
              aria-label="Toggle navigation"
            >
              <span
                className={`hamburger-line ${isMenuOpen ? "active" : ""}`}
              ></span>
              <span
                className={`hamburger-line ${isMenuOpen ? "active" : ""}`}
              ></span>
              <span
                className={`hamburger-line ${isMenuOpen ? "active" : ""}`}
              ></span>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`mobile-menu-overlay ${isMenuOpen ? "active" : ""}`}
        onClick={closeMenu}
      ></div>

      {/* Mobile Menu Drawer */}
      <div className={`mobile-menu-drawer ${isMenuOpen ? "active" : ""}`}>
        <div className="mobile-menu-header">
          <button className="mobile-menu-close" onClick={closeMenu}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        <ul className="mobile-menu-nav">
          {/* Language Switcher Mobile */}
          <li className="mobile-nav-item mobile-language-toggle">
            <button 
              className="mobile-nav-link language-switch-btn" 
              onClick={toggleLanguage}
            >
              <Image
                src={language === 'vi' ? '/images/vn.webp' : '/images/jp.webp'}
                alt="Flag"
                width={24}
                height={16}
                className="flag-icon"
              />
              {language === 'vi' ? 'Tiếng Việt (VN)' : '日本語 (JP)'}
            </button>
          </li>

          {/* Search Mobile */}
          <li className="mobile-nav-item mobile-search">
            <form onSubmit={handleSearch} className="mobile-search-form">
              <input
                type="text"
                className="mobile-search-input"
                placeholder={language === 'vi' ? 'Tìm kiếm...' : '検索...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="mobile-search-btn">
                <i className="fas fa-search"></i>
              </button>
            </form>
          </li>

          {/* GIỚI THIỆU with submenu */}
          <li className="mobile-nav-item has-submenu">
            <div 
              className="mobile-nav-link parent-link" 
              onClick={() => toggleSubmenu('introduction')}
            >
              <i className="fas fa-building"></i>
              {language === 'vi' ? 'GIỚI THIỆU' : '紹介'}
              <i className={`fas fa-chevron-down submenu-arrow ${expandedMenus['introduction'] ? 'expanded' : ''}`}></i>
            </div>
            <ul className={`mobile-submenu ${expandedMenus['introduction'] ? 'expanded' : ''}`}>
              <li>
                <Link className="mobile-nav-link submenu-item" href="/overview" onClick={closeMenu}>
                  <i className="fas fa-eye"></i>
                  {language === 'vi' ? 'Tổng quan về công ty' : '会社概要'}
                </Link>
              </li>
              <li>
                <Link className="mobile-nav-link submenu-item" href="/vision" onClick={closeMenu}>
                  <i className="fas fa-lightbulb"></i>
                  {language === 'vi' ? 'Tầm nhìn chiến lược' : '戦略的ビジョン'}
                </Link>
              </li>
              <li>
                <Link className="mobile-nav-link submenu-item" href="/mission" onClick={closeMenu}>
                  <i className="fas fa-bullseye"></i>
                  {language === 'vi' ? 'Sứ mệnh' : 'ミッション'}
                </Link>
              </li>
            </ul>
          </li>

          {/* DỊCH VỤ CÔNG TY with submenu */}
          <li className="mobile-nav-item has-submenu">
            <div 
              className="mobile-nav-link parent-link" 
              onClick={() => toggleSubmenu('services')}
            >
              <i className="fas fa-briefcase"></i>
              {language === 'vi' ? 'DỊCH VỤ CÔNG TY' : '会社サービス'}
              <i className={`fas fa-chevron-down submenu-arrow ${expandedMenus['services'] ? 'expanded' : ''}`}></i>
            </div>
            <ul className={`mobile-submenu ${expandedMenus['services'] ? 'expanded' : ''}`}>
              <li>
                <Link className="mobile-nav-link submenu-item" href="/for-engineers" onClick={closeMenu}>
                  <i className="fas fa-user-tie"></i>
                  {language === 'vi' ? 'Dành cho kỹ sư tìm việc' : 'エンジニア向け求人'}
                </Link>
              </li>
              <li>
                <Link className="mobile-nav-link submenu-item" href="/for-recruiters" onClick={closeMenu}>
                  <i className="fas fa-user-friends"></i>
                  {language === 'vi' ? 'Dành cho nhà tuyển dụng' : '採用担当者向け'}
                </Link>
              </li>
            </ul>
          </li>

          {/* TIN TỨC */}
          <li className="mobile-nav-item">
            <Link className="mobile-nav-link" href="/news" onClick={closeMenu}>
              <i className="fas fa-newspaper"></i>
              {language === 'vi' ? 'TIN TỨC' : 'ニュース'}
            </Link>
          </li>

          {/* LIÊN HỆ */}
          <li className="mobile-nav-item">
            <Link className="mobile-nav-link" href="/contact" onClick={closeMenu}>
              <i className="fas fa-envelope"></i>
              {language === 'vi' ? 'LIÊN HỆ' : 'お問い合わせ'}
            </Link>
          </li>
        </ul>
      </div>
    </ClientOnly>
  );
}
