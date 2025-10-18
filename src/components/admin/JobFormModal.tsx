'use client';
import { useState, useEffect } from 'react';
import { FiX, FiPlus, FiTrash2 } from 'react-icons/fi';

interface JobFormData {
  jobCode: string;
  title: string;
  category: string;
  location: string;
  workType: string;
  description: string;
  requirements: string[];
  benefits: string[];
  salary: {
    min: string;
    max: string;
    currency: string;
    note: string;
  };
  bonus: string;
  allowance: string;
  otherBenefits: string;
  major: string;
  age: {
    min: string;
    max: string;
  };
  experience: string;
  language: string;
  overtime: string;
  offTime: string;
  interviewFormat: string;
  interviewTime: string;
  otherInfo: string;
  assignedTo: string;
  recruitmentStatus: string;
  isActive: boolean;
}

interface JobFormModalProps {
  show: boolean;
  onClose: () => void;
  onSave: (data: any) => Promise<void>;
  editingJob: any | null;
}

export default function JobFormModal({ show, onClose, onSave, editingJob }: JobFormModalProps) {
  const [form, setForm] = useState<JobFormData>({
    jobCode: '',
    title: '',
    category: 'CƠ KHÍ',
    location: '',
    workType: 'Full-time',
    description: '',
    requirements: [''],
    benefits: [''],
    salary: {
      min: '',
      max: '',
      currency: '¥',
      note: ''
    },
    bonus: '',
    allowance: '',
    otherBenefits: '',
    major: '',
    age: {
      min: '',
      max: ''
    },
    experience: '',
    language: '',
    overtime: '',
    offTime: '',
    interviewFormat: '',
    interviewTime: '',
    otherInfo: '',
    assignedTo: '',
    recruitmentStatus: 'Đang tuyển',
    isActive: true
  });

  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (editingJob) {
      setForm({
        jobCode: editingJob.jobCode || '',
        title: editingJob.title || '',
        category: editingJob.category || 'CƠ KHÍ',
        location: editingJob.location || '',
        workType: editingJob.workType || editingJob.type || 'Full-time',
        description: editingJob.description || '',
        requirements: editingJob.requirements?.length > 0 ? editingJob.requirements : [''],
        benefits: editingJob.benefits?.length > 0 ? editingJob.benefits : [''],
        salary: {
          min: editingJob.salary?.min?.toString() || '',
          max: editingJob.salary?.max?.toString() || '',
          currency: editingJob.salary?.currency || '¥',
          note: editingJob.salary?.note || ''
        },
        bonus: editingJob.bonus || '',
        allowance: editingJob.allowance || '',
        otherBenefits: editingJob.otherBenefits || '',
        major: editingJob.major || '',
        age: {
          min: editingJob.age?.min?.toString() || '',
          max: editingJob.age?.max?.toString() || ''
        },
        experience: editingJob.experience || '',
        language: editingJob.language || '',
        overtime: editingJob.overtime || '',
        offTime: editingJob.offTime || '',
        interviewFormat: editingJob.interviewFormat || '',
        interviewTime: editingJob.interviewTime || '',
        otherInfo: editingJob.otherInfo || '',
        assignedTo: editingJob.assignedTo || '',
        recruitmentStatus: editingJob.recruitmentStatus || 'Đang tuyển',
        isActive: editingJob.isActive !== undefined ? editingJob.isActive : true
      });
    } else {
      // Reset form for new job
      setForm({
        jobCode: '',
        title: '',
        category: 'CƠ KHÍ',
        location: '',
        workType: 'Full-time',
        description: '',
        requirements: [''],
        benefits: [''],
        salary: { min: '', max: '', currency: '¥', note: '' },
        bonus: '',
        allowance: '',
        otherBenefits: '',
        major: '',
        age: { min: '', max: '' },
        experience: '',
        language: '',
        overtime: '',
        offTime: '',
        interviewFormat: '',
        interviewTime: '',
        otherInfo: '',
        assignedTo: '',
        recruitmentStatus: 'Đang tuyển',
        isActive: true
      });
    }
    setError('');
  }, [editingJob, show]);

  const handleSave = async () => {
    // Validate
    if (!form.title.trim()) {
      setError('Vui lòng nhập tên công việc');
      return;
    }
    if (!form.category) {
      setError('Vui lòng chọn nhóm ngành nghề');
      return;
    }
    if (!form.location.trim()) {
      setError('Vui lòng nhập địa điểm làm việc');
      return;
    }
    if (!form.description.trim()) {
      setError('Vui lòng nhập nội dung công việc');
      return;
    }

    setSaving(true);
    setError('');

    try {
      // Prepare data
      const jobData = {
        jobCode: form.jobCode.trim() || undefined,
        title: form.title.trim(),
        category: form.category,
        location: form.location.trim(),
        workType: form.workType,
        description: form.description.trim(),
        requirements: form.requirements.filter(r => r.trim()),
        benefits: form.benefits.filter(b => b.trim()),
        salary: {
          min: form.salary.min ? parseFloat(form.salary.min) : undefined,
          max: form.salary.max ? parseFloat(form.salary.max) : undefined,
          currency: form.salary.currency,
          note: form.salary.note.trim() || undefined
        },
        bonus: form.bonus.trim() || undefined,
        allowance: form.allowance.trim() || undefined,
        otherBenefits: form.otherBenefits.trim() || undefined,
        major: form.major.trim() || undefined,
        age: {
          min: form.age.min ? parseInt(form.age.min) : undefined,
          max: form.age.max ? parseInt(form.age.max) : undefined
        },
        experience: form.experience.trim() || undefined,
        language: form.language.trim() || undefined,
        overtime: form.overtime.trim() || undefined,
        offTime: form.offTime.trim() || undefined,
        interviewFormat: form.interviewFormat.trim() || undefined,
        interviewTime: form.interviewTime.trim() || undefined,
        otherInfo: form.otherInfo.trim() || undefined,
        assignedTo: form.assignedTo.trim() || undefined,
        recruitmentStatus: form.recruitmentStatus,
        isActive: form.isActive
      };

      await onSave(jobData);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Có lỗi xảy ra');
    } finally {
      setSaving(false);
    }
  };

  const addArrayItem = (field: 'requirements' | 'benefits') => {
    setForm(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeArrayItem = (field: 'requirements' | 'benefits', index: number) => {
    setForm(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const updateArrayItem = (field: 'requirements' | 'benefits', index: number, value: string) => {
    setForm(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  if (!show) return null;

  return (
    <div className="modal-overlay active" onClick={onClose}>
      <div className="modal-container large-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{editingJob ? 'Chỉnh sửa tin tuyển dụng' : 'Thêm tin tuyển dụng mới'}</h3>
          <button className="btn-close" onClick={onClose}>
            <FiX size={24} />
          </button>
        </div>

        <div className="modal-body">
          {error && <div className="alert alert-danger">{error}</div>}

          {/* Thông tin cơ bản */}
          <div className="form-section">
            <h4 className="section-title">Thông tin cơ bản</h4>
            
            <div className="form-row">
              <div className="form-group">
                <label>Mã công việc</label>
                <input
                  type="text"
                  className="form-input"
                  value={form.jobCode}
                  onChange={(e) => setForm({ ...form, jobCode: e.target.value })}
                  placeholder="VD: KSD_1"
                />
              </div>

              <div className="form-group">
                <label>Nhóm ngành nghề *</label>
                <select
                  className="form-input"
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  required
                >
                  <option value="CƠ KHÍ">Cơ Khí</option>
                  <option value="Ô TÔ">Ô Tô</option>
                  <option value="ĐIỆN, ĐIỆN TỬ">Điện, Điện Tử</option>
                  <option value="IT">IT</option>
                  <option value="XÂY DỰNG">Xây Dựng</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Nội dung công việc *</label>
              <input
                type="text"
                className="form-input"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="VD: Thiết kế các sản phẩm mềm cho dây truyền..."
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Địa điểm làm việc *</label>
                <input
                  type="text"
                  className="form-input"
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                  placeholder="VD: Aichi-ken, Nhật Bản"
                  required
                />
              </div>

              <div className="form-group">
                <label>Hình thức làm việc</label>
                <select
                  className="form-input"
                  value={form.workType}
                  onChange={(e) => setForm({ ...form, workType: e.target.value })}
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Mô tả chi tiết công việc *</label>
              <textarea
                className="form-input"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                rows={4}
                placeholder="Mô tả chi tiết về công việc..."
                required
              />
            </div>
          </div>

          {/* Lương & Phúc lợi */}
          <div className="form-section">
            <h4 className="section-title">Lương & Thưởng</h4>
            
            <div className="form-row">
              <div className="form-group">
                <label>Lương cơ bản (Min)</label>
                <div className="input-group">
                  <select
                    className="form-input-addon"
                    value={form.salary.currency}
                    onChange={(e) => setForm({ ...form, salary: { ...form.salary, currency: e.target.value } })}
                  >
                    <option value="¥">¥</option>
                    <option value="$">$</option>
                    <option value="VND">VND</option>
                  </select>
                  <input
                    type="number"
                    className="form-input"
                    value={form.salary.min}
                    onChange={(e) => setForm({ ...form, salary: { ...form.salary, min: e.target.value } })}
                    placeholder="300000"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Lương cơ bản (Max)</label>
                <input
                  type="number"
                  className="form-input"
                  value={form.salary.max}
                  onChange={(e) => setForm({ ...form, salary: { ...form.salary, max: e.target.value } })}
                  placeholder="450000"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Ghi chú lương</label>
              <input
                type="text"
                className="form-input"
                value={form.salary.note}
                onChange={(e) => setForm({ ...form, salary: { ...form.salary, note: e.target.value } })}
                placeholder="VD: Tùy theo năng lực"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Thưởng</label>
                <input
                  type="text"
                  className="form-input"
                  value={form.bonus}
                  onChange={(e) => setForm({ ...form, bonus: e.target.value })}
                  placeholder="VD: Thưởng theo hiệu suất"
                />
              </div>

              <div className="form-group">
                <label>Trợ cấp</label>
                <input
                  type="text"
                  className="form-input"
                  value={form.allowance}
                  onChange={(e) => setForm({ ...form, allowance: e.target.value })}
                  placeholder="VD: Trợ cấp nhà ở, đi lại"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Phúc lợi khác</label>
              <textarea
                className="form-input"
                value={form.otherBenefits}
                onChange={(e) => setForm({ ...form, otherBenefits: e.target.value })}
                rows={2}
                placeholder="Các phúc lợi khác..."
              />
            </div>
          </div>

          {/* Yêu cầu ứng tuyển */}
          <div className="form-section">
            <h4 className="section-title">Yêu cầu ứng tuyển</h4>

            <div className="form-row">
              <div className="form-group">
                <label>Chuyên ngành</label>
                <input
                  type="text"
                  className="form-input"
                  value={form.major}
                  onChange={(e) => setForm({ ...form, major: e.target.value })}
                  placeholder="VD: Kỹ thuật cơ khí"
                />
              </div>

              <div className="form-group">
                <label>Tuổi</label>
                <div className="input-group">
                  <input
                    type="number"
                    className="form-input"
                    value={form.age.min}
                    onChange={(e) => setForm({ ...form, age: { ...form.age, min: e.target.value } })}
                    placeholder="Min"
                  />
                  <span className="input-separator">-</span>
                  <input
                    type="number"
                    className="form-input"
                    value={form.age.max}
                    onChange={(e) => setForm({ ...form, age: { ...form.age, max: e.target.value } })}
                    placeholder="Max"
                  />
                </div>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Kinh nghiệm</label>
                <input
                  type="text"
                  className="form-input"
                  value={form.experience}
                  onChange={(e) => setForm({ ...form, experience: e.target.value })}
                  placeholder="VD: Có kinh nghiệm thiết kế mạch điện"
                />
              </div>

              <div className="form-group">
                <label>Ngoại ngữ</label>
                <input
                  type="text"
                  className="form-input"
                  value={form.language}
                  onChange={(e) => setForm({ ...form, language: e.target.value })}
                  placeholder="VD: Tiếng Nhật N3 trở lên"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Yêu cầu chi tiết</label>
              {form.requirements.map((req, index) => (
                <div className="array-input-row" key={index}>
                  <input
                    type="text"
                    className="form-input"
                    value={req}
                    onChange={(e) => updateArrayItem('requirements', index, e.target.value)}
                    placeholder={`Yêu cầu ${index + 1}`}
                  />
                  {form.requirements.length > 1 && (
                    <button
                      type="button"
                      className="btn-icon danger"
                      onClick={() => removeArrayItem('requirements', index)}
                    >
                      <FiTrash2 />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                className="btn-add-item"
                onClick={() => addArrayItem('requirements')}
              >
                <FiPlus /> Thêm yêu cầu
              </button>
            </div>

            <div className="form-group">
              <label>Quyền lợi</label>
              {form.benefits.map((benefit, index) => (
                <div className="array-input-row" key={index}>
                  <input
                    type="text"
                    className="form-input"
                    value={benefit}
                    onChange={(e) => updateArrayItem('benefits', index, e.target.value)}
                    placeholder={`Quyền lợi ${index + 1}`}
                  />
                  {form.benefits.length > 1 && (
                    <button
                      type="button"
                      className="btn-icon danger"
                      onClick={() => removeArrayItem('benefits', index)}
                    >
                      <FiTrash2 />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                className="btn-add-item"
                onClick={() => addArrayItem('benefits')}
              >
                <FiPlus /> Thêm quyền lợi
              </button>
            </div>
          </div>

          {/* Thời gian & Phỏng vấn */}
          <div className="form-section">
            <h4 className="section-title">Thời gian làm việc & Phỏng vấn</h4>

            <div className="form-row">
              <div className="form-group">
                <label>Thời gian làm thêm</label>
                <input
                  type="text"
                  className="form-input"
                  value={form.overtime}
                  onChange={(e) => setForm({ ...form, overtime: e.target.value })}
                  placeholder="VD: Có thể có overtime"
                />
              </div>

              <div className="form-group">
                <label>Thời gian nghỉ</label>
                <input
                  type="text"
                  className="form-input"
                  value={form.offTime}
                  onChange={(e) => setForm({ ...form, offTime: e.target.value })}
                  placeholder="VD: Thứ 7, Chủ nhật"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Hình thức phỏng vấn</label>
                <input
                  type="text"
                  className="form-input"
                  value={form.interviewFormat}
                  onChange={(e) => setForm({ ...form, interviewFormat: e.target.value })}
                  placeholder="VD: Online hoặc trực tiếp"
                />
              </div>

              <div className="form-group">
                <label>Thời gian phỏng vấn</label>
                <input
                  type="text"
                  className="form-input"
                  value={form.interviewTime}
                  onChange={(e) => setForm({ ...form, interviewTime: e.target.value })}
                  placeholder="VD: Linh hoạt"
                />
              </div>
            </div>
          </div>

          {/* Thông tin khác */}
          <div className="form-section">
            <h4 className="section-title">Quản lý & Trạng thái</h4>

            <div className="form-group">
              <label>Thông tin khác</label>
              <textarea
                className="form-input"
                value={form.otherInfo}
                onChange={(e) => setForm({ ...form, otherInfo: e.target.value })}
                rows={3}
                placeholder="Thông tin bổ sung khác..."
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Người phụ trách</label>
                <input
                  type="text"
                  className="form-input"
                  value={form.assignedTo}
                  onChange={(e) => setForm({ ...form, assignedTo: e.target.value })}
                  placeholder="VD: Đang cập nhật"
                />
              </div>

              <div className="form-group">
                <label>Trạng thái tuyển dụng *</label>
                <select
                  className="form-input"
                  value={form.recruitmentStatus}
                  onChange={(e) => setForm({ ...form, recruitmentStatus: e.target.value })}
                  required
                >
                  <option value="Đang tuyển">Đang tuyển</option>
                  <option value="Ngưng tuyển">Ngưng tuyển</option>
                  <option value="Đã đóng">Đã đóng</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={form.isActive}
                  onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
                />
                <span>Hiển thị trên website</span>
              </label>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onClose}
            disabled={saving}
          >
            Hủy
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? 'Đang lưu...' : (editingJob ? 'Cập nhật' : 'Tạo mới')}
          </button>
        </div>
      </div>

      <style jsx>{`
        .large-modal {
          max-width: 900px;
          max-height: 90vh;
          overflow-y: auto;
        }

        .form-section {
          margin-bottom: 30px;
          padding-bottom: 25px;
          border-bottom: 1px solid #e5e7eb;
        }

        .form-section:last-child {
          border-bottom: none;
        }

        .section-title {
          font-size: 1.1rem;
          font-weight: 600;
          color: #dc2626;
          margin-bottom: 20px;
          padding-bottom: 10px;
          border-bottom: 2px solid #dc2626;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
          margin-bottom: 15px;
        }

        .form-group {
          margin-bottom: 15px;
        }

        .form-group label {
          display: block;
          margin-bottom: 6px;
          font-weight: 500;
          color: #374151;
          font-size: 0.9rem;
        }

        .form-input {
          width: 100%;
          padding: 10px 12px;
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          font-size: 0.95rem;
          transition: all 0.2s;
        }

        .form-input:focus {
          outline: none;
          border-color: #dc2626;
          box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
        }

        .input-group {
          display: flex;
          gap: 10px;
          align-items: center;
        }

        .form-input-addon {
          padding: 10px 12px;
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          background: #f9fafb;
          font-weight: 600;
          min-width: 70px;
        }

        .input-separator {
          color: #9ca3af;
          font-weight: 600;
        }

        .array-input-row {
          display: flex;
          gap: 10px;
          margin-bottom: 10px;
        }

        .array-input-row .form-input {
          flex: 1;
        }

        .btn-icon {
          padding: 10px;
          border: none;
          border-radius: 8px;
          background: #f3f4f6;
          color: #6b7280;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .btn-icon.danger {
          background: #fee2e2;
          color: #dc2626;
        }

        .btn-icon.danger:hover {
          background: #dc2626;
          color: white;
        }

        .btn-add-item {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 16px;
          border: 2px dashed #e5e7eb;
          border-radius: 8px;
          background: white;
          color: #dc2626;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          margin-top: 10px;
        }

        .btn-add-item:hover {
          border-color: #dc2626;
          background: #fef2f2;
        }

        .checkbox-label {
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          padding: 12px;
          background: #f9fafb;
          border-radius: 8px;
          transition: all 0.2s;
        }

        .checkbox-label:hover {
          background: #f3f4f6;
        }

        .checkbox-label input[type="checkbox"] {
          width: 18px;
          height: 18px;
          cursor: pointer;
        }

        .checkbox-label span {
          font-weight: 500;
          color: #374151;
        }

        .alert {
          padding: 12px 16px;
          border-radius: 8px;
          margin-bottom: 20px;
        }

        .alert-danger {
          background: #fee2e2;
          color: #dc2626;
          border: 1px solid #fca5a5;
        }

        @media (max-width: 768px) {
          .large-modal {
            max-width: 95%;
          }

          .form-row {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}


