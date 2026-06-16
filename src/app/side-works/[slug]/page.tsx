"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Search, MapPin, Wrench, Package, X, ChevronLeft, ChevronRight as Next } from "lucide-react";
import { FaWhatsapp, FaFacebook, FaInstagram } from "react-icons/fa";
import { getRecentSideWorkBySlug, getRecentSideWorks } from "@/apis/recentSideWorks";

interface GalleryImg { url: string; publicId: string; }
interface RelatedWork {
  _id: string; title: string; slug: string;
  coverImage: { url: string };
  location: { district: string; state: string };
}
interface SideWork {
  _id: string; slug: string; title: string; projectName: string;
  shortDescription: string; fullDescription: string;
  coverImage: { url: string };
  galleryImages: GalleryImg[];
  status: string;
  location: { pincode: string; district: string; state: string };
  servicesUsed: string[]; materialsUsed: string[];
  categoryId: { _id: string; name: string } | null;
  relatedProjects: RelatedWork[];
  seoTitle: string; seoDescription: string; createdAt: string;
}

export default function SideWorkDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [work, setWork]                   = useState<SideWork | null>(null);
  const [loading, setLoading]             = useState(true);
  const [search, setSearch]               = useState("");
  const [searchResults, setSearchResults] = useState<RelatedWork[]>([]);
  const [searching, setSearching]         = useState(false);
  const [recentWorks, setRecentWorks]     = useState<RelatedWork[]>([]);
  const [lightbox, setLightbox]           = useState<number | null>(null);

  useEffect(() => {
    setLoading(true);
    getRecentSideWorkBySlug(slug)
      .then((res) => setWork(res.data))
      .catch(() => setWork(null))
      .finally(() => setLoading(false));
  }, [slug]);

  useEffect(() => {
    getRecentSideWorks({ limit: 5 })
      .then((res) => setRecentWorks(res.data || []))
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!search.trim()) { setSearchResults([]); return; }
    const t = setTimeout(() => {
      setSearching(true);
      getRecentSideWorks({ limit: 6, search })
        .then((res) => setSearchResults(res.data || []))
        .catch(() => setSearchResults([]))
        .finally(() => setSearching(false));
    }, 400);
    return () => clearTimeout(t);
  }, [search]);

  const allImages = work ? [work.coverImage, ...work.galleryImages] : [];

  const prevImg = useCallback(() =>
    setLightbox((p) => p !== null ? (p - 1 + allImages.length) % allImages.length : null),
  [allImages.length]);

  const nextImg = useCallback(() =>
    setLightbox((p) => p !== null ? (p + 1) % allImages.length : null),
  [allImages.length]);

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextImg();
      if (e.key === "ArrowLeft")  prevImg();
      if (e.key === "Escape")     setLightbox(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, nextImg, prevImg]);

  useEffect(() => {
    document.body.style.overflow = lightbox !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightbox]);

  if (loading) return <Skeleton />;
  if (!work) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-slate-500 text-sm">Project not found.</p>
    </div>
  );

  const relatedToShow = work.relatedProjects?.length
    ? work.relatedProjects
    : recentWorks.filter((w) => w._id !== work._id).slice(0, 4);

  return (
    <div className="min-h-screen bg-white">

      {/* Breadcrumb */}
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <nav className="flex items-center gap-1.5 text-xs text-slate-500">
            <Link href="/" className="hover:text-brand transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-slate-800 font-medium line-clamp-1">{work.title}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-col lg:flex-row gap-10">

          {/* ── LEFT ── */}
          <div className="flex-1 min-w-0">

            {/* Chips */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              {work.categoryId?.name && (
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-brand/10 text-brand uppercase tracking-wide">
                  {work.categoryId.name}
                </span>
              )}
              <span className="px-3 py-1 rounded-full text-xs font-bold capitalize"
                style={{
                  backgroundColor: work.status === "completed" ? "#10b98115" : "#f59e0b15",
                  color: work.status === "completed" ? "#10b981" : "#f59e0b",
                }}>
                {work.status}
              </span>
              {(work.location?.district || work.location?.state) && (
                <div className="flex items-center gap-1 text-xs text-slate-400">
                  <MapPin className="w-3.5 h-3.5" />
                  {[work.location.district, work.location.state].filter(Boolean).join(", ")}
                </div>
              )}
            </div>

            {/* Title + Share */}
            <div className="flex items-start justify-between gap-4 mb-6">
              <h1 className="text-2xl md:text-4xl font-extrabold text-slate-900 leading-tight">
                {work.title}
              </h1>
              <ShareButtons title={work.title} />
            </div>

            {/* Cover Image */}
            <div
              className="w-full rounded-2xl overflow-hidden mb-8 border border-slate-100 shadow-sm cursor-zoom-in"
              onClick={() => setLightbox(0)}
            >
              <img src={work.coverImage?.url} alt={work.title}
                className="w-full max-h-[480px] object-cover" />
            </div>

            {/* Short Desc */}
            <p className="text-slate-600 text-base leading-relaxed mb-8 border-l-4 border-brand pl-4">
              {work.shortDescription}
            </p>

            {/* Services & Materials */}
            {(work.servicesUsed?.length > 0 || work.materialsUsed?.length > 0) && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {work.servicesUsed?.length > 0 && (
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Wrench className="w-4 h-4 text-brand" />
                      <h2 className="font-bold text-slate-800 text-sm">Services Used</h2>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {work.servicesUsed.map((s) => (
                        <span key={s} className="text-xs bg-white border border-slate-200 text-slate-600 px-3 py-1 rounded-full">{s}</span>
                      ))}
                    </div>
                  </div>
                )}
                {work.materialsUsed?.length > 0 && (
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Package className="w-4 h-4 text-brand" />
                      <h2 className="font-bold text-slate-800 text-sm">Materials Used</h2>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {work.materialsUsed.map((m) => (
                        <span key={m} className="text-xs bg-white border border-slate-200 text-slate-600 px-3 py-1 rounded-full">{m}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Full Description */}
            {work.fullDescription && (
              <div className="ck-content" dangerouslySetInnerHTML={{ __html: work.fullDescription }} />
            )}

            {/* Gallery */}
            {work.galleryImages?.length > 0 && (
              <div className="mt-8 pt-6 border-t border-slate-100">
                <h3 className="text-base font-bold text-slate-800 mb-4">Project Gallery</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {work.galleryImages.map((img, i) => (
                    <div key={img.publicId}
                      onClick={() => setLightbox(i + 1)}
                      className="relative aspect-square rounded-xl overflow-hidden bg-slate-100 border border-slate-200 cursor-zoom-in group">
                      <img src={img.url} alt={work.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="mt-10 bg-brand rounded-2xl p-6 text-center text-white">
              <h2 className="text-xl font-extrabold mb-2">Need a Similar Project?</h2>
              <p className="text-white/80 text-sm mb-5">Contact us for a free consultation and quote.</p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link href="/contact" className="bg-white text-brand font-bold px-6 py-2.5 rounded-lg hover:bg-slate-100 transition-colors text-sm">
                  Contact Us
                </Link>
                <a href="tel:+91XXXXXXXXXX" className="border-2 border-white/60 text-white font-bold px-6 py-2.5 rounded-lg hover:bg-white/10 transition-colors text-sm">
                  Call Now
                </a>
              </div>
            </div>
          </div>

          {/* ── RIGHT: Sidebar ── */}
          <div className="w-full lg:w-[320px] shrink-0">
            <div className="sticky top-17 space-y-6">

              {/* Search */}
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200">
                <h3 className="text-sm font-bold text-slate-800 mb-3">Search Projects</h3>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search projects..."
                    className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-brand transition-colors" />
                </div>
                {search.trim() && (
                  <div className="mt-3 space-y-2">
                    {searching
                      ? Array.from({ length: 3 }).map((_, i) => (
                          <div key={i} className="h-10 bg-slate-200 rounded-lg animate-pulse" />
                        ))
                      : searchResults.length
                        ? searchResults.map((w) => (
                            <Link key={w._id} href={`/side-works/${w.slug}`}
                              className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-white hover:shadow-sm transition-all group">
                              <img src={w.coverImage?.url} alt={w.title} className="w-10 h-10 rounded-lg object-cover shrink-0" />
                              <p className="text-xs font-medium text-slate-700 line-clamp-2 group-hover:text-brand transition-colors">{w.title}</p>
                            </Link>
                          ))
                        : <p className="text-xs text-slate-400 text-center py-2">No results found</p>
                    }
                  </div>
                )}
              </div>

              {/* Related / Recent */}
              {relatedToShow.length > 0 && (
                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200">
                  <h3 className="text-sm font-bold text-slate-800 mb-4">
                    {work.relatedProjects?.length ? "Related Projects" : "Recent Projects"}
                  </h3>
                  <div className="space-y-4">
                    {relatedToShow.map((rw) => (
                      <Link key={rw._id} href={`/side-works/${rw.slug}`} className="flex gap-3 group">
                        <img src={rw.coverImage?.url} alt={rw.title}
                          className="w-16 h-16 rounded-xl object-cover shrink-0" />
                        <div className="min-w-0">
                          <p className="text-xs font-semibold text-slate-800 line-clamp-2 group-hover:text-brand transition-colors leading-snug">
                            {rw.title}
                          </p>
                          {(rw.location?.district || rw.location?.state) && (
                            <div className="flex items-center gap-1 mt-1.5 text-[10px] text-slate-400">
                              <MapPin className="w-3 h-3" />
                              {[rw.location?.district, rw.location?.state].filter(Boolean).join(", ")}
                            </div>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center"
          onClick={() => setLightbox(null)}>
          <button onClick={(e) => { e.stopPropagation(); setLightbox(null); }}
            className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition">
            <X className="w-5 h-5" />
          </button>
          <div className="absolute top-4 left-4 z-10 text-white/60 text-sm font-medium">
            {lightbox + 1} / {allImages.length}
          </div>
          {allImages.length > 1 && (
            <>
              <button onClick={(e) => { e.stopPropagation(); prevImg(); }}
                className="absolute left-3 z-10 w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button onClick={(e) => { e.stopPropagation(); nextImg(); }}
                className="absolute right-3 z-10 w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition">
                <Next className="w-5 h-5" />
              </button>
            </>
          )}
          <div className="relative w-full h-full max-w-5xl max-h-[85vh] mx-16"
            onClick={(e) => e.stopPropagation()}>
            <img src={allImages[lightbox]?.url} alt={work.title}
              className="w-full h-full object-contain" />
          </div>
          {allImages.length > 1 && (
            <div className="absolute bottom-5 left-0 right-0 flex justify-center gap-1.5">
              {allImages.map((_, i) => (
                <button key={i} onClick={(e) => { e.stopPropagation(); setLightbox(i); }}
                  className={`rounded-full transition-all duration-300 ${i === lightbox ? "w-5 h-1.5 bg-brand" : "w-1.5 h-1.5 bg-white/30"}`} />
              ))}
            </div>
          )}
        </div>
      )}

    </div>
  );
}

function ShareButtons({ title }: { title: string }) {
  const getUrl = () => typeof window !== "undefined" ? window.location.href : "";
  const share = {
    whatsapp:  () => window.open(`https://wa.me/?text=${encodeURIComponent(title + " " + getUrl())}`, "_blank"),
    facebook:  () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(getUrl())}`, "_blank"),
    instagram: () => navigator.clipboard.writeText(getUrl()).then(() => alert("Link copied! Paste it on Instagram.")),
  };
  return (
    <div className="flex items-center gap-2 shrink-0 mt-1">
      <button onClick={share.whatsapp} title="Share on WhatsApp"
        className="w-8 h-8 rounded-full flex items-center justify-center bg-green-500 hover:bg-green-600 text-white transition-all hover:scale-110 active:scale-95">
        <FaWhatsapp className="w-4 h-4" />
      </button>
      <button onClick={share.facebook} title="Share on Facebook"
        className="w-8 h-8 rounded-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white transition-all hover:scale-110 active:scale-95">
        <FaFacebook className="w-4 h-4" />
      </button>
      <button onClick={share.instagram} title="Copy link for Instagram"
        className="w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-br from-pink-500 via-red-500 to-yellow-400 hover:opacity-90 text-white transition-all hover:scale-110 active:scale-95">
        <FaInstagram className="w-4 h-4" />
      </button>
    </div>
  );
}

function Skeleton() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="h-4 w-64 bg-slate-200 rounded-full animate-pulse" />
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="flex-1 space-y-4 animate-pulse">
            <div className="h-4 w-32 bg-slate-200 rounded-full" />
            <div className="h-8 w-3/4 bg-slate-200 rounded-full" />
            <div className="w-full aspect-[16/7] bg-slate-200 rounded-2xl" />
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className={`h-3 bg-slate-200 rounded-full ${i % 3 === 2 ? "w-2/3" : "w-full"}`} />
            ))}
          </div>
          <div className="w-full lg:w-[320px] space-y-6 animate-pulse">
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-3">
              <div className="h-4 w-32 bg-slate-200 rounded-full" />
              <div className="h-10 w-full bg-slate-200 rounded-xl" />
            </div>
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-4">
              <div className="h-4 w-28 bg-slate-200 rounded-full" />
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex gap-3">
                  <div className="w-16 h-16 bg-slate-200 rounded-xl shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div className="h-3 w-full bg-slate-200 rounded-full" />
                    <div className="h-3 w-2/3 bg-slate-200 rounded-full" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
