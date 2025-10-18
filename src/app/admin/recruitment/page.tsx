'use client';
import { useEffect, useState } from 'react';
import recruitmentService from '@/services/recruitmentService';
import { FiPlus, FiEdit, FiTrash, FiEye, FiUsers, FiBriefcase, FiHome, FiPlusCircle, FiTrash2 } from 'react-icons/fi';
import { BACKEND_DOMAIN } from '@/api/config';
import JobFormModal from '@/components/admin/JobFormModal';

interface Job {
  _id: string;
  jobCode?: string;
  title: string;
  category: string;
  type?: string;
  workType?: string;
  location: string;
  description: string;
  requirements: string[];
  benefits: string[];
  salary?: {
    min?: number;
    max?: number;
    currency?: string;
    note?: string;
  };
  recruitmentStatus?: string;
  isActive: boolean;
  createdAt: string;
  applicationCount?: number;
  [key: string]: any;
}

interface Application {
  _id: string;
  jobId: string;
  jobTitle: string;
  jobLocation: string;
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    address?: string;
  };
  cvFile: {
    filename: string;
    originalName: string;
    path: string;
    size: number;
    mimetype: string;
  };
  status: 'pending' | 'reviewing' | 'interviewed' | 'accepted' | 'rejected';
  createdAt: string;
  updatedAt: string;
}

interface CompanyInfo {
  _id: string;
    title: string;
  description: string[];
    logo: string;
  stats: {
    [key: string]: {
      number: string;
      label: string;
    };
  };
  isActive: boolean;
}

interface ContactHR {
  _id: string;
    title: string;
    description: string;
    email: string;
    phone: string;
  submitResumeText: string;
  isActive: boolean;
}

export default function AdminRecruitmentPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
    const [companyInfo, setCompanyInfo] = useState<CompanyInfo | null>(null);
    const [contactHR, setContactHR] = useState<ContactHR | null>(null);
    const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'jobs' | 'applications' | 'company' | 'hr'>('jobs');
  // Modal state
  const [showJobModal, setShowJobModal] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  


  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch jobs - get all jobs for admin, including inactive ones
      const jobsData = await recruitmentService.getAllJobs(true);
      if (jobsData.success) setJobs(jobsData.data);

      // Fetch applications
      const appsData = await recruitmentService.getAllApplications();
      console.log('Applications response:', appsData);
      if (appsData.success && Array.isArray(appsData.data)) {
        setApplications(appsData.data);
      } else {
        console.warn('Applications data is not an array:', appsData.data);
        setApplications([]);
      }

      // Fetch company info
      const companyData = await recruitmentService.getCompanyInfo();
      if (companyData.success) setCompanyInfo(companyData.data);

      // Fetch contact HR
      const hrData = await recruitmentService.getContactHR();
      if (hrData.success) setContactHR(hrData.data);
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    }, []);

  // Tạo mới job
  const handleCreateJob = () => {
    console.log('Open create job modal');
    setEditingJob(null);
    setShowJobModal(true);
  };

  // Sửa job
  const handleEditJob = (job: Job) => {
    console.log('Open edit job modal', job);
    setEditingJob(job);
    setShowJobModal(true);
  };

  // Lưu job (tạo mới hoặc cập nhật)
  const handleSaveJob = async (jobData: any) => {
    try {
      let data;
      if (editingJob) {
        data = await recruitmentService.updateJob(editingJob._id, jobData);
      } else {
        data = await recruitmentService.createJob(jobData);
      }
      if (data.success) {
        setShowJobModal(false);
        fetchData();
        alert(editingJob ? 'Cập nhật tin tuyển dụng thành công!' : 'Tạo tin tuyển dụng thành công!');
      } else {
        throw new Error(data.message || 'Không xác định');
      }
    } catch (err) {
      const error = err as Error;
      throw new Error('Có lỗi xảy ra: ' + (error.message || 'Không xác định'));
    }
  };

  const handleDeleteJob = async (jobId: string) => {
    if (!confirm('Bạn có chắc muốn xóa job này?')) return;
    
    try {
      console.log('Attempting to delete job:', jobId);
      const data = await recruitmentService.deleteJob(jobId);
      console.log('Delete response:', data);
      
      if (data.success) {
        fetchData();
        alert('Xóa job thành công!');
      } else {
        alert('Lỗi: ' + (data.message || 'Không xác định'));
      }
    } catch (err) {
      const error = err as Error;
      console.error('Delete job error:', error);
      alert('Có lỗi xảy ra: ' + (error.message || 'Không xác định'));
    }
  };

  const handleUpdateApplicationStatus = async (appId: string, status: string) => {
    try {
      console.log('Attempting to update application status:', appId, status);
      const data = await recruitmentService.updateApplicationStatus(appId, status);
      console.log('Update status response:', data);
      
      if (data.success) {
        fetchData();
        alert('Cập nhật trạng thái thành công!');
      } else {
        alert('Lỗi: ' + (data.message || 'Không xác định'));
      }
    } catch (err) {
      const error = err as Error;
      console.error('Update status error:', error);
      alert('Có lỗi xảy ra: ' + (error.message || 'Không xác định'));
    }
  };

  // Hàm xử lý lưu thông tin công ty
  const handleSaveCompanyInfo = async () => {
    try {
      if (!companyInfo) return;
      
      const data = await recruitmentService.updateCompanyInfo(companyInfo);
      
      if (data.success) {
        alert('Cập nhật thông tin công ty thành công!');
        fetchData();
      } else {
        alert('Lỗi: ' + (data.message || 'Không xác định'));
      }
    } catch (err) {
      const error = err as Error;
      console.error('Update company info error:', error);
      alert('Có lỗi xảy ra: ' + (error.message || 'Không xác định'));
    }
  };

  // Hàm xử lý lưu thông tin HR
  const handleSaveContactHR = async () => {
    try {
      if (!contactHR) return;
      
      const data = await recruitmentService.updateContactHR(contactHR);
      
      if (data.success) {
        alert('Cập nhật thông tin liên hệ HR thành công!');
        fetchData();
      } else {
        alert('Lỗi: ' + (data.message || 'Không xác định'));
      }
    } catch (err) {
      const error = err as Error;
      console.error('Update contact HR error:', error);
      alert('Có lỗi xảy ra: ' + (error.message || 'Không xác định'));
    }
  };



  if (loading) {
    return <div className="admin-page-container">Đang tải...</div>;
  }

  // Modal luôn render ở cuối return, ngoài mọi điều kiện tab

    return (
    <div className="admin-page-container">
      <h1 className="admin-page-title">Quản lý Tuyển dụng</h1>
      
      {/* Tab Navigation */}
            <div className="admin-tabs">
        <button 
          className={activeTab === 'jobs' ? 'active' : ''} 
          onClick={() => setActiveTab('jobs')}
        >
          <FiBriefcase /> Vị trí tuyển dụng
        </button>
        <button 
          className={activeTab === 'applications' ? 'active' : ''} 
          onClick={() => setActiveTab('applications')}
        >
          <FiUsers /> Ứng viên ({applications.length})
        </button>
        <button 
          className={activeTab === 'company' ? 'active' : ''} 
          onClick={() => setActiveTab('company')}
        >
          <FiHome /> Thông tin công ty
        </button>
        <button 
          className={activeTab === 'hr' ? 'active' : ''} 
          onClick={() => setActiveTab('hr')}
        >
          <FiUsers /> Liên hệ HR
        </button>
            </div>

      {/* Jobs Tab */}
      {activeTab === 'jobs' && (
            <div className="admin-content">
          <div className="admin-header">
            <h2>Danh sách vị trí tuyển dụng</h2>
            <button onClick={handleCreateJob} className="admin-btn primary">
              <FiPlus /> Thêm vị trí mới
            </button>
                    </div>
          
          <div className="admin-table-container">
                        <table className="admin-table">
                            <thead>
                                <tr>
                  <th>Mã CV</th>
                  <th>Tên công việc</th>
                  <th>Nhóm ngành</th>
                  <th>Địa điểm</th>
                  <th>Trạng thái tuyển dụng</th>
                  <th>Hiển thị web</th>
                  <th>Ứng viên</th>
                  <th>Ngày tạo</th>
                  <th>Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                {jobs.map(job => (
                                    <tr key={job._id}>
                                        <td><strong>{job.jobCode || '-'}</strong></td>
                                        <td>{job.title}</td>
                    <td>
                      {job.category ? (
                        <span className="category-badge">{job.category}</span>
                      ) : (
                        <span style={{ color: '#999', fontSize: '0.85rem' }}>Chưa phân loại</span>
                      )}
                    </td>
                                        <td>{job.location}</td>
                    <td>
                      <span className={`status-badge ${
                        job.recruitmentStatus === 'Đang tuyển' ? 'recruiting' : 
                        job.recruitmentStatus === 'Ngưng tuyển' ? 'paused' : 'closed'
                      }`}>
                        {job.recruitmentStatus || 'Đang tuyển'}
                      </span>
                    </td>
                    <td>
                      <span className={`status-badge ${job.isActive ? 'active' : 'inactive'}`}>
                        {job.isActive ? 'Hiển thị' : 'Ẩn'}
                      </span>
                    </td>
                    <td>{job.applicationCount || 0}</td>
                    <td>{new Date(job.createdAt).toLocaleDateString('vi-VN')}</td>
                    <td>
                      <button onClick={() => handleEditJob(job)} className="admin-btn small" style={{ marginRight: 8 }}>
                        <FiEdit />
                      </button>
                      <button onClick={() => handleDeleteJob(job._id)} className="admin-btn small danger">
                        <FiTrash />
                      </button>
                    </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
          </div>
        </div>
      )}

      {/* Applications Tab */}
      {activeTab === 'applications' && (
        <div className="admin-content">
          <h2>Danh sách ứng viên</h2>
          
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Ứng viên</th>
                  <th>Vị trí ứng tuyển</th>
                  <th>Email</th>
                  <th>Số điện thoại</th>
                  <th>Trạng thái</th>
                  <th>Ngày nộp</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(applications) && applications.map(app => (
                  <tr key={app._id}>
                    <td>{app.personalInfo?.fullName || 'N/A'}</td>
                    <td>{app.jobTitle || 'N/A'}</td>
                    <td>{app.personalInfo?.email || 'N/A'}</td>
                    <td>{app.personalInfo?.phone || 'N/A'}</td>
                    <td>
                      <select 
                        value={app.status} 
                        onChange={(e) => handleUpdateApplicationStatus(app._id, e.target.value)}
                        className="status-select"
                      >
                        <option value="pending">Chờ xem xét</option>
                        <option value="reviewing">Đang xem xét</option>
                        <option value="interviewed">Đã phỏng vấn</option>
                        <option value="accepted">Chấp nhận</option>
                        <option value="rejected">Từ chối</option>
                      </select>
                    </td>
                    <td>{new Date(app.createdAt).toLocaleDateString('vi-VN')}</td>
                    <td>
                      <a 
                        href={`${BACKEND_DOMAIN}${app.cvFile?.path?.startsWith('/') ? app.cvFile.path : '/' + app.cvFile.path}`}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="admin-btn small"
                        style={{ marginRight: 8 }}
                      >
                        <FiEye />
                      </a>
                      <button
                        className="admin-btn small danger"
                        title="Xóa ứng viên"
                        onClick={() => {
                          if (confirm('Bạn có chắc muốn xóa ứng viên này?')) {
                            recruitmentService.deleteApplication(app._id).then((data) => {
                              if (data.success) {
                                fetchData();
                                alert('Đã xóa ứng viên!');
                              } else {
                                alert('Lỗi: ' + (data.message || 'Không xác định'));
                              }
                            }).catch((err) => {
                              alert('Có lỗi xảy ra: ' + (err.message || 'Không xác định'));
                            });
                          }
                        }}
                        style={{ marginLeft: 0 }}
                      >
                        <FiTrash />
                      </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
        </div>
      )}

      {/* Company Info Tab */}
      {activeTab === 'company' && companyInfo && (
        <div className="admin-content">
          <h2>Thông tin công ty</h2>
          
          {/* Company Description */}
          <div className="admin-section-card">
            <h3>Mô tả công ty</h3>
            <div className="admin-form">
              <div className="form-group">
                <label>Mô tả</label>
                <textarea 
                  value={companyInfo.description.join('\n')} 
                  onChange={(e) => setCompanyInfo({
                    ...companyInfo, 
                    description: e.target.value.split('\n').filter(line => line.trim())
                  })}
                  rows={4}
                  placeholder="Nhập mô tả công ty (mỗi dòng một đoạn)"
                />
              </div>
            </div>
          </div>

          {/* Company Stats Management */}
          <div className="admin-section-card">
            <h3>Quản lý thống kê công ty</h3>
            <div className="stats-grid">
              {Object.entries(companyInfo.stats || {}).map(([key, stat]) => (
                <div key={key} className="stat-card">
                  <div className="stat-card-header">
                    <h5>Thống kê: {key}</h5>
                  </div>
                  <div className="form-group">
                    <label>Label</label>
                    <input
                      type="text"
                      value={stat.label || ''}
                      onChange={(e) => setCompanyInfo({
                        ...companyInfo,
                        stats: {
                          ...companyInfo.stats,
                          [key]: {
                            ...stat,
                            label: e.target.value
                          }
                        }
                      })}
                      placeholder="Nhập nhãn hiển thị"
                    />
                  </div>
                  <div className="form-group">
                    <label>Số liệu</label>
                    <input
                      type="text"
                      value={stat.number || ''}
                      onChange={(e) => setCompanyInfo({
                        ...companyInfo,
                        stats: {
                          ...companyInfo.stats,
                          [key]: {
                            ...stat,
                            number: e.target.value
                          }
                        }
                      })}
                      placeholder="Nhập số liệu (vd: 1000+, 20+)"
                    />
                  </div>
                  <div className="stat-preview">
                    <div className="stat-number">{stat.number}</div>
                    <div className="stat-label">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button onClick={handleSaveCompanyInfo} className="admin-btn primary save-btn">
            Lưu tất cả thay đổi
          </button>
        </div>
      )}

      {/* HR Contact Tab */}
      {activeTab === 'hr' && contactHR && (
        <div className="admin-content">
          <h2>Thông tin liên hệ HR</h2>
          <div className="admin-form">
            <div className="form-group">
              <label>Tiêu đề</label>
              <input 
                type="text" 
                value={contactHR.title} 
                onChange={(e) => setContactHR({...contactHR, title: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label>Mô tả</label>
              <textarea 
                value={contactHR.description} 
                onChange={(e) => setContactHR({...contactHR, description: e.target.value})}
                rows={3}
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input 
                type="email" 
                value={contactHR.email} 
                onChange={(e) => setContactHR({...contactHR, email: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label>Số điện thoại</label>
              <input 
                type="text" 
                value={contactHR.phone} 
                onChange={(e) => setContactHR({...contactHR, phone: e.target.value})}
              />
            </div>
            <button onClick={handleSaveContactHR} className="admin-btn primary">Lưu thay đổi</button>
          </div>
        </div>
      )}

      <style jsx>{`
        .admin-page-container {
          padding: 32px 0;
          max-width: 1200px;
          margin: 0 auto;
        }
        .admin-page-title {
          font-size: 2.2rem;
          font-weight: 700;
          margin-bottom: 24px;
          color: #1e4f7a;
        }
        .admin-tabs {
          display: flex;
          gap: 8px;
          margin-bottom: 24px;
          border-bottom: 2px solid #eee;
        }
        .admin-tabs button {
          padding: 12px 20px;
          border: none;
          background: none;
          cursor: pointer;
          font-size: 1rem;
          color: #666;
          border-bottom: 2px solid transparent;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .admin-tabs button.active {
          color: #1e4f7a;
          border-bottom-color: #1e4f7a;
          font-weight: 600;
        }
        .admin-content {
          background: #fff;
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        .admin-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }
        .admin-btn {
          padding: 8px 16px;
          border: 1px solid #ddd;
          background: #fff;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.9rem;
          transition: all 0.2s;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }
        .admin-btn.primary {
          background: #1e4f7a;
          color: #fff;
          border-color: #1e4f7a;
        }
        .admin-btn.danger {
          background: #dc3545;
          color: #fff;
          border-color: #dc3545;
        }
        .admin-btn.small {
          padding: 4px 8px;
          font-size: 0.8rem;
        }
        .admin-table-container {
          overflow-x: auto;
          background: white;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
        }
        .admin-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.9rem;
        }
        .admin-table th,
        .admin-table td {
          padding: 12px 8px;
          text-align: left;
          border-bottom: 1px solid #f0f0f0;
        }
        .admin-table th {
          background: #fafafa;
          font-weight: 600;
          color: #333;
          border-bottom: 2px solid #e5e5e5;
        }
        .admin-table tbody tr:last-child td {
          border-bottom: none;
        }
        .category-badge {
          display: inline-block;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 0.7rem;
          font-weight: 600;
          background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%);
          color: white;
          text-transform: uppercase;
          letter-spacing: 0.3px;
          white-space: nowrap;
          line-height: 1.2;
        }

        .status-badge {
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 0.8rem;
          font-weight: 500;
        }
        .status-badge.active {
          background: #d4edda;
          color: #155724;
        }
        .status-badge.inactive {
          background: #f8d7da;
          color: #721c24;
        }
        .status-badge.recruiting {
          background: #d1ecf1;
          color: #0c5460;
        }
        .status-badge.paused {
          background: #fff3cd;
          color: #856404;
        }
        .status-badge.closed {
          background: #f8d7da;
          color: #721c24;
        }
        .status-select {
          padding: 4px 8px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 0.8rem;
        }
        .admin-form {
          max-width: 600px;
        }
        .form-group {
          margin-bottom: 20px;
        }
        .form-group label {
          display: block;
          margin-bottom: 6px;
          font-weight: 500;
          color: #333;
        }
        .form-group input,
        .form-group textarea,
        .form-group select {
          width: 100%;
          padding: 10px 12px;
          border: 1px solid #ddd;
          border-radius: 6px;
          font-size: 0.9rem;
        }
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        .input-group {
          display: flex;
          gap: 8px;
          margin-bottom: 8px;
        }
        .input-group input {
          flex: 1;
        }
        .remove-btn {
          padding: 8px 12px;
          background: #dc3545;
          color: #fff;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 0.8rem;
        }
        .add-btn {
          padding: 8px 16px;
          background: #28a745;
          color: #fff;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 0.9rem;
          margin-top: 8px;
        }
        .modal-overlay.active {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0,0,0,0.18);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .modal-container {
          background: #fff;
          border-radius: 12px;
          box-shadow: 0 4px 32px rgba(0,0,0,0.18);
          padding: 32px 32px 18px 32px;
          min-width: 420px;
          max-width: 96vw;
          max-height: 85vh;
          overflow-y: auto;
        }
        .modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 18px;
        }
        .modal-header h3 {
          font-size: 1.25rem;
          font-weight: 600;
          margin: 0;
        }
        .btn-close {
          background: none;
          border: none;
          color: #333;
          font-size: 1.5rem;
          cursor: pointer;
        }
        .modal-body {
          margin-bottom: 10px;
        }
        .form-group {
          margin-bottom: 16px;
        }
        .form-group label {
          font-weight: 500;
          margin-bottom: 6px;
          display: block;
        }
        .form-group input[type="text"],
        .form-group input[type="number"],
        .form-group textarea,
        .form-group select {
          width: 100%;
          padding: 8px 12px;
          border: 1px solid #ddd;
          border-radius: 6px;
          font-size: 1rem;
        }
        .form-row {
          display: flex;
          gap: 18px;
        }
        .input-group {
          display: flex;
          gap: 8px;
          margin-bottom: 8px;
        }
        .input-group input {
          flex: 1;
        }
        .remove-btn {
          padding: 8px 12px;
          background: #ff4444;
          color: #fff;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 0.95rem;
        }
        .add-btn {
          padding: 8px 16px;
          background: #2ecc40;
          color: #fff;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 1rem;
          margin-top: 8px;
        }
        .modal-footer {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
        }
        .admin-btn.primary {
          background: #2ecc40;
          color: #fff;
          border: none;
        }
        .admin-btn {
          padding: 8px 18px;
          border-radius: 6px;
          font-size: 1rem;
          font-weight: 500;
          cursor: pointer;
          border: 1px solid #ddd;
          background: #fff;
          transition: background 0.2s, color 0.2s;
        }
        .admin-btn.primary:hover {
          background: #27ae60;
        }
        .admin-btn:hover {
          background: #f5f5f5;
        }
        .alert.alert-danger {
          background: #ffebee;
          color: #c62828;
          border-radius: 6px;
          padding: 10px 14px;
          font-size: 1rem;
        }
        .feature-input-row {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 8px;
        }
        .feature-input-row input {
          flex: 1;
          padding: 8px 12px;
          border: 1px solid #ddd;
          border-radius: 6px;
          font-size: 1rem;
        }
        .btn-delete-feature {
          background: #ff4444;
          color: #fff;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          padding: 8px 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px; /* Fixed width for the button */
          height: 36px; /* Fixed height for the button */
          box-sizing: border-box;
        }
        .btn-add-feature {
          background: #28a745;
          color: #fff;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          padding: 8px 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 8px;
        }
        /* Company Stats Management Styles */
        .admin-section-card {
          background: #f8f9fa;
          border-radius: 8px;
          padding: 24px;
          margin-bottom: 24px;
          border: 1px solid #e9ecef;
        }
        .admin-section-card h3 {
          margin: 0 0 20px 0;
          color: #1e4f7a;
          font-size: 1.3rem;
          font-weight: 600;
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
          margin-bottom: 30px;
        }
        .stat-card {
          background: #fff;
          border-radius: 8px;
          padding: 20px;
          border: 1px solid #dee2e6;
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        }
        .stat-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
          padding-bottom: 12px;
          border-bottom: 1px solid #e9ecef;
        }
        .stat-card-header h5 {
          margin: 0;
          color: #495057;
          font-size: 1rem;
          font-weight: 500;
        }
        .stat-preview {
          background: #f8f9fa;
          border-radius: 6px;
          padding: 16px;
          text-align: center;
          margin-top: 16px;
          border: 1px solid #e9ecef;
        }
        .stat-number {
          font-size: 2rem;
          font-weight: 700;
          color: #1e4f7a;
          margin-bottom: 4px;
        }
        .stat-label {
          font-size: 0.9rem;
          color: #6c757d;
          font-weight: 500;
        }

        .save-btn {
          margin-top: 30px;
          padding: 12px 24px;
          font-size: 1rem;
        }
        
        @media (max-width: 768px) {
          .stats-grid {
            grid-template-columns: 1fr;
          }
        }
        
        @media (max-width: 600px) {
          .modal-container {
            min-width: 95vw;
            padding: 16px 4vw;
          }
          .form-row {
            flex-direction: column;
            gap: 0;
          }
        }
      `}</style>

      {/* Job Form Modal */}
      <JobFormModal
        show={showJobModal}
        onClose={() => setShowJobModal(false)}
        onSave={handleSaveJob}
        editingJob={editingJob}
      />
        </div>
    );
}
