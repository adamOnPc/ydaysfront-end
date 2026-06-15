import { useState } from "react";
import { Search, Upload, FileText, Download, Eye, Trash2, FolderOpen, Plus } from "lucide-react";

const documents = [
  { name: "Règlement intérieur 2026", category: "Politiques", size: "1.2 MB", date: "01 Jan 2026", downloads: 87, public: true },
  { name: "Charte informatique", category: "Politiques", size: "456 KB", date: "15 Mar 2025", downloads: 64, public: true },
  { name: "Modèle contrat CDI", category: "Modèles", size: "234 KB", date: "05 Avr 2026", downloads: 23, public: false },
  { name: "Grille salariale 2026", category: "Finance", size: "890 KB", date: "01 Jan 2026", downloads: 12, public: false },
  { name: "Procédure onboarding", category: "Procédures", size: "567 KB", date: "20 Fév 2026", downloads: 45, public: false },
  { name: "Modèle attestation de travail", category: "Modèles", size: "78 KB", date: "10 Jan 2026", downloads: 112, public: true },
  { name: "Guide entretien annuel", category: "Procédures", size: "340 KB", date: "15 Déc 2025", downloads: 38, public: false },
  { name: "Politique RGPD RH", category: "Politiques", size: "720 KB", date: "01 Jun 2025", downloads: 29, public: true },
];

const categories = ["Tous", "Politiques", "Modèles", "Procédures", "Finance"];

const catColors: Record<string, { bg: string; color: string }> = {
  Politiques: { bg: "#E8EDF8", color: "#1B3A6B" },
  Modèles: { bg: "#D1FAE5", color: "#10B981" },
  Procédures: { bg: "#FEF3C7", color: "#F59E0B" },
  Finance: { bg: "#FEE2E2", color: "#EF4444" },
};

export function DocumentLibrary() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Tous");

  const filtered = documents.filter((d) => {
    const matchSearch = d.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === "Tous" || d.category === category;
    return matchSearch && matchCat;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold" style={{ color: "#1A2540" }}>Bibliothèque de Documents</h1>
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium"
          style={{ background: "linear-gradient(135deg, #1B3A6B, #2557A7)", color: "#fff" }}>
          <Upload size={15} /> Importer
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Documents total", value: documents.length },
          { label: "Publics", value: documents.filter((d) => d.public).length },
          { label: "Internes", value: documents.filter((d) => !d.public).length },
          { label: "Téléchargements", value: documents.reduce((s, d) => s + d.downloads, 0) },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl p-4 shadow-sm" style={{ background: "#ffffff" }}>
            <div className="text-2xl font-bold" style={{ color: "#1B3A6B" }}>{s.value}</div>
            <div className="text-xs" style={{ color: "#64748B" }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Search + filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 flex items-center gap-2 px-4 py-2.5 rounded-xl border" style={{ background: "#ffffff", borderColor: "rgba(27,58,107,0.1)" }}>
          <Search size={15} className="text-slate-400" />
          <input value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher un document…" className="flex-1 text-sm bg-transparent outline-none" style={{ color: "#1A2540" }} />
        </div>
        <div className="flex gap-2 overflow-x-auto">
          {categories.map((c) => (
            <button key={c} onClick={() => setCategory(c)}
              className="flex-shrink-0 px-3 py-2 rounded-xl text-xs font-medium"
              style={{ background: category === c ? "#1B3A6B" : "#ffffff", color: category === c ? "#fff" : "#64748B", border: `1px solid ${category === c ? "#1B3A6B" : "rgba(27,58,107,0.1)"}` }}>
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Documents list */}
      <div className="rounded-2xl shadow-sm overflow-hidden" style={{ background: "#ffffff" }}>
        {filtered.map((doc, i) => {
          const cat = catColors[doc.category] || { bg: "#F0F3FA", color: "#64748B" };
          return (
            <div key={i} className="flex items-center gap-4 p-4 border-b last:border-0 hover:bg-gray-50 transition-colors"
              style={{ borderColor: "rgba(27,58,107,0.07)" }}>
              <FileText size={18} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-sm font-medium truncate" style={{ color: "#1A2540" }}>{doc.name}</span>
                  {doc.public && (
                    <span className="flex-shrink-0 text-xs px-1.5 py-0.5 rounded-full" style={{ background: "#D1FAE5", color: "#10B981" }}>Public</span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: cat.bg, color: cat.color }}>{doc.category}</span>
                  <span className="text-xs" style={{ color: "#94A3B8" }}>{doc.date} · {doc.size} · {doc.downloads} téléch.</span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button className="p-2 rounded-lg text-slate-500 hover:bg-blue-50"><Eye size={15} /></button>
                <button className="p-2 rounded-lg text-slate-500 hover:bg-blue-50"><Download size={15} /></button>
                <button className="p-2 rounded-lg text-rose-500 hover:bg-red-50"><Trash2 size={15} /></button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
