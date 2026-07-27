"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NewPage() {
  const router = useRouter();
  const [form, setForm] = useState({ slug: "", title: "", metaTitle: "", metaDesc: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/pages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      const page = await res.json();
      router.push(`/admin/pages/${page.id}`);
    }
  };

  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/pages" className="text-gray-600 hover:text-gray-900">&larr; Back</Link>
        <h1 className="text-2xl font-bold">New Page</h1>
      </div>
      <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 shadow-sm border space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)]" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
          <input required value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value.replace(/\s+/g, "-").toLowerCase() })} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)]" placeholder="my-page-slug" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Meta Title (SEO)</label>
          <input value={form.metaTitle} onChange={(e) => setForm({ ...form, metaTitle: e.target.value })} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)]" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Meta Description (SEO)</label>
          <textarea rows={3} value={form.metaDesc} onChange={(e) => setForm({ ...form, metaDesc: e.target.value })} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] resize-none" />
        </div>
        <button type="submit" className="px-6 py-2.5 rounded-lg text-white font-semibold hover:opacity-90" style={{ backgroundColor: "var(--primary)" }}>
          Create Page
        </button>
      </form>
    </div>
  );
}
