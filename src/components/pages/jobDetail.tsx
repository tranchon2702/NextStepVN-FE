"use client";

import { useParams } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import recruitmentService from "@/services/recruitmentService";

interface Job {
  _id: string;
  jobCode?: string;
  title: string;
  category?: string;
  workType?: string;
  location: string;
  description: string;
  requirements: string[];
  benefits: string[];
  salary?: {
    min: number;
    max: number;
    currency?: string;
    note?: string;
  };
  bonus?: string;
  allowance?: string;
  otherBenefits?: string;
  major?: string;
  age?: {
    min: number;
    max: number;
  };
  experience?: string;
  language?: string;
  overtime?: string;
  offTime?: string;
  interviewFormat?: string;
  interviewTime?: string;
  otherInfo?: string;
  assignedTo?: string;
  recruitmentStatus?: string;
  isActive: boolean;
  isFeatured: boolean;
  createdAt: string;
}

interface ApplicationForm {
  fullName: string;
  email: string;
  phone: string;
  address: string;
}

export default function JobDetail() {
  const params = useParams();
  const jobId = params.id as string;
  
  const [job, setJob] = useState<Job | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState<ApplicationForm>({
    fullName: "",
    email: "",
    phone: "",
    address: "",
  });
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch job data
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await fetch(`http://localhost:5001/api/careers/jobs/${jobId}`);
        const result = await response.json();
        
        if (result.success && result.data) {
          setJob(result.data);
        } else {
          toast.error('Không tìm thấy thông tin công việc');
        }
      } catch (error) {
        console.error('Error fetching job:', error);
        toast.error('Lỗi khi tải thông tin công việc');
      }
    };
    
    if (jobId) {
      fetchJob();
    }
  }, [jobId]);

  // Modal effect
  useEffect(() => {
    const body = document.body;

    if (showModal) {
      body.classList.add("modal-open");
      const scrollY = window.scrollY;
      body.style.position = "fixed";
      body.style.top = `-${scrollY}px`;
      body.style.width = "100%";
    } else {
      body.classList.remove("modal-open");
      const scrollY = body.style.top;
      body.style.position = "";
      body.style.top = "";
      body.style.width = "";
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || "0") * -1);
      }
    }

    return () => {
      body.classList.remove("modal-open");
      body.style.position = "";
      body.style.top = "";
      body.style.width = "";
    };
  }, [showModal]);

  const handleApplyClick = () => {
    setShowModal(true);
    setForm({ fullName: "", email: "", phone: "", address: "" });
    setCvFile(null);
    setFormError("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowedTypes.includes(file.type)) {
      setFormError("Vui lòng tải lên file PDF, DOC hoặc DOCX.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setFormError("Kích thước file phải nhỏ hơn 5MB.");
      return;
    }

    setCvFile(file);
    setFormError("");
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^[\+]?[0-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/\s/g, ""));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setFormError("");

    if (!form.fullName.trim()) {
      setFormError("Vui lòng nhập họ tên.");
      toast.error("Vui lòng nhập họ tên.");
      return;
    }

    if (!form.email.trim()) {
      setFormError("Vui lòng nhập email.");
      toast.error("Vui lòng nhập email.");
      return;
    }

    if (!validateEmail(form.email)) {
      setFormError("Email không hợp lệ.");
      toast.error("Email không hợp lệ.");
      return;
    }

    if (!form.phone.trim()) {
      setFormError("Vui lòng nhập số điện thoại.");
      toast.error("Vui lòng nhập số điện thoại.");
      return;
    }

    if (!validatePhone(form.phone)) {
      setFormError("Số điện thoại không hợp lệ.");
      toast.error("Số điện thoại không hợp lệ.");
      return;
    }

    if (!cvFile) {
      setFormError("Vui lòng tải lên CV của bạn.");
      toast.error("Vui lòng tải lên CV của bạn.");
      return;
    }

    setIsSubmitting(true);

    try {
      await recruitmentService.ApplyJob(
        job?._id,
        form.fullName,
        form.email,
        form.phone,
        form.address,
        cvFile
      );
      toast.success("Ứng tuyển thành công!");
      setShowModal(false);

      setForm({ fullName: "", email: "", phone: "", address: "" });
      setCvFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch {
      setFormError("Gửi đơn ứng tuyển thất bại. Vui lòng thử lại.");
      toast.error("Gửi đơn ứng tuyển thất bại. Vui lòng thử lại.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleModalClose = () => {
    if (!isSubmitting) {
      setShowModal(false);
      setFormError("");
    }
  };

  if (!job) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <div className="spinner-border text-danger" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <section className="job-detail-section">
        <div className="container">
          {/* Page Header */}
          <div className="page-header">
            <h1 className="page-title">{job.title}</h1>
            <div className="job-badges">
              <span className="badge-type">{job.type}</span>
              {job.isActive && <span className="badge-active">Đang tuyển</span>}
            </div>
          </div>

          {/* Job Info Table */}
          <div className="job-info-table">
            <div className="table-header">
              <h2>Thông Tin Chi Tiết</h2>
            </div>
            
            <div className="info-row">
              <div className="info-label">1. Mã công việc:</div>
              <div className="info-value">{job.jobCode || `JOB-${job._id.slice(-6).toUpperCase()}`}</div>
            </div>

            <div className="info-row">
              <div className="info-label">2. Nội dung công việc:</div>
              <div className="info-value">{job.description}</div>
            </div>

            <div className="info-row">
              <div className="info-label">3. Địa điểm làm việc:</div>
              <div className="info-value">{job.location}</div>
            </div>

            <div className="info-row">
              <div className="info-label">4. Công việc:</div>
              <div className="info-value">
                <div className="info-subitem">
                  <strong>Hình thức làm việc:</strong> {job.workType || 'Full-time'}
                </div>
                <div className="info-subitem">
                  <strong>Nội dung làm việc:</strong> {job.description}
                </div>
              </div>
            </div>

            <div className="info-row">
              <div className="info-label">5. Lương & Thưởng:</div>
              <div className="info-value">
                <div className="info-subitem">
                  <strong>Lương cơ bản:</strong> {job.salary ? `${job.salary.currency || '¥'}${job.salary.min.toLocaleString()} - ${job.salary.currency || '¥'}${job.salary.max.toLocaleString()}${job.salary.note ? ` (${job.salary.note})` : ''}` : 'Thỏa thuận'}
                </div>
                <div className="info-subitem">
                  <strong>Thưởng:</strong> {job.bonus || 'Thưởng theo hiệu suất'}
                </div>
                <div className="info-subitem">
                  <strong>Trợ cấp:</strong> {job.allowance || 'Theo quy định công ty'}
                </div>
                <div className="info-subitem">
                  <strong>Phúc lợi khác:</strong> {job.otherBenefits || 'Bảo hiểm đầy đủ, du lịch công ty'}
                </div>
              </div>
            </div>

            <div className="info-row">
              <div className="info-label">6. Yêu cầu ứng tuyển:</div>
              <div className="info-value">
                <div className="info-subitem">
                  <strong>Chuyên ngành:</strong> {job.major || 'Theo yêu cầu công việc'}
                </div>
                <div className="info-subitem">
                  <strong>Tuổi:</strong> {job.age ? `${job.age.min} - ${job.age.max} tuổi` : 'Không giới hạn'}
                </div>
                <div className="info-subitem">
                  <strong>Kinh nghiệm:</strong> {job.experience || 'Có kinh nghiệm làm việc'}
                </div>
                <div className="info-subitem">
                  <strong>Ngoại ngữ:</strong> {job.language || 'Tiếng Nhật N3 trở lên'}
                </div>
              </div>
            </div>

            <div className="info-row">
              <div className="info-label">7. Thời gian làm việc:</div>
              <div className="info-value">
                <div className="info-subitem">
                  <strong>Thời gian làm thêm:</strong> {job.overtime || 'Theo quy định công ty'}
                </div>
                <div className="info-subitem">
                  <strong>Thời gian nghỉ:</strong> {job.offTime || 'Thứ 7, Chủ nhật và ngày lễ'}
                </div>
              </div>
            </div>

            <div className="info-row">
              <div className="info-label">8. Hỗ trợ & phỏng vấn:</div>
              <div className="info-value">
                <div className="info-subitem">
                  <strong>Hình thức phỏng vấn:</strong> {job.interviewFormat || 'Online/Trực tiếp'}
                </div>
                <div className="info-subitem">
                  <strong>Thời gian phỏng vấn:</strong> {job.interviewTime || 'Linh hoạt theo lịch ứng viên'}
                </div>
              </div>
            </div>

            <div className="info-row">
              <div className="info-label">9. Thông tin khác:</div>
              <div className="info-value">{job.otherInfo || 'Liên hệ để biết thêm chi tiết'}</div>
            </div>

            <div className="info-row">
              <div className="info-label">10. Người phụ trách:</div>
              <div className="info-value">{job.assignedTo || 'HR Department'}</div>
            </div>
          </div>

          {/* Apply Button */}
          <div className="apply-section">
            <button className="btn-apply" onClick={handleApplyClick}>
              Ứng Tuyển Ngay
            </button>
          </div>
        </div>
      </section>

      {/* Application Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={handleModalClose}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Ứng Tuyển: {job.title}</h3>
              <button className="modal-close" onClick={handleModalClose}>
                <i className="fas fa-times"></i>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="application-form">
              {formError && (
                <div className="alert alert-danger">{formError}</div>
              )}

              <div className="form-group">
                <label>
                  Họ và tên <span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleFormChange}
                  className="form-control"
                  placeholder="Nhập họ và tên"
                  required
                />
              </div>

              <div className="form-group">
                <label>
                  Email <span className="required">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleFormChange}
                  className="form-control"
                  placeholder="example@email.com"
                  required
                />
              </div>

              <div className="form-group">
                <label>
                  Số điện thoại <span className="required">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleFormChange}
                  className="form-control"
                  placeholder="0123456789"
                  required
                />
              </div>

              <div className="form-group">
                <label>Địa chỉ</label>
                <textarea
                  name="address"
                  value={form.address}
                  onChange={handleFormChange}
                  className="form-control"
                  placeholder="Nhập địa chỉ của bạn"
                  rows={2}
                />
              </div>

              <div className="form-group">
                <label>
                  Tải lên CV <span className="required">*</span>
                </label>
                <div className="file-upload">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx"
                    className="file-input"
                    id="cv-upload"
                    required
                  />
                  <label htmlFor="cv-upload" className="file-label">
                    <i className="fas fa-cloud-upload-alt"></i>
                    {cvFile ? cvFile.name : "Chọn file (PDF, DOC, DOCX)"}
                  </label>
                </div>
                <small className="form-text">Kích thước tối đa: 5MB</small>
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={handleModalClose}
                  disabled={isSubmitting}
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="btn-submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Đang gửi...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-paper-plane me-2"></i>
                      Gửi đơn ứng tuyển
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Styles */}
      <style jsx>{`
        .job-detail-section {
          padding: 80px 0;
          background: #f8f9fa;
          min-height: calc(100vh - 200px);
        }

        .page-header {
          background: white;
          padding: 40px;
          border-radius: 16px;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
          margin-bottom: 30px;
        }

        .page-title {
          font-size: 2.2rem;
          font-weight: 700;
          color: #1a202c;
          margin-bottom: 20px;
        }

        .job-badges {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        .badge-type,
        .badge-active {
          padding: 8px 20px;
          border-radius: 20px;
          font-size: 0.9rem;
          font-weight: 600;
        }

        .badge-type {
          background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%);
          color: white;
        }

        .badge-active {
          background: #d4edda;
          color: #155724;
        }

        /* Job Info Table */
        .job-info-table {
          background: white;
          border-radius: 16px;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
          overflow: hidden;
          margin-bottom: 30px;
        }

        .table-header {
          background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%);
          padding: 20px 30px;
        }

        .table-header h2 {
          color: white;
          font-size: 1.5rem;
          font-weight: 700;
          margin: 0;
        }

        .info-row {
          display: grid;
          grid-template-columns: 250px 1fr;
          border-bottom: 1px solid #e2e8f0;
        }

        .info-row:last-child {
          border-bottom: none;
        }

        .info-label {
          padding: 20px 30px;
          background: #f8f9fa;
          font-weight: 600;
          color: #2d3748;
          border-right: 1px solid #e2e8f0;
        }

        .info-value {
          padding: 20px 30px;
          color: #4a5568;
          line-height: 1.8;
        }

        .info-subitem {
          margin-bottom: 10px;
        }

        .info-subitem:last-child {
          margin-bottom: 0;
        }

        .info-subitem strong {
          color: #2d3748;
          margin-right: 5px;
        }

        /* Apply Section */
        .apply-section {
          text-align: center;
          padding: 40px 0;
        }

        .btn-apply {
          padding: 16px 60px;
          background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%);
          color: white;
          border: none;
          border-radius: 50px;
          font-size: 1.2rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 5px 20px rgba(220, 38, 38, 0.3);
        }

        .btn-apply:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 30px rgba(220, 38, 38, 0.4);
        }

        /* Modal */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(5px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          padding: 20px;
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .modal-content {
          background: white;
          border-radius: 20px;
          width: 100%;
          max-width: 650px;
          max-height: 85vh;
          overflow: hidden;
          box-shadow: 0 25px 80px rgba(0, 0, 0, 0.4);
          display: flex;
          flex-direction: column;
          animation: slideUp 0.3s ease;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 30px 35px;
          background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%);
          flex-shrink: 0;
        }

        .modal-header h3 {
          color: white;
          font-size: 1.5rem;
          font-weight: 700;
          margin: 0;
          padding-right: 20px;
        }

        .modal-close {
          background: rgba(255, 255, 255, 0.2);
          border: none;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          font-size: 1.2rem;
          color: white;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .modal-close:hover {
          background: white;
          color: #dc2626;
          transform: rotate(90deg);
        }

        .application-form {
          padding: 35px;
          overflow-y: auto;
          flex: 1;
        }

        /* Custom Scrollbar */
        .application-form::-webkit-scrollbar {
          width: 8px;
        }

        .application-form::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }

        .application-form::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%);
          border-radius: 10px;
        }

        .application-form::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(135deg, #991b1b 0%, #7f1d1d 100%);
        }

        /* Firefox */
        .application-form {
          scrollbar-width: thin;
          scrollbar-color: #dc2626 #f1f1f1;
        }

        .form-group {
          margin-bottom: 25px;
        }

        .form-group label {
          display: block;
          margin-bottom: 10px;
          font-weight: 600;
          color: #2d3748;
          font-size: 0.95rem;
        }

        .required {
          color: #dc2626;
        }

        .form-control {
          width: 100%;
          padding: 14px 18px;
          border: 2px solid #e2e8f0;
          border-radius: 12px;
          font-size: 1rem;
          transition: all 0.3s ease;
          background: #fafafa;
        }

        .form-control:hover {
          border-color: #cbd5e0;
          background: white;
        }

        .form-control:focus {
          outline: none;
          border-color: #dc2626;
          background: white;
          box-shadow: 0 0 0 4px rgba(220, 38, 38, 0.1);
        }

        textarea.form-control {
          resize: vertical;
        }

        .file-upload {
          position: relative;
        }

        .file-input {
          display: none;
        }

        .file-label {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 20px 20px;
          border: 2px dashed #cbd5e0;
          border-radius: 12px;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s ease;
          color: #4a5568;
          background: #fafafa;
          font-weight: 500;
        }

        .file-label:hover {
          border-color: #dc2626;
          color: #dc2626;
          background: #fee;
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(220, 38, 38, 0.1);
        }

        .file-label i {
          font-size: 1.2rem;
        }

        .form-text {
          display: block;
          margin-top: 5px;
          color: #718096;
          font-size: 0.85rem;
        }

        .alert {
          padding: 14px 18px;
          border-radius: 12px;
          margin-bottom: 25px;
          display: flex;
          align-items: center;
          gap: 10px;
          animation: shake 0.3s ease;
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }

        .alert-danger {
          background: linear-gradient(135deg, #fee 0%, #fdd 100%);
          color: #c53030;
          border: 2px solid #fc8181;
          font-weight: 500;
        }

        .alert-danger::before {
          content: "⚠";
          font-size: 1.2rem;
        }

        .modal-actions {
          display: flex;
          gap: 15px;
          justify-content: flex-end;
          margin-top: 35px;
          padding-top: 25px;
          border-top: 2px solid #f1f3f5;
        }

        .btn-cancel,
        .btn-submit {
          padding: 14px 35px;
          border: none;
          border-radius: 12px;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .btn-cancel {
          background: #f1f3f5;
          color: #495057;
          border: 2px solid #e9ecef;
        }

        .btn-cancel:hover {
          background: #e9ecef;
          border-color: #cbd5e0;
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }

        .btn-submit {
          background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%);
          color: white;
          box-shadow: 0 5px 15px rgba(220, 38, 38, 0.2);
        }

        .btn-submit:hover:not(:disabled) {
          transform: translateY(-3px);
          box-shadow: 0 8px 25px rgba(220, 38, 38, 0.4);
        }

        .btn-submit:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        /* Responsive */
        @media (max-width: 992px) {
          .info-row {
            grid-template-columns: 1fr;
          }

          .info-label {
            border-right: none;
            border-bottom: 1px solid #e2e8f0;
          }
        }

        @media (max-width: 768px) {
          .job-detail-section {
            padding: 40px 0;
          }

          .page-header {
            padding: 25px;
          }

          .page-title {
            font-size: 1.75rem;
          }

          .info-label,
          .info-value {
            padding: 15px 20px;
          }

          .table-header {
            padding: 15px 20px;
          }

          .btn-apply {
            padding: 14px 40px;
            font-size: 1.1rem;
          }

          .modal-content {
            max-width: 100%;
          }

          .modal-header,
          .application-form {
            padding: 20px;
          }

          .modal-actions {
            flex-direction: column;
          }

          .btn-cancel,
          .btn-submit {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </>
  );
}

