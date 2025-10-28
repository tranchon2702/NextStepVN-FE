"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

// Candidate categories
const candidateCategories = [
  {
    id: "auto",
    name: "Kỹ sư Ô tô",
    icon: "fas fa-car",
    description: "Thiết kế – sản xuất – QA/QC linh kiện/xe hoàn chỉnh theo tiêu chuẩn Nhật.",
    details: "Thành thạo CAD/CAE (CATIA, NX, SolidWorks), hiểu JIS, APQP/PPAP; kinh nghiệm lắp ráp, thử nghiệm, quản lý chất lượng chuỗi cung ứng.",
    requirements: "Ưu tiên JLPT N2–N3, sẵn sàng làm việc tại Nhật; có thể onboard trong 2–4 tuần.",
    color: "#dc2626",
    image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&h=600&fit=crop"
  },
  {
    id: "mechanical",
    name: "Kỹ sư Cơ khí",
    icon: "fas fa-cogs",
    description: "Thiết kế máy, jig/fixture, khuôn – tự động hóa và tối ưu hóa sản xuất.",
    details: "SolidWorks/Inventor/AutoCAD, tính bền – dung sai, BOM/BoP, FMEA; đã triển khai dự án tại nhà máy quy mô vừa & lớn.",
    requirements: "JLPT N2 trở lên là lợi thế; kỹ năng giao tiếp nhóm, báo cáo kỹ thuật tiếng Nhật/Anh tốt.",
    color: "#991b1b",
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&h=600&fit=crop"
  },
  {
    id: "construction",
    name: "Kỹ sư Xây dựng",
    icon: "fas fa-hard-hat",
    description: "Thiết kế – giám sát – quản lý tiến độ & chất lượng công trình dân dụng/nhà xưởng.",
    details: "AutoCAD/Revit, kiểm soát khối lượng, hồ sơ nghiệm thu, an toàn lao động; kinh nghiệm phối hợp MEP và nhà thầu phụ.",
    requirements: "Ưu tiên có chứng chỉ hành nghề; JLPT N3+, sẵn sàng công tác/đi công trường dài ngày.",
    color: "#dc2626",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&h=600&fit=crop"
  },
  {
    id: "electrical",
    name: "Kỹ sư Điện – Điện tử",
    icon: "fas fa-bolt",
    description: "Thiết kế mạch – tủ điện – PLC/SCADA – nhúng/IoT cho công nghiệp.",
    details: "PLC (Mitsubishi/Omron/Siemens), HMI, P&ID, EMC/ESD; thiết kế PCB, vi điều khiển (STM32/ESP), chuẩn hóa an toàn điện.",
    requirements: "JLPT N2–N3; ưu tiên có chứng chỉ an toàn điện, kinh nghiệm commissioning tại nhà máy Nhật.",
    color: "#991b1b",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&h=600&fit=crop"
  },
  {
    id: "it",
    name: "Kỹ sư IT",
    icon: "fas fa-laptop-code",
    description: "Phát triển Web/Mobile, hệ thống doanh nghiệp và giải pháp Cloud/AI.",
    details: "Java/.NET/Node.js, React/Vue, SQL/NoSQL; CI/CD, Docker/K8s, AWS/Azure/GCP; quy trình Agile/Scrum, code review chuẩn.",
    requirements: "JLPT N2+ cho onsite; tiếng Nhật giao tiếp dự án; có kinh nghiệm offshore/BrSE là lợi thế mạnh.",
    color: "#dc2626",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop"
  }
];

export default function ForRecruiters() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
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

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(selectedCategory === categoryId ? null : categoryId);
  };

  return (
    <>
      {/* Hero Banner */}
      <section className="recruiters-hero">
        <div className="hero-overlay"></div>
        <Image
          src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1920&h=1080&fit=crop"
          alt="Dành cho nhà tuyển dụng"
          fill
          priority
          className="hero-bg"
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          unoptimized
        />
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">Dành Cho Nhà Tuyển Dụng</h1>
            <div className="hero-divider"></div>
            <p className="hero-subtitle">Tìm kiếm ứng viên kỹ sư chất lượng cao từ Việt Nam</p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="recruiters-content">
        <div className="container">
          
          {/* Introduction */}
          <div 
            className="intro-section"
            ref={(el) => { if (el) sectionsRef.current[0] = el; }}
          >
            <div className="text-center mb-5">
              <div className="section-badge mx-auto">
                <i className="fas fa-users"></i>
                <span>Nguồn Nhân Lực Chất Lượng</span>
              </div>
              <h2 className="section-title">TÌM KIẾM ỨNG VIÊN</h2>
              <p className="section-subtitle">
                Chúng tôi cung cấp kỹ sư Việt Nam có trình độ cao, sẵn sàng làm việc tại Nhật Bản
              </p>
            </div>
          </div>

          {/* Categories Grid */}
          <div 
            className="categories-section"
            ref={(el) => { if (el) sectionsRef.current[1] = el; }}
          >
            <div className="categories-grid">
              {candidateCategories.map((category) => (
                <div
                  key={category.id}
                  className="candidate-card"
                >
                  <div className="card-image-wrapper">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="card-image"
                      style={{ objectFit: 'cover' }}
                      unoptimized
                    />
                    <div className="card-overlay"></div>
                  </div>
                  
                  <div className="card-content">
                    <h3 className="card-title">{category.name}</h3>
                    
                    <div className="card-description">
                      <p className="description-text">{category.description}</p>
                      <p className="description-text">{category.details}</p>
                      <p className="description-text requirements">{category.requirements}</p>
                    </div>

                    <div className="card-actions">
                      <Link href={`/candidates/${category.id}`} className="btn-contact-link">
                        <span className="btn-contact-inner">
                          <i className="fas fa-users"></i>
                          <span>Xem Ứng Viên</span>
                        </span>
                      </Link>
                      <a href="/contact" className="btn-info">
                        <i className="fas fa-envelope"></i>
                        Liên Hệ Ngay
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Why Choose Us */}
          <div 
            className="why-choose-section"
            ref={(el) => { if (el) sectionsRef.current[2] = el; }}
          >
            <div className="text-center mb-5">
              <div className="section-badge mx-auto">
                <i className="fas fa-star"></i>
                <span>Lợi Ích</span>
              </div>
              <h2 className="section-title">Tại Sao Chọn NEXT STEP?</h2>
            </div>

            <div className="row g-4">
              <div className="col-lg-3 col-md-6">
                <div className="benefit-card">
                  <div className="benefit-icon">
                    <i className="fas fa-user-check"></i>
                  </div>
                  <h4 className="benefit-title">Ứng Viên Chất Lượng</h4>
                  <p className="benefit-text">
                    Kỹ sư được đào tạo bài bản, có kinh nghiệm và kỹ năng chuyên môn cao
                  </p>
                </div>
              </div>

              <div className="col-lg-3 col-md-6">
                <div className="benefit-card">
                  <div className="benefit-icon">
                    <i className="fas fa-language"></i>
                  </div>
                  <h4 className="benefit-title">Tiếng Nhật Tốt</h4>
                  <p className="benefit-text">
                    Ứng viên có khả năng giao tiếp tiếng Nhật từ N3 trở lên, sẵn sàng hội nhập
                  </p>
                </div>
              </div>

              <div className="col-lg-3 col-md-6">
                <div className="benefit-card">
                  <div className="benefit-icon">
                    <i className="fas fa-headset"></i>
                  </div>
                  <h4 className="benefit-title">Hỗ Trợ Toàn Diện</h4>
                  <p className="benefit-text">
                    Tư vấn và hỗ trợ trong suốt quá trình tuyển dụng và hội nhập
                  </p>
                </div>
              </div>

              <div className="col-lg-3 col-md-6">
                <div className="benefit-card">
                  <div className="benefit-icon">
                    <i className="fas fa-clock"></i>
                  </div>
                  <h4 className="benefit-title">Nhanh Chóng</h4>
                  <p className="benefit-text">
                    Quy trình tuyển dụng nhanh gọn, cung cấp hồ sơ ứng viên kịp thời
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div 
            className="cta-section"
            ref={(el) => { if (el) sectionsRef.current[3] = el; }}
          >
            <div className="row align-items-center">
              <div className="col-lg-8 mb-4 mb-lg-0">
                <h3 className="cta-title">Bạn Đang Tìm Kiếm Nhân Tài?</h3>
                <p className="cta-text">
                  Liên hệ với chúng tôi ngay hôm nay để nhận tư vấn và hồ sơ ứng viên phù hợp nhất!
                </p>
              </div>
              <div className="col-lg-4 text-lg-end">
                <a href="/contact" className="btn-cta">
                  Liên Hệ Tư Vấn
                  <i className="fas fa-arrow-right"></i>
                </a>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Styles */}
      <style jsx global>{`
        /* Remove all underlines from buttons */
        a.btn-contact-link,
        a.btn-contact-link:hover,
        a.btn-contact-link:focus,
        a.btn-contact-link:active,
        a.btn-contact-link:visited {
          text-decoration: none !important;
          border-bottom: none !important;
        }

        a.btn-contact-link * {
          text-decoration: none !important;
        }
      `}</style>
      <style jsx>{`
        /* Hero Section */
        .recruiters-hero {
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
        .recruiters-content {
          padding: 80px 0;
          background: white;
        }

        /* Intro Section */
        .intro-section {
          margin-bottom: 60px;
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.6s ease;
        }

        .intro-section.animate-in {
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
          margin-bottom: 15px;
          line-height: 1.3;
        }

        .section-subtitle {
          font-size: 1.2rem;
          color: #718096;
          max-width: 700px;
          margin: 0 auto;
        }

        /* Categories Section */
        .categories-section {
          margin-bottom: 80px;
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.6s ease;
        }

        .categories-section.animate-in {
          opacity: 1;
          transform: translateY(0);
        }

        .categories-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 30px;
        }

        .candidate-card {
          background: white;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
        }

        .candidate-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 40px rgba(220, 38, 38, 0.2);
        }

        .card-image-wrapper {
          position: relative;
          width: 100%;
          height: 250px;
          flex-shrink: 0;
        }

        .card-image {
          object-fit: cover;
        }

        .card-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(to bottom, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.5) 100%);
          z-index: 1;
        }

        .card-content {
          padding: 30px;
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .card-title {
          font-size: 1.6rem;
          font-weight: 700;
          color: #1a202c;
          margin-bottom: 20px;
        }

        .card-description {
          margin-bottom: 25px;
          flex: 1;
        }

        .description-text {
          color: #4a5568;
          line-height: 1.8;
          margin-bottom: 15px;
        }

        .description-text:last-child {
          margin-bottom: 0;
        }

        .requirements {
          font-weight: 600;
          color: #2d3748;
        }

        .card-actions {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .btn-contact-link,
        .btn-info {
          display: block;
          text-decoration: none !important;
          transition: all 0.3s ease;
          width: 100%;
        }

        .btn-contact-link,
        .btn-contact-link:hover,
        .btn-contact-link:focus,
        .btn-contact-link:active,
        .btn-contact-link:visited {
          text-decoration: none !important;
          color: inherit;
        }

        .btn-contact-link *,
        .btn-contact-link *:hover,
        .btn-contact-link *:focus,
        .btn-contact-link *:active {
          text-decoration: none !important;
        }

        .btn-contact-inner {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 16px 20px;
          background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%);
          color: white;
          border-radius: 12px;
          font-weight: 700;
          font-size: 0.85rem;
          letter-spacing: 0.3px;
          text-transform: uppercase;
          position: relative;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(220, 38, 38, 0.4), 
                      0 1px 3px rgba(220, 38, 38, 0.2),
                      inset 0 1px 0 rgba(255, 255, 255, 0.2);
          transition: all 0.3s ease;
          cursor: pointer;
          width: 100%;
          height: 100%;
        }

        .btn-contact-inner::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, 
            transparent, 
            rgba(255, 255, 255, 0.3), 
            transparent
          );
          transition: left 0.5s ease;
        }

        .btn-contact-inner::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 12px;
          padding: 2px;
          background: linear-gradient(135deg, rgba(255,255,255,0.3), transparent);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          opacity: 0.5;
          pointer-events: none;
        }

        .btn-contact-link:hover .btn-contact-inner {
          transform: translateY(-3px);
          box-shadow: 0 15px 40px rgba(220, 38, 38, 0.6), 
                      0 5px 10px rgba(220, 38, 38, 0.3),
                      inset 0 1px 0 rgba(255, 255, 255, 0.3);
          letter-spacing: 0.8px;
        }

        .btn-contact-link:hover .btn-contact-inner::before {
          left: 100%;
        }

        .btn-contact-link:active .btn-contact-inner {
          transform: translateY(-1px);
          box-shadow: 0 8px 20px rgba(220, 38, 38, 0.5);
        }

        .btn-contact-inner i {
          font-size: 1.1rem;
          transition: all 0.3s ease;
          filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));
        }

        .btn-contact-link:hover .btn-contact-inner i {
          transform: translateX(3px);
          filter: drop-shadow(0 3px 6px rgba(0,0,0,0.3));
        }

        .btn-info {
          padding: 16px 20px;
          border-radius: 12px;
          font-weight: 700;
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.3px;
          display: flex;
          align-items: center;
          gap: 10px;
          justify-content: center;
          background: white;
          color: #dc2626;
          border: 2px solid #dc2626;
          box-shadow: 0 4px 15px rgba(220, 38, 38, 0.15);
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .btn-info:hover {
          background: #dc2626;
          color: white;
          transform: translateY(-3px);
          box-shadow: 0 8px 25px rgba(220, 38, 38, 0.3);
        }

        .btn-info:active {
          transform: translateY(-1px);
          box-shadow: 0 4px 15px rgba(220, 38, 38, 0.2);
        }

        .btn-info i {
          font-size: 1.1rem;
          transition: transform 0.3s ease;
        }

        .btn-info:hover i {
          transform: scale(1.1);
        }

        /* Why Choose Section */
        .why-choose-section {
          margin-bottom: 80px;
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.6s ease;
        }

        .why-choose-section.animate-in {
          opacity: 1;
          transform: translateY(0);
        }

        .benefit-card {
          background: white;
          border-radius: 16px;
          padding: 35px 25px;
          text-align: center;
          transition: all 0.3s ease;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
          height: 100%;
        }

        .benefit-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 15px 40px rgba(220, 38, 38, 0.2);
        }

        .benefit-icon {
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

        .benefit-title {
          font-size: 1.3rem;
          font-weight: 700;
          color: #1a202c;
          margin-bottom: 15px;
        }

        .benefit-text {
          color: #718096;
          line-height: 1.6;
          margin: 0;
        }

        /* CTA Section */
        .cta-section {
          background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%);
          border-radius: 16px;
          padding: 50px;
          margin: 0 15px;
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.6s ease;
        }

        .cta-section.animate-in {
          opacity: 1;
          transform: translateY(0);
        }

        .cta-title {
          font-size: 2rem;
          font-weight: 700;
          color: white;
          margin-bottom: 15px;
        }

        .cta-text {
          font-size: 1.1rem;
          color: white;
          opacity: 0.95;
          margin: 0;
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

          .categories-grid {
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          }
        }

        @media (max-width: 768px) {
          .recruiters-hero {
            height: 50vh;
            min-height: 350px;
          }

          .hero-title {
            font-size: 2rem;
          }

          .hero-subtitle {
            font-size: 1.2rem;
          }

          .recruiters-content {
            padding: 40px 0;
          }

          .intro-section,
          .categories-section,
          .why-choose-section {
            margin-bottom: 40px;
          }

          .section-title {
            font-size: 1.75rem;
          }

          .categories-grid {
            grid-template-columns: 1fr;
          }

          .card-actions {
            flex-direction: column;
          }

          .btn-contact-link,
          .btn-info {
            width: 100%;
          }

          .cta-section {
            padding: 35px 25px;
            text-align: center;
            margin: 0;
          }

          .cta-title {
            font-size: 1.75rem;
          }

          .btn-cta {
            width: 100%;
            justify-content: center;
            margin-top: 20px;
          }
        }

        @media (max-width: 576px) {
          .hero-title {
            font-size: 1.75rem;
          }

          .card-header {
            height: 220px;
          }
        }
      `}</style>
    </>
  );
}

