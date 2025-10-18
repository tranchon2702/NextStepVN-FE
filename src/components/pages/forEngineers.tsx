"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const BACKEND_DOMAIN = process.env.NEXT_PUBLIC_BACKEND_DOMAIN || 'http://localhost:5001';

// Job categories mapped to database categories
const jobCategories = [
  {
    id: "CƠ KHÍ",
    name: "Kỹ sư cơ khí",
    icon: "fas fa-cogs",
    description: "Thiết kế, phát triển và bảo trì các hệ thống cơ khí",
    color: "#dc2626",
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&h=600&fit=crop"
  },
  {
    id: "Ô TÔ",
    name: "Kỹ sư ôtô",
    icon: "fas fa-car",
    description: "Nghiên cứu, thiết kế và sản xuất phương tiện ô tô",
    color: "#991b1b",
    image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&h=600&fit=crop"
  },
  {
    id: "ĐIỆN, ĐIỆN TỬ",
    name: "Kỹ sư điện - điện tử",
    icon: "fas fa-bolt",
    description: "Thiết kế và quản lý các hệ thống điện và điện tử",
    color: "#dc2626",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&h=600&fit=crop"
  },
  {
    id: "IT",
    name: "Kỹ sư IT",
    icon: "fas fa-laptop-code",
    description: "Lập trình, phát triển phần mềm, Web, Game",
    color: "#991b1b",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop"
  },
  {
    id: "XÂY DỰNG",
    name: "Kỹ sư xây dựng",
    icon: "fas fa-hard-hat",
    description: "Thiết kế nhà, cầu đường, thuỷ điện",
    color: "#dc2626",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&h=600&fit=crop"
  }
];

// Will be replaced with API data
const mockJobs: { [key: string]: any[] } = {
  civil: [
    {
      id: "1",
      title: "Kỹ sư thiết kế cơ khí sản phẩm mềm Catia V5",
      location: "Shizuoka-ken, Nhật Bản",
      type: "Full-time",
      salary: "¥300,000 - ¥450,000",
      description: "Thiết kế các sản phẩm mềm sử dụng phần mềm Catia V5",
      requirements: ["Tốt nghiệp đại học chuyên ngành Cơ khí", "Có kinh nghiệm sử dụng Catia V5", "Tiếng Nhật N3 trở lên"],
      postedDate: "2 ngày trước",
      company: "Toyota Manufacturing",
      image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=300&fit=crop"
    },
    {
      id: "2",
      title: "Kỹ sư cơ khí sản xuất",
      location: "Tokyo, Nhật Bản",
      type: "Full-time",
      salary: "¥280,000 - ¥420,000",
      description: "Quản lý và giám sát quy trình sản xuất cơ khí",
      requirements: ["Tốt nghiệp đại học Cơ khí", "Có kinh nghiệm 2 năm", "Tiếng Nhật N2"],
      postedDate: "5 ngày trước",
      company: "Mitsubishi Heavy Industries",
      image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=300&fit=crop"
    }
  ],
  auto: [
    {
      id: "3",
      title: "Kỹ sư xuất chi tiết oto tại Shizuoka-ken",
      location: "Shizuoka-ken, Nhật Bản",
      type: "Full-time",
      salary: "¥320,000 - ¥480,000",
      description: "Thiết kế chi tiết các bộ phận ô tô",
      requirements: ["Tốt nghiệp đại học chuyên ngành Ô tô hoặc Cơ khí", "Có kinh nghiệm thiết kế", "Tiếng Nhật N3 trở lên"],
      postedDate: "1 tuần trước",
      company: "Honda Motor Co.",
      image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&h=300&fit=crop"
    },
    {
      id: "4",
      title: "Kỹ sư R&D Ô tô",
      location: "Yokohama, Nhật Bản",
      type: "Full-time",
      salary: "¥350,000 - ¥500,000",
      description: "Nghiên cứu và phát triển công nghệ ô tô mới",
      requirements: ["Thạc sĩ Cơ khí hoặc Ô tô", "Có kinh nghiệm R&D", "Tiếng Nhật N2 hoặc tiếng Anh tốt"],
      postedDate: "3 ngày trước",
      company: "Nissan Motor",
      image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&h=300&fit=crop"
    }
  ],
  electrical: [
    {
      id: "5",
      title: "Kỹ sư điện tử công nghiệp",
      location: "Osaka, Nhật Bản",
      type: "Full-time",
      salary: "¥290,000 - ¥440,000",
      description: "Thiết kế và bảo trì hệ thống điện tử công nghiệp",
      requirements: ["Tốt nghiệp đại học Điện - Điện tử", "Có kinh nghiệm 1-2 năm", "Tiếng Nhật N3"],
      postedDate: "4 ngày trước",
      company: "Panasonic Corporation",
      image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=400&h=300&fit=crop"
    }
  ],
  it: [
    {
      id: "6",
      title: "Backend Developer (Java/Spring)",
      location: "Tokyo, Nhật Bản",
      type: "Full-time",
      salary: "¥350,000 - ¥550,000",
      description: "Phát triển hệ thống backend cho các ứng dụng doanh nghiệp",
      requirements: ["Có kinh nghiệm Java, Spring Boot", "Hiểu biết về microservices", "Tiếng Nhật N3 hoặc tiếng Anh tốt"],
      postedDate: "2 ngày trước",
      company: "Rakuten Inc.",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop"
    },
    {
      id: "7",
      title: "Frontend Developer (React/Next.js)",
      location: "Tokyo, Nhật Bản",
      type: "Full-time",
      salary: "¥320,000 - ¥500,000",
      description: "Phát triển giao diện người dùng cho web applications",
      requirements: ["Thành thạo React, Next.js, TypeScript", "Có kinh nghiệm 2+ năm", "Tiếng Nhật N3"],
      postedDate: "1 ngày trước",
      company: "Mercari Inc.",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop"
    }
  ],
  construction: [
    {
      id: "8",
      title: "Kỹ sư xây dựng dân dụng",
      location: "Saitama, Nhật Bản",
      type: "Full-time",
      salary: "¥300,000 - ¥450,000",
      description: "Thiết kế và giám sát thi công công trình dân dụng",
      requirements: ["Tốt nghiệp đại học Xây dựng", "Có kinh nghiệm thiết kế", "Tiếng Nhật N3"],
      postedDate: "6 ngày trước",
      company: "Shimizu Corporation",
      image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400&h=300&fit=crop"
    }
  ]
};

export default function ForEngineers() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');
  
  // Set initial category based on URL param or default to first
  const initialCategory = categoryParam && jobCategories.some(cat => cat.id === categoryParam) 
    ? categoryParam 
    : "CƠ KHÍ";
  
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [allJobs, setAllJobs] = useState<any[]>([]);
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);

  // Update selected category when URL param changes
  useEffect(() => {
    if (categoryParam && jobCategories.some(cat => cat.id === categoryParam)) {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam]);

  // Fetch all jobs on mount
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${BACKEND_DOMAIN}/api/careers/jobs?includeInactive=false`);
        const result = await response.json();
        
        // Handle both response formats
        const jobsData = result.data || result;
        setAllJobs(jobsData);
        
        // Set initial jobs for first category
        const categoryJobs = jobsData.filter((job: any) => job.category === "CƠ KHÍ");
        setJobs(categoryJobs);
      } catch (error) {
        console.error('Error fetching jobs:', error);
        setAllJobs([]);
        setJobs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

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
    setSelectedCategory(categoryId);
    const categoryJobs = allJobs.filter((job: any) => job.category === categoryId);
    setJobs(categoryJobs);
  };

  // Format salary for display
  const formatSalary = (salary: any) => {
    if (!salary || !salary.min) return 'Thỏa thuận';
    const currency = salary.currency || '¥';
    return `${currency}${salary.min.toLocaleString()} - ${currency}${salary.max.toLocaleString()}`;
  };

  // Calculate posted date
  const getPostedDate = (createdAt: string) => {
    const now = new Date();
    const posted = new Date(createdAt);
    const diffTime = Math.abs(now.getTime() - posted.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Hôm nay';
    if (diffDays === 1) return 'Hôm qua';
    if (diffDays < 7) return `${diffDays} ngày trước`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} tuần trước`;
    return `${Math.floor(diffDays / 30)} tháng trước`;
  };

  return (
    <>
      {/* Hero Banner */}
      <section className="engineers-hero">
        <div className="hero-overlay"></div>
        <Image
          src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1920&h=1080&fit=crop"
          alt="Dành cho kỹ sư tìm việc"
          fill
          priority
          className="hero-bg"
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          unoptimized
        />
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">Dành Cho Kỹ Sư Tìm Việc</h1>
            <div className="hero-divider"></div>
            <p className="hero-subtitle">Khám phá cơ hội việc làm tại Nhật Bản</p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="engineers-content">
        <div className="container-fluid">
          <div className="content-wrapper">
            
            {/* Left Sidebar - Categories */}
            <aside className="categories-sidebar">
              <div className="sidebar-header">
                <h3 className="sidebar-title">
                  <i className="fas fa-th-large"></i>
                  Ngành Nghề
                </h3>
              </div>
              
              <div className="categories-list">
                {jobCategories.map((category) => (
                  <div
                    key={category.id}
                    className={`category-item ${selectedCategory === category.id ? 'active' : ''}`}
                    onClick={() => handleCategoryClick(category.id)}
                  >
                    <div className="category-item-image">
                      <Image
                        src={category.image}
                        alt={category.name}
                        fill
                        style={{ objectFit: 'cover' }}
                        unoptimized
                      />
                      <div className="category-item-overlay"></div>
                    </div>
                    <div className="category-item-content">
                      <h4 className="category-item-name">{category.name}</h4>
                      <p className="category-item-desc">{category.description}</p>
                      <div className="category-item-arrow">
                        <i className="fas fa-chevron-right"></i>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </aside>

            {/* Right Content - Jobs List */}
            <main className="jobs-main">
              <div className="jobs-header">
                <div>
                  <h2 className="jobs-title">
                    {jobCategories.find(c => c.id === selectedCategory)?.name}
                  </h2>
                  <p className="jobs-subtitle">
                    Có <strong>{jobs.length}</strong> vị trí đang tuyển dụng
                  </p>
                </div>
                <div className="jobs-actions">
                  <button className="btn-filter">
                    <i className="fas fa-filter"></i>
                    Lọc
                  </button>
                  <button className="btn-sort">
                    <i className="fas fa-sort"></i>
                    Sắp xếp
                  </button>
                </div>
              </div>

              <div className="jobs-list">
                {loading ? (
                  <div className="loading-state">
                    <i className="fas fa-spinner fa-spin"></i>
                    <p>Đang tải việc làm...</p>
                  </div>
                ) : jobs.length > 0 ? (
                  jobs.map((job) => (
                    <div key={job._id} className="job-card">
                      <div className="job-card-image">
                        <Image
                          src={jobCategories.find(c => c.id === job.category)?.image || "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop"}
                          alt={job.title}
                          fill
                          style={{ objectFit: 'cover' }}
                          unoptimized
                        />
                      </div>
                      <div className="job-card-content">
                        <div className="job-card-header">
                          <div className="job-meta">
                            <span className="job-type">{job.workType || 'Full-time'}</span>
                            <span className="job-posted">{getPostedDate(job.createdAt)}</span>
                          </div>
                          {job.jobCode && (
                            <div className="job-code">#{job.jobCode}</div>
                          )}
                        </div>
                        <h3 className="job-card-title">{job.title}</h3>
                        <div className="job-card-info">
                          <div className="job-info-item">
                            <i className="fas fa-map-marker-alt"></i>
                            <span>{job.location}</span>
                          </div>
                          <div className="job-info-item">
                            <i className="fas fa-yen-sign"></i>
                            <span>{formatSalary(job.salary)}</span>
                          </div>
                          {job.language && (
                            <div className="job-info-item">
                              <i className="fas fa-language"></i>
                              <span>{job.language}</span>
                            </div>
                          )}
                        </div>
                        <p className="job-card-description">{job.description}</p>
                        <div className="job-card-footer">
                          <Link href={`/jobs/${job._id}`} className="btn-detail">
                            Xem Chi Tiết
                            <i className="fas fa-arrow-right"></i>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="no-jobs">
                    <i className="fas fa-briefcase"></i>
                    <h3>Chưa có việc làm</h3>
                    <p>Hiện tại chưa có vị trí tuyển dụng nào trong ngành này.</p>
                  </div>
                )}
              </div>
            </main>

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div 
            className="cta-wrapper"
            ref={(el) => { if (el) sectionsRef.current[2] = el; }}
          >
            <div className="cta-card">
              <div className="row align-items-center">
                <div className="col-lg-8 mb-4 mb-lg-0">
                  <h3 className="cta-title">Không Tìm Thấy Công Việc Phù Hợp?</h3>
                  <p className="cta-text">
                    Gửi CV của bạn cho chúng tôi. NEXT STEP sẽ kết nối bạn với các cơ hội việc làm phù hợp nhất!
                  </p>
                </div>
                <div className="col-lg-4 text-lg-end">
                  <a href="/contact" className="btn-cta">
                    Gửi CV Ngay
                    <i className="fas fa-paper-plane"></i>
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
        .engineers-hero {
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
        .engineers-content {
          padding: 40px 0 80px;
          background: #f8f9fa;
        }

        .content-wrapper {
          display: flex;
          gap: 30px;
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 20px;
        }

        /* Left Sidebar - Categories */
        .categories-sidebar {
          width: 320px;
          background: white;
          border-radius: 16px;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
          height: fit-content;
          position: sticky;
          top: 100px;
        }

        .sidebar-header {
          padding: 25px;
          border-bottom: 2px solid #e2e8f0;
        }

        .sidebar-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #1a202c;
          margin: 0;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .sidebar-title i {
          color: #dc2626;
        }

        .categories-list {
          padding: 15px;
        }

        .category-item {
          position: relative;
          border-radius: 12px;
          overflow: hidden;
          cursor: pointer;
          margin-bottom: 15px;
          transition: all 0.3s ease;
          border: 2px solid transparent;
          height: 140px;
        }

        .category-item:hover {
          transform: translateX(5px);
          box-shadow: 0 5px 15px rgba(220, 38, 38, 0.2);
        }

        .category-item.active {
          border-color: #dc2626;
          box-shadow: 0 5px 20px rgba(220, 38, 38, 0.3);
        }

        .category-item-image {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        .category-item-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(to right, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.5) 100%);
          z-index: 1;
        }

        .category-item-content {
          position: relative;
          z-index: 2;
          padding: 20px 60px 20px 20px;
          color: white;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .category-item-name {
          font-size: 1.1rem;
          font-weight: 700;
          margin-bottom: 5px;
          overflow-wrap: break-word;
          word-wrap: break-word;
        }

        .category-item-desc {
          font-size: 0.85rem;
          opacity: 0.9;
          margin: 0;
          line-height: 1.4;
          overflow-wrap: break-word;
          word-wrap: break-word;
        }

        .category-item-arrow {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          width: 32px;
          height: 32px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          flex-shrink: 0;
        }

        .category-item:hover .category-item-arrow,
        .category-item.active .category-item-arrow {
          background: white;
          color: #dc2626;
        }

        /* Right Content - Jobs */
        .jobs-main {
          flex: 1;
          min-width: 0;
        }

        .jobs-header {
          background: white;
          padding: 30px;
          border-radius: 16px;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
          margin-bottom: 30px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 20px;
        }

        .jobs-title {
          font-size: 2rem;
          font-weight: 700;
          color: #1a202c;
          margin: 0 0 5px 0;
        }

        .jobs-subtitle {
          font-size: 1rem;
          color: #718096;
          margin: 0;
        }

        .jobs-subtitle strong {
          color: #dc2626;
        }

        .jobs-actions {
          display: flex;
          gap: 10px;
        }

        .btn-filter,
        .btn-sort {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          background: white;
          border: 2px solid #e2e8f0;
          border-radius: 8px;
          color: #4a5568;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-filter:hover,
        .btn-sort:hover {
          border-color: #dc2626;
          color: #dc2626;
        }

        /* Jobs List */
        .jobs-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .job-card {
          background: white;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
          transition: all 0.3s ease;
          display: flex;
          min-height: 240px;
          height: auto;
        }

        .job-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
        }

        .job-card-image {
          position: relative;
          width: 280px;
          flex-shrink: 0;
        }

        .job-card-content {
          padding: 25px;
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .job-card-header {
          margin-bottom: 15px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .job-meta {
          display: flex;
          gap: 15px;
          align-items: center;
        }

        .job-type {
          background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%);
          color: white;
          padding: 5px 15px;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 600;
        }

        .job-posted {
          color: #718096;
          font-size: 0.9rem;
        }

        .job-code {
          background: #f8f9fa;
          color: #4a5568;
          padding: 5px 12px;
          border-radius: 6px;
          font-size: 0.85rem;
          font-weight: 600;
          border: 1px solid #e2e8f0;
        }

        .job-card-title {
          font-size: 1.3rem;
          font-weight: 700;
          color: #1a202c;
          margin-bottom: 15px;
          line-height: 1.4;
          overflow-wrap: break-word;
          word-wrap: break-word;
          hyphens: auto;
        }

        .job-card-info {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
          margin-bottom: 15px;
        }

        .job-info-item {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #4a5568;
          font-size: 0.95rem;
          overflow-wrap: break-word;
          word-wrap: break-word;
        }

        .job-info-item span {
          overflow-wrap: break-word;
          word-wrap: break-word;
        }

        .job-info-item i {
          color: #dc2626;
          width: 16px;
        }

        .job-card-description {
          color: #718096;
          line-height: 1.6;
          margin-bottom: 20px;
          overflow-wrap: break-word;
          word-wrap: break-word;
          flex: 1;
        }

        .job-card-footer {
          margin-top: auto;
        }

        .btn-detail {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 12px 30px;
          background: white;
          color: #dc2626;
          border: 2px solid #dc2626;
          border-radius: 8px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .btn-detail:hover {
          background: #dc2626;
          color: white;
        }

        .btn-detail i {
          transition: transform 0.2s ease;
        }

        .btn-detail:hover i {
          transform: translateX(5px);
        }

        /* Loading State */
        .loading-state {
          background: white;
          border-radius: 16px;
          padding: 80px 40px;
          text-align: center;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
        }

        .loading-state i {
          font-size: 4rem;
          color: #dc2626;
          margin-bottom: 20px;
        }

        .loading-state p {
          font-size: 1.2rem;
          color: #4a5568;
          margin: 0;
        }

        /* No Jobs State */
        .no-jobs {
          background: white;
          border-radius: 16px;
          padding: 80px 40px;
          text-align: center;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
        }

        .no-jobs i {
          font-size: 4rem;
          color: #cbd5e0;
          margin-bottom: 20px;
        }

        .no-jobs h3 {
          font-size: 1.8rem;
          font-weight: 700;
          color: #1a202c;
          margin-bottom: 10px;
        }

        .no-jobs p {
          font-size: 1.1rem;
          color: #718096;
          margin: 0;
        }

        /* CTA Section */
        .cta-section {
          padding: 60px 0 80px;
          background: white;
        }

        .cta-wrapper {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.6s ease;
        }

        .cta-wrapper.animate-in {
          opacity: 1;
          transform: translateY(0);
        }

        .cta-card {
          background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%);
          border-radius: 16px;
          padding: 50px;
          color: white;
        }

        .cta-title {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 15px;
        }

        .cta-text {
          font-size: 1.1rem;
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
        @media (max-width: 1200px) {
          .content-wrapper {
            flex-direction: column;
          }

          .categories-sidebar {
            width: 100%;
            position: static;
          }

          .categories-list {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
          }

          .category-item {
            margin-bottom: 0;
          }
        }

        @media (max-width: 992px) {
          .hero-title {
            font-size: 2.5rem;
          }

          .job-card {
            flex-direction: column;
            height: auto;
          }

          .job-card-image {
            width: 100%;
            height: 200px;
          }

          .jobs-header {
            flex-direction: column;
            align-items: flex-start;
          }

          .jobs-actions {
            width: 100%;
          }

          .btn-filter,
          .btn-sort {
            flex: 1;
          }
        }

        @media (max-width: 768px) {
          .engineers-hero {
            height: 50vh;
            min-height: 350px;
          }

          .hero-title {
            font-size: 2rem;
          }

          .hero-subtitle {
            font-size: 1.2rem;
          }

          .engineers-content {
            padding: 20px 0 40px;
          }

          .content-wrapper {
            padding: 0 15px;
          }

          .categories-list {
            grid-template-columns: 1fr;
          }

          .jobs-title {
            font-size: 1.5rem;
          }

          .job-card-title {
            font-size: 1.2rem;
          }

          .cta-card {
            padding: 35px 25px;
            text-align: center;
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

          .job-card-info {
            flex-direction: column;
            gap: 10px;
          }

          .btn-detail {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </>
  );
}

