"use client";

import { useState } from "react";

interface CVViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  cvUrl: string;
  candidateId: string;
  candidateName: string;
}

export default function CVViewerModal({ isOpen, onClose, cvUrl, candidateId, candidateName }: CVViewerModalProps) {
  const [formData, setFormData] = useState({
    requesterName: "",
    requesterEmail: "",
    requesterPhone: "",
    companyName: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/candidates/contact-request`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          candidateId,
          ...formData
        })
      });

      const data = await response.json();

      if (data.success) {
        alert(data.message || "Gửi yêu cầu thành công!");
        setFormData({
          requesterName: "",
          requesterEmail: "",
          requesterPhone: "",
          companyName: "",
          message: ""
        });
      } else {
        alert(data.message || "Có lỗi xảy ra");
      }
    } catch (error) {
      console.error("Error submitting contact request:", error);
      alert("Lỗi khi gửi yêu cầu");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Modal Overlay */}
      <div 
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0, 0, 0, 0.7)",
          zIndex: 9998,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px"
        }}
        onClick={onClose}
      >
        {/* Modal Content */}
        <div 
          style={{
            background: "white",
            borderRadius: "12px",
            width: "95%",
            maxWidth: "1400px",
            height: "90vh",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            position: "relative"
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div style={{
            padding: "20px 30px",
            borderBottom: "2px solid #e5e7eb",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: "linear-gradient(135deg, #dc2626 0%, #991b1b 100%)",
            color: "white"
          }}>
            <h2 style={{ margin: 0, fontSize: "1.5rem", fontWeight: "700" }}>
              CV: {candidateName}
            </h2>
            <button
              onClick={onClose}
              style={{
                background: "rgba(255, 255, 255, 0.2)",
                border: "2px solid white",
                borderRadius: "50%",
                width: "40px",
                height: "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: "white",
                fontSize: "24px",
                fontWeight: "bold",
                transition: "all 0.2s"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.3)";
                e.currentTarget.style.transform = "scale(1.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.2)";
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              ×
            </button>
          </div>

          {/* Body - Split View */}
          <div style={{
            flex: 1,
            display: "grid",
            gridTemplateColumns: "1fr 450px",
            gap: 0,
            overflow: "hidden"
          }}>
            {/* Left: PDF Viewer */}
            <div style={{
              background: "#f3f4f6",
              padding: "20px",
              overflow: "auto",
              borderRight: "2px solid #e5e7eb"
            }}>
              <iframe
                src={cvUrl}
                style={{
                  width: "100%",
                  height: "100%",
                  border: "none",
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)"
                }}
                title="CV Preview"
              />
            </div>

            {/* Right: Contact Form */}
            <div style={{
              background: "white",
              padding: "30px",
              overflow: "auto"
            }}>
              <div style={{ marginBottom: "20px" }}>
                <h3 style={{
                  fontSize: "1.3rem",
                  fontWeight: "700",
                  color: "#1a202c",
                  marginBottom: "8px"
                }}>
                  Quan tâm đến ứng viên này?
                </h3>
                <p style={{
                  fontSize: "0.95rem",
                  color: "#6b7280",
                  margin: 0
                }}>
                  Điền form bên dưới và chúng tôi sẽ kết nối bạn với ứng viên
                </p>
              </div>

              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: "16px" }}>
                  <label style={{
                    display: "block",
                    marginBottom: "6px",
                    fontWeight: "600",
                    color: "#374151",
                    fontSize: "0.9rem"
                  }}>
                    Họ tên *
                  </label>
                  <input
                    type="text"
                    name="requesterName"
                    value={formData.requesterName}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: "100%",
                      padding: "10px 12px",
                      border: "2px solid #e5e7eb",
                      borderRadius: "8px",
                      fontSize: "0.95rem",
                      transition: "all 0.2s"
                    }}
                    onFocus={(e) => e.currentTarget.style.borderColor = "#dc2626"}
                    onBlur={(e) => e.currentTarget.style.borderColor = "#e5e7eb"}
                  />
                </div>

                <div style={{ marginBottom: "16px" }}>
                  <label style={{
                    display: "block",
                    marginBottom: "6px",
                    fontWeight: "600",
                    color: "#374151",
                    fontSize: "0.9rem"
                  }}>
                    Email *
                  </label>
                  <input
                    type="email"
                    name="requesterEmail"
                    value={formData.requesterEmail}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: "100%",
                      padding: "10px 12px",
                      border: "2px solid #e5e7eb",
                      borderRadius: "8px",
                      fontSize: "0.95rem",
                      transition: "all 0.2s"
                    }}
                    onFocus={(e) => e.currentTarget.style.borderColor = "#dc2626"}
                    onBlur={(e) => e.currentTarget.style.borderColor = "#e5e7eb"}
                  />
                </div>

                <div style={{ marginBottom: "16px" }}>
                  <label style={{
                    display: "block",
                    marginBottom: "6px",
                    fontWeight: "600",
                    color: "#374151",
                    fontSize: "0.9rem"
                  }}>
                    Số điện thoại
                  </label>
                  <input
                    type="tel"
                    name="requesterPhone"
                    value={formData.requesterPhone}
                    onChange={handleInputChange}
                    style={{
                      width: "100%",
                      padding: "10px 12px",
                      border: "2px solid #e5e7eb",
                      borderRadius: "8px",
                      fontSize: "0.95rem",
                      transition: "all 0.2s"
                    }}
                    onFocus={(e) => e.currentTarget.style.borderColor = "#dc2626"}
                    onBlur={(e) => e.currentTarget.style.borderColor = "#e5e7eb"}
                  />
                </div>

                <div style={{ marginBottom: "16px" }}>
                  <label style={{
                    display: "block",
                    marginBottom: "6px",
                    fontWeight: "600",
                    color: "#374151",
                    fontSize: "0.9rem"
                  }}>
                    Tên công ty
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    style={{
                      width: "100%",
                      padding: "10px 12px",
                      border: "2px solid #e5e7eb",
                      borderRadius: "8px",
                      fontSize: "0.95rem",
                      transition: "all 0.2s"
                    }}
                    onFocus={(e) => e.currentTarget.style.borderColor = "#dc2626"}
                    onBlur={(e) => e.currentTarget.style.borderColor = "#e5e7eb"}
                  />
                </div>

                <div style={{ marginBottom: "20px" }}>
                  <label style={{
                    display: "block",
                    marginBottom: "6px",
                    fontWeight: "600",
                    color: "#374151",
                    fontSize: "0.9rem"
                  }}>
                    Lời nhắn *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    placeholder="Vui lòng cho chúng tôi biết yêu cầu của bạn..."
                    style={{
                      width: "100%",
                      padding: "10px 12px",
                      border: "2px solid #e5e7eb",
                      borderRadius: "8px",
                      fontSize: "0.95rem",
                      resize: "vertical",
                      fontFamily: "inherit",
                      transition: "all 0.2s"
                    }}
                    onFocus={(e) => e.currentTarget.style.borderColor = "#dc2626"}
                    onBlur={(e) => e.currentTarget.style.borderColor = "#e5e7eb"}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    width: "100%",
                    padding: "14px",
                    background: isSubmitting ? "#9ca3af" : "linear-gradient(135deg, #dc2626 0%, #991b1b 100%)",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    fontSize: "1rem",
                    fontWeight: "700",
                    cursor: isSubmitting ? "not-allowed" : "pointer",
                    transition: "all 0.3s",
                    boxShadow: "0 4px 12px rgba(220, 38, 38, 0.3)"
                  }}
                  onMouseEnter={(e) => {
                    if (!isSubmitting) {
                      e.currentTarget.style.transform = "translateY(-2px)";
                      e.currentTarget.style.boxShadow = "0 6px 20px rgba(220, 38, 38, 0.4)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 4px 12px rgba(220, 38, 38, 0.3)";
                  }}
                >
                  {isSubmitting ? "Đang gửi..." : "Gửi yêu cầu liên hệ"}
                </button>
              </form>

              <div style={{
                marginTop: "20px",
                padding: "16px",
                background: "#f3f4f6",
                borderRadius: "8px",
                borderLeft: "4px solid #dc2626"
              }}>
                <p style={{
                  fontSize: "0.85rem",
                  color: "#6b7280",
                  margin: 0,
                  lineHeight: "1.6"
                }}>
                  <strong style={{ color: "#1a202c" }}>Lưu ý:</strong> Thông tin của bạn sẽ được bảo mật. 
                  Chúng tôi sẽ liên hệ lại trong vòng 24h để hỗ trợ kết nối với ứng viên.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Responsive CSS */}
      <style jsx>{`
        @media (max-width: 1024px) {
          div[style*="gridTemplateColumns"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  );
}

