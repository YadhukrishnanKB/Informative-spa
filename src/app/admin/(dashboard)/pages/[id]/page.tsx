"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

interface Widget {
  id: string;
  type: string;
  title: string | null;
  content: string | null;
  order: number;
  pageId: string;
}

interface Page {
  id: string;
  slug: string;
  title: string;
  metaTitle: string | null;
  metaDesc: string | null;
  published: boolean;
  widgets: Widget[];
}

const WIDGET_TYPES = ["hero", "content", "features", "testimonials", "contact", "video", "gallery", "packages"];

export default function EditPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [page, setPage] = useState<Page | null>(null);
  const [form, setForm] = useState({ slug: "", title: "", metaTitle: "", metaDesc: "" });

  useEffect(() => {
    fetch(`/api/pages/${id}`).then((r) => r.json()).then((p) => {
      setPage(p);
      setForm({ slug: p.slug, title: p.title, metaTitle: p.metaTitle || "", metaDesc: p.metaDesc || "" });
    });
  }, [id]);

  const updatePage = async () => {
    await fetch(`/api/pages/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    alert("Page updated!");
  };

  const addWidget = async (type: string) => {
    const res = await fetch("/api/widgets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type, pageId: id, title: `New ${type} widget`, content: "{}" }),
    });
    if (res.ok) {
      const w = await res.json();
      setPage((p) => p ? { ...p, widgets: [...p.widgets, w] } : p);
    }
  };

  const deleteWidget = async (widgetId: string) => {
    if (!confirm("Delete this widget?")) return;
    await fetch(`/api/widgets/${widgetId}`, { method: "DELETE" });
    setPage((p) => p ? { ...p, widgets: p.widgets.filter((w) => w.id !== widgetId) } : p);
  };

  const editWidget = (widgetId: string) => {
    router.push(`/admin/widgets/${widgetId}?page=${id}`);
  };

  if (!page) return <div>Loading...</div>;

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/pages" className="text-gray-600 hover:text-gray-900">&larr; Back</Link>
        <h1 className="text-2xl font-bold">Edit Page: {page.title}</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border space-y-4">
            <h2 className="text-lg font-semibold">Page Details</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
              <input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Meta Title</label>
              <input value={form.metaTitle} onChange={(e) => setForm({ ...form, metaTitle: e.target.value })} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Meta Description</label>
              <textarea rows={3} value={form.metaDesc} onChange={(e) => setForm({ ...form, metaDesc: e.target.value })} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] resize-none" />
            </div>
            <button onClick={updatePage} className="px-6 py-2.5 rounded-lg text-white font-semibold hover:opacity-90" style={{ backgroundColor: "var(--primary)" }}>
              Save Changes
            </button>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <h2 className="text-lg font-semibold mb-4">Widgets</h2>
            {page.widgets.length === 0 && <p className="text-gray-500">No widgets yet. Add one from the right panel.</p>}
            <div className="space-y-3">
              {page.widgets.sort((a, b) => a.order - b.order).map((w, i) => (
                <div key={w.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <span className="text-gray-400 text-sm font-mono">{i + 1}.</span>
                    <span className="px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-700 uppercase">{w.type}</span>
                    <span className="font-medium text-sm">{w.title || "Untitled"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => editWidget(w.id)} className="text-blue-600 hover:text-blue-800 text-sm font-medium">Edit</button>
                    <button onClick={() => deleteWidget(w.id)} className="text-red-600 hover:text-red-800 text-sm font-medium">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border h-fit">
          <h2 className="text-lg font-semibold mb-4">Add Widget</h2>
          <div className="space-y-2">
            {WIDGET_TYPES.map((type) => (
              <button
                key={type}
                onClick={() => addWidget(type)}
                className="w-full text-left px-4 py-3 rounded-lg border hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors capitalize font-medium"
              >
                + {type}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
