"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { BACKEND_DOMAIN } from '@/api/config';
import { useTranslation } from "react-i18next";

// Interfaces for TypeScript
interface Banner {
  id: string;
  title: string;
  description: string;
  backgroundImage: string;
  isActive: boolean;
  updatedAt?: string;
}

interface OverviewData {
  banner: Banner;
}

interface OverviewProps {
  overviewData: OverviewData;
}

export default function Overview({ overviewData }: OverviewProps) {
  const { t } = useTranslation("overview");
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
      {/* Hero Banner Section */}
      <section className="overview-hero-section">
        <div className="hero-overlay"></div>
        <Image
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&h=1080&fit=crop"
          alt="NEXT STEP Vietnam"
          fill
          priority
          className="hero-background"
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          unoptimized
        />
        <div className="hero-content-wrapper">
          <div className="container">
            <div className="hero-text-box">
              <h1 className="hero-title" data-aos="fade-up">
                {t('hero_title')}
              </h1>
              <div className="hero-divider" data-aos="fade-up" data-aos-delay="100"></div>
              <p className="hero-subtitle" data-aos="fade-up" data-aos-delay="200">
                {t('hero_subtitle')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="overview-content-section">
        <div className="container">
          {/* Introduction Card */}
          <div 
            className="content-card intro-card"
            ref={(el) => { if (el) sectionsRef.current[0] = el; }}
          >
            <div className="row align-items-center">
              <div className="col-lg-5 mb-4 mb-lg-0">
                <div className="intro-image-wrapper">
                  <div className="image-decoration"></div>
                  <Image
                    src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&h=1000&fit=crop"
                    alt={t('intro_image_alt')}
                    width={500}
                    height={600}
                    className="intro-image"
                    unoptimized
                  />
                </div>
              </div>
              <div className="col-lg-7">
                <div className="intro-content">
                  <div className="section-badge">
                    <i className="fas fa-building"></i>
                    <span>{t('about_us')}</span>
                  </div>
                  <h2 className="section-title">
                    {t('intro_title')}
                  </h2>
                  <div className="content-text">
                    <p className="lead-text">
                      <strong>NEXT STEP</strong> {t('intro_lead')}
                    </p>
                    <p>
                      {t('intro_description_1')}
                    </p>
                    <p>
                      {t('intro_description_2')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Key Features Section */}
          <div 
            className="features-section"
            ref={(el) => { if (el) sectionsRef.current[1] = el; }}
          >
            <div className="text-center mb-5">
              <div className="section-badge mx-auto">
                <i className="fas fa-star"></i>
                <span>{t('features_badge')}</span>
              </div>
              <h2 className="section-title">{t('features_title')}</h2>
              <p className="section-subtitle">
                {t('features_subtitle')}
              </p>
            </div>

            <div className="row g-4">
              <div className="col-md-6 col-lg-3">
                <div className="feature-card">
                  <div className="feature-icon">
                    <i className="fas fa-graduation-cap"></i>
                  </div>
                  <h4 className="feature-title">{t('feature_1_title')}</h4>
                  <p className="feature-text">
                    {t('feature_1_text')}
                  </p>
                </div>
              </div>

              <div className="col-md-6 col-lg-3">
                <div className="feature-card">
                  <div className="feature-icon">
                    <i className="fas fa-users"></i>
                  </div>
                  <h4 className="feature-title">{t('feature_2_title')}</h4>
                  <p className="feature-text">
                    {t('feature_2_text')}
                  </p>
                </div>
              </div>

              <div className="col-md-6 col-lg-3">
                <div className="feature-card">
                  <div className="feature-icon">
                    <i className="fas fa-globe-asia"></i>
                  </div>
                  <h4 className="feature-title">{t('feature_3_title')}</h4>
                  <p className="feature-text">
                    {t('feature_3_text')}
                  </p>
                </div>
              </div>
        
              <div className="col-md-6 col-lg-3">
                <div className="feature-card">
                  <div className="feature-icon">
                    <i className="fas fa-certificate"></i>
                  </div>
                  <h4 className="feature-title">{t('feature_4_title')}</h4>
                  <p className="feature-text">
                    {t('feature_4_text')}
                  </p>
                </div>
              </div>
            </div>
        </div>

          {/* Stats Section */}
          <div 
            className="stats-section"
            ref={(el) => { if (el) sectionsRef.current[2] = el; }}
          >
            <div className="row text-center">
              <div className="col-6 col-md-3">
                <div className="stat-card">
                  <div className="stat-icon">
                    <i className="fas fa-briefcase"></i>
                  </div>
                  <h3 className="stat-number">100+</h3>
                  <p className="stat-label">{t('stat_1_label')}</p>
                </div>
              </div>
              <div className="col-6 col-md-3">
                <div className="stat-card">
                  <div className="stat-icon">
                    <i className="fas fa-handshake"></i>
                    </div>
                  <h3 className="stat-number">50+</h3>
                  <p className="stat-label">{t('stat_2_label')}</p>
                  </div>
              </div>
              <div className="col-6 col-md-3">
                <div className="stat-card">
                  <div className="stat-icon">
                    <i className="fas fa-award"></i>
                  </div>
                  <h3 className="stat-number">95%</h3>
                  <p className="stat-label">{t('stat_3_label')}</p>
                </div>
              </div>
              <div className="col-6 col-md-3">
                <div className="stat-card">
                  <div className="stat-icon">
                    <i className="fas fa-globe"></i>
                  </div>
                  <h3 className="stat-number">10+</h3>
                  <p className="stat-label">{t('stat_4_label')}</p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div 
            className="cta-section"
            ref={(el) => { if (el) sectionsRef.current[3] = el; }}
          >
            <div className="cta-card">
              <div className="row align-items-center">
                <div className="col-lg-8 mb-4 mb-lg-0">
                  <h3 className="cta-title">{t('cta_title')}</h3>
                  <p className="cta-text">
                    {t('cta_text')}
                  </p>
                </div>
                <div className="col-lg-4 text-lg-end">
                  <a href="/contact" className="btn-cta-simple">
                    {t('cta_button')}
                    <i className="fas fa-arrow-right"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Styles */}
        <style jsx>{`
        /* Hero Section */
        .overview-hero-section {
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

        .hero-background {
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

        .hero-content-wrapper {
          position: relative;
            z-index: 2;
          width: 100%;
          padding: 40px 0;
        }

        .hero-text-box {
          text-align: center;
          color: white;
        }

        .hero-title {
          font-size: 3.5rem;
          font-weight: 700;
          margin-bottom: 20px;
          letter-spacing: 2px;
          text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
          animation: fadeInUp 0.8s ease;
        }

        .hero-divider {
          width: 100px;
          height: 4px;
          background: linear-gradient(90deg, transparent, white, transparent);
          margin: 0 auto 30px;
          animation: fadeInUp 0.8s ease 0.1s both;
        }

        .hero-subtitle {
          font-size: 1.5rem;
          font-weight: 300;
          opacity: 0.95;
          max-width: 800px;
          margin: 0 auto;
          line-height: 1.6;
          animation: fadeInUp 0.8s ease 0.2s both;
        }

        /* Content Section */
        .overview-content-section {
          padding: 80px 0 80px;
          background: white;
          margin: 0;
        }

        .overview-content-section .container {
          background: white;
          padding-left: 15px;
          padding-right: 15px;
          margin: 0 auto;
        }

        .content-card {
          background: white;
          border-radius: 0;
          padding: 60px 0;
          box-shadow: none;
          margin-bottom: 60px;
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.6s ease;
        }

        .content-card.animate-in {
          opacity: 1;
          transform: translateY(0);
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
            
        .section-badge i {
              font-size: 1rem;
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

        .intro-image-wrapper {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
        }

        .image-decoration {
              position: absolute;
          top: -20px;
          left: -20px;
          right: 20px;
          bottom: 20px;
          border: 3px solid #dc2626;
          border-radius: 20px;
              z-index: -1;
        }

        .intro-image {
          width: 100%;
          height: auto;
          display: block;
          border-radius: 20px;
        }

        .intro-content {
          padding-left: 20px;
        }

        .content-text {
          font-size: 1.1rem;
          line-height: 1.8;
          color: #4a5568;
        }

        .lead-text {
          font-size: 1.2rem;
          font-weight: 500;
          color: #2d3748;
          margin-bottom: 20px;
        }

        .highlight-text {
          color: #dc2626;
          font-weight: 600;
          background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* Features Section */
        .features-section {
          margin-bottom: 60px;
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.6s ease;
        }

        .features-section.animate-in {
          opacity: 1;
          transform: translateY(0);
        }

        .feature-card {
          background: white;
          border-radius: 16px;
          padding: 40px 30px;
              height: 100%;
          text-align: center;
          transition: all 0.3s ease;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.06);
          border: 2px solid transparent;
        }

        .feature-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 15px 40px rgba(220, 38, 38, 0.2);
          border-color: #dc2626;
        }

        .feature-icon {
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
          box-shadow: 0 10px 30px rgba(220, 38, 38, 0.3);
        }

        .feature-title {
          font-size: 1.3rem;
          font-weight: 600;
          color: #1a202c;
          margin-bottom: 15px;
        }

        .feature-text {
          font-size: 1rem;
          color: #718096;
          line-height: 1.6;
          margin: 0;
        }

        /* Stats Section */
        .stats-section {
          background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%);
          border-radius: 20px;
          padding: 60px 40px;
          margin-bottom: 60px;
          box-shadow: 0 20px 60px rgba(220, 38, 38, 0.3);
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.6s ease;
        }

        .stats-section.animate-in {
          opacity: 1;
          transform: translateY(0);
        }

        .stat-card {
          padding: 20px;
        }

        .stat-icon {
          font-size: 2.5rem;
          color: white;
          margin-bottom: 15px;
          opacity: 0.9;
        }

        .stat-number {
          font-size: 3rem;
          font-weight: 700;
          color: white;
          margin-bottom: 10px;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        }

        .stat-label {
          font-size: 1rem;
          color: rgba(255, 255, 255, 0.9);
          margin: 0;
          font-weight: 500;
        }

        /* CTA Section - Big Tech Style */
        .cta-section {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.6s ease;
          margin: 0;
          padding: 0;
        }

        .cta-section .container {
          background: white;
          padding: 0 15px;
          margin: 0 auto;
        }

        .cta-section.animate-in {
          opacity: 1;
          transform: translateY(0);
        }

        .cta-card {
          background: #dc2626;
          border-radius: 0;
          padding: 48px 56px;
          box-shadow: none;
          margin: 0 0 80px 0;
        }

        .cta-title {
          font-size: 2rem;
          font-weight: 600;
          color: white;
          margin-bottom: 12px;
              line-height: 1.3;
          letter-spacing: -0.5px;
        }

        .cta-text {
          font-size: 1.125rem;
          color: rgba(255, 255, 255, 0.9);
          margin: 0;
          line-height: 1.5;
          font-weight: 400;
        }

        .btn-cta-simple {
          display: inline-flex;
              align-items: center;
          gap: 12px;
          padding: 14px 32px;
          background: white;
          color: #dc2626;
          font-size: 1rem;
          font-weight: 600;
          border-radius: 8px;
          text-decoration: none;
          transition: all 0.2s ease;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .btn-cta-simple i {
          font-size: 0.875rem;
          transition: transform 0.2s ease;
        }

        .btn-cta-simple:hover {
          background: #f9fafb;
          color: #dc2626;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          transform: translateY(-1px);
        }

        .btn-cta-simple:hover i {
          transform: translateX(3px);
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

          .hero-subtitle {
            font-size: 1.2rem;
            }
            
            .section-title {
            font-size: 2rem;
          }

          .content-card {
            padding: 40px 30px;
          }

          .intro-content {
            padding-left: 0;
            margin-top: 30px;
          }

          .stats-section {
            padding: 40px 20px;
          }

          .stat-number {
            font-size: 2.5rem;
          }
          }
          
          @media (max-width: 768px) {
          .overview-hero-section {
            height: 50vh;
            min-height: 350px;
          }

          .hero-title {
            font-size: 2rem;
            letter-spacing: 1px;
          }

          .hero-subtitle {
            font-size: 1rem;
          }

          .overview-content-section {
            padding: 40px 0 0;
          }

          .cta-section {
            padding-bottom: 40px;
          }

          .content-card {
            padding: 30px 20px;
            margin-bottom: 40px;
          }

            .section-title {
            font-size: 1.75rem;
          }

          .content-text,
          .lead-text {
            font-size: 1rem;
          }

          .feature-card {
            padding: 30px 20px;
            margin-bottom: 20px;
          }

          .feature-icon {
            width: 60px;
            height: 60px;
            font-size: 1.5rem;
          }

          .stat-number {
            font-size: 2rem;
          }

          .stat-label {
            font-size: 0.9rem;
          }

          .cta-card {
            padding: 32px 24px;
            text-align: center;
          }

          .cta-title {
            font-size: 1.5rem;
          }

          .cta-text {
            font-size: 1rem;
            margin-bottom: 24px;
          }

          .btn-cta-simple {
            width: 100%;
            justify-content: center;
          }
        }

        @media (max-width: 576px) {
          .hero-title {
            font-size: 1.75rem;
          }

          .hero-subtitle {
            font-size: 0.95rem;
          }

          .section-badge {
            font-size: 0.85rem;
            padding: 6px 16px;
          }

          .feature-title {
            font-size: 1.1rem;
          }

          .stat-card {
            padding: 15px 5px;
            }
          }
        `}</style>
    </>
  );
}
