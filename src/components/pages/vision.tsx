"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

export default function Vision() {
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
          alt="Tầm Nhìn Chiến Lược NEXT STEP"
          fill
          priority
          className="hero-bg"
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          unoptimized
        />
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">Tầm Nhìn Chiến Lược</h1>
            <div className="hero-divider"></div>
            <p className="hero-subtitle">2025 - 2035</p>
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
                    alt="Tầm Nhìn 10 Năm"
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
                    <span>Tầm Nhìn 10 Năm</span>
                  </div>
                  <h2 className="section-title">
                    Tầm Nhìn Chiến Lược Của NEXT STEP <br/>(2025–2035)
                  </h2>
                  <p className="lead-text">
                    Trong 10 năm tới, NEXT STEP hướng tới trở thành <strong>tập đoàn hàng đầu khu vực châu Á</strong> trong lĩnh vực phát triển và cung ứng kỹ sư quốc tế, đặc biệt là cầu nối nhân lực chất lượng cao giữa Việt Nam và Nhật Bản.
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
                <span>Ba Trụ Cột Chiến Lược</span>
              </div>
              <h2 className="section-title">Hệ Sinh Thái Toàn Diện</h2>
            </div>

            <div className="row g-4">
              <div className="col-lg-4 col-md-6">
                <div className="pillar-card">
                  <div className="pillar-icon">
                    <i className="fas fa-graduation-cap"></i>
                  </div>
                  <h3 className="pillar-title">Đào Tạo</h3>
                  <p className="pillar-text">
                    Xây dựng hệ sinh thái đào tạo – kết nối – phát triển nghề nghiệp toàn diện, nơi mà kỹ sư Việt được trang bị đầy đủ nguồn lực ngôn ngữ, kỹ thuật và tư duy toàn cầu để đáp ứng nhu cầu ngày càng cao của các doanh nghiệp quốc tế.
                  </p>
                </div>
              </div>

              <div className="col-lg-4 col-md-6">
                <div className="pillar-card highlight">
                  <div className="pillar-icon">
                    <i className="fas fa-link"></i>
                  </div>
                  <h3 className="pillar-title">Kết Nối</h3>
                  <p className="pillar-text">
                    Mở rộng mạng lưới hợp tác với các trường đại học, viện đào tạo và doanh nghiệp tại Việt Nam và Nhật Bản, đồng thời ứng dụng công nghệ số trong quản lý, đào tạo và tuyển dụng để nâng cao hiệu quả và chất lượng dịch vụ.
                  </p>
                </div>
              </div>

              <div className="col-lg-4 col-md-6">
                <div className="pillar-card">
                  <div className="pillar-icon">
                    <i className="fas fa-rocket"></i>
                  </div>
                  <h3 className="pillar-title">Phát Triển</h3>
                  <p className="pillar-text">
                    Đến năm 2035, NEXT STEP phấn đấu trở thành biểu tượng uy tín về phát triển nguồn nhân lực kỹ thuật Việt Nam, góp phần đưa hàng nghìn kỹ sư Việt vươn tới thế giới, khẳng định vị thế và trí tuệ Việt Nam trên sàn diễn quốc tế.
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
                  <h3 className="objective-title">Mục Tiêu Đến 2035</h3>
                  <ul className="objective-list">
                    <li>
                      <i className="fas fa-check-circle"></i>
                      <span>Trở thành tập đoàn hàng đầu châu Á về phát triển kỹ sư quốc tế</span>
                    </li>
                    <li>
                      <i className="fas fa-check-circle"></i>
                      <span>Biểu tượng uy tín về phát triển nguồn nhân lực kỹ thuật Việt Nam</span>
                    </li>
                    <li>
                      <i className="fas fa-check-circle"></i>
                      <span>Đưa hàng nghìn kỹ sư Việt vươn tới thế giới</span>
                    </li>
                    <li>
                      <i className="fas fa-check-circle"></i>
                      <span>Khẳng định vị thế và trí tuệ Việt Nam trên sàn diễn quốc tế</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="col-lg-6 mb-4">
                <div className="objective-card">
                  <div className="objective-icon">
                    <i className="fas fa-lightbulb"></i>
                  </div>
                  <h3 className="objective-title">Giá Trị Cốt Lõi</h3>
                  <ul className="objective-list">
                    <li>
                      <i className="fas fa-check-circle"></i>
                      <span>Chất lượng đào tạo hàng đầu với chuẩn quốc tế</span>
                    </li>
                    <li>
                      <i className="fas fa-check-circle"></i>
                      <span>Ứng dụng công nghệ số hiện đại trong quản lý và đào tạo</span>
                    </li>
                    <li>
                      <i className="fas fa-check-circle"></i>
                      <span>Mạng lưới đối tác rộng khắp Việt Nam và Nhật Bản</span>
                    </li>
                    <li>
                      <i className="fas fa-check-circle"></i>
                      <span>Cam kết phát triển bền vững và trách nhiệm xã hội</span>
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
                <span>Lộ Trình Phát Triển</span>
              </div>
              <h2 className="section-title">Hành Trình 10 Năm</h2>
              <p className="section-subtitle">
                Từ tầm nhìn đến hiện thực - Chiến lược phát triển bền vững
              </p>
            </div>

            <div className="timeline">
              <div className="timeline-item">
                <div className="timeline-marker">2025-2027</div>
                <div className="timeline-content">
                  <h4>Giai Đoạn 1: Xây Dựng Nền Tảng</h4>
                  <p>Thiết lập hệ thống đào tạo chuẩn quốc tế, mở rộng mạng lưới đối tác chiến lược</p>
                </div>
              </div>

              <div className="timeline-item">
                <div className="timeline-marker">2028-2030</div>
                <div className="timeline-content">
                  <h4>Giai Đoạn 2: Mở Rộng & Phát Triển</h4>
                  <p>Ứng dụng công nghệ số, tăng quy mô đào tạo, mở rộng thị trường châu Á</p>
                </div>
              </div>

              <div className="timeline-item">
                <div className="timeline-marker">2031-2035</div>
                <div className="timeline-content">
                  <h4>Giai Đoạn 3: Dẫn Đầu Khu Vực</h4>
                  <p>Trở thành tập đoàn hàng đầu châu Á, khẳng định thương hiệu quốc tế</p>
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
              <h3 className="cta-title">Cùng NEXT STEP Hiện Thực Hóa Ước Mơ</h3>
              <p className="cta-text">
                Tham gia cùng chúng tôi trong hành trình chinh phục thế giới
              </p>
              <a href="/contact" className="btn-cta">
                Liên Hệ Ngay
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

        /* Timeline */
        .timeline-section {
          margin-bottom: 80px;
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.6s ease;
        }

        .timeline-section.animate-in {
          opacity: 1;
          transform: translateY(0);
        }

        .timeline {
          position: relative;
          max-width: 800px;
          margin: 0 auto;
          padding: 20px 0;
        }

        .timeline::before {
          content: '';
          position: absolute;
          left: 50%;
          top: 0;
          bottom: 0;
          width: 2px;
          background: linear-gradient(180deg, #dc2626 0%, #991b1b 100%);
          transform: translateX(-50%);
        }

        .timeline-item {
          position: relative;
          margin-bottom: 60px;
          display: flex;
          align-items: center;
        }

        .timeline-item:nth-child(odd) {
          flex-direction: row;
        }

        .timeline-item:nth-child(even) {
          flex-direction: row-reverse;
        }

        .timeline-marker {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          width: 120px;
          height: 120px;
          background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 1.2rem;
          font-weight: 700;
          box-shadow: 0 10px 30px rgba(220, 38, 38, 0.3);
          z-index: 2;
        }

        .timeline-content {
          width: calc(50% - 80px);
          background: white;
          padding: 30px;
          border-radius: 12px;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
        }

        .timeline-item:nth-child(odd) .timeline-content {
          margin-right: auto;
        }

        .timeline-item:nth-child(even) .timeline-content {
          margin-left: auto;
        }

        .timeline-content h4 {
          font-size: 1.3rem;
          font-weight: 600;
          color: #dc2626;
          margin-bottom: 10px;
        }

        .timeline-content p {
          font-size: 1rem;
          color: #718096;
          line-height: 1.6;
          margin: 0;
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

