"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import useAdminAuth from "@/hooks/useAdminAuth";

interface Candidate {
  _id: string;
  name: string;
  email: string;
  major: string;
  jlpt: string;
  maritalStatus: string;
  cvUrl?: string;
  cvFileName?: string;
  phone?: string;
  address?: string;
  experience?: string;
  skills?: string[];
  notes?: string;
  status: string;
  createdAt: string;
}

export default function AdminCandidatesPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAdminAuth();
  
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [cvFile, setCvFile] = useState<File | null>(null);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    major: "CƠ KHÍ",
    jlpt: "N3",
    maritalStatus: "ĐỘC THÂN",
    phone: "",
    address: "",
    experience: "",
    skills: "",
    notes: "",
    status: "ACTIVE"
  });

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/admin/login");
    }
  }, [isAuthenticated, isLoading, router]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchCandidates();
    }
  }, [isAuthenticated]);

  const fetchCandidates = async () => {
    try {
      // Admin can see all statuses (ACTIVE, INACTIVE, HIRED)
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/candidates?showAll=true`);
      const data = await response.json();
      
      if (data.success) {
        setCandidates(data.data);
      }
    } catch (error) {
      console.error("Error fetching candidates:", error);
      alert("Lỗi khi tải danh sách ứng viên");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (candidate?: Candidate) => {
    if (candidate) {
      setEditMode(true);
      setSelectedCandidate(candidate);
      setFormData({
        name: candidate.name,
        email: candidate.email,
        major: candidate.major,
        jlpt: candidate.jlpt,
        maritalStatus: candidate.maritalStatus,
        phone: candidate.phone || "",
        address: candidate.address || "",
        experience: candidate.experience || "",
        skills: candidate.skills?.join(", ") || "",
        notes: candidate.notes || "",
        status: candidate.status
      });
    } else {
      setEditMode(false);
      setSelectedCandidate(null);
      setFormData({
        name: "",
        email: "",
        major: "CƠ KHÍ",
        jlpt: "N3",
        maritalStatus: "ĐỘC THÂN",
        phone: "",
        address: "",
        experience: "",
        skills: "",
        notes: "",
        status: "ACTIVE"
      });
    }
    setCvFile(null);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditMode(false);
    setSelectedCandidate(null);
    setCvFile(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type === "application/pdf") {
        setCvFile(file);
      } else {
        alert("Chỉ chấp nhận file PDF");
        e.target.value = "";
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("major", formData.major);
    formDataToSend.append("jlpt", formData.jlpt);
    formDataToSend.append("maritalStatus", formData.maritalStatus);
    formDataToSend.append("phone", formData.phone);
    formDataToSend.append("address", formData.address);
    formDataToSend.append("experience", formData.experience);
    formDataToSend.append("skills", formData.skills);
    formDataToSend.append("notes", formData.notes);
    formDataToSend.append("status", formData.status);
    
    if (cvFile) {
      formDataToSend.append("cv", cvFile);
    }

    try {
      const url = editMode && selectedCandidate
        ? `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/candidates/${selectedCandidate._id}`
        : `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/candidates`;
      
      const response = await fetch(url, {
        method: editMode ? "PUT" : "POST",
        body: formDataToSend
      });

      const data = await response.json();
      
      if (data.success) {
        alert(editMode ? "Cập nhật ứng viên thành công" : "Thêm ứng viên thành công");
        handleCloseModal();
        fetchCandidates();
      } else {
        alert(data.message || "Có lỗi xảy ra");
      }
    } catch (error) {
      console.error("Error saving candidate:", error);
      alert("Lỗi khi lưu ứng viên");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Bạn có chắc chắn muốn xóa ứng viên này?")) {
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/candidates/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      });

      const data = await response.json();
      
      if (data.success) {
        alert("Xóa ứng viên thành công");
        fetchCandidates();
      } else {
        alert(data.message || "Có lỗi xảy ra");
      }
    } catch (error) {
      console.error("Error deleting candidate:", error);
      alert("Lỗi khi xóa ứng viên");
    }
  };

  if (isLoading || loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <p>Đang tải...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ marginBottom: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>Quản Lý Ứng Viên</h1>
        <button 
          onClick={() => handleOpenModal()}
          style={{
            padding: "10px 20px",
            background: "#dc2626",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          + Thêm Ứng Viên
        </button>
      </div>

      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", background: "white" }}>
          <thead>
            <tr style={{ background: "#f3f4f6" }}>
              <th style={{ padding: "12px", textAlign: "left", borderBottom: "2px solid #e5e7eb" }}>Họ tên</th>
              <th style={{ padding: "12px", textAlign: "left", borderBottom: "2px solid #e5e7eb" }}>Email</th>
              <th style={{ padding: "12px", textAlign: "left", borderBottom: "2px solid #e5e7eb" }}>Ngành nghề</th>
              <th style={{ padding: "12px", textAlign: "left", borderBottom: "2px solid #e5e7eb" }}>JLPT</th>
              <th style={{ padding: "12px", textAlign: "left", borderBottom: "2px solid #e5e7eb" }}>Tình trạng</th>
              <th style={{ padding: "12px", textAlign: "left", borderBottom: "2px solid #e5e7eb" }}>CV</th>
              <th style={{ padding: "12px", textAlign: "left", borderBottom: "2px solid #e5e7eb" }}>Trạng thái</th>
              <th style={{ padding: "12px", textAlign: "center", borderBottom: "2px solid #e5e7eb" }}>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {candidates.map((candidate) => (
              <tr key={candidate._id} style={{ borderBottom: "1px solid #e5e7eb" }}>
                <td style={{ padding: "12px" }}>{candidate.name}</td>
                <td style={{ padding: "12px" }}>{candidate.email}</td>
                <td style={{ padding: "12px" }}>{candidate.major}</td>
                <td style={{ padding: "12px" }}>{candidate.jlpt}</td>
                <td style={{ padding: "12px" }}>{candidate.maritalStatus}</td>
                <td style={{ padding: "12px" }}>
                  {candidate.cvUrl ? (
                    <a 
                      href={`${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}${candidate.cvUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "#dc2626", textDecoration: "none" }}
                    >
                      📄 Xem CV
                    </a>
                  ) : (
                    <span style={{ color: "#999" }}>Chưa có</span>
                  )}
                </td>
                <td style={{ padding: "12px" }}>
                  <span style={{
                    padding: "4px 8px",
                    borderRadius: "4px",
                    fontSize: "12px",
                    background: candidate.status === "ACTIVE" ? "#dcfce7" : "#fee2e2",
                    color: candidate.status === "ACTIVE" ? "#15803d" : "#991b1b"
                  }}>
                    {candidate.status}
                  </span>
                </td>
                <td style={{ padding: "12px", textAlign: "center" }}>
                  <button
                    onClick={() => handleOpenModal(candidate)}
                    style={{
                      padding: "6px 12px",
                      marginRight: "8px",
                      background: "#3b82f6",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer"
                    }}
                  >
                    Sửa
                  </button>
                  <button
                    onClick={() => handleDelete(candidate._id)}
                    style={{
                      padding: "6px 12px",
                      background: "#ef4444",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer"
                    }}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1000
        }}>
          <div style={{
            background: "white",
            padding: "30px",
            borderRadius: "8px",
            width: "90%",
            maxWidth: "600px",
            maxHeight: "90vh",
            overflowY: "auto"
          }}>
            <h2 style={{ marginBottom: "20px" }}>
              {editMode ? "Cập Nhật Ứng Viên" : "Thêm Ứng Viên Mới"}
            </h2>
            
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: "15px" }}>
                <label style={{ display: "block", marginBottom: "5px", fontWeight: "600" }}>
                  Họ tên *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: "100%",
                    padding: "8px",
                    border: "1px solid #ddd",
                    borderRadius: "4px"
                  }}
                />
              </div>

              <div style={{ marginBottom: "15px" }}>
                <label style={{ display: "block", marginBottom: "5px", fontWeight: "600" }}>
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: "100%",
                    padding: "8px",
                    border: "1px solid #ddd",
                    borderRadius: "4px"
                  }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px", marginBottom: "15px" }}>
                <div>
                  <label style={{ display: "block", marginBottom: "5px", fontWeight: "600" }}>
                    Ngành nghề *
                  </label>
                  <select
                    name="major"
                    value={formData.major}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: "100%",
                      padding: "8px",
                      border: "1px solid #ddd",
                      borderRadius: "4px"
                    }}
                  >
                    <option value="CƠ KHÍ">Cơ Khí</option>
                    <option value="Ô TÔ">Ô Tô</option>
                    <option value="ĐIỆN, ĐIỆN TỬ">Điện, Điện Tử</option>
                    <option value="IT">IT</option>
                    <option value="XÂY DỰNG">Xây Dựng</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: "block", marginBottom: "5px", fontWeight: "600" }}>
                    JLPT *
                  </label>
                  <select
                    name="jlpt"
                    value={formData.jlpt}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: "100%",
                      padding: "8px",
                      border: "1px solid #ddd",
                      borderRadius: "4px"
                    }}
                  >
                    <option value="N5">N5</option>
                    <option value="N4">N4</option>
                    <option value="N3">N3</option>
                    <option value="N2">N2</option>
                    <option value="N1">N1</option>
                  </select>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px", marginBottom: "15px" }}>
                <div>
                  <label style={{ display: "block", marginBottom: "5px", fontWeight: "600" }}>
                    Tình trạng hôn nhân *
                  </label>
                  <select
                    name="maritalStatus"
                    value={formData.maritalStatus}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: "100%",
                      padding: "8px",
                      border: "1px solid #ddd",
                      borderRadius: "4px"
                    }}
                  >
                    <option value="ĐỘC THÂN">Độc thân</option>
                    <option value="ĐÃ KẾT HÔN">Đã kết hôn</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: "block", marginBottom: "5px", fontWeight: "600" }}>
                    Trạng thái
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    style={{
                      width: "100%",
                      padding: "8px",
                      border: "1px solid #ddd",
                      borderRadius: "4px"
                    }}
                  >
                    <option value="ACTIVE">Active</option>
                    <option value="INACTIVE">Inactive</option>
                    <option value="HIRED">Hired</option>
                  </select>
                </div>
              </div>

              <div style={{ marginBottom: "15px" }}>
                <label style={{ display: "block", marginBottom: "5px", fontWeight: "600" }}>
                  Số điện thoại
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  style={{
                    width: "100%",
                    padding: "8px",
                    border: "1px solid #ddd",
                    borderRadius: "4px"
                  }}
                />
              </div>

              <div style={{ marginBottom: "15px" }}>
                <label style={{ display: "block", marginBottom: "5px", fontWeight: "600" }}>
                  Kỹ năng (ngăn cách bởi dấu phẩy)
                </label>
                <input
                  type="text"
                  name="skills"
                  value={formData.skills}
                  onChange={handleInputChange}
                  placeholder="VD: Autocad, Solidworks, Tiện CNC"
                  style={{
                    width: "100%",
                    padding: "8px",
                    border: "1px solid #ddd",
                    borderRadius: "4px"
                  }}
                />
              </div>

              <div style={{ marginBottom: "15px" }}>
                <label style={{ display: "block", marginBottom: "5px", fontWeight: "600" }}>
                  CV (PDF) {editMode && selectedCandidate?.cvFileName && `(Hiện tại: ${selectedCandidate.cvFileName})`}
                </label>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  style={{
                    width: "100%",
                    padding: "8px",
                    border: "1px solid #ddd",
                    borderRadius: "4px"
                  }}
                />
                {cvFile && <p style={{ marginTop: "5px", fontSize: "14px", color: "#666" }}>Đã chọn: {cvFile.name}</p>}
              </div>

              <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  style={{
                    padding: "10px 20px",
                    background: "#6b7280",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer"
                  }}
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  style={{
                    padding: "10px 20px",
                    background: "#dc2626",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer"
                  }}
                >
                  {editMode ? "Cập nhật" : "Thêm mới"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

