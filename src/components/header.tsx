'use client';

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import ClientOnly from "./ClientOnly";
import { useTranslation } from 'next-i18next';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<{ [key: string]: boolean }>({});
  const [searchQuery, setSearchQuery] = useState("");
  const { t, i18n } = useTranslation("header");

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
    const newLanguage = i18n.language === 'vi' ? 'ja' : 'vi';
    i18n.changeLanguage(newLanguage);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to news page with search query
      window.location.href = `/news?search=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

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
                  <span className="brand-slogan-sub">{t('slogan')}</span>
                </div>
              </div>
            </Link>

            <div className="d-none d-lg-flex align-items-center">
              <ul className="navbar-nav">
                <li className="nav-item dropdown">
                  <span className="nav-link dropdown-toggle">{t('introduction')}</span>
                  <ul className="dropdown-menu">
                    <li>
                      <Link className="dropdown-item" href="/overview" prefetch={true}>{t('company_overview')}</Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" href="/vision" prefetch={true}>{t('strategic_vision')}</Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" href="/mission" prefetch={true}>{t('mission')}</Link>
                    </li>
                  </ul>
                </li>
                <li className="nav-item dropdown">
                  <span className="nav-link dropdown-toggle">{t('company_services')}</span>
                  <ul className="dropdown-menu">
                    <li>
                      <Link className="dropdown-item" href="/for-engineers" prefetch={true}>{t('for_engineers')}</Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" href="/for-recruiters" prefetch={true}>{t('for_recruiters')}</Link>
                    </li>
                  </ul>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" href="/news" prefetch={true}>{t('news')}</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" href="/contact" prefetch={true}>{t('contact')}</Link>
                </li>
              </ul>

              <div className="header-search-container">
                <form onSubmit={handleSearch} className="header-search-form">
                  <input
                    type="text"
                    className="header-search-input"
                    placeholder={t('search_placeholder')}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button type="submit" className="header-search-btn">
                    <i className="fas fa-search"></i>
                  </button>
                </form>
              </div>

              <button
                className="language-switcher"
                onClick={toggleLanguage}
                aria-label="Switch language"
                title={t('switch_language_title')}
              >
                <Image
                  src={i18n.language === 'vi' ? '/images/vn.webp' : '/images/jp.webp'}
                  alt={t('flag_alt')}
                  width={28}
                  height={20}
                  className="flag-icon"
                />
                <span className="language-text">
                  {i18n.language === 'vi' ? 'VN' : 'JP'}
                </span>
              </button>
            </div>

            <button
              className="navbar-toggler d-lg-none"
              type="button"
              onClick={toggleMenu}
              aria-label="Toggle navigation"
            >
              <span className={`hamburger-line ${isMenuOpen ? "active" : ""}`}></span>
              <span className={`hamburger-line ${isMenuOpen ? "active" : ""}`}></span>
              <span className={`hamburger-line ${isMenuOpen ? "active" : ""}`}></span>
            </button>
          </div>
        </nav>
      </header>

      <div className={`mobile-menu-overlay ${isMenuOpen ? "active" : ""}`} onClick={closeMenu}></div>

      <div className={`mobile-menu-drawer ${isMenuOpen ? "active" : ""}`}>
        <div className="mobile-menu-header">
          <button className="mobile-menu-close" onClick={closeMenu}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        <ul className="mobile-menu-nav">
          <li className="mobile-nav-item mobile-language-toggle">
            <button
              className="mobile-nav-link language-switch-btn"
              onClick={toggleLanguage}
            >
              <Image
                src={i18n.language === 'vi' ? '/images/vn.webp' : '/images/jp.webp'}
                alt={t('flag_alt')}
                width={24}
                height={16}
                className="flag-icon"
              />
              {t('language_name')}
            </button>
          </li>

          <li className="mobile-nav-item mobile-search">
            <form onSubmit={handleSearch} className="mobile-search-form">
              <input
                type="text"
                className="mobile-search-input"
                placeholder={t('search_placeholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="mobile-search-btn">
                <i className="fas fa-search"></i>
              </button>
            </form>
          </li>

          <li className="mobile-nav-item has-submenu">
            <div
              className="mobile-nav-link parent-link"
              onClick={() => toggleSubmenu('introduction')}
            >
              <i className="fas fa-building"></i>
              {t('introduction')}
              <i className={`fas fa-chevron-down submenu-arrow ${expandedMenus['introduction'] ? 'expanded' : ''}`}></i>
            </div>
            <ul className={`mobile-submenu ${expandedMenus['introduction'] ? 'expanded' : ''}`}>
              <li>
                <Link className="mobile-nav-link submenu-item" href="/overview" onClick={closeMenu}>
                  <i className="fas fa-eye"></i>
                  {t('company_overview')}
                </Link>
              </li>
              <li>
                <Link className="mobile-nav-link submenu-item" href="/vision" onClick={closeMenu}>
                  <i className="fas fa-lightbulb"></i>
                  {t('strategic_vision')}
                </Link>
              </li>
              <li>
                <Link className="mobile-nav-link submenu-item" href="/mission" onClick={closeMenu}>
                  <i className="fas fa-bullseye"></i>
                  {t('mission')}
                </Link>
              </li>
            </ul>
          </li>

          <li className="mobile-nav-item has-submenu">
            <div
              className="mobile-nav-link parent-link"
              onClick={() => toggleSubmenu('services')}
            >
              <i className="fas fa-briefcase"></i>
              {t('company_services')}
              <i className={`fas fa-chevron-down submenu-arrow ${expandedMenus['services'] ? 'expanded' : ''}`}></i>
            </div>
            <ul className={`mobile-submenu ${expandedMenus['services'] ? 'expanded' : ''}`}>
              <li>
                <Link className="mobile-nav-link submenu-item" href="/for-engineers" onClick={closeMenu}>
                  <i className="fas fa-user-tie"></i>
                  {t('for_engineers')}
                </Link>
              </li>
              <li>
                <Link className="mobile-nav-link submenu-item" href="/for-recruiters" onClick={closeMenu}>
                  <i className="fas fa-user-friends"></i>
                  {t('for_recruiters')}
                </Link>
              </li>
            </ul>
          </li>

          <li className="mobile-nav-item">
            <Link className="mobile-nav-link" href="/news" onClick={closeMenu}>
              <i className="fas fa-newspaper"></i>
              {t('news')}
            </Link>
          </li>

          <li className="mobile-nav-item">
            <Link className="mobile-nav-link" href="/contact" onClick={closeMenu}>
              <i className="fas fa-envelope"></i>
              {t('contact')}
            </Link>
          </li>
        </ul>
      </div>
    </ClientOnly>
  );
}