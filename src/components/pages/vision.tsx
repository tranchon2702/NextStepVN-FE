"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

export default function Vision() {
  const { t } = useTranslation("vision");
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Hero Banner */}
      <section className="vision-hero">
        <div className="hero-overlay"></div>
        <Image
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&h=1080&fit=crop"
          alt={t('hero_alt')}
          fill
          priority
          className="hero-bg"
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          unoptimized
        />
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">{t('hero_title')}</h1>
            <div className="hero-divider"></div>
            <p className="hero-subtitle">{t('hero_subtitle')}</p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="vision-content">
        <div className="container">
          
          {/* Vision Statement */}
          <div 
            className="vision-statement"
            ref={(el) => { if (el) sectionsRef.current[0] = el; }}
          >
            <div className="row align-items-center">
              <div className="col-lg-6 mb-4 mb-lg-0">
                <div className="statement-image">
                  <Image
                    src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop"
                    alt={t('statement_image_alt')}
                    width={800}
                    height={600}
                    className="img-fluid rounded"
                    unoptimized
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="statement-content">
                  <div className="section-badge">
                    <i className="fas fa-bullseye"></i>
                    <span>{t('statement_badge')}</span>
                  </div>
                  <h2 className="section-title">
                    {t('statement_title')}
                  </h2>
                  <p className="lead-text">
                    {t('statement_lead')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Three Pillars */}
          <div 
            className="pillars-section"
            ref={(el) => { if (el) sectionsRef.current[1] = el; }}
          >
            <div className="text-center mb-5">
              <div className="section-badge mx-auto">
                <i className="fas fa-columns"></i>
                <span>{t('pillars_badge')}</span>
              </div>
              <h2 className="section-title">{t('pillars_title')}</h2>
            </div>

            <div className="row g-4">
              <div className="col-lg-4 col-md-6">
                <div className="pillar-card">
                  <div className="pillar-icon">
                    <i className="fas fa-graduation-cap"></i>
                  </div>
                  <h3 className="pillar-title">{t('pillar_1_title')}</h3>
                  <p className="pillar-text">
                    {t('pillar_1_text')}
                  </p>
                </div>
              </div>

              <div className="col-lg-4 col-md-6">
                <div className="pillar-card highlight">
                  <div className="pillar-icon">
                    <i className="fas fa-link"></i>
                  </div>
                  <h3 className="pillar-title">{t('pillar_2_title')}</h3>
                  <p className="pillar-text">
                    {t('pillar_2_text')}
                  </p>
                </div>
              </div>

              <div className="col-lg-4 col-md-6">
                <div className="pillar-card">
                  <div className="pillar-icon">
                    <i className="fas fa-rocket"></i>
                  </div>
                  <h3 className="pillar-title">{t('pillar_3_title')}</h3>
                  <p className="pillar-text">
                    {t('pillar_3_text')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Key Objectives */}
          <div 
            className="objectives-section"
            ref={(el) => { if (el) sectionsRef.current[2] = el; }}
          >
            <div className="row">
              <div className="col-lg-6 mb-4">
                <div className="objective-card">
                  <div className="objective-icon">
                    <i className="fas fa-trophy"></i>
                  </div>
                  <h3 className="objective-title">{t('objective_1_title')}</h3>
                  <ul className="objective-list">
                    <li>
                      <i className="fas fa-check-circle"></i>
                      <span>{t('objective_1_item_1')}</span>
                    </li>
                    <li>
                      <i className="fas fa-check-circle"></i>
                      <span>{t('objective_1_item_2')}</span>
                    </li>
                    <li>
                      <i className="fas fa-check-circle"></i>
                      <span>{t('objective_1_item_3')}</span>
                    </li>
                    <li>
                      <i className="fas fa-check-circle"></i>
                      <span>{t('objective_1_item_4')}</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="col-lg-6 mb-4">
                <div className="objective-card">
                  <div className="objective-icon">
                    <i className="fas fa-lightbulb"></i>
                  </div>
                  <h3 className="objective-title">{t('objective_2_title')}</h3>
                  <ul className="objective-list">
                    <li>
                      <i className="fas fa-check-circle"></i>
                      <span>{t('objective_2_item_1')}</span>
                    </li>
                    <li>
                      <i className="fas fa-check-circle"></i>
                      <span>{t('objective_2_item_2')}</span>
                    </li>
                    <li>
                      <i className="fas fa-check-circle"></i>
                      <span>{t('objective_2_item_3')}</span>
                    </li>
                    <li>
                      <i className="fas fa-check-circle"></i>
                      <span>{t('objective_2_item_4')}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div 
            className="timeline-section"
            ref={(el) => { if (el) sectionsRef.current[3] = el; }}
          >
            <div className="text-center mb-5">
              <div className="section-badge mx-auto">
                <i className="fas fa-calendar-alt"></i>
                <span>{t('timeline_badge')}</span>
              </div>
              <h2 className="section-title">{t('timeline_title')}</h2>
              <p className="section-subtitle">
                {t('timeline_subtitle')}
              </p>
            </div>

            <div className="vertical-timeline">
              <div className="vt-line" />

              <div className="vt-item" data-phase="1">
                <div className="vt-dot phase-1">
                  <div className="vt-dot-inner">
                    <i className="fas fa-rocket"></i>
                  </div>
                  <span className="vt-year">2025-2027</span>
                </div>
                <div className="vt-body">
                  <div className="vt-phase-label">Giai Đoạn 1</div>
                  <h4 className="vt-title">{t('timeline_1_title')}</h4>
                  <p className="vt-text">{t('timeline_1_text')}</p>
                  <div className="vt-decoration"></div>
                </div>
              </div>

              <div className="vt-item" data-phase="2">
                <div className="vt-dot phase-2">
                  <div className="vt-dot-inner">
                    <i className="fas fa-chart-line"></i>
                  </div>
                  <span className="vt-year">2028-2030</span>
                </div>
                <div className="vt-body">
                  <div className="vt-phase-label">Giai Đoạn 2</div>
                  <h4 className="vt-title">{t('timeline_2_title')}</h4>
                  <p className="vt-text">{t('timeline_2_text')}</p>
                  <div className="vt-decoration"></div>
                </div>
              </div>

              <div className="vt-item" data-phase="3">
                <div className="vt-dot phase-3">
                  <div className="vt-dot-inner">
                    <i className="fas fa-globe-asia"></i>
                  </div>
                  <span className="vt-year">2031-2035</span>
                </div>
                <div className="vt-body">
                  <div className="vt-phase-label">Giai Đoạn 3</div>
                  <h4 className="vt-title">{t('timeline_3_title')}</h4>
                  <p className="vt-text">{t('timeline_3_text')}</p>
                  <div className="vt-decoration"></div>
                </div>
              </div>

            </div>
          </div>

          {/* CTA */}
          <div 
            className="vision-cta"
            ref={(el) => { if (el) sectionsRef.current[4] = el; }}
          >
            <div className="cta-content">
              <h3 className="cta-title">{t('cta_title')}</h3>
              <p className="cta-text">
                {t('cta_text')}
              </p>
              <a href="/contact" className="btn-cta">
                {t('cta_button')}
                <i className="fas fa-arrow-right"></i>
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* Styles */}
      <style jsx>{`
        /* Hero Section */
        .vision-hero {
          position: relative;
          height: 60vh;
          min-height: 400px;
          max-height: 600px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%);
        }

        .hero-bg {
          z-index: 0;
        }

        .hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(220, 38, 38, 0.9) 0%, rgba(153, 27, 27, 0.9) 100%);
          z-index: 1;
        }

        .hero-content {
          position: relative;
          z-index: 2;
          text-align: center;
          color: white;
        }

        .hero-title {
          font-size: 3.5rem;
          font-weight: 700;
          margin-bottom: 20px;
          letter-spacing: 2px;
          animation: fadeInUp 0.8s ease;
        }

        .hero-divider {
          width: 100px;
          height: 4px;
          background: white;
          margin: 0 auto 30px;
          animation: fadeInUp 0.8s ease 0.1s both;
        }

        .hero-subtitle {
          font-size: 1.8rem;
          font-weight: 300;
          opacity: 0.95;
          animation: fadeInUp 0.8s ease 0.2s both;
        }

        /* Content Section */
        .vision-content {
          padding: 80px 0;
          background: white;
        }

        /* Vision Statement */
        .vision-statement {
          margin-bottom: 80px;
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.6s ease;
        }

        .vision-statement.animate-in {
          opacity: 1;
          transform: translateY(0);
        }

        .statement-image {
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
        }

        .statement-content {
          padding-left: 20px;
        }

        .section-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%);
          color: white;
          padding: 8px 20px;
          border-radius: 50px;
          font-size: 0.9rem;
          font-weight: 600;
          margin-bottom: 20px;
        }

        .section-title {
          font-size: 2.5rem;
          font-weight: 700;
          color: #1a202c;
          margin-bottom: 30px;
          line-height: 1.3;
        }

        .section-subtitle {
          font-size: 1.1rem;
          color: #718096;
          margin-bottom: 40px;
        }

        .lead-text {
          font-size: 1.2rem;
          line-height: 1.8;
          color: #4a5568;
        }

        .lead-text strong {
          color: #dc2626;
          font-weight: 600;
        }

        /* Pillars Section */
        .pillars-section {
          margin-bottom: 80px;
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.6s ease;
        }

        .pillars-section.animate-in {
          opacity: 1;
          transform: translateY(0);
        }

        .pillar-card {
          background: white;
          border-radius: 16px;
          padding: 40px 30px;
          height: 100%;
          text-align: center;
          transition: all 0.3s ease;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.06);
          border: 2px solid #f0f0f0;
        }

        .pillar-card.highlight {
          border-color: #dc2626;
          box-shadow: 0 10px 30px rgba(220, 38, 38, 0.15);
        }

        .pillar-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 15px 40px rgba(220, 38, 38, 0.2);
          border-color: #dc2626;
        }

        .pillar-icon {
          width: 80px;
          height: 80px;
          margin: 0 auto 20px;
          background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          color: white;
        }

        .pillar-title {
          font-size: 1.5rem;
          font-weight: 600;
          color: #1a202c;
          margin-bottom: 15px;
        }

        .pillar-text {
          font-size: 1rem;
          color: #718096;
          line-height: 1.7;
        }

        /* Objectives Section */
        .objectives-section {
          margin-bottom: 80px;
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.6s ease;
        }

        .objectives-section.animate-in {
          opacity: 1;
          transform: translateY(0);
        }

        .objective-card {
          background: #f8f9fa;
          border-radius: 16px;
          padding: 40px;
          height: 100%;
        }

        .objective-icon {
          width: 60px;
          height: 60px;
          background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          color: white;
          margin-bottom: 20px;
        }

        .objective-title {
          font-size: 1.5rem;
          font-weight: 600;
          color: #1a202c;
          margin-bottom: 20px;
        }

        .objective-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .objective-list li {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          margin-bottom: 15px;
          font-size: 1rem;
          line-height: 1.6;
          color: #4a5568;
        }

        .objective-list i {
          color: #dc2626;
          font-size: 1.2rem;
          margin-top: 2px;
          flex-shrink: 0;
        }

        /* Timeline (vertical) */
        .timeline-section {
          margin-bottom: 80px;
          opacity: 0;
          transform: translateY(18px);
          transition: all 0.6s cubic-bezier(.2,.9,.3,1);
        }

        .timeline-section.animate-in {
          opacity: 1;
          transform: translateY(0);
        }

        .vertical-timeline {
          position: relative;
          max-width: 1000px;
          margin: 0 auto;
          padding: 40px 0;
        }

        .vt-line {
          position: absolute;
          left: 80px;
          top: 40px;
          bottom: 40px;
          width: 6px;
          background: linear-gradient(180deg, 
            rgba(220,38,38,0.2) 0%, 
            rgba(220,38,38,0.8) 25%, 
            rgba(220,38,38,1) 50%,
            rgba(153,27,27,1) 75%,
            rgba(153,27,27,0.6) 100%
          );
          border-radius: 10px;
          box-shadow: 0 0 20px rgba(220,38,38,0.3), inset 0 0 10px rgba(255,255,255,0.2);
        }

        .vt-item {
          position: relative;
          padding: 0 0 60px 200px;
          display: flex;
          gap: 30px;
          align-items: flex-start;
          opacity: 0;
          transform: translateX(-30px);
          transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .vt-item:nth-child(2) { transition-delay: 0.1s; }
        .vt-item:nth-child(3) { transition-delay: 0.2s; }
        .vt-item:nth-child(4) { transition-delay: 0.3s; }

        .timeline-section.animate-in .vt-item {
          opacity: 1;
          transform: translateX(0);
        }

        .vt-dot {
          position: absolute;
          left: 0;
          top: 10px;
          width: 160px;
          height: auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }

        .vt-dot-inner {
          width: 90px;
          height: 90px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2.2rem;
          position: relative;
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          box-shadow: 0 10px 30px rgba(0,0,0,0.15);
        }

        .vt-dot.phase-1 .vt-dot-inner {
          background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
          color: white;
        }

        .vt-dot.phase-2 .vt-dot-inner {
          background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%);
          color: white;
        }

        .vt-dot.phase-3 .vt-dot-inner {
          background: linear-gradient(135deg, #059669 0%, #047857 100%);
          color: white;
        }

        .vt-dot-inner::before {
          content: '';
          position: absolute;
          inset: -8px;
          border-radius: 50%;
          padding: 8px;
          background: inherit;
          opacity: 0.2;
          z-index: -1;
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.2; }
          50% { transform: scale(1.15); opacity: 0.4; }
        }

        .vt-year {
          font-size: 0.85rem;
          font-weight: 700;
          text-align: center;
          display: block;
          padding: 6px 16px;
          background: linear-gradient(135deg, #1a202c 0%, #2d3748 100%);
          color: white;
          border-radius: 20px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          white-space: nowrap;
        }

        .vt-body {
          background: white;
          padding: 32px;
          border-radius: 20px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.08);
          flex: 1;
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
          border: 2px solid transparent;
        }

        .vt-body::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 5px;
          background: linear-gradient(90deg, 
            transparent 0%, 
            currentColor 50%, 
            transparent 100%
          );
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .vt-item[data-phase="1"] .vt-body::before { color: #3b82f6; }
        .vt-item[data-phase="2"] .vt-body::before { color: #dc2626; }
        .vt-item[data-phase="3"] .vt-body::before { color: #059669; }

        .vt-body:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 50px rgba(0,0,0,0.12);
          border-color: currentColor;
        }

        .vt-item[data-phase="1"] .vt-body:hover { border-color: #3b82f6; }
        .vt-item[data-phase="2"] .vt-body:hover { border-color: #dc2626; }
        .vt-item[data-phase="3"] .vt-body:hover { border-color: #059669; }

        .vt-body:hover::before {
          opacity: 1;
        }

        .vt-phase-label {
          display: inline-block;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          padding: 6px 14px;
          border-radius: 20px;
          margin-bottom: 12px;
        }

        .vt-item[data-phase="1"] .vt-phase-label {
          background: linear-gradient(135deg, rgba(59,130,246,0.15) 0%, rgba(29,78,216,0.15) 100%);
          color: #1d4ed8;
        }

        .vt-item[data-phase="2"] .vt-phase-label {
          background: linear-gradient(135deg, rgba(220,38,38,0.15) 0%, rgba(153,27,27,0.15) 100%);
          color: #991b1b;
        }

        .vt-item[data-phase="3"] .vt-phase-label {
          background: linear-gradient(135deg, rgba(5,150,105,0.15) 0%, rgba(4,120,87,0.15) 100%);
          color: #047857;
        }

        .vt-title {
          margin: 0 0 16px 0;
          font-size: 1.5rem;
          color: #1a202c;
          font-weight: 700;
          line-height: 1.3;
        }

        .vt-text {
          margin: 0;
          color: #4a5568;
          line-height: 1.8;
          font-size: 1.05rem;
        }

        .vt-decoration {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 100px;
          height: 100px;
          opacity: 0.05;
          pointer-events: none;
        }

        .vt-item[data-phase="1"] .vt-decoration {
          background: radial-gradient(circle, #3b82f6 0%, transparent 70%);
        }

        .vt-item[data-phase="2"] .vt-decoration {
          background: radial-gradient(circle, #dc2626 0%, transparent 70%);
        }

        .vt-item[data-phase="3"] .vt-decoration {
          background: radial-gradient(circle, #059669 0%, transparent 70%);
        }

        .vt-item:hover .vt-dot-inner {
          transform: scale(1.1) rotate(5deg);
          box-shadow: 0 15px 40px rgba(0,0,0,0.25);
        }

        @media (max-width: 992px) {
          .vertical-timeline { 
            padding: 20px 0;
            max-width: 100%;
          }
          
          .vt-line { 
            left: 45px;
            width: 4px;
          }
          
          .vt-item { 
            padding: 0 0 50px 130px;
            gap: 20px;
          }
          
          .vt-dot {
            left: 0;
            width: 90px;
          }
          
          .vt-dot-inner {
            width: 70px;
            height: 70px;
            font-size: 1.8rem;
          }
          
          .vt-year {
            font-size: 0.75rem;
            padding: 5px 12px;
          }
          
          .vt-body {
            padding: 24px;
          }
          
          .vt-title {
            font-size: 1.25rem;
          }
          
          .vt-text {
            font-size: 0.95rem;
          }
        }

        @media (max-width: 576px) {
          .vt-item { 
            padding: 0 0 40px 100px;
          }
          
          .vt-line {
            left: 32px;
            width: 3px;
          }
          
          .vt-dot {
            left: -5px;
            width: 75px;
          }
          
          .vt-dot-inner {
            width: 60px;
            height: 60px;
            font-size: 1.5rem;
          }
          
          .vt-dot-inner::before {
            inset: -6px;
          }
          
          .vt-year {
            font-size: 0.7rem;
            padding: 4px 10px;
          }
          
          .vt-body {
            padding: 20px;
            border-radius: 16px;
          }
          
          .vt-phase-label {
            font-size: 0.65rem;
            padding: 5px 12px;
            letter-spacing: 1px;
          }
          
          .vt-title {
            font-size: 1.1rem;
            margin-bottom: 12px;
          }
          
          .vt-text {
            font-size: 0.9rem;
            line-height: 1.6;
          }
          
          .vt-decoration {
            width: 70px;
            height: 70px;
          }
        }

        /* CTA */
        .vision-cta {
          text-align: center;
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.6s ease;
        }

        .vision-cta.animate-in {
          opacity: 1;
          transform: translateY(0);
        }

        .cta-content {
          background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%);
          border-radius: 16px;
          padding: 60px 40px;
          color: white;
        }

        .cta-title {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 15px;
        }

        .cta-text {
          font-size: 1.2rem;
          margin-bottom: 30px;
          opacity: 0.95;
        }

        .btn-cta {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 16px 40px;
          background: white;
          color: #dc2626;
          font-size: 1.1rem;
          font-weight: 600;
          border-radius: 8px;
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .btn-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
          color: #dc2626;
        }

        .btn-cta i {
          transition: transform 0.2s ease;
        }

        .btn-cta:hover i {
          transform: translateX(5px);
        }

        /* Animations */
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Responsive */
        @media (max-width: 992px) {
          .hero-title {
            font-size: 2.5rem;
          }

          .section-title {
            font-size: 2rem;
          }

          .statement-content {
            padding-left: 0;
            margin-top: 30px;
          }

          .timeline::before {
            left: 30px;
          }

          .timeline-marker {
            left: 30px;
            width: 100px;
            height: 100px;
            font-size: 1rem;
          }

          .timeline-item {
            flex-direction: row !important;
          }

          .timeline-content {
            width: calc(100% - 130px);
            margin-left: auto !important;
          }
        }

        @media (max-width: 768px) {
          .vision-hero {
            height: 50vh;
            min-height: 350px;
          }

          .hero-title {
            font-size: 2rem;
          }

          .hero-subtitle {
            font-size: 1.2rem;
          }

          .vision-content {
            padding: 40px 0;
          }

          .vision-statement,
          .pillars-section,
          .objectives-section,
          .timeline-section {
            margin-bottom: 40px;
          }

          .section-title {
            font-size: 1.75rem;
          }

          .pillar-card,
          .objective-card {
            margin-bottom: 20px;
          }

          .timeline-marker {
            width: 80px;
            height: 80px;
            font-size: 0.9rem;
          }

          .timeline-content {
            width: calc(100% - 110px);
          }

          .cta-content {
            padding: 40px 25px;
          }

          .cta-title {
            font-size: 1.75rem;
          }

          .cta-text {
            font-size: 1rem;
          }
        }

        @media (max-width: 576px) {
          .hero-title {
            font-size: 1.75rem;
          }

          .timeline-marker {
            width: 60px;
            height: 60px;
            font-size: 0.8rem;
            left: 20px;
          }

          .timeline::before {
            left: 20px;
          }

          .timeline-content {
            width: calc(100% - 90px);
            padding: 20px;
          }
        }
      `}</style>
    </>
  );
}




