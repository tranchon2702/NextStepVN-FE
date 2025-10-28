import programsApi from "@/api/programsApi";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  try {
    const program = await programsApi.getBySlug(params.slug);
    return {
      title: program?.seoMeta?.metaTitle || program?.title || 'Chương trình',
      description: program?.seoMeta?.metaDescription || program?.excerpt || ''
    };
  } catch {
    return { title: 'Chương trình' };
  }
}

export default async function ProgramPage({ params }: { params: { slug: string } }) {
  const program = await programsApi.getBySlug(params.slug);
  if (!program) return <div className="container" style={{ padding: '60px 0' }}>Không tìm thấy chương trình.</div>;
  return (
    <div className="container" style={{ padding: '60px 0' }}>
      <h1 style={{ fontWeight: 800, fontSize: '2rem', marginBottom: 12 }}>{program.title}</h1>
      {program.excerpt && <p style={{ color: '#555', marginBottom: 24 }}>{program.excerpt}</p>}
      {program.thumbnail && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={program.thumbnail} alt={program.title} style={{ maxWidth: '100%', borderRadius: 12, boxShadow: '0 6px 20px rgba(0,0,0,0.08)', marginBottom: 24 }} />
      )}
      {program.content && (
        <div dangerouslySetInnerHTML={{ __html: program.content }} />
      )}
    </div>
  );
}


