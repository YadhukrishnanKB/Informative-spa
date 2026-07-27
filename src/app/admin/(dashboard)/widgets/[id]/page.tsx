"use client";

import { Suspense, useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

interface WidgetForm {
  type: string;
  title: string;
  heading: string;
  subheading: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  image: string;
  items: string;
}

function WidgetEditor() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageId = searchParams.get("page");

  const [form, setForm] = useState<WidgetForm>({
    type: "content", title: "", heading: "", subheading: "", description: "",
    buttonText: "", buttonLink: "", image: "", items: "[]",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/widgets/${id}`, { cache: "no-store" })
      .then((r) => r.json())
      .then((w) => {
        const content = w.content ? JSON.parse(w.content) : {};
        setForm({
          type: w.type,
          title: w.title || "",
          heading: content.heading || "",
          subheading: content.subheading || "",
          description: content.description || "",
          buttonText: content.buttonText || "",
          buttonLink: content.buttonLink || "",
          image: content.image || "",
          items: JSON.stringify(content.items || [], null, 2),
        });
        setLoading(false);
      });
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const content: any = { heading: form.heading, subheading: form.subheading, description: form.description };
    if (form.buttonText) content.buttonText = form.buttonText;
    if (form.buttonLink) content.buttonLink = form.buttonLink;
    if (form.image) content.image = form.image;
    if (form.items) {
      try { content.items = JSON.parse(form.items); } catch { content.items = []; }
    }

    const res = await fetch(`/api/widgets/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: form.type,
        title: form.title || null,
        content: JSON.stringify(content),
        pageId,
      }),
    });

    if (res.ok) router.push(`/admin/pages/${pageId}`);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-3xl">
      <div className="flex items-center gap-4 mb-8">
        <Link href={`/admin/pages/${pageId}`} className="text-gray-600 hover:text-gray-900">&larr; Back to Page</Link>
        <h1 className="text-2xl font-bold">Edit Widget</h1>
      </div>
      <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 shadow-sm border space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
            <input value={form.type} disabled className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)]" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Heading</label>
          <input value={form.heading} onChange={(e) => setForm({ ...form, heading: e.target.value })} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)]" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Subheading</label>
          <input value={form.subheading} onChange={(e) => setForm({ ...form, subheading: e.target.value })} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)]" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea rows={4} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] resize-none" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Button Text</label>
            <input value={form.buttonText} onChange={(e) => setForm({ ...form, buttonText: e.target.value })} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)]" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Button Link</label>
            <input value={form.buttonLink} onChange={(e) => setForm({ ...form, buttonLink: e.target.value })} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)]" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
          <input value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)]" placeholder="https://..." />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Items (JSON array)</label>
          <textarea rows={6} value={form.items} onChange={(e) => setForm({ ...form, items: e.target.value })} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] font-mono text-sm" />
          <p className="text-xs text-gray-400 mt-1">JSON array of objects with title, description, icon properties</p>
        </div>
        <button type="submit" className="px-6 py-2.5 rounded-lg text-white font-semibold hover:opacity-90" style={{ backgroundColor: "var(--primary)" }}>
          Save Widget
        </button>
      </form>
    </div>
  );
}

export default function EditWidgetPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <WidgetEditor />
    </Suspense>
  );
}
