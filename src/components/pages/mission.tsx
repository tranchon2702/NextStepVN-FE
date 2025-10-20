"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

export default function Mission() {
  const { t } = useTranslation("mission");
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
      <section className="mission-hero">
        <div className="hero-overlay"></div>
        <Image
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&h=1080&fit=crop"
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
      <section className="mission-content">
        <div className="container">
          
          {/* Mission Statement */}
          <div 
            className="mission-statement"
            ref={(el) => { if (el) sectionsRef.current[0] = el; }}
          >
            <div className="text-center mb-5">
              <div className="section-badge mx-auto">
                <i className="fas fa-bullseye"></i>
                <span>{t('statement_badge')}</span>
              </div>
              <h2 className="section-title">{t('statement_title')}</h2>
            </div>

            <div className="statement-card">
              <p className="statement-text">
                {t('statement_text_1')}
              </p>
              <p className="statement-text">
                {t('statement_text_2')}
              </p>
              <p className="statement-text">
                {t('statement_text_3')}
              </p>
            </div>
          </div>

          {/* Core Values */}
          <div 
            className="values-section"
            ref={(el) => { if (el) sectionsRef.current[1] = el; }}
          >
            <div className="text-center mb-5">
              <div className="section-badge mx-auto">
                <i className="fas fa-heart"></i>
                <span>{t('values_badge')}</span>
              </div>
              <h2 className="section-title">{t('values_title')}</h2>
            </div>

            <div className="row g-4">
              <div className="col-lg-3 col-md-6">
                <div className="value-card">
                  <div className="value-icon">
                    <i className="fas fa-handshake"></i>
                  </div>
                  <h3 className="value-title">{t('value_1_title')}</h3>
                  <p className="value-text">
                    {t('value_1_text')}
                  </p>
                </div>
              </div>

              <div className="col-lg-3 col-md-6">
                <div className="value-card">
                  <div className="value-icon">
                    <i className="fas fa-graduation-cap"></i>
                  </div>
                  <h3 className="value-title">{t('value_2_title')}</h3>
                  <p className="value-text">
                    {t('value_2_text')}
                  </p>
                </div>
              </div>

              <div className="col-lg-3 col-md-6">
                <div className="value-card">
                  <div className="value-icon">
                    <i className="fas fa-medal"></i>
                  </div>
                  <h3 className="value-title">{t('value_3_title')}</h3>
                  <p className="value-text">
                    {t('value_3_text')}
                  </p>
                </div>
              </div>

              <div className="col-lg-3 col-md-6">
                <div className="value-card">
                  <div className="value-icon">
                    <i className="fas fa-rocket"></i>
                  </div>
                  <h3 className="value-title">{t('value_4_title')}</h3>
                  <p className="value-text">
                    {t('value_4_text')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* What We Do */}
          <div 
            className="services-section"
            ref={(el) => { if (el) sectionsRef.current[2] = el; }}
          >
            <div className="row align-items-center">
              <div className="col-lg-6 mb-4 mb-lg-0">
                <div className="section-badge">
                  <i className="fas fa-tasks"></i>
                  <span>{t('services_badge')}</span>
                </div>
                <h2 className="section-title">{t('services_title')}</h2>
                
                <div className="service-item">
                  <div className="service-icon">
                    <i className="fas fa-briefcase"></i>
                  </div>
                  <div className="service-content">
                    <h4>{t('service_1_title')}</h4>
                    <p>{t('service_1_text')}</p>
                  </div>
                </div>

                <div className="service-item">
                  <div className="service-icon">
                    <i className="fas fa-language"></i>
                  </div>
                  <div className="service-content">
                    <h4>{t('service_2_title')}</h4>
                    <p>{t('service_2_text')}</p>
                  </div>
                </div>

                <div className="service-item">
                  <div className="service-icon">
                    <i className="fas fa-cogs"></i>
                  </div>
                  <div className="service-content">
                    <h4>{t('service_3_title')}</h4>
                    <p>{t('service_3_text')}</p>
                  </div>
                </div>

                <div className="service-item">
                  <div className="service-icon">
                    <i className="fas fa-users"></i>
                  </div>
                  <div className="service-content">
                    <h4>{t('service_4_title')}</h4>
                    <p>{t('service_4_text')}</p>
                  </div>
                </div>
              </div>

              <div className="col-lg-6">
                <div className="services-image">
                  <Image
                    src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=1000&fit=crop"
                    alt={t('services_image_alt')}
                    width={800}
                    height={1000}
                    className="img-fluid rounded"
                    unoptimized
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Our Commitment */}
          <div 
            className="commitment-section"
            ref={(el) => { if (el) sectionsRef.current[3] = el; }}
          >
            <div className="commitment-card">
              <div className="row align-items-center">
                <div className="col-lg-8 mb-4 mb-lg-0">
                  <h3 className="commitment-title">{t('commitment_title')}</h3>
                  <div className="commitment-list">
                    <div className="commitment-item">
                      <i className="fas fa-check-circle"></i>
                      <span>{t('commitment_item_1')}</span>
                    </div>
                    <div className="commitment-item">
                      <i className="fas fa-check-circle"></i>
                      <span>{t('commitment_item_2')}</span>
                    </div>
                    <div className="commitment-item">
                      <i className="fas fa-check-circle"></i>
                      <span>{t('commitment_item_3')}</span>
                    </div>
                    <div className="commitment-item">
                      <i className="fas fa-check-circle"></i>
                      <span>{t('commitment_item_4')}</span>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 text-lg-end">
                  <a href="/contact" className="btn-commitment">
                    {t('commitment_button')}
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
        .mission-hero {
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
          font-size: 1.5rem;
          font-weight: 300;
          opacity: 0.95;
          animation: fadeInUp 0.8s ease 0.2s both;
        }

        /* Content Section */
        .mission-content {
          padding: 80px 0;
          background: white;
        }

        /* Mission Statement */
        .mission-statement {
          margin-bottom: 80px;
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.6s ease;
        }

        .mission-statement.animate-in {
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

        .section-title {
          font-size: 2.5rem;
          font-weight: 700;
          color: #1a202c;
          margin-bottom: 40px;
          line-height: 1.3;
        }

        .statement-card {
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
          border-radius: 16px;
          padding: 50px;
          border-left: 5px solid #dc2626;
        }

        .statement-text {
          font-size: 1.2rem;
          line-height: 1.8;
          color: #4a5568;
          margin-bottom: 20px;
        }

        .statement-text:last-child {
          margin-bottom: 0;
        }

        .highlight {
          color: #dc2626;
          font-weight: 600;
        }

        /* Values Section */
        .values-section {
          margin-bottom: 80px;
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.6s ease;
        }

        .values-section.animate-in {
          opacity: 1;
          transform: translateY(0);
        }

        .value-card {
          background: white;
          border-radius: 16px;
          padding: 40px 30px;
          height: 100%;
          text-align: center;
          transition: all 0.3s ease;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.06);
          border: 2px solid transparent;
        }

        .value-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 15px 40px rgba(220, 38, 38, 0.2);
          border-color: #dc2626;
        }

        .value-icon {
          width: 70px;
          height: 70px;
          margin: 0 auto 20px;
          background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.8rem;
          color: white;
        }

        .value-title {
          font-size: 1.3rem;
          font-weight: 600;
          color: #1a202c;
          margin-bottom: 15px;
        }

        .value-text {
          font-size: 1rem;
          color: #718096;
          line-height: 1.6;
          margin: 0;
        }

        /* Services Section */
        .services-section {
          margin-bottom: 80px;
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.6s ease;
        }

        .services-section.animate-in {
          opacity: 1;
          transform: translateY(0);
        }

        .service-item {
          display: flex;
          gap: 20px;
          margin-bottom: 30px;
          padding: 20px;
          border-radius: 12px;
          transition: all 0.3s ease;
        }

        .service-item:hover {
          background: #f8f9fa;
          transform: translateX(10px);
        }

        .service-icon {
          width: 50px;
          height: 50px;
          background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.3rem;
          color: white;
          flex-shrink: 0;
        }

        .service-content h4 {
          font-size: 1.2rem;
          font-weight: 600;
          color: #1a202c;
          margin-bottom: 8px;
        }

        .service-content p {
          font-size: 1rem;
          color: #718096;
          line-height: 1.6;
          margin: 0;
        }

        .services-image {
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
        }

        /* Commitment Section */
        .commitment-section {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.6s ease;
        }

        .commitment-section.animate-in {
          opacity: 1;
          transform: translateY(0);
        }

        .commitment-card {
          background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%);
          border-radius: 16px;
          padding: 50px;
          color: white;
        }

        .commitment-title {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 30px;
        }

        .commitment-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .commitment-item {
          display: flex;
          align-items: center;
          gap: 15px;
          font-size: 1.1rem;
          line-height: 1.6;
        }

        .commitment-item i {
          font-size: 1.3rem;
          color: white;
          flex-shrink: 0;
        }

        .btn-commitment {
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

        .btn-commitment:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
          color: #dc2626;
        }

        .btn-commitment i {
          transition: transform 0.2s ease;
        }

        .btn-commitment:hover i {
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

          .statement-card {
            padding: 35px;
          }

          .services-image {
            margin-top: 30px;
          }
        }

        @media (max-width: 768px) {
          .mission-hero {
            height: 50vh;
            min-height: 350px;
          }

          .hero-title {
            font-size: 2rem;
          }

          .hero-subtitle {
            font-size: 1.2rem;
          }

          .mission-content {
            padding: 40px 0;
          }

          .mission-statement,
          .values-section,
          .services-section {
            margin-bottom: 40px;
          }

          .section-title {
            font-size: 1.75rem;
          }

          .statement-card {
            padding: 25px;
          }

          .statement-text {
            font-size: 1.1rem;
          }

          .value-card,
          .service-item {
            margin-bottom: 20px;
          }

          .commitment-card {
            padding: 35px 25px;
            text-align: center;
          }

          .commitment-title {
            font-size: 1.75rem;
          }

          .commitment-item {
            font-size: 1rem;
          }

          .btn-commitment {
            width: 100%;
            justify-content: center;
            margin-top: 20px;
          }
        }

        @media (max-width: 576px) {
          .hero-title {
            font-size: 1.75rem;
          }

          .statement-text {
            font-size: 1rem;
          }

          .service-item {
            padding: 15px;
          }
        }
      `}</style>
    </>
  );
}


