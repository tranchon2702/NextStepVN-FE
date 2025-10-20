import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/header';
import Footer from '@/components/footer';
import ScrollToTop from '@/components/ScrollToTop';
import HeaderScrollEffect from '@/components/HeaderScrollEffect';
import { BACKEND_DOMAIN } from '@/api/config';

interface NewsArticle {
  id?: string;
  _id?: string;
  title: string;
  content: string;
  excerpt?: string;
  image: string;
  slug: string;
  publishDate: string;
  isPublished?: boolean;
  isFeatured?: boolean;
  views?: number;
  tags?: string[];
  author?: string;
}
interface Pagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  limit: number;
}
interface NewsData {
  news: NewsArticle[];
  pagination: Pagination;
}

// Revalidate every 60 seconds for news listings
export const revalidate = 60;

async function getNewsData(page: number, limit: number, search?: string): Promise<NewsData | null> {
  try {
    let url = `${BACKEND_DOMAIN}/api/home/news/all?page=${page}&limit=${limit}`;
    if (search) {
      url += `&search=${encodeURIComponent(search)}`;
    }
    console.log('📡 Fetching news from:', url);
    const res = await fetch(url, { 
      next: { revalidate: 60 } 
    });
    const data = await res.json();
    console.log('📰 News data received:', data.data?.pagination);
    if (data.success) return data.data;
    return null;
  } catch (error) {
    console.error('❌ Error fetching news:', error);
    return null;
  }
}

export default async function NewsPage({ searchParams }: { searchParams: Promise<{ page?: string, limit?: string, search?: string }> }) {
  const params = await searchParams;
  const page = parseInt(params.page || '1');
  const limit = parseInt(params.limit || '9');
  const search = params.search || '';
  const newsData = await getNewsData(page, limit, search);

  if (!newsData || !newsData.news || newsData.news.length === 0) {
    return (
      <>
        <HeaderScrollEffect />
        <Header />
        <main className="news-page">
          <div className="container py-5">
            <h1 className="news-page-title text-center mb-5">News</h1>
            {search ? (
              <div className="text-center py-5">
                <i className="fas fa-search fa-3x mb-3 text-muted"></i>
                <h3>Không tìm thấy kết quả</h3>
                <p>Không có tin tức nào khớp với từ khóa <strong>"{search}"</strong></p>
                <Link href="/news" className="btn btn-outline-primary mt-3">
                  <i className="fas fa-arrow-left me-2"></i>Xem tất cả tin tức
                </Link>
              </div>
            ) : (
              <div className="text-center py-5">
                <i className="fas fa-newspaper fa-3x mb-3 text-muted"></i>
                <h3>No news articles found</h3>
                <p>Check back later for updates and announcements.</p>
              </div>
            )}
          </div>
        </main>
        <Footer />
        <ScrollToTop />
      </>
    );
  }

  return (
    <>
      {/* Header Scroll Effect */}
      <HeaderScrollEffect />
      {/* Header */}
      <Header />
      {/* News Content */}
      <main className="news-page">
        <div className="container py-5">
          {/* Page Title */}
          <h1 className="news-page-title text-center mb-4">News</h1>
          
          {/* Search Results Info */}
          {search && (
            <div className="search-results-info mb-4 text-center">
              <p className="mb-2">
                Tìm thấy <strong>{newsData.pagination.totalItems}</strong> kết quả cho từ khóa: <strong>"{search}"</strong>
              </p>
              <Link href="/news" className="btn btn-sm btn-outline-secondary">
                <i className="fas fa-times me-2"></i>Xóa tìm kiếm
              </Link>
            </div>
          )}
          
          {/* News Grid */}
          <div className="row g-4">
            {newsData.news.map((article: NewsArticle) => {
              // Format date
              const publishDate = new Date(article.publishDate);
              const formattedDate = new Intl.DateTimeFormat('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              }).format(publishDate);
              return (
                <div key={article.id || article._id} className="col-md-6 col-lg-4">
                  <div className="card news-card h-100">
                    {/* Featured Tag */}
                    {article.isFeatured && (
                      <div className="featured-tag">
                        <span>Featured</span>
                      </div>
                    )}
                    {/* Card Image */}
                    <div className="card-img-top position-relative">
                      <Image
                        src={(() => {
                          // Ưu tiên mainImage trước, fallback sang image
                          const imgPath = (article as any).mainImage || article.image;
                          
                          if (!imgPath || !imgPath.trim()) {
                            return 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400&h=250&fit=crop';
                          }
                          
                          if (imgPath.startsWith('http')) {
                            return imgPath;
                          }
                          
                          if (imgPath.startsWith('/')) {
                            return `${BACKEND_DOMAIN}${imgPath}`;
                          }
                          
                          return `${BACKEND_DOMAIN}/${imgPath}`;
                        })()}
                        alt={article.title}
                        width={400}
                        height={250}
                        className="img-fluid"
                        style={{ objectFit: 'cover', height: '200px', width: '100%' }}
                        unoptimized
                      />
                      <div className="news-date-badge">
                        {formattedDate}
                      </div>
                    </div>
                    {/* Card Body */}
                    <div className="card-body d-flex flex-column">
                      <h3 className="card-title news-card-title">
                        <Link href={`/news/${article.slug}`} className="text-decoration-none news-card-title-link">
                          {article.title}
                        </Link>
                      </h3>
                      <p className="card-text flex-grow-1">
                        {article.excerpt}
                      </p>
                      {/* Tags */}
                      {article.tags && Array.isArray(article.tags) && article.tags.length > 0 && (
                        <div className="news-tags mb-3" style={{ display: 'flex', flexWrap: 'wrap' }}>
                          {article.tags.slice(0, 3).map((tag: string, index: number) => (
                            <span
                              key={`${tag}-${index}`}
                              className="news-tag"
                              style={{ 
                                background: '#e6f3ff', 
                                padding: '4px 12px', 
                                borderRadius: '16px',
                                fontSize: '0.75rem',
                                color: '#0d6efd',
                                marginRight: '8px',
                                marginBottom: '8px',
                                fontWeight: 500,
                                display: 'inline-flex',
                                alignItems: 'center'
                              }}
                            >
                              {tag}
                            </span>
                          ))}
                          {article.tags.length > 3 && (
                            <span 
                              className="news-tag-more"
                              style={{
                                background: '#f0f0f0',
                                padding: '4px 8px',
                                borderRadius: '16px',
                                fontSize: '0.75rem',
                                color: '#666',
                                fontWeight: 500
                              }}
                            >
                              +{article.tags.length - 3}
                            </span>
                          )}
                        </div>
                      )}
                      {/* Read More Link */}
                      <Link 
                        href={`/news/${article.slug}`} 
                        className="btn btn-outline-primary mt-auto news-read-more-btn"
                        style={{ fontWeight: 500 }}
                      >
                        Read More
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {/* Pagination */}
          {newsData.pagination && newsData.pagination.totalPages > 1 && (
            <nav aria-label="News pagination" className="mt-5">
              <ul className="pagination justify-content-center">
                {/* Previous Page */}
                <li className={`page-item ${page <= 1 ? 'disabled' : ''}`}>
                  <Link 
                    className="page-link" 
                    href={`/news?page=${page - 1}&limit=${limit}${search ? `&search=${encodeURIComponent(search)}` : ''}`}
                    aria-label="Previous"
                  >
                    <span aria-hidden="true">&laquo;</span>
                  </Link>
                </li>
                {/* Page Numbers */}
                {Array.from({ length: newsData.pagination.totalPages }, (_, i) => i + 1).map(
                  (pageNum) => (
                    <li 
                      key={pageNum} 
                      className={`page-item ${pageNum === page ? 'active' : ''}`}
                    >
                      <Link 
                        className="page-link" 
                        href={`/news?page=${pageNum}&limit=${limit}${search ? `&search=${encodeURIComponent(search)}` : ''}`}
                      >
                        {pageNum}
                      </Link>
                    </li>
                  )
                )}
                {/* Next Page */}
                <li className={`page-item ${page >= newsData.pagination.totalPages ? 'disabled' : ''}`}>
                  <Link 
                    className="page-link" 
                    href={`/news?page=${page + 1}&limit=${limit}${search ? `&search=${encodeURIComponent(search)}` : ''}`}
                    aria-label="Next"
                  >
                    <span aria-hidden="true">&raquo;</span>
                  </Link>
                </li>
              </ul>
            </nav>
          )}
        </div>
      </main>
      {/* Footer */}
      <Footer />
      {/* Scroll to Top Button */}
      <ScrollToTop />
    </>
  );
} 