"use client";

import { useState, useEffect, ChangeEvent, useRef } from "react";
import Image from "next/image";
import RichTextEditor from "@/components/news/RichTextEditor";
import homeService from "@/services/homeService";
import programsAdminService from "@/services/programsService-admin";
import { BACKEND_DOMAIN } from "@/api/config";
import { FiSave, FiImage, FiVideo, FiLink, FiType, FiFileText, FiTrash2, FiPlusCircle, FiCheck, FiAlertTriangle, FiInfo, FiEdit, FiArrowRight, FiX, FiCalendar, FiEye } from 'react-icons/fi';
import { toast, ToastOptions } from "react-toastify";

// Toast config
const toastOptions: ToastOptions = {
  position: "top-right" as const,
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
};

interface ApiResponse {
  success: boolean;
  message: string;
  data: any;
}
interface HeroData {
  _id?: string;
  title: string; // Button text ở góc phải dưới
  subtitle: string; // Text giữa màn hình (optional)
  backgroundImage: string;
  videoUrl: string;
  isActive: boolean;
  aiBannerImage?: string;
  aiBannerTitle?: string;
  order: number;
  buttonLink?: string; // Link khi click button
  ctaType?: 'program' | 'url' | 'none';
  ctaLabel?: string;
  ctaSlug?: string;
  ctaUrl?: string;
  ctaTheme?: 'red' | 'dark' | 'light';
}
interface SectionData {
  title: string;
  content: string;
  mediaType: string;
  mediaUrl: string;
  buttonText: string;
  buttonLink: string;
  backgroundColor: string;
  order: number;
}
interface CustomerData {
  _id: string;
  name: string;
  logo: string;
  website: string;
  order: number;
}
interface CustomersData {
  denimWoven: CustomerData[];
  knit: CustomerData[];
  [key: string]: CustomerData[];
}
interface NewsData {
  _id: string;
  title: string;
  excerpt: string;
  content: string; // Thêm field content
  image: string; // Giữ backward compatibility
  mainImage: string; // Hình ảnh chính
  additionalImages: Array<{
    url: string;
    alt: string;
    order: number;
  }>; // Các hình ảnh phụ
  isPublished: boolean;
  isFeatured: boolean;
  id: string;
  publishDate: string;
  slug: string;
  tags: string[];
  author: string;
  onHome: boolean; // Thêm field onHome
  views: number; // Thêm field views
}
interface HomeContactData {
  contact: {
    title: string;
    description: string;
    buttonText: string;
    buttonLink: string;
  };
  workWithUs: {
    title: string;
    description: string;
    buttonText: string;
    buttonLink: string;
  };
  isActive: boolean;
}

interface CertificationData {
  _id?: string;
  name: string;
  description?: string;
  image: string;
  category?: string;
  order?: number;
  issuedDate?: string;
  validUntil?: string;
}

interface HomeData {
  hero: HeroData;  // Backward compatibility
  heroes: HeroData[];  // New array for multiple heroes
  sections: SectionData[];
  factoryVideo?: string;
  customers: CustomersData;
  featuredNews: NewsData[];
  homeContact?: HomeContactData;
  certifications?: CertificationData[];
}

// Preview states
type PreviewMap = { [key: string]: string };

// FormItem và AdminSectionCard giữ nguyên như cũ
const FormItem = ({ label, icon, children }: { label: string; icon?: React.ReactNode, children: React.ReactNode }) => (
  <div className="form-item">
    <label className="form-item-label">
      {icon}
      <span>{label}</span>
    </label>
    {children}
  </div>
);

const AdminSectionCard = ({ title, children, onSave, isSaving, hasChanges }: { title: string, children: React.ReactNode, onSave?: () => void, isSaving?: boolean, hasChanges?: boolean }) => (
  <div className="admin-section-card">
      <div className="card-header">
          <h3 className="card-title">{title}</h3>
          {onSave && (
            <button onClick={onSave} className="btn-save" disabled={isSaving || !hasChanges}>
                <FiSave />
                {isSaving ? 'Đang lưu...' : 'Lưu thay đổi'}
            </button>
          )}
      </div>
      <div className="card-content">
          {children}
      </div>
  </div>
);

interface EditNewsModalProps {
  isOpen: boolean;
  onClose: () => void;
  news: NewsData | null;
  onSave: (newsData: NewsData, mainImageFile?: File, additionalImageFiles?: File[]) => Promise<void>;
  isSaving: boolean;
}
const EditNewsModal = ({ isOpen, onClose, news, onSave, isSaving }: EditNewsModalProps) => {
  const [formData, setFormData] = useState<NewsData | null>(null);
  const [mainImageFile, setMainImageFile] = useState<File | null>(null);
  const [mainImagePreview, setMainImagePreview] = useState<string | null>(null);
  const [additionalImageFiles, setAdditionalImageFiles] = useState<File[]>([]);
  const [additionalImagePreviews, setAdditionalImagePreviews] = useState<string[]>([]);
  const mainImageInputRef = useRef<HTMLInputElement | null>(null);
  const additionalImagesInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (news) {
      setFormData({ ...news });
      // Set main image preview
      const mainImageUrl = news.mainImage || news.image;
      setMainImagePreview(mainImageUrl ? `${BACKEND_DOMAIN}${mainImageUrl}` : null);
      // Do not preload previews from existing images; show only newly selected files
      setAdditionalImagePreviews([]);
      setAdditionalImageFiles([]);
      setMainImageFile(null);
      if (mainImageInputRef.current) mainImageInputRef.current.value = '';
      if (additionalImagesInputRef.current) additionalImagesInputRef.current.value = '';
    } else {
      setFormData({
        _id: '',
        title: '',
        excerpt: '',
        content: '',
        image: '',
        mainImage: '',
        additionalImages: [],
        isPublished: true,
        isFeatured: false,
        publishDate: new Date().toISOString().split('T')[0],
        id: '',
        slug: '',
        tags: [],
        author: 'Saigon 3 Jean',
        onHome: false,
        views: 0
      });
      setMainImagePreview(null);
      setAdditionalImagePreviews([]);
    }
    setMainImageFile(null);
    setAdditionalImageFiles([]);
  }, [news]);

  if (!isOpen || !formData) return null;

  const handleContentChange = (html: string) => {
    setFormData(prev => prev ? { ...prev, content: html } : prev);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const isCheckbox = type === 'checkbox';
    const newValue = isCheckbox ? (e.target as HTMLInputElement).checked : value;
    
    console.log(`Changing ${name} to:`, newValue);
    
    setFormData(prev => {
      if (!prev) return null;
      return { ...prev, [name]: newValue };
    });
  };

  const handleMainImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setMainImageFile(file);
      setMainImagePreview(URL.createObjectURL(file));
    }
  };

  const handleAdditionalImagesChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      
      // Kiểm tra số lượng file
      if (files.length > 10) {
        alert('Chỉ có thể chọn tối đa 10 hình ảnh cùng lúc');
        return;
      }
      
      // Kiểm tra kích thước file
      const oversizedFiles = files.filter(file => file.size > 2 * 1024 * 1024); // 2MB
      if (oversizedFiles.length > 0) {
        alert(`Có ${oversizedFiles.length} file vượt quá 2MB. Vui lòng chọn lại.`);
        return;
      }
      
      setAdditionalImageFiles(files);
      const previews = files.map(file => URL.createObjectURL(file));
      setAdditionalImagePreviews(previews);
      
      console.log(`Đã chọn ${files.length} hình ảnh:`, files.map(f => f.name));
    }
  };

  const removeAdditionalImage = (index: number) => {
    const newFiles = additionalImageFiles.filter((_, i) => i !== index);
    const newPreviews = additionalImagePreviews.filter((_, i) => i !== index);
    setAdditionalImageFiles(newFiles);
    setAdditionalImagePreviews(newPreviews);
  };

  const removeExistingImage = (index: number) => {
    setFormData(prev => {
      if (!prev) return null;
      const newAdditionalImages = [...(prev.additionalImages || [])];
      newAdditionalImages.splice(index, 1);
      // Re-order after removal
      newAdditionalImages.forEach((img, idx) => {
        img.order = idx + 1;
      });
      return { ...prev, additionalImages: newAdditionalImages };
    });
  };

  const getExistingImageCount = () => {
    return formData?.additionalImages?.length || 0;
  };

  const getTotalImageCount = () => {
    return getExistingImageCount() + additionalImagePreviews.length;
  };

  const removeAllImages = () => {
    // Clear existing images
    setFormData(prev => {
      if (!prev) return null;
      return { ...prev, additionalImages: [] };
    });
    // Clear any newly selected images (if any)
    setAdditionalImageFiles([]);
    setAdditionalImagePreviews([]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;
    await onSave(formData, mainImageFile || undefined, undefined);
    // Clear selected images after successful save
    setMainImageFile(null);
    setMainImagePreview(null);
    setAdditionalImageFiles([]);
    setAdditionalImagePreviews([]);
  };

  return (
    <div className={`modal-overlay ${isOpen ? 'active' : ''}`}>
      <div className="modal-container" style={{ width: '100%', maxWidth: 1300 }}>
        <div className="modal-header">
          <h3>{news?._id ? 'Chỉnh sửa tin tức' : 'Thêm tin tức mới'}</h3>
          <button className="btn-close" onClick={() => {
            setMainImageFile(null);
            setAdditionalImageFiles([]);
            setAdditionalImagePreviews([]);
            if (mainImageInputRef.current) mainImageInputRef.current.value = '';
            if (additionalImagesInputRef.current) additionalImagesInputRef.current.value = '';
            onClose();
          }}><FiX /></button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label>Tiêu đề</label>
              <input 
                type="text" 
                name="title" 
                value={formData.title} 
                onChange={handleInputChange} 
                className="form-input" 
                required 
              />
            </div>
            <div className="form-group">
              <label>Tóm tắt</label>
              <textarea 
                name="excerpt" 
                value={formData.excerpt} 
                onChange={handleInputChange} 
                className="form-textarea" 
                rows={2}
              />
            </div>
            <div className="form-group">
              <label>Nội dung</label>
              <RichTextEditor
                key={formData._id || 'new'}
                value={formData.content || ''}
                onChange={handleContentChange}
                placeholder="Nhập nội dung mô tả tin tức..."
                height={350}
              />
            </div>
            <div className="form-group">
              <label>Tags (tối đa 3 tags)</label>
              <div className="tags-input-container">
                <div className="tags-display">
                  {formData.tags && Array.isArray(formData.tags) && formData.tags.map((tag, index) => (
                    <span key={index} className="tag-item">
                      {tag}
                      <button 
                        type="button" 
                        className="tag-remove-btn" 
                        onClick={() => {
                          console.log(`Removing tag at index ${index}:`, formData.tags[index]);
                          
                          // Ensure tags is an array before splicing
                          if (Array.isArray(formData.tags)) {
                            const newTags = [...formData.tags];
                            newTags.splice(index, 1);
                            console.log("New tags after removal:", newTags);
                            
                            setFormData(prev => {
                              if (!prev) return null;
                              return { ...prev, tags: newTags };
                            });
                          }
                        }}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <input 
                  type="text" 
                  className="tag-input" 
                  placeholder={formData.tags && Array.isArray(formData.tags) && formData.tags.length >= 3 ? "Đã đạt giới hạn tags" : "Nhập tag và nhấn Enter"}
                  disabled={formData.tags && Array.isArray(formData.tags) && formData.tags.length >= 3}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      const input = e.target as HTMLInputElement;
                      const tag = input.value.trim();
                      
                      if (tag) {
                        console.log("Adding tag:", tag);
                        
                        // Ensure tags is an array
                        const currentTags = Array.isArray(formData.tags) ? [...formData.tags] : [];
                        
                        // Check if we're under the limit
                        if (currentTags.length < 3) {
                          // Check for duplicates
                          if (!currentTags.includes(tag)) {
                            const newTags = [...currentTags, tag];
                            console.log("New tags array:", newTags);
                            
                            setFormData(prev => {
                              if (!prev) return null;
                              return { ...prev, tags: newTags };
                            });
                            
                            input.value = '';
                          } else {
                            console.log("Tag already exists:", tag);
                          }
                        } else {
                          console.log("Tag limit reached (3)");
                        }
                      }
                    }
                  }}
                />
              </div>
            </div>
            <div className="form-group">
              <label>Hình ảnh chính (hiển thị bên ngoài)</label>
              <div className="image-size-notice">
                <div className="notice-icon">⚠️</div>
                <div className="notice-text">
                  <strong>Lưu ý kích thước ảnh tin tức:</strong>
                  <ul>
                    <li>Kích thước tối ưu: <strong>1920x1440 pixels</strong> (tỷ lệ 4:3)</li>
                    <li>Kích thước tối thiểu: <strong>800x600 pixels</strong></li>
                    <li>Định dạng: JPG, PNG, WEBP</li>
                    <li>Dung lượng tối đa: <strong>2MB</strong></li>
                    <li>Tỷ lệ khung hình: <strong>4:3</strong> để hiển thị tốt nhất</li>
                  </ul>
                </div>
              </div>
              {mainImagePreview && (
                <div className="image-preview-container">
                  <Image 
                    src={mainImagePreview} 
                    alt="Preview" 
                    width={200} 
                    height={120} 
                    className="image-preview" 
                  />
                </div>
              )}
              <div className="file-upload-area">
                <input 
                  type="file" 
                  onChange={handleMainImageChange} 
                  className="form-file-input" 
                  accept="image/*" 
                  id="main-image-input"
                  ref={mainImageInputRef}
                />
              </div>
            </div>

            {/* Đã bỏ phần Các hình ảnh phụ */}

          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose} disabled={isSaving}>
              Hủy
            </button>
            <button type="submit" className="btn btn-primary" disabled={isSaving}>
              {isSaving ? 'Đang lưu...' : 'Lưu tin tức'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// === Main component ===
export default function AdminHomePage() {
  const [homeData, setHomeData] = useState<HomeData | null>(null);
  const [initialHomeData, setInitialHomeData] = useState<HomeData | null>(null);
  const [homepageNews, setHomepageNews] = useState<NewsData[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | boolean>(false);
  // 1. Thêm state error nếu chưa có
  type SectionError = string | null;
  const [error, setError] = useState<SectionError>(null);

  // Files for upload, preview for UI
  const [files, setFiles] = useState<{ [key: string]: File }>({});
  const [logoPreview, setLogoPreview] = useState<PreviewMap>({});
  const [mediaPreview, setMediaPreview] = useState<PreviewMap>({});
  const [heroPreview, setHeroPreview] = useState<PreviewMap>({});
  
  // Media type selection for sections (file upload vs YouTube URL)
  const [sectionMediaTypes, setSectionMediaTypes] = useState<{ [key: string]: 'file' | 'youtube' }>({});

  // Modal news
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentEditNews, setCurrentEditNews] = useState<NewsData | null>(null);
  const [programs, setPrograms] = useState<{ _id: string; title: string; slug: string }[]>([]);

  useEffect(() => {
    loadHomepageData();
    // load programs for CTA dropdown
    (async () => {
      try {
        const list = await programsAdminService.getPrograms();
        setPrograms(list.map((p: any) => ({ _id: p._id, title: p.title, slug: p.slug })));
      } catch (e) { /* ignore */ }
    })();
  }, []);


  const loadHomepageData = async () => {
    try {
      setLoading(true);
      console.log("Loading homepage data...");
      
      let homeDataResult: any, homepageNewsResult: any;
      
      try {
        homeDataResult = await homeService.getCompleteHomeData();
        console.log("Home data loaded:", homeDataResult);
      } catch (error) {
        console.error("Error loading home data:", error);
        homeDataResult = homeService.getDefaultHomeData();
      }
      
      try {
        homepageNewsResult = await homeService.getHomepageNews();
        console.log("News data loaded:", homepageNewsResult);
      } catch (error) {
        console.error("Error loading news data:", error);
        homepageNewsResult = [];
      }
      
      // Đảm bảo dữ liệu có cấu trúc đúng
      // Đảm bảo dữ liệu có cấu trúc đúng và có dữ liệu mặc định cho homeContact
      // Normalize heroes data để đảm bảo buttonLink luôn là string
      const rawHeroes = Array.isArray((homeDataResult as any).heroes) ? (homeDataResult as any).heroes : ((homeDataResult as any).hero ? [(homeDataResult as any).hero] : []);
      const normalizedHeroes = rawHeroes.map((hero: any) => ({
        ...hero,
        buttonLink: hero.buttonLink || "",
        subtitle: hero.subtitle || "",
        title: hero.title || ""
      }));
      
      const processedHomeData = {
        ...homeDataResult,
        heroes: normalizedHeroes,
        hero: (homeDataResult as any).hero || ((homeDataResult as any).heroes && (homeDataResult as any).heroes[0]) || null,
        sections: Array.isArray((homeDataResult as any).sections) ? (homeDataResult as any).sections : [],
        factoryVideo: (homeDataResult as any).factoryVideo || "",
        homeContact: (homeDataResult as any).homeContact || {
          contact: {
            title: 'CONTACT',
            description: 'Seeking us and you\'ll get someone who can deliver consistent, high-quality products while minimizing their ecological footprint',
            buttonText: 'CONTACT US',
            buttonLink: '/contact'
          },
          workWithUs: {
            title: 'WORK WITH US',
            description: 'We are looking for intelligent, passionate individuals who are ready to join us in building and growing the company',
            buttonText: 'LEARN MORE',
            buttonLink: '/recruitment'
          },
          isActive: true
        },
        certifications: Array.isArray((homeDataResult as any).certifications) ? (homeDataResult as any).certifications : []
      };
      
      console.log("Loaded home data:", processedHomeData);
      
      setHomeData(processedHomeData as HomeData);
      setInitialHomeData(JSON.parse(JSON.stringify(processedHomeData)) as HomeData);
      setHomepageNews(homepageNewsResult as NewsData[]);
    } catch (error) {
      handleError(error, "tải dữ liệu trang");
    } finally {
      setLoading(false);
    }
  };

  const hasChanges = (section: keyof Omit<HomeData, 'featuredNews' | 'factoryVideo'> | 'certifications') => {
    if (!initialHomeData || !homeData) return false;
    if (section === 'heroes') {
      // So sánh dữ liệu text
      const textChanged = JSON.stringify(initialHomeData.heroes) !== JSON.stringify(homeData.heroes);
      // So sánh file mới
      const fileChanged = Object.keys(files).some(key => key.startsWith('hero-'));
      console.log('hasChanges heroes:', { textChanged, fileChanged, initialHeroes: initialHomeData.heroes, currentHeroes: homeData.heroes });
      return textChanged || fileChanged;
    }
    if (section === 'hero') {
      // So sánh dữ liệu text
      const textChanged = JSON.stringify(initialHomeData.hero) !== JSON.stringify(homeData.hero);
      // So sánh file mới
      const fileChanged = !!files['hero-aiBannerImage'];
      return textChanged || fileChanged;
    }
    if (section === 'certifications') {
      return (
        JSON.stringify(initialHomeData.certifications) !== JSON.stringify(homeData.certifications) ||
        Object.keys(files).some(key => key.startsWith('cert_'))
      );
    }
    return JSON.stringify(initialHomeData[section]) !== JSON.stringify(homeData[section]) ||
      Object.keys(files).some(key => key.startsWith(section.toString()));
  };

  // --- Handlers ---
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    section: string,
    index?: number,
    subSection?: string
  ) => {
    const { name, value, type } = e.target;
    let inputValue: any = value;
    if (type === 'checkbox' && 'checked' in e.target) {
      inputValue = (e.target as HTMLInputElement).checked;
    }
    setHomeData(prevData => {
      if (!prevData) return null;
      const newData = JSON.parse(JSON.stringify(prevData));
      
      if (section === 'homeContact') {
        // Đặc biệt xử lý cho homeContact
        console.log(`Updating homeContact${subSection ? '.' + subSection : ''}.${name} to:`, inputValue);
        
        // Đảm bảo homeContact tồn tại
        if (!newData.homeContact) {
          newData.homeContact = {
            contact: {
              title: 'CONTACT',
              description: 'Seeking us and you\'ll get someone who can deliver consistent, high-quality products while minimizing their ecological footprint',
              buttonText: 'CONTACT US',
              buttonLink: '/contact'
            },
            workWithUs: {
              title: 'WORK WITH US',
              description: 'We are looking for intelligent, passionate individuals who are ready to join us in building and growing the company',
              buttonText: 'LEARN MORE',
              buttonLink: '/recruitment'
            },
            isActive: true
          };
        }
        
        // Xử lý cho subSection (contact hoặc workWithUs)
        if (subSection) {
          // Đảm bảo subSection tồn tại
          if (!newData.homeContact[subSection]) {
            newData.homeContact[subSection] = {
              title: '',
              description: '',
              buttonText: '',
              buttonLink: subSection === 'contact' ? '/contact' : '/recruitment'
            };
          }
          
          // Cập nhật giá trị
          newData.homeContact[subSection][name] = inputValue;
        } else {
          // Cập nhật trực tiếp vào homeContact
          newData.homeContact[name] = inputValue;
        }
        
      } else if (subSection && index === undefined) {
        const nameParts = name.split('_');
        if (nameParts.length >= 2) {
          const fieldName = nameParts[0];
          const customerId = nameParts.slice(1).join('_');
          const customerIndex = newData.customers[subSection].findIndex(
            (c: CustomerData) => String(c._id) === String(customerId)
          );
          if (customerIndex !== -1) {
            newData.customers[subSection][customerIndex][fieldName] = inputValue;
          } else {
            console.error(`Không tìm thấy khách hàng với ID: ${customerId}`);
          }
        }
      } else if (index !== undefined) {
        if (subSection) {
          // Handle subSection for sections (e.g., mediaUrl)
          newData[section][index][subSection] = inputValue;
        } else {
          newData[section][index][name] = inputValue;
        }
      } else {
        newData[section][name] = inputValue;
      }
      
      return newData;
    });
  };

  const handleCheckboxChange = async (newsId: string, field: 'isFeatured' | 'isPublished' | 'onHome', checked: boolean) => {
      const newsItem = homepageNews.find(n => n._id === newsId);
      if (!newsItem) return;
      
      // Kiểm tra tin nổi bật - chỉ cho phép 1 tin featured
      if (field === 'isFeatured' && checked) {
        const currentFeatured = homepageNews.find(n => n.isFeatured && n._id !== newsId);
        if (currentFeatured) {
          const confirmResult = window.confirm(
            `Tin "${currentFeatured.title}" đang là tin nổi bật.\n\nBạn có muốn chuyển sang tin "${newsItem.title}" không?\n\n(Tin cũ sẽ tự động bỏ nổi bật)`
          );
          
          if (!confirmResult) {
            return; // User hủy
          }
          
          // Tự động bỏ featured của tin cũ
          try {
            setSaving(currentFeatured._id);
            const oldNewsUpdated = { ...currentFeatured, isFeatured: false };
            await homeService.updateNews(currentFeatured._id, oldNewsUpdated, undefined, undefined);
            
            // Cập nhật state local
            setHomepageNews(prevNews =>
              prevNews.map(n => (n._id === currentFeatured._id ? oldNewsUpdated : n))
            );
            
            toast.info(`Đã bỏ tin nổi bật: "${currentFeatured.title}"`, { ...toastOptions });
          } catch (error) {
            console.error('Error removing old featured news:', error);
            toast.error('Lỗi khi bỏ tin nổi bật cũ');
            return;
          } finally {
            setSaving(false);
          }
        }
      }
      
      // Kiểm tra tin trang chủ - chỉ cho phép tối đa 4 tin onHome (1 featured + 3 tin nhỏ)
      if (field === 'onHome' && checked) {
        const currentOnHome = homepageNews.filter(n => n.onHome && n._id !== newsId);
        if (currentOnHome.length >= 4) {
          // Tìm tin không phải featured để thay thế (ưu tiên bỏ tin nhỏ trước)
          const nonFeaturedOnHome = currentOnHome.filter(n => !n.isFeatured);
          let oldestOnHome: NewsData;
          
          if (nonFeaturedOnHome.length > 0) {
            // Ưu tiên bỏ tin nhỏ cũ nhất
            oldestOnHome = nonFeaturedOnHome.sort((a, b) => new Date(a.publishDate).getTime() - new Date(b.publishDate).getTime())[0];
          } else {
            // Nếu tất cả đều featured (trường hợp hiếm), bỏ tin cũ nhất
            oldestOnHome = currentOnHome.sort((a, b) => new Date(a.publishDate).getTime() - new Date(b.publishDate).getTime())[0];
          }
          
          const confirmResult = window.confirm(
            `Đã có 4 tin trên trang chủ (tối đa: 1 nổi bật + 3 tin nhỏ).\n\nTin cũ nhất: "${oldestOnHome.title}"\n\nBạn có muốn thay thế bằng tin "${newsItem.title}" không?\n\n(Tin cũ nhất sẽ tự động bỏ khỏi trang chủ)`
          );
          
          if (!confirmResult) {
            return; // User hủy
          }
          
          // Tự động bỏ onHome của tin cũ nhất
          try {
            setSaving(oldestOnHome._id);
            const oldNewsUpdated = { ...oldestOnHome, onHome: false };
            await homeService.updateNews(oldestOnHome._id, oldNewsUpdated, undefined, undefined);
            
            // Cập nhật state local
            setHomepageNews(prevNews =>
              prevNews.map(n => (n._id === oldestOnHome._id ? oldNewsUpdated : n))
            );
            
            toast.info(`Đã bỏ khỏi trang chủ: "${oldestOnHome.title}"`, { ...toastOptions });
          } catch (error) {
            console.error('Error removing old onHome news:', error);
            toast.error('Lỗi khi bỏ tin trang chủ cũ');
            return;
          } finally {
            setSaving(false);
          }
        }
      }
      
      // Log trạng thái trước khi thay đổi
      console.log(`Changing ${field} for news "${newsItem.title}" from ${newsItem[field]} to ${checked}`);
      
      // Mô tả trạng thái cho người dùng
      let statusMessage = "";
      if (field === 'isPublished') {
        statusMessage = checked ? "Đã đăng tin tức" : "Đã hủy đăng tin tức";
      } else if (field === 'isFeatured') {
        statusMessage = checked ? "Đã đặt làm tin nổi bật" : "Đã bỏ tin nổi bật";
      } else if (field === 'onHome') {
        statusMessage = checked ? "Đã hiển thị trên trang chủ" : "Đã bỏ hiển thị trên trang chủ";
      }
      
      const updatedNewsItem = { ...newsItem, [field]: checked };
      setSaving(newsId);
      try {
          const result = await homeService.updateNews(newsId, updatedNewsItem, undefined, undefined);
          if ((result as any).success) {
              toast.success(statusMessage, { ...toastOptions, icon: <FiCheck /> });
              setHomepageNews(prevNews =>
                prevNews.map(n => (n._id === newsId ? updatedNewsItem : n))
              );
              
              // Log kết quả thành công
              console.log(`Successfully updated news status:`, {
                id: newsId,
                field,
                newValue: checked,
                result: (result as any).success
              });
          } else {
              throw new Error((result as any).message || "Cập nhật thất bại");
          }
      } catch (error) {
          handleError(error, `cập nhật trạng thái tin tức`);
      } finally {
          setSaving(false);
      }
  };

  // ==================== ĐÂY LÀ CHỖ ĐÃ SỬA ==================== 
  // Xử lý file và preview cho UI (KHÔNG ghi base64 vào homeData)
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>, key: string) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Log thông tin file để debug
      console.log('File selected:', {
        name: file.name,
        type: file.type,
        size: file.size,
        key: key
      });
      
      setFiles(prevFiles => ({ ...prevFiles, [key]: file }));
      // Preview cho từng loại:
      if (key === 'hero-aiBannerImage') {
        const reader = new FileReader();
        reader.onload = (event) => setHeroPreview(prev => ({ ...prev, [key]: event.target?.result as string }));
        reader.readAsDataURL(file);
      } else if (key.startsWith('customers')) {
        const reader = new FileReader();
        reader.onload = (event) => setLogoPreview(prev => ({ ...prev, [key]: event.target?.result as string }));
        reader.readAsDataURL(file);
      } else if (key.startsWith('sections')) {
        const reader = new FileReader();
        reader.onload = (event) => setMediaPreview(prev => ({ ...prev, [key]: event.target?.result as string }));
        reader.readAsDataURL(file);
      } else if (key.startsWith('hero') && key !== 'hero-aiBannerImage') {
        const reader = new FileReader();
        reader.onload = (event) => setHeroPreview(prev => ({ ...prev, [key]: event.target?.result as string }));
        reader.readAsDataURL(file);
      }
      e.target.value = '';
    }
  };
  // ==================== HẾT CHỖ SỬA ==================== 

  const handleError = (error: any, action: string) => {
    console.error(`Lỗi khi ${action}:`, error);
    const errorMessage = error instanceof Error ? error.message : "Lỗi không xác định";
    toast.error(`Lỗi khi ${action}: ${errorMessage}`, {
      ...toastOptions,
      icon: <FiAlertTriangle />
    });
  };

  // Function to handle YouTube URL validation and conversion
  const isYouTubeUrl = (url: string): boolean => {
    return url.includes('youtube.com/watch?v=') || url.includes('youtu.be/');
  };

  const getYouTubeVideoId = (url: string): string | null => {
    try {
      if (url.includes('youtube.com/watch?v=')) {
        return url.split('v=')[1].split('&')[0];
      } else if (url.includes('youtu.be/')) {
        return url.split('youtu.be/')[1].split('?')[0];
      }
    } catch (error) {
      console.error('Error parsing YouTube URL:', error);
    }
    return null;
  };

  const handleSectionMediaTypeChange = (sectionIndex: number, mediaType: 'file' | 'youtube') => {
    setSectionMediaTypes(prev => ({
      ...prev,
      [`section-${sectionIndex}`]: mediaType
    }));
  };

  const handleSave = async (section: "hero" | "heroes" | "sections" | "customers" | "homeContact" | "certifications") => {
    if (!homeData || !hasChanges(section)) return;
    setSaving(section);

    try {
        let result: any;
        const dataToSave = homeData[section];
        // Chỉ gửi file (không gửi base64)
        const filesToSave: Record<string, File> = {};
        
        if (section === 'heroes') {
          // Handle múltiple heroes - collect all files for all heroes
          homeData.heroes.forEach((hero, index) => {
            if (files[`hero-${index}`]) {
              filesToSave[`hero-${index}`] = files[`hero-${index}`];
            }
          });
          result = await homeService.updateHeroes(homeData.heroes, filesToSave);
        } else if (section === 'hero') {
          // Đảm bảo truyền đúng key cho AI Banner
          if (files['hero-aiBannerImage']) {
            filesToSave['aiBannerImage'] = files['hero-aiBannerImage'];
          }
          // Nếu có các file khác cho hero (ví dụ: backgroundImage, videoUrl), thêm vào đây nếu cần
          result = await homeService.updateHero(dataToSave as HeroData, filesToSave);
        }
        
        // Đảm bảo truyền đúng key cho AI Banner
        if (files['hero-aiBannerImage']) {
          filesToSave['aiBannerImage'] = files['hero-aiBannerImage'];
        }
        
        // Log thông tin trước khi gửi lên server
        console.log(`Saving ${section} with files:`, Object.keys(filesToSave).map(key => ({
          key,
          fileName: filesToSave[key].name,
          fileType: filesToSave[key].type,
          fileSize: filesToSave[key].size
        })));
        
        switch(section) {
          case 'heroes':
              // Đã xử lý ở trên (dòng 907-914)
              break;
          case 'hero':
              result = await homeService.updateHero(dataToSave as HeroData, filesToSave);
              break;
          case 'sections':
              // Chuẩn bị files cho sections
              homeData.sections.forEach((sec, idx) => {
                if (files[`sections-${idx}-mediaUrl`]) {
                  filesToSave[`sections-${idx}-mediaUrl`] = files[`sections-${idx}-mediaUrl`];
                }
              });
              
              console.log('Sections files to save:', Object.keys(filesToSave));
              
              // For sections, vẫn giữ cấu trúc cũ để đảm bảo tương thích
              const sectionsToSave = {
                sections: Array.isArray(dataToSave) ? dataToSave : homeData.sections
              };
              result = await homeService.updateHomeSections(sectionsToSave as any, filesToSave);
              break;
          case 'customers':
              // Chuẩn bị files cho customers
              Object.keys(files).forEach(key => {
                if (key.startsWith('customers-')) {
                  filesToSave[key] = files[key];
                }
              });
              console.log('Customers dataToSave:', dataToSave);
              console.log('Customers filesToSave:', Object.keys(filesToSave));
              result = await homeService.updateCustomers(dataToSave as CustomersData, filesToSave);
              break;
          case 'homeContact':
              try {
                console.log("Saving homeContact data:", JSON.stringify(dataToSave, null, 2));
                result = await homeService.updateHomeContact(dataToSave as HomeContactData);
                console.log("HomeContact save result:", result);
              } catch (error) {
                console.error("Error saving HomeContact:", error);
                throw error;
              }
              break;
          case 'certifications':
              // Gọi API update certifications, truyền files nếu có
              // Sau khi lưu thành công, load lại data
              setSaving('certifications');
              try {
                const filesToSave = Object.keys(files)
                  .filter(key => key.startsWith('cert_'))
                  .reduce((obj, key) => {
                    obj[key] = files[key];
                    return obj;
                  }, {} as Record<string, File>);
                const result = await homeService.updateCertifications(homeData.certifications, filesToSave);
                console.log('Save certifications result:', result);
                if (!result || typeof result !== 'object' || !('success' in result)) {
                  toast.error("Lỗi: Không nhận được phản hồi hợp lệ từ server!", toastOptions);
                  setSaving(false);
                  return;
                }
                if (result.success) {
                  toast.success("Đã lưu chứng chỉ nhỏ thành công!", { ...toastOptions, icon: <FiCheck /> });
                  setFiles({});
                  await loadHomepageData();
                } else {
                  toast.error("Lỗi khi lưu chứng chỉ nhỏ: " + (result.message || "Lưu thất bại"), toastOptions);
                }
              } catch (error) {
                toast.error("Lỗi khi lưu chứng chỉ nhỏ: " + ((error as any)?.message || "Lưu thất bại"), toastOptions);
              } finally {
                setSaving(false);
              }
              return;
          default:
              throw new Error("Section chưa được hỗ trợ lưu.");
        }
        
        console.log(`Save ${section} result:`, result);
        
        console.log('Save result details:', { success: (result as any)?.success, message: (result as any)?.message, data: (result as any)?.data });
        if (result && (result as any).success) {
          // Thêm delay nhỏ để đảm bảo backend đã cập nhật xong
          await new Promise(resolve => setTimeout(resolve, 700));
          
          // Reload data to get updated values
          console.log('Reloading data after successful save...');
          const newData = await homeService.getCompleteHomeData();
          console.log('New data loaded:', newData);
          setHomeData(newData as HomeData);
          setInitialHomeData(newData as HomeData); // Reset initial data for hasChanges
          
          // Clear all file states
          setFiles({});
          setLogoPreview({});
          setMediaPreview({});
          setHeroPreview({});
          
          // Reset factory video type based on new data
          if ((newData as any)?.factoryVideo) {
            setFactoryVideoType(isYouTubeUrl((newData as any).factoryVideo) ? 'youtube' : 'file');
          }
          
          toast.success("Đã lưu thành công!", { ...toastOptions, icon: <FiCheck /> });
        } else {
          console.error('Save failed:', result);
          throw new Error((result as any)?.message || "Lưu thất bại");
        }
    } catch (error: any) {
      handleError(error, `lưu ${section}`);
    } finally {
      setSaving(false);
    }
  }

  const handleDeleteCustomer = async (subSection: string, id: string) => {
      if (window.confirm("Bạn có chắc chắn muốn xóa khách hàng này?")) {
          setSaving(`delete-${subSection}-${id}`);
          try {
              const deleteCustomerMethod = (homeService as any).deleteCustomer;
              const result = await deleteCustomerMethod(subSection, id);
              if (result.success) {
                  toast.success("Đã xóa khách hàng thành công!", { ...toastOptions, icon: <FiCheck /> });
                  setHomeData(prevData => {
                      if (!prevData) return null;
                      const newData = JSON.parse(JSON.stringify(prevData));
                      newData.customers[subSection] = newData.customers[subSection].filter(
                          (c: CustomerData) => c._id !== id
                      );
                      return newData;
                  });
              } else {
                  throw new Error(result.message || "Xóa thất bại");
              }
          } catch (error) {
              handleError(error, `xóa khách hàng`);
          } finally {
              setSaving(false);
          }
      }
  };

  const handleAddSection = () => {
    const newSection: SectionData = {
        title: 'Tiêu đề section mới',
        content: 'Nội dung mô tả của section',
        mediaType: 'image',
        mediaUrl: "/images/home_banner-section2.jpg",
        buttonText: "LEARN MORE",
        buttonLink: "#",
        backgroundColor: "#1e40af",
        order: homeData?.sections?.length || 0
    };
    
    setHomeData(prevData => {
        if (!prevData) return null;
        const newData = JSON.parse(JSON.stringify(prevData));
        newData.sections = Array.isArray(newData.sections) ? [...newData.sections, newSection] : [newSection];
        return newData;
    });
    
    toast.info("Đã thêm section mới. Vui lòng cập nhật thông tin và lưu lại.", { ...toastOptions, icon: <FiInfo /> });
  };
  
  const handleDeleteSection = (index: number) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa section này?")) {
      setHomeData(prevData => {
        if (!prevData) return null;
        const newData = JSON.parse(JSON.stringify(prevData));
        if (Array.isArray(newData.sections)) {
          newData.sections.splice(index, 1);
          // Cập nhật lại order cho các section còn lại
          newData.sections.forEach((section: any, idx: number) => {
            section.order = idx;
          });
        }
        return newData;
      });
      toast.success("Đã xóa section thành công!", { ...toastOptions, icon: <FiCheck /> });
    }
  };
  
  const handleMediaTypeChange = (index: number, mediaType: 'image' | 'video') => {
    setHomeData(prevData => {
      if (!prevData) return null;
      const newData = JSON.parse(JSON.stringify(prevData));
      if (Array.isArray(newData.sections) && newData.sections[index]) {
        (newData.sections[index] as any).mediaType = mediaType;
      }
      return newData;
    });
  };

  const handleAddCustomer = (subSection: 'denimWoven' | 'knit') => {
    const newCustomer: CustomerData = {
        _id: `temp_${Date.now()}_${Math.random()}`,
        name: 'Tên khách hàng mới',
        logo: "/images/310x300.png",
        website: '',
        order: homeData?.customers[subSection]?.length || 0
    };
    setHomeData(prevData => {
        if (!prevData) return null;
        const newData = JSON.parse(JSON.stringify(prevData));
        newData.customers[subSection] = [...newData.customers[subSection], newCustomer];
        return newData;
    });
    toast.info("Đã thêm khách hàng mới. Vui lòng cập nhật thông tin và lưu lại.", { ...toastOptions, icon: <FiInfo /> });
  };

  const handleVideoUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const videoFile = e.target.files[0];
      if (videoFile.size > 100 * 1024 * 1024) {
        toast.error("Video quá lớn. Kích thước tối đa là 100MB.", { ...toastOptions, icon: <FiAlertTriangle /> });
        return;
      }
      setSaving('hero-video');
      toast.info("Đang tải video lên, vui lòng đợi...", { ...toastOptions, icon: <FiInfo /> });
      try {
        const formData = new FormData();
        formData.append('heroVideo', videoFile);
        const response = await fetch(`${BACKEND_DOMAIN}/api/home/hero/video`, {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
          body: formData
        });
        if (!response.ok) throw new Error(`Upload failed: ${response.statusText}`);
        const result = await response.json();
        if (result.success) {
          toast.success("Upload video thành công!", { ...toastOptions, icon: <FiCheck /> });
          setHomeData(prevData => {
            if (!prevData) return null;
            const newData = JSON.parse(JSON.stringify(prevData));
            newData.hero.videoUrl = result.data.videoUrl;
            return newData;
          });
          e.target.value = '';
        } else {
          throw new Error(result.message || "Upload thất bại");
        }
      } catch (error) {
        handleError(error, "upload video");
      } finally {
        setSaving(false);
      }
    }
  };

  // News modal, news add/edit/delete như cũ
  const handleAddNews = () => {
    setCurrentEditNews(null);
    setIsEditModalOpen(true);
  };
  const handleEditNews = (news: NewsData) => {
    setCurrentEditNews(news);
    setIsEditModalOpen(true);
  };
  const handleSaveNews = async (newsData: NewsData, mainImageFile?: File, additionalImageFiles?: File[]) => {
    setSaving('news');
    try {
      let result;
      if (newsData._id) {
        console.log("Updating existing news:", newsData._id);
        result = await homeService.updateNews(newsData._id, newsData, mainImageFile, additionalImageFiles);
      } else {
        console.log("Creating new news with data:", {
          title: newsData.title,
          excerpt: newsData.excerpt?.substring(0, 30) + "...",
          hasMainImage: !!mainImageFile,
          hasAdditionalImages: !!additionalImageFiles?.length,
          tags: newsData.tags
        });
        
        const formData = new FormData();
        Object.entries(newsData).forEach(([key, value]) => {
          if (key !== 'image' && key !== 'mainImage' && key !== 'additionalImages' && key !== '_id' && key !== 'id') {
            if (key === 'tags' && Array.isArray(value)) {
              // Xử lý đúng cách cho tags
              formData.append(key, value.join(','));
              console.log(`Adding tags: ${value.join(',')}`);
            } else {
              formData.append(key, String(value));
            }
          }
        });
        
        if (mainImageFile) {
          console.log(`Adding main image file: ${mainImageFile.name} (${mainImageFile.type}, ${mainImageFile.size} bytes)`);
          formData.append('newsImage', mainImageFile);
        }

        // Append additional images if provided
        if (Array.isArray(additionalImageFiles) && additionalImageFiles.length > 0) {
          additionalImageFiles.forEach((file, idx) => {
            console.log(`Adding additional image #${idx + 1}: ${file.name}`);
            formData.append('additionalImages', file);
          });
        }

        result = await homeService.createNews(formData);
      }
      
      console.log("API result:", result);
      
      if ((result as any).success) {
        toast.success(newsData._id ? "Đã cập nhật tin tức!" : "Đã thêm tin tức mới!", { ...toastOptions, icon: <FiCheck /> });
        const updatedNews = await homeService.getHomepageNews();
        setHomepageNews(updatedNews as NewsData[]);
        setIsEditModalOpen(false);
      } else {
        throw new Error((result as any).message || "Lưu tin tức thất bại");
      }
    } catch (error) {
      handleError(error, newsData._id ? "cập nhật tin tức" : "thêm tin tức mới");
    } finally {
      setSaving(false);
    }
  };
  const handleDeleteNews = async (newsId: string) => {
    setSaving(`delete-news-${newsId}`);
    try {
      const result = await homeService.deleteNews(newsId);
      if (result.success) {
        toast.success("Đã xóa tin tức thành công!", { ...toastOptions, icon: <FiCheck /> });
        setHomepageNews(prevNews => prevNews.filter(news => news._id !== newsId));
      } else {
        throw new Error(result.message || "Xóa tin tức thất bại");
      }
    } catch (error) {
      handleError(error, "xóa tin tức");
    } finally {
      setSaving(false);
    }
  };

  const handleCertificationChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number, field: 'name' | 'description' | 'category' | 'image') => {
    const { value } = e.target;
    setHomeData(prev => {
      if (!prev || !prev.certifications) return null;
      const updated = [...prev.certifications];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, certifications: updated };
    });
  };

  const handleCertificationFileChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFiles(prev => ({ ...prev, [`cert_${index}`]: file }));
      setLogoPreview(prev => ({
        ...prev,
        [`cert_${index}`]: URL.createObjectURL(file)
      }));
    }
  };

  // --- Render Functions ---
  const renderLoading = () => <div className="admin-loading">Đang tải dữ liệu...</div>;

  if (loading) return renderLoading();
  if (!homeData) return <div>Không thể tải dữ liệu trang chủ.</div>;

  return (
    <div className="admin-page-container">
      <div className="admin-page-header">
        <h1 className="admin-page-title">Quản lý trang chủ</h1>
        <p className="admin-page-description">Chỉnh sửa nội dung sẽ được hiển thị trên trang chủ của website.</p>
      </div>
      
      {/* Hero Section - Multiple Banners */}
      <AdminSectionCard title="Hero Banners (Slider)" onSave={() => handleSave('heroes')} isSaving={saving === 'heroes'} hasChanges={hasChanges('heroes')}>
        <div style={{ marginBottom: '20px' }}>
          <button 
            onClick={() => {
              const newHero: HeroData = {
                title: 'New Banner Title',
                subtitle: '',
                backgroundImage: '',
                videoUrl: '',
                isActive: true,
                aiBannerImage: '',
                aiBannerTitle: '',
                order: (homeData?.heroes?.length || 0)
              };
              setHomeData(prev => prev ? ({
                ...prev,
                heroes: [...(prev.heroes || []), newHero]
              }) : prev);
            }}
            className="btn-add"
            style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <FiPlusCircle /> Add New Hero Banner
          </button>
        </div>

        {homeData?.heroes && homeData.heroes.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {homeData.heroes.map((hero, index) => (
              <div key={index} style={{ border: '2px solid #e0e0e0', borderRadius: '8px', padding: '20px', background: '#f9f9f9' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                  <h4 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span>Banner #{index + 1}</span>
                    <span style={{ fontSize: '14px', color: '#666', background: '#fff', padding: '4px 12px', borderRadius: '12px' }}>
                      Order: {hero.order}
                    </span>
                  </h4>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button
                      onClick={() => {
                        if (index > 0) {
                          const newHeroes = [...homeData.heroes];
                          [newHeroes[index], newHeroes[index - 1]] = [newHeroes[index - 1], newHeroes[index]];
                          newHeroes[index].order = index;
                          newHeroes[index - 1].order = index - 1;
                          setHomeData(prev => prev ? ({ ...prev, heroes: newHeroes }) : prev);
                        }
                      }}
                      disabled={index === 0}
                      style={{ padding: '6px 12px', cursor: index === 0 ? 'not-allowed' : 'pointer', opacity: index === 0 ? 0.5 : 1 }}
                    >
                      ↑
                    </button>
                    <button
                      onClick={() => {
                        if (index < homeData.heroes.length - 1) {
                          const newHeroes = [...homeData.heroes];
                          [newHeroes[index], newHeroes[index + 1]] = [newHeroes[index + 1], newHeroes[index]];
                          newHeroes[index].order = index;
                          newHeroes[index + 1].order = index + 1;
                          setHomeData(prev => prev ? ({ ...prev, heroes: newHeroes }) : prev);
                        }
                      }}
                      disabled={index === homeData.heroes.length - 1}
                      style={{ padding: '6px 12px', cursor: index === homeData.heroes.length - 1 ? 'not-allowed' : 'pointer', opacity: index === homeData.heroes.length - 1 ? 0.5 : 1 }}
                    >
                      ↓
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Delete Banner #${index + 1}?`)) {
                          const newHeroes = homeData.heroes.filter((_, i) => i !== index);
                          newHeroes.forEach((h, i) => h.order = i);
                          setHomeData(prev => prev ? ({ ...prev, heroes: newHeroes }) : prev);
                        }
                      }}
                      style={{ padding: '6px 12px', background: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </div>

                <div className="grid-2-col">
                  <div className="form-column">
                    <FormItem label="Button Text (Hiển thị ở góc phải dưới)" icon={<FiType />}>
                      <input
                        type="text"
                        value={hero.title || ''}
                        onChange={(e) => {
                          const newHeroes = [...homeData.heroes];
                          newHeroes[index].title = e.target.value;
                          setHomeData(prev => prev ? ({ ...prev, heroes: newHeroes }) : prev);
                        }}
                        className="form-input"
                        placeholder="VD: CHƯƠNG TRÌNH ĐÀO TẠO KỸ SƯ"
                      />
                    </FormItem>

                    <FormItem label="Button Link" icon={<FiLink />}>
                      <input
                        type="text"
                        value={hero.buttonLink || ''}
                        onChange={(e) => {
                          const newHeroes = [...homeData.heroes];
                          newHeroes[index].buttonLink = e.target.value;
                          setHomeData(prev => prev ? ({ ...prev, heroes: newHeroes }) : prev);
                        }}
                        className="form-input"
                        placeholder="VD: /for-engineers hoặc https://..."
                      />
                    </FormItem>

                    <div className="grid-2-col">
                      <FormItem label="CTA Type">
                        <select
                          className="form-input"
                          value={hero.ctaType || 'none'}
                          onChange={(e) => {
                            const newHeroes = [...homeData.heroes];
                            newHeroes[index].ctaType = e.target.value as any;
                            setHomeData(prev => prev ? ({ ...prev, heroes: newHeroes }) : prev);
                          }}
                        >
                          <option value="none">None</option>
                          <option value="program">Program</option>
                          <option value="url">External URL</option>
                        </select>
                      </FormItem>
                      <FormItem label="CTA Theme">
                        <select
                          className="form-input"
                          value={hero.ctaTheme || 'red'}
                          onChange={(e) => {
                            const newHeroes = [...homeData.heroes];
                            newHeroes[index].ctaTheme = e.target.value as any;
                            setHomeData(prev => prev ? ({ ...prev, heroes: newHeroes }) : prev);
                          }}
                        >
                          <option value="red">Red</option>
                          <option value="dark">Dark</option>
                          <option value="light">Light</option>
                        </select>
                      </FormItem>
                    </div>

                    <FormItem label="CTA Label">
                      <input
                        type="text"
                        className="form-input"
                        value={hero.ctaLabel || ''}
                        onChange={(e) => {
                          const newHeroes = [...homeData.heroes];
                          newHeroes[index].ctaLabel = e.target.value;
                          setHomeData(prev => prev ? ({ ...prev, heroes: newHeroes }) : prev);
                        }}
                        placeholder="VD: Xem chi tiết chương trình"
                      />
                    </FormItem>

                    { (hero.ctaType === 'program') && (
                      <FormItem label="Chọn Program">
                        <select
                          className="form-input"
                          value={hero.ctaSlug || ''}
                          onChange={(e) => {
                            const newHeroes = [...homeData.heroes];
                            newHeroes[index].ctaSlug = e.target.value;
                            setHomeData(prev => prev ? ({ ...prev, heroes: newHeroes }) : prev);
                          }}
                        >
                          <option value="">-- Chọn --</option>
                          {programs.map(p => (
                            <option key={p._id} value={p.slug}>{p.title}</option>
                          ))}
                        </select>
                      </FormItem>
                    )}

                    { (hero.ctaType === 'url') && (
                      <FormItem label="CTA URL">
                        <input
                          type="text"
                          className="form-input"
                          value={hero.ctaUrl || ''}
                          onChange={(e) => {
                            const newHeroes = [...homeData.heroes];
                            newHeroes[index].ctaUrl = e.target.value;
                            setHomeData(prev => prev ? ({ ...prev, heroes: newHeroes }) : prev);
                          }}
                          placeholder="https://..."
                        />
                      </FormItem>
                    )}

                    <FormItem label="Text giữa màn hình (Optional)" icon={<FiFileText />}>
                      <input
                        type="text"
                        value={hero.subtitle || ''}
                        onChange={(e) => {
                          const newHeroes = [...homeData.heroes];
                          newHeroes[index].subtitle = e.target.value;
                          setHomeData(prev => prev ? ({ ...prev, heroes: newHeroes }) : prev);
                        }}
                        className="form-input"
                        placeholder="Text hiển thị giữa banner (optional)"
                      />
                    </FormItem>

                    <FormItem label="Upload Banner Image" icon={<FiImage />}>
                      <input
                        type="file"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setFiles(prev => ({ ...prev, [`hero-${index}`]: file }));
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              setHeroPreview(prev => ({ ...prev, [`hero-${index}`]: reader.result as string }));
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                        accept="image/*"
                        className="form-file-input"
                      />
                    </FormItem>

                    <FormItem label="Active" icon={<FiCheck />}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <input
                          type="checkbox"
                          checked={hero.isActive}
                          onChange={(e) => {
                            const newHeroes = [...homeData.heroes];
                            newHeroes[index].isActive = e.target.checked;
                            setHomeData(prev => prev ? ({ ...prev, heroes: newHeroes }) : prev);
                          }}
                        />
                        Show this banner
                      </label>
                    </FormItem>
                  </div>

                  <div className="form-column">
                    <FormItem label="Current Banner Image" icon={<FiEye />}>
                      <div className="image-preview-container">
                        {heroPreview[`hero-${index}`] ? (
                          <Image src={heroPreview[`hero-${index}`]} alt="Preview" width={300} height={150} className="image-preview" />
                        ) : hero.backgroundImage ? (
                          <Image src={`${BACKEND_DOMAIN}${hero.backgroundImage}`} alt="Banner" width={300} height={150} className="image-preview" />
                        ) : (
                          <div style={{ padding: '40px', background: '#f0f0f0', textAlign: 'center', borderRadius: '8px', color: '#999' }}>
                            No image uploaded
                          </div>
                        )}
                      </div>
                    </FormItem>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ padding: '40px', textAlign: 'center', background: '#f9f9f9', borderRadius: '8px', color: '#666' }}>
            <p>No hero banners yet. Click "Add New Hero Banner" to create one.</p>
          </div>
        )}
      </AdminSectionCard>

      {/* Image Size Notice for News */}
      <div className="global-news-notice">
        <div className="notice-icon">📸</div>
        <div className="notice-content">
          <strong>Lưu ý kích thước ảnh tin tức:</strong> Để hiển thị tốt nhất, vui lòng sử dụng ảnh có tỷ lệ <strong>4:3</strong> với kích thước tối ưu <strong>1920x1440 pixels</strong> và dung lượng tối đa <strong>2MB</strong>.
        </div>
      </div>

      {/* Featured News Section */}
      <AdminSectionCard title="Tin tức hiển thị trên trang chủ">
          <div className="card-content">
              <div className="subsection-header">
                  <p className="admin-page-description">Quản lý tin tức hiển thị trên trang chủ website.</p>
                  <button className="btn-add" onClick={handleAddNews}><FiPlusCircle /> Thêm tin tức mới</button>
              </div>
              {homepageNews.length > 0 ? (
                <div className="news-grid">
                  {homepageNews.map(news => (
                      <div key={news._id} className="news-card">
                        <div className="news-image-container">
                          <Image 
                            src={`${BACKEND_DOMAIN}${news.image}`} 
                            alt={news.title} 
                            width={200} 
                            height={120} 
                            className="news-thumbnail"
                          />
                          <div className="news-actions">
                            <button 
                              className="btn-icon btn-edit" 
                              onClick={() => handleEditNews(news)}
                              title="Chỉnh sửa tin tức"
                            >
                              <FiEdit />
                            </button>
                            <button 
                              className="btn-icon btn-delete" 
                              onClick={() => {
                                if(window.confirm('Bạn có chắc chắn muốn xóa tin tức này?')) {
                                  handleDeleteNews(news._id);
                                }
                              }}
                              title="Xóa tin tức"
                            >
                              <FiTrash2 />
                            </button>
                          </div>
                        </div>
                        <div className="news-content">
                          <h4 className="news-title">{news.title}</h4>
                          <p className="news-date">{new Date(news.publishDate).toLocaleDateString()}</p>
                          <p className="news-excerpt">{news.excerpt}</p>
                          {news.isFeatured && <span className="news-featured-badge">Tin nổi bật</span>}
                        </div>
                        <div className="news-status-badges">
                          {news.isPublished && <span className="status-badge published">Đã đăng</span>}
                          {news.isFeatured && <span className="status-badge featured">Nổi bật</span>}
                          {news.onHome && <span className="status-badge on-home">Trang chủ</span>}
                        </div>
                        <div className="news-toggles">
                          <div className="form-check">
                            <input 
                              type="checkbox" 
                              id={`isPublished-${news._id}`}
                              checked={news.isPublished} 
                              onChange={(e) => handleCheckboxChange(news._id, 'isPublished', e.target.checked)}
                              className="form-checkbox" 
                              disabled={saving === news._id}
                            />
                            <label htmlFor={`isPublished-${news._id}`}>Đăng</label>
                          </div>
                          <div className="form-check">
                            <input 
                              type="checkbox" 
                              id={`isFeatured-${news._id}`}
                              checked={news.isFeatured} 
                              onChange={(e) => handleCheckboxChange(news._id, 'isFeatured', e.target.checked)}
                              className="form-checkbox" 
                              disabled={saving === news._id}
                            />
                            <label htmlFor={`isFeatured-${news._id}`}>Nổi bật</label>
                          </div>
                          <div className="form-check">
                            <input 
                              type="checkbox" 
                              id={`onHome-${news._id}`}
                              checked={news.onHome} 
                              onChange={(e) => handleCheckboxChange(news._id, 'onHome', e.target.checked)}
                              className="form-checkbox" 
                              disabled={saving === news._id}
                            />
                            <label htmlFor={`onHome-${news._id}`}>Trang chủ</label>
                          </div>
                        </div>
                      </div>
                  ))}
                </div>
              ) : (
                <div className="empty-news">
                  <p>Không có tin tức nào để hiển thị.</p>
                  <button className="btn-add" onClick={handleAddNews}>
                    <FiPlusCircle /> Tạo tin tức đầu tiên
                  </button>
                </div>
              )}
          </div>
      </AdminSectionCard>

      
      {/* Modal chỉnh sửa tin tức */}
      <EditNewsModal 
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        news={currentEditNews}
        onSave={handleSaveNews}
        isSaving={saving === 'news'}
      />
      
      {/* CSS Styles for Certifications Dashboard */}
      <style jsx>{`
        .certifications-dashboard {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        
        .certification-main-card {
          background: #f8f9fa;
          border: 2px solid #e9ecef;
          border-radius: 12px;
          padding: 1.5rem;
          margin-bottom: 1rem;
        }
        
        .leed-certification {
          border-left: 4px solid #28a745;
        }
        
        .iso-certification {
          border-left: 4px solid #007bff;
        }
        
        .certification-title {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
          color: #495057;
          font-size: 1.25rem;
          font-weight: 600;
        }
        
        .cert-icon {
          color: #6c757d;
        }
        
        .image-preview-container.large {
          min-height: 200px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px dashed #dee2e6;
          border-radius: 8px;
          background: #fff;
        }
        
        .image-preview-container.small {
          min-height: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid #dee2e6;
          border-radius: 6px;
          background: #fff;
        }
        
        .certification-small-cards {
          background: #f8f9fa;
          border: 2px solid #e9ecef;
          border-radius: 12px;
          padding: 1.5rem;
        }
        
        .small-certs-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1rem;
          margin-top: 1rem;
        }
        
        .small-cert-card {
          background: #fff;
          border: 1px solid #dee2e6;
          border-radius: 8px;
          padding: 1rem;
          transition: all 0.2s ease;
        }
        
        .small-cert-card:hover {
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          transform: translateY(-2px);
        }
        
        .small-cert-header {
          margin-bottom: 1rem;
        }
        
        .small-cert-header h5 {
          color: #495057;
          font-size: 1rem;
          font-weight: 600;
          margin: 0;
        }
        
        .form-input.small {
          padding: 0.5rem;
          font-size: 0.875rem;
        }
        
        .form-file-input.small {
          padding: 0.375rem;
          font-size: 0.875rem;
        }
        
        .image-size-notice {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-top: 0.5rem;
          padding: 0.5rem;
          background: #e7f3ff;
          border-radius: 4px;
          font-size: 0.875rem;
        }
        
        .notice-icon {
          font-size: 1rem;
        }
        
        .notice-text {
          color: #0066cc;
        }
        
        @media (max-width: 768px) {
          .small-certs-grid {
            grid-template-columns: 1fr;
          }
          
          .certification-main-card,
          .certification-small-cards {
            padding: 1rem;
          }
        }
      `}</style>
    </div>
  );
}

// Helper function to parse YouTube ID

