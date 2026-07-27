"use client";

import { useEffect, useState } from "react";

const DEFAULT_THEME = {
  primaryColor: "#0a3d3d",
  secondaryColor: "#d4a373",
  accentColor: "#e8c7a7",
  fontFamily: "'Inter', sans-serif",
  borderRadius: "8px",
};

export default function ThemeEditor() {
  const [theme, setTheme] = useState<Record<string, string>>(DEFAULT_THEME);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/theme").then((r) => r.json()).then((data) => {
      if (Object.keys(data).length) setTheme({ ...DEFAULT_THEME, ...data });
    });
  }, []);

  const updateCSSVars = (newTheme: Record<string, string>) => {
    const root = document.documentElement;
    root.style.setProperty("--primary", newTheme.primaryColor);
    root.style.setProperty("--secondary", newTheme.secondaryColor);
    root.style.setProperty("--accent", newTheme.accentColor);
    root.style.setProperty("--font-family", newTheme.fontFamily);
    root.style.setProperty("--radius", newTheme.borderRadius);
  };

  const handleChange = (key: string, value: string) => {
    const updated = { ...theme, [key]: value };
    setTheme(updated);
    updateCSSVars(updated);
  };

  const handleSave = async () => {
    setSaving(true);
    await fetch("/api/theme", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(theme),
    });
    setSaving(false);
    alert("Theme saved!");
  };

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold mb-8">Theme Settings</h1>
      <div className="bg-white rounded-xl p-6 shadow-sm border space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Primary Color</label>
            <div className="flex gap-2">
              <input type="color" value={theme.primaryColor} onChange={(e) => handleChange("primaryColor", e.target.value)} className="w-10 h-10 rounded border cursor-pointer" />
              <input value={theme.primaryColor} onChange={(e) => handleChange("primaryColor", e.target.value)} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] font-mono text-sm" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Secondary Color</label>
            <div className="flex gap-2">
              <input type="color" value={theme.secondaryColor} onChange={(e) => handleChange("secondaryColor", e.target.value)} className="w-10 h-10 rounded border cursor-pointer" />
              <input value={theme.secondaryColor} onChange={(e) => handleChange("secondaryColor", e.target.value)} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 font-mono text-sm" />
            </div>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Accent Color</label>
          <div className="flex gap-2">
            <input type="color" value={theme.accentColor} onChange={(e) => handleChange("accentColor", e.target.value)} className="w-10 h-10 rounded border cursor-pointer" />
            <input value={theme.accentColor} onChange={(e) => handleChange("accentColor", e.target.value)} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 font-mono text-sm" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Border Radius</label>
          <input value={theme.borderRadius} onChange={(e) => handleChange("borderRadius", e.target.value)} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] font-mono text-sm" placeholder="8px" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Font Family</label>
          <input value={theme.fontFamily} onChange={(e) => handleChange("fontFamily", e.target.value)} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] font-mono text-sm" placeholder="'Inter', sans-serif" />
        </div>

        <div className="pt-4 border-t">
          <h3 className="font-semibold mb-3">Preview</h3>
          <div className="p-6 rounded-lg space-y-3" style={{ backgroundColor: theme.primaryColor, borderRadius: theme.borderRadius }}>
            <button className="px-4 py-2 rounded text-white font-medium" style={{ backgroundColor: theme.secondaryColor, borderRadius: theme.borderRadius }}>Sample Button</button>
            <div className="p-4 bg-white rounded" style={{ borderRadius: theme.borderRadius }}>
              <p style={{ fontFamily: theme.fontFamily }}>Sample text preview</p>
            </div>
          </div>
        </div>

        <button onClick={handleSave} disabled={saving} className="w-full px-6 py-2.5 rounded-lg text-white font-semibold hover:opacity-90 disabled:opacity-50" style={{ backgroundColor: "var(--primary)" }}>
          {saving ? "Saving..." : "Save Theme"}
        </button>
      </div>
    </div>
  );
}
