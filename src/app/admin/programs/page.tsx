"use client";

import { useEffect, useState } from "react";
import programsAdminService from "@/services/programsService-admin";
import { FiPlusCircle, FiEdit, FiTrash2, FiSave, FiX } from 'react-icons/fi';
import RichTextEditor from "@/components/news/RichTextEditor";

interface Program {
  _id?: string;
  title: string;
  slug: string;
  excerpt?: string;
  thumbnail?: string;
  content?: string;
  isActive?: boolean;
}

export default function AdminProgramsPage() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [editing, setEditing] = useState<Program | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    const list = await programsAdminService.getPrograms();
    setPrograms(list);
  };

  useEffect(() => { load(); }, []);

  const openNew = () => {
    setEditing({ title: '', slug: '', excerpt: '', thumbnail: '', content: '', isActive: true });
    setIsOpen(true);
  };
  const openEdit = (p: Program) => { setEditing({ ...p }); setIsOpen(true); };
  const close = () => { setIsOpen(false); setEditing(null); };

  const save = async () => {
    if (!editing) return;
    setSaving(true);
    try {
      if (editing._id) {
        await programsAdminService.updateProgram(editing._id, editing);
      } else {
        await programsAdminService.createProgram(editing);
      }
      await load();
      close();
    } finally { setSaving(false); }
  };

  const remove = async (id?: string) => {
    if (!id) return;
    if (!confirm("Xóa chương trình này?")) return;
    await programsAdminService.deleteProgram(id);
    await load();
  };

  return (
    <div className="admin-page-container">
      <div className="admin-page-header">
        <h1 className="admin-page-title">Quản lý Chương trình</h1>
        <button className="btn-add" onClick={openNew}><FiPlusCircle /> Thêm chương trình</button>
      </div>

      <div className="card-content">
        {programs.length === 0 ? (
          <p>Chưa có chương trình.</p>
        ) : (
          <div className="news-grid">
            {programs.map(p => (
              <div className="news-card" key={p._id}>
                <div className="news-content">
                  <h4 className="news-title">{p.title}</h4>
                  <p className="news-excerpt">/{p.slug}</p>
                  <p className="news-excerpt">{p.excerpt}</p>
                </div>
                <div className="news-actions">
                  <button className="btn-icon btn-edit" onClick={() => openEdit(p)} title="Sửa"><FiEdit /></button>
                  <button className="btn-icon btn-delete" onClick={() => remove(p._id)} title="Xóa"><FiTrash2 /></button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {isOpen && editing && (
        <div className="modal-overlay active">
          <div className="modal-container" style={{ width: '100%', maxWidth: 1100 }}>
            <div className="modal-header">
              <h3>{editing._id ? 'Chỉnh sửa chương trình' : 'Thêm chương trình'}</h3>
              <button className="btn-close" onClick={close}><FiX /></button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Tiêu đề</label>
                <input className="form-input" value={editing.title} onChange={e => setEditing({ ...editing, title: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Slug</label>
                <input className="form-input" value={editing.slug} onChange={e => setEditing({ ...editing, slug: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Tóm tắt</label>
                <textarea className="form-textarea" rows={2} value={editing.excerpt} onChange={e => setEditing({ ...editing, excerpt: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Thumbnail URL</label>
                <input className="form-input" value={editing.thumbnail} onChange={e => setEditing({ ...editing, thumbnail: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Nội dung</label>
                <RichTextEditor value={editing.content || ''} onChange={(html) => setEditing({ ...editing, content: html })} height={350} />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={close}>Hủy</button>
              <button className="btn btn-primary" onClick={save} disabled={saving}><FiSave /> {saving ? 'Đang lưu...' : 'Lưu'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


