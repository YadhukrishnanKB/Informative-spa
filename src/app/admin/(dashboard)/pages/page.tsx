"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Page {
  id: string;
  slug: string;
  title: string;
  published: boolean;
  _count: { widgets: number };
}

export default function PagesList() {
  const [pages, setPages] = useState<Page[]>([]);

  useEffect(() => {
    fetch("/api/pages").then((r) => r.json()).then(setPages);
  }, []);

  const deletePage = async (id: string) => {
    if (!confirm("Delete this page?")) return;
    await fetch(`/api/pages/${id}`, { method: "DELETE" });
    setPages((p) => p.filter((x) => x.id !== id));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Pages</h1>
        <Link href="/admin/pages/new" className="px-4 py-2 rounded-lg text-white font-medium" style={{ backgroundColor: "var(--primary)" }}>
          + New Page
        </Link>
      </div>
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left px-6 py-3 font-medium text-gray-600">Title</th>
              <th className="text-left px-6 py-3 font-medium text-gray-600">Slug</th>
              <th className="text-center px-6 py-3 font-medium text-gray-600">Widgets</th>
              <th className="text-center px-6 py-3 font-medium text-gray-600">Status</th>
              <th className="text-right px-6 py-3 font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pages.map((page) => (
              <tr key={page.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">{page.title}</td>
                <td className="px-6 py-4 text-gray-600">/{page.slug}</td>
                <td className="px-6 py-4 text-center text-gray-600">{page._count.widgets}</td>
                <td className="px-6 py-4 text-center">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${page.published ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}>
                    {page.published ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="px-6 py-4 text-right space-x-2">
                  <Link href={`/admin/pages/${page.id}`} className="text-blue-600 hover:text-blue-800 text-sm font-medium">Edit</Link>
                  <button onClick={() => deletePage(page.id)} className="text-red-600 hover:text-red-800 text-sm font-medium">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
