"use client";

import { useParams } from "next/navigation";
import { useState } from "react";

interface Candidate {
  id: number;
  name: string;
  major: string;
  jlpt: string;
  age: number;
  status: string;
  details: string;
}

// Mock data
const mockCandidates: Candidate[] = [
  {
    id: 1,
    name: "NGUYỄN VĂN A",
    major: "CƠ KHÍ",
    jlpt: "N3",
    age: 25,
    status: "ĐỘC THÂN",
    details: "Xem chi tiết"
  },
  {
    id: 2,
    name: "TRẦN VĂN B",
    major: "CƠ KHÍ",
    jlpt: "N2",
    age: 27,
    status: "ĐÃ KẾT HÔN",
    details: "Xem chi tiết"
  },
  {
    id: 3,
    name: "LÊ THỊ C",
    major: "Ô TÔ",
    jlpt: "N3",
    age: 24,
    status: "ĐỘC THÂN",
    details: "Xem chi tiết"
  },
  {
    id: 4,
    name: "PHẠM VĂN D",
    major: "ĐIỆN, ĐIỆN TỬ",
    jlpt: "N2",
    age: 26,
    status: "ĐỘC THÂN",
    details: "Xem chi tiết"
  },
  {
    id: 5,
    name: "HOÀNG VĂN E",
    major: "IT",
    jlpt: "N3",
    age: 23,
    status: "ĐỘC THÂN",
    details: "Xem chi tiết"
  },
  {
    id: 6,
    name: "NGUYỄN THỊ F",
    major: "XÂY DỰNG",
    jlpt: "N4",
    age: 28,
    status: "ĐÃ KẾT HÔN",
    details: "Xem chi tiết"
  },
  {
    id: 7,
    name: "VŨ VĂN G",
    major: "CƠ KHÍ",
    jlpt: "N2",
    age: 29,
    status: "ĐÃ KẾT HÔN",
    details: "Xem chi tiết"
  },
  {
    id: 8,
    name: "ĐỖ VĂN H",
    major: "IT",
    jlpt: "N1",
    age: 30,
    status: "ĐỘC THÂN",
    details: "Xem chi tiết"
  }
];

const categoryNames: { [key: string]: string } = {
  auto: "Ô TÔ",
  mechanical: "CƠ KHÍ",
  construction: "XÂY DỰNG",
  electrical: "ĐIỆN, ĐIỆN TỬ",
  it: "IT"
};

export default function CandidatesList() {
  const params = useParams();
  const category = params.category as string;
  const categoryName = categoryNames[category] || "TẤT CẢ";

  const [filters, setFilters] = useState({
    maritalStatus: "",
    major: categoryName !== "TẤT CẢ" ? categoryName : "",
    jlpt: "",
    age: ""
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter candidates
  const filteredCandidates = mockCandidates.filter(candidate => {
    if (filters.maritalStatus && candidate.status !== filters.maritalStatus) return false;
    if (filters.major && candidate.major !== filters.major) return false;
    if (filters.jlpt && candidate.jlpt !== filters.jlpt) return false;
    if (filters.age && candidate.age.toString() !== filters.age) return false;
    return true;
  });

  // Pagination
  const totalPages = Math.ceil(filteredCandidates.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCandidates = filteredCandidates.slice(startIndex, endIndex);

  const handleFilterChange = (field: string, value: string) => {
    setFilters(prev => ({ ...prev, [field]: value }));
    setCurrentPage(1);
  };

  const handleSearch = () => {
    setCurrentPage(1);
  };

  const handleReset = () => {
    setFilters({
      maritalStatus: "",
      major: categoryName !== "TẤT CẢ" ? categoryName : "",
      jlpt: "",
      age: ""
    });
    setCurrentPage(1);
  };

  return (
    <>
      <section className="candidates-section">
        <div className="container-fluid">
          {/* Page Header */}
          <div className="page-header">
            <h1 className="page-title">Tìm Ứng Viên - {categoryName}</h1>
            <p className="page-subtitle">
              Tìm thấy {filteredCandidates.length} ứng viên phù hợp
            </p>
          </div>

          {/* Filters Section */}
          <div className="filters-card">
            <div className="filters-header">
              <h3>
                <i className="fas fa-filter"></i>
                Bộ Lọc Tìm Kiếm
              </h3>
            </div>

            <div className="filters-body">
              <div className="row g-3">
                <div className="col-lg-3 col-md-6">
                  <label className="filter-label">Tình trạng hôn nhân</label>
                  <select
                    className="filter-select"
                    value={filters.maritalStatus}
                    onChange={(e) => handleFilterChange('maritalStatus', e.target.value)}
                  >
                    <option value="">Tất cả</option>
                    <option value="ĐỘC THÂN">Độc thân</option>
                    <option value="ĐÃ KẾT HÔN">Đã kết hôn</option>
                  </select>
                </div>

                <div className="col-lg-2 col-md-6">
                  <label className="filter-label">Ngành nghề</label>
                  <select
                    className="filter-select"
                    value={filters.major}
                    onChange={(e) => handleFilterChange('major', e.target.value)}
                  >
                    <option value="">Tất cả</option>
                    <option value="CƠ KHÍ">Cơ Khí</option>
                    <option value="Ô TÔ">Ô Tô</option>
                    <option value="ĐIỆN, ĐIỆN TỬ">Điện, Điện Tử</option>
                    <option value="IT">IT</option>
                    <option value="XÂY DỰNG">Xây Dựng</option>
                  </select>
                </div>

                <div className="col-lg-2 col-md-6">
                  <label className="filter-label">JLPT</label>
                  <select
                    className="filter-select"
                    value={filters.jlpt}
                    onChange={(e) => handleFilterChange('jlpt', e.target.value)}
                  >
                    <option value="">Tất cả</option>
                    <option value="N5">N5</option>
                    <option value="N4">N4</option>
                    <option value="N3">N3</option>
                    <option value="N2">N2</option>
                    <option value="N1">N1</option>
                  </select>
                </div>

                <div className="col-lg-2 col-md-6">
                  <label className="filter-label">Độ tuổi</label>
                  <input
                    type="number"
                    className="filter-input"
                    placeholder="Tuổi"
                    value={filters.age}
                    onChange={(e) => handleFilterChange('age', e.target.value)}
                  />
                </div>

                <div className="col-lg-3 col-md-12">
                  <label className="filter-label">&nbsp;</label>
                  <div className="filter-actions">
                    <button className="btn-search" onClick={handleSearch}>
                      <i className="fas fa-search"></i>
                      Search
                    </button>
                    <button className="btn-reset" onClick={handleReset}>
                      <i className="fas fa-redo"></i>
                      Reset
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Table Section */}
          <div className="table-card">
            <div className="table-responsive">
              <table className="candidates-table">
                <thead>
                  <tr>
                    <th className="text-left">Họ tên</th>
                    <th className="text-center">Email</th>
                    <th className="text-center">Ngành nghề</th>
                    <th className="text-center">JLPT</th>
                    <th className="text-center">Tuổi</th>
                    <th className="text-center">Tình trạng hôn nhân</th>
                    <th className="text-center">Chi tiết</th>
                  </tr>
                </thead>
                <tbody>
                  {currentCandidates.length > 0 ? (
                    currentCandidates.map((candidate, index) => (
                      <tr key={candidate.id}>
                        <td className="text-left">
                          <div className="user-cell">
                            <div className="user-avatar">
                              {candidate.name.charAt(0)}
                            </div>
                            <span className="user-name">{candidate.name}</span>
                          </div>
                        </td>
                        <td className="email-cell text-center">candidate{candidate.id}@nextstep.com</td>
                        <td className="text-center">{candidate.major}</td>
                        <td className="text-center">
                          <span className="jlpt-badge">{candidate.jlpt}</span>
                        </td>
                        <td className="text-center">{candidate.age}</td>
                        <td className="text-center">
                          <span className={`status-badge ${candidate.status === 'ĐỘC THÂN' ? 'confirmed' : candidate.status === 'ĐÃ KẾT HÔN' ? 'paid' : 'pending'}`}>
                            {candidate.status}
                          </span>
                        </td>
                        <td className="text-center">
                          <button className="btn-view-detail">
                            <i className="fas fa-eye"></i>
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="no-data">
                        Không tìm thấy ứng viên phù hợp
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="pagination">
                <button
                  className="page-btn"
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                >
                  <i className="fas fa-chevron-left"></i>
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    className={`page-number ${currentPage === page ? 'active' : ''}`}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                ))}

                <button
                  className="page-btn"
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                >
                  <i className="fas fa-chevron-right"></i>
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Styles */}
      <style jsx>{`
        .candidates-section {
          padding: 40px 0 80px;
          background: #f8f9fa;
          min-height: calc(100vh - 200px);
        }

        .page-header {
          background: white;
          padding: 30px 40px;
          border-radius: 12px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.06);
          margin-bottom: 30px;
          border-left: 4px solid #dc2626;
        }

        .page-title {
          font-size: 2rem;
          font-weight: 700;
          color: #1a202c;
          margin-bottom: 8px;
        }

        .page-subtitle {
          font-size: 1rem;
          color: #64748b;
          margin: 0;
        }

        /* Filters Card */
        .filters-card {
          background: white;
          border-radius: 12px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.06);
          margin-bottom: 30px;
          overflow: hidden;
        }

        .filters-header {
          background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%);
          padding: 20px 30px;
        }

        .filters-header h3 {
          color: white;
          font-size: 1.3rem;
          font-weight: 700;
          margin: 0;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .filters-body {
          padding: 30px;
          background: #fafafa;
        }

        .filter-label {
          display: block;
          font-weight: 600;
          color: #374151;
          margin-bottom: 8px;
          font-size: 0.85rem;
        }

        .filter-input,
        .filter-select {
          width: 100%;
          padding: 12px 16px;
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          font-size: 0.9rem;
          transition: all 0.2s;
          background: white;
          color: #1f2937;
        }

        .filter-input:focus,
        .filter-select:focus {
          outline: none;
          border-color: #dc2626;
          box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
        }

        .filter-input::placeholder {
          color: #9ca3af;
        }

        .filter-actions {
          display: flex;
          gap: 10px;
        }

        .btn-search,
        .btn-reset {
          flex: 1;
          padding: 12px 20px;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          font-size: 0.95rem;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .btn-search {
          background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%);
          color: white;
        }

        .btn-search:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(220, 38, 38, 0.3);
        }

        .btn-reset {
          background: white;
          color: #6b7280;
          border: 2px solid #e5e7eb;
        }

        .btn-reset:hover {
          background: #f9fafb;
          border-color: #d1d5db;
          color: #374151;
        }

        /* Table Card */
        .table-card {
          background: white;
          border-radius: 12px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.06);
          overflow: hidden;
        }

        .table-responsive {
          overflow-x: auto;
        }

        .candidates-table {
          width: 100%;
          border-collapse: collapse;
        }

        .candidates-table thead th {
          padding: 16px 20px;
          font-weight: 600;
          color: #6b7280;
          font-size: 0.85rem;
          background: #f9fafb;
          border-bottom: 2px solid #e5e7eb;
          border-right: 1px solid #e5e7eb;
          text-transform: capitalize;
          letter-spacing: 0.3px;
        }

        .candidates-table thead th:last-child {
          border-right: none;
        }

        .candidates-table thead th.text-left {
          text-align: left;
        }

        .candidates-table thead th.text-center {
          text-align: center;
        }

        .candidates-table tbody tr {
          border-bottom: 1px solid #f3f4f6;
          transition: all 0.2s;
        }

        .candidates-table tbody tr:hover {
          background: #fafafa;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
        }

        .candidates-table tbody tr:last-child {
          border-bottom: none;
        }

        .candidates-table td {
          padding: 16px 20px;
          color: #374151;
          font-size: 0.9rem;
          vertical-align: middle;
        }

        .candidates-table td.text-left {
          text-align: left;
        }

        .candidates-table td.text-center {
          text-align: center;
        }

        /* User Cell with Avatar */
        .user-cell {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .user-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 600;
          font-size: 0.9rem;
          flex-shrink: 0;
        }

        .user-name {
          color: #1f2937;
          font-weight: 600;
          font-size: 0.9rem;
        }

        .email-cell {
          color: #6b7280;
          font-size: 0.85rem;
        }

        /* JLPT Badge */
        .jlpt-badge {
          display: inline-block;
          padding: 5px 12px;
          background: rgba(16, 185, 129, 0.15);
          color: #10b981;
          border-radius: 6px;
          font-weight: 600;
          font-size: 0.8rem;
          border: 1px solid rgba(16, 185, 129, 0.3);
        }

        /* Status Badge */
        .status-badge {
          display: inline-block;
          padding: 5px 12px;
          border-radius: 6px;
          font-weight: 500;
          font-size: 0.8rem;
        }

        .status-badge.paid {
          background: rgba(34, 197, 94, 0.15);
          color: #22c55e;
          border: 1px solid rgba(34, 197, 94, 0.3);
        }

        .status-badge.confirmed {
          background: rgba(59, 130, 246, 0.15);
          color: #3b82f6;
          border: 1px solid rgba(59, 130, 246, 0.3);
        }

        .status-badge.pending {
          background: rgba(251, 146, 60, 0.15);
          color: #fb923c;
          border: 1px solid rgba(251, 146, 60, 0.3);
        }

        /* View Detail Button */
        .btn-view-detail {
          background: white;
          color: #dc2626;
          border: 2px solid #dc2626;
          padding: 8px 16px;
          border-radius: 8px;
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }

        .btn-view-detail:hover {
          background: #dc2626;
          color: white;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(220, 38, 38, 0.2);
        }

        .btn-view-detail i {
          font-size: 0.9rem;
        }

        .no-data {
          text-align: center;
          padding: 60px 20px;
          color: #9ca3af;
          font-size: 1rem;
        }

        /* Pagination */
        .pagination {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 8px;
          padding: 25px;
          border-top: 2px solid #f3f4f6;
          background: #fafafa;
        }

        .page-btn,
        .page-number {
          width: 40px;
          height: 40px;
          border: 2px solid #e5e7eb;
          background: white;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
          font-weight: 600;
          color: #6b7280;
        }

        .page-btn:hover:not(:disabled),
        .page-number:hover {
          border-color: #dc2626;
          color: #dc2626;
          background: #fef2f2;
        }

        .page-number.active {
          background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%);
          border-color: #dc2626;
          color: white;
        }

        .page-btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        /* Responsive */
        @media (max-width: 992px) {
          .filter-actions {
            flex-direction: column;
          }

          .btn-search,
          .btn-reset {
            width: 100%;
          }
        }

        @media (max-width: 768px) {
          .candidates-section {
            padding: 20px 0 40px;
          }

          .page-header {
            padding: 20px 25px;
          }

          .page-title {
            font-size: 1.5rem;
          }

          .filters-body {
            padding: 20px;
          }

          .candidates-table th,
          .candidates-table td {
            padding: 12px 15px;
            font-size: 0.85rem;
          }

          .user-avatar {
            width: 32px;
            height: 32px;
            font-size: 0.8rem;
          }

          .user-cell {
            gap: 10px;
          }

          .pagination {
            flex-wrap: wrap;
            padding: 15px;
          }

          .page-btn,
          .page-number {
            width: 36px;
            height: 36px;
          }
        }
      `}</style>
    </>
  );
}

