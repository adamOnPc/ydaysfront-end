import { useState } from "react";
import { Shield, UserPlus, Search, MoreHorizontal, CheckCircle, XCircle, Key, Edit2, Trash2, UserCircle } from "lucide-react";

const accounts = [
  { name: "Marie Albert", email: "marie.albert@it.com", role: "Employé", dept: "Engineering", status: "active", lastLogin: "Il y a 2h", onboarding: "on" },
  { name: "Lucas Morin", email: "lucas.morin@it.com", role: "Manager", dept: "Engineering", status: "active", lastLogin: "Il y a 1j", onboarding: "off" },
  { name: "Aïcha Diop", email: "aicha.diop@it.com", role: "Employé", dept: "Commercial", status: "active", lastLogin: "Il y a 3h", onboarding: "offboarding" },
  { name: "Pierre Durand", email: "pierre.durand@it.com", role: "Employé", dept: "Finance", status: "suspended", lastLogin: "Il y a 5j", onboarding: "off" },
  { name: "Nadia Rachidi", email: "nadia.rachidi@it.com", role: "Employé", dept: "Marketing", status: "active", lastLogin: "Il y a 1j", onboarding: "on" },
  { name: "Sarah Benali", email: "sarah.benali@it.com", role: "RH/Admin", dept: "RH", status: "active", lastLogin: "Il y a 30min", onboarding: "off" },
];

const roleColors: Record<string, { bg: string; color: string }> = {
  "Employé": { bg: "#E8EDF8", color: "#1B3A6B" },
  "Manager": { bg: "#FEF3C7", color: "#F59E0B" },
  "RH/Admin": { bg: "#D1FAE5", color: "#10B981" },
};

export function EmployeeAccountManagement() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<number[]>([]);
  const [accountState, setAccountState] = useState(accounts);

  const filtered = accountState.filter((a) =>
    a.name.toLowerCase().includes(search.toLowerCase()) || a.email.includes(search.toLowerCase())
  );

  const nextOnboardingState = (state: string) => {
    if (state === "off") return "on";
    if (state === "on") return "offboarding";
    return "off";
  };

  const toggleOnboarding = (index: number) => {
    setAccountState((prev) =>
      prev.map((acc, i) =>
        i === index
          ? { ...acc, onboarding: nextOnboardingState(acc.onboarding ?? "off") }
          : acc,
      ),
    );
  };

  const toggle = (i: number) => setSelected((prev) => prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold" style={{ color: "#1A2540" }}>Gestion des Comptes</h1>
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium"
          style={{ background: "linear-gradient(135deg, #1B3A6B, #2557A7)", color: "#fff" }}>
          <UserPlus size={15} /> Créer un compte
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        {[
          { label: "Comptes actifs", value: accountState.filter((a) => a.status === "active").length, color: "#10B981" },
          { label: "Suspendus", value: accountState.filter((a) => a.status === "suspended").length, color: "#EF4444" },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl p-5 shadow-sm text-center" style={{ background: "#ffffff" }}>
            <div className="text-2xl font-bold" style={{ color: s.color }}>{s.value}</div>
            <div className="text-xs" style={{ color: "#64748B" }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl border" style={{ background: "#ffffff", borderColor: "rgba(27,58,107,0.1)" }}>
        <Search size={15} className="text-slate-400" />
        <input value={search} onChange={(e) => setSearch(e.target.value)}
          placeholder="Rechercher un compte…" className="flex-1 text-sm bg-transparent outline-none" style={{ color: "#1A2540" }} />
      </div>

      {/* Table */}
      <div className="rounded-2xl shadow-sm overflow-hidden" style={{ background: "#ffffff" }}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ background: "#F0F3FA" }}>
                <th className="text-left px-4 py-3 text-xs font-semibold" style={{ color: "#64748B" }}>
                  <input type="checkbox" className="rounded" />
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold" style={{ color: "#64748B" }}>Utilisateur</th>
                <th className="text-left px-4 py-3 text-xs font-semibold" style={{ color: "#64748B" }}>Rôle</th>
                <th className="text-left px-4 py-3 text-xs font-semibold" style={{ color: "#64748B" }}>Statut</th>
                <th className="text-left px-4 py-3 text-xs font-semibold" style={{ color: "#64748B" }}>Dernière connexion</th>
                <th className="text-left px-4 py-3 text-xs font-semibold" style={{ color: "#64748B" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((acc, i) => {
                const rc = roleColors[acc.role] || { bg: "#F0F3FA", color: "#64748B" };
                return (
                  <tr key={i} className="border-t" style={{ borderColor: "rgba(27,58,107,0.06)" }}>
                    <td className="px-4 py-3">
                      <input type="checkbox" checked={selected.includes(i)} onChange={() => toggle(i)} className="rounded" />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white flex-shrink-0"
                          style={{ background: "linear-gradient(135deg, #1B3A6B, #2557A7)" }}>
                          <UserCircle size={14} />
                        </div>
                        <div>
                          <div className="text-sm font-medium" style={{ color: "#1A2540" }}>{acc.name}</div>
                          <div className="text-xs" style={{ color: "#94A3B8" }}>{acc.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2.5 py-1 rounded-full text-xs font-medium" style={{ background: rc.bg, color: rc.color }}>{acc.role}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="flex items-center gap-1.5 text-xs font-medium" style={{ color: acc.status === "active" ? "#10B981" : "#EF4444" }}>
                        {acc.status === "active" ? <CheckCircle size={12} /> : <XCircle size={12} />}
                        {acc.status === "active" ? "Actif" : "Suspendu"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-slate-500">{acc.lastLogin}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        {(() => {
                          const state = acc.onboarding ?? "off";
                          const bg = state === "on" ? "#DCFCE7" : state === "offboarding" ? "#FEE2E2" : "#F3F4F6";
                          const color = state === "on" ? "#10B981" : state === "offboarding" ? "#EF4444" : "#64748B";
                          const title = state === "on" ? "Onboarding activé" : state === "offboarding" ? "Offboarding en cours" : "Onboarding désactivé";
                          return (
                            <button
                              type="button"
                              onClick={() => toggleOnboarding(i)}
                              className="p-1.5 rounded-lg border text-sm font-medium"
                              style={{ background: bg, color, borderColor: color }}
                              title={title}
                            >
                              <UserPlus size={13} />
                            </button>
                          );
                        })()}
                        <button className="p-1.5 rounded-lg text-slate-500 hover:bg-blue-50" title={acc.status === "active" ? "Désactiver le compte" : "Activer le compte"}><Shield size={13} /></button>
                        <button className="p-1.5 rounded-lg text-slate-500 hover:bg-blue-50" title="Changer le mot de passe"><Key size={13} /></button>
                        <button className="p-1.5 rounded-lg text-rose-500 hover:bg-red-50" title="Supprimer le compte"><Trash2 size={13} /></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
