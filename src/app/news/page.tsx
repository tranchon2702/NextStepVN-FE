"use client";

import Image from "next/image";
import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ScrollToTop from "@/components/ScrollToTop";
import HeaderScrollEffect from "@/components/HeaderScrollEffect";
import { BACKEND_DOMAIN } from "@/api/config";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

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

/* --------------------------------------------------------------- */
/*  Helper fetch – dùng trong client → cache: 'no-store'           */
/* --------------------------------------------------------------- */
async function getNewsData(
  page: number,
  limit: number,
  search?: string
): Promise<NewsData | null> {
  try {
    let url = `${BACKEND_DOMAIN}/api/home/news/all?page=${page}&limit=${limit}`;
    if (search) url += `&search=${encodeURIComponent(search)}`;
    const res = await fetch(url, { cache: "no-store" });
    const data = await res.json();
    return data.success ? data.data : null;
  } catch (e) {
    console.error(e);
    return null;
  }
}

/* --------------------------------------------------------------- */
/*  Component – Client                                             */
/* --------------------------------------------------------------- */
export default function NewsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; limit?: string; search?: string }>;
}) {
  const { t } = useTranslation("news");
  const [newsData, setNewsData] = useState<NewsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  /* ------------------------------------------------------------- */
  /*  Load data khi searchParams thay đổi                         */
  /* ------------------------------------------------------------- */
  useEffect(() => {
    const load = async () => {
      const params = await searchParams;
      const page = parseInt(params.page ?? "1");
      const limit = parseInt(params.limit ?? "9");
      const search = params.search ?? "";
      setSearchTerm(search);
      const data = await getNewsData(page, limit, search);
      setNewsData(data);
      setLoading(false);
    };
    load();
  }, [searchParams]);

  /* ------------------------------------------------------------- */
  /*  Loading                                                     */
  /* ------------------------------------------------------------- */
  if (loading) {
    return (
      <>
        <HeaderScrollEffect />
        <Header />
        <main className="news-page">
          <div className="container py-5 text-center">
            <i className="fas fa-spinner fa-spin fa-3x"></i>
          </div>
        </main>
        <Footer />
        <ScrollToTop />
      </>
    );
  }

  /* ------------------------------------------------------------- */
  /*  No data                                                     */
  /* ------------------------------------------------------------- */
  if (!newsData || !newsData.news?.length) {
    return (
      <>
        <HeaderScrollEffect />
        <Header />
        <main className="news-page">
          <div className="container py-5">
            <h1 className="news-page-title text-center mb-5">{t("title")}</h1>
            {searchTerm ? (
              <div className="text-center py-5">
                <i className="fas fa-search fa-3x mb-3 text-muted"></i>
                <h3>{t("no_results_title")}</h3>
                <p
                  dangerouslySetInnerHTML={{
                    __html: t("no_results_text", { search: `"${searchTerm}"` }),
                  }}
                />
                <Link href="/news" className="btn btn-outline-primary mt-3">
                  <i className="fas fa-arrow-left me-2"></i>
                  {t("view_all")}
                </Link>
              </div>
            ) : (
              <div className="text-center py-5">
                <i className="fas fa-newspaper fa-3x mb-3 text-muted"></i>
                <h3>{t("empty_title")}</h3>
                <p>{t("empty_text")}</p>
              </div>
            )}
          </div>
        </main>
        <Footer />
        <ScrollToTop />
      </>
    );
  }

  const { currentPage: page, limit } = newsData.pagination;

  return (
    <>
      <HeaderScrollEffect />
      <Header />
      <main className="news-page">
        <div className="container py-5">
          <h1 className="news-page-title text-center mb-4">{t("title")}</h1>

          {/* Search info */}
          {searchTerm && (
            <div className="search-results-info mb-4 text-center">
              <p
                className="mb-2"
                dangerouslySetInnerHTML={{
                  __html: t("search_results", {
                    count: newsData.pagination.totalItems,
                    term: `"${searchTerm}"`,
                  }),
                }}
              />
              <Link href="/news" className="btn btn-sm btn-outline-secondary">
                <i className="fas fa-times me-2"></i>
                {t("clear_search")}
              </Link>
            </div>
          )}

          {/* Grid */}
          <div className="row g-4">
            {newsData.news.map((article) => {
              const publishDate = new Date(article.publishDate);
              const formattedDate = new Intl.DateTimeFormat("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              }).format(publishDate);

              const imgSrc = (() => {
                const img = (article as any).mainImage || article.image;
                if (!img?.trim())
                  return "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400&h=250&fit=crop";
                return img.startsWith("http")
                  ? img
                  : img.startsWith("/")
                  ? `${BACKEND_DOMAIN}${img}`
                  : `${BACKEND_DOMAIN}/${img}`;
              })();

              return (
                <div key={article.id || article._id} className="col-md-6 col-lg-4">
                  <div className="card news-card h-100">
                    {article.isFeatured && (
                      <div className="featured-tag">
                        <span>{t("featured")}</span>
                      </div>
                    )}
                    <div className="card-img-top position-relative">
                      <Image
                        src={imgSrc}
                        alt={article.title}
                        width={400}
                        height={250}
                        className="img-fluid"
                        style={{ objectFit: "cover", height: "200px", width: "100%" }}
                        unoptimized
                      />
                      <div className="news-date-badge">{formattedDate}</div>
                    </div>

                    <div className="card-body d-flex flex-column">
                      <h3 className="card-title news-card-title">
                        <Link
                          href={`/news/${article.slug}`}
                          className="text-decoration-none news-card-title-link"
                        >
                          {article.title}
                        </Link>
                      </h3>
                      <p className="card-text flex-grow-1">{article.excerpt}</p>

                      {article.tags?.length ? (
                        <div className="news-tags mb-3 d-flex flex-wrap">
                          {article.tags.slice(0, 3).map((tag, i) => (
                            <span
                              key={`${tag}-${i}`}
                              className="news-tag me-2 mb-2"
                              style={{
                                background: "#e6f3ff",
                                padding: "4px 12px",
                                borderRadius: "16px",
                                fontSize: "0.75rem",
                                color: "#0d6efd",
                                fontWeight: 500,
                              }}
                            >
                              {tag}
                            </span>
                          ))}
                          {article.tags.length > 3 && (
                            <span
                              className="news-tag-more"
                              style={{
                                background: "#f0f0f0",
                                padding: "4px 8px",
                                borderRadius: "16px",
                                fontSize: "0.75rem",
                                color: "#666",
                                fontWeight: 500,
                              }}
                            >
                              +{article.tags.length - 3}
                            </span>
                          )}
                        </div>
                      ) : null}

                      <Link
                        href={`/news/${article.slug}`}
                        className="btn btn-outline-primary mt-auto news-read-more-btn"
                        style={{ fontWeight: 500 }}
                      >
                        {t("read_more")}
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination */}
          {newsData.pagination.totalPages > 1 && (
            <nav aria-label="News pagination" className="mt-5">
              <ul className="pagination justify-content-center">
                <li className={`page-item ${page <= 1 ? "disabled" : ""}`}>
                  <Link
                    className="page-link"
                    href={`/news?page=${page - 1}&limit=${limit}${
                      searchTerm ? `&search=${encodeURIComponent(searchTerm)}` : ""
                    }`}
                  >
                    Previous
                  </Link>
                </li>

                {Array.from({ length: newsData.pagination.totalPages }, (_, i) => i + 1).map(
                  (p) => (
                    <li
                      key={p}
                      className={`page-item ${p === page ? "active" : ""}`}
                    >
                      <Link
                        className="page-link"
                        href={`/news?page=${p}&limit=${limit}${
                          searchTerm ? `&search=${encodeURIComponent(searchTerm)}` : ""
                        }`}
                      >
                        {p}
                      </Link>
                    </li>
                  )
                )}

                <li
                  className={`page-item ${
                    page >= newsData.pagination.totalPages ? "disabled" : ""
                  }`}
                >
                  <Link
                    className="page-link"
                    href={`/news?page=${page + 1}&limit=${limit}${
                      searchTerm ? `&search=${encodeURIComponent(searchTerm)}` : ""
                    }`}
                  >
                    Next
                  </Link>
                </li>
              </ul>
            </nav>
          )}
        </div>
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}