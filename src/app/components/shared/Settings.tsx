import { useState } from "react";
import { Bell, Lock, Globe, Moon, Shield, Save, ChevronRight, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useAppContext } from "../../contexts/AppContext";

interface SettingsProps {
  role: "employee" | "hr" | "manager";
}

export function Settings({ role: _ }: SettingsProps) {
  const { theme, setTheme } = useTheme();
  const { language, setLanguage } = useAppContext();
  
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    weekly: true,
  });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const Toggle = ({ value, onChange }: { value: boolean; onChange: () => void }) => (
    <button
      onClick={onChange}
      className={`relative w-11 h-6 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-slate-900 ${
        value ? "bg-blue-600 dark:bg-blue-500" : "bg-slate-300 dark:bg-slate-600"
      }`}
    >
      <span 
        className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow-md transition-transform duration-300 ${
          value ? "translate-x-5" : "translate-x-0"
        }`} 
      />
    </button>
  );

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Paramètres</h1>

      {/* Notifications */}
      <div className="rounded-3xl p-6 sm:p-8 bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-white/40 dark:border-slate-800/50 shadow-xl shadow-slate-200/50 dark:shadow-none">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400">
            <Bell size={20} />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Notifications</h3>
        </div>
        <div className="space-y-4">
          {[
            { key: "email" as const, label: "Notifications par email", desc: "Recevez des alertes dans votre boîte mail" },
            { key: "push" as const, label: "Notifications push", desc: "Alertes en temps réel dans le navigateur" },
            { key: "sms" as const, label: "Notifications SMS", desc: "Messages sur votre téléphone portable" },
            { key: "weekly" as const, label: "Résumé hebdomadaire", desc: "Un email récapitulatif chaque lundi" },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between py-3 border-b border-slate-100 dark:border-slate-800/50 last:border-0">
              <div>
                <div className="text-sm font-semibold text-slate-800 dark:text-slate-200">{item.label}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{item.desc}</div>
              </div>
              <Toggle value={notifications[item.key]} onChange={() => setNotifications(prev => ({ ...prev, [item.key]: !prev[item.key] }))} />
            </div>
          ))}
        </div>
      </div>

      {/* Apparence */}
      <div className="rounded-3xl p-6 sm:p-8 bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-white/40 dark:border-slate-800/50 shadow-xl shadow-slate-200/50 dark:shadow-none">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400">
            {theme === "dark" ? <Moon size={20} /> : <Sun size={20} />}
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Apparence</h3>
        </div>
        <div className="flex items-center justify-between py-3 border-b border-slate-100 dark:border-slate-800/50">
          <div>
            <div className="text-sm font-semibold text-slate-800 dark:text-slate-200">Mode sombre</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Thème foncé pour réduire la fatigue visuelle</div>
          </div>
          <Toggle value={theme === "dark"} onChange={() => setTheme(theme === "dark" ? "light" : "dark")} />
        </div>
        <div className="mt-6">
          <div className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-2">Langue</div>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white text-sm font-medium outline-none focus:ring-2 focus:ring-blue-500/20 transition-all cursor-pointer"
          >
            <option value="fr">Français</option>
            <option value="en">English</option>
            <option value="ar">العربية</option>
          </select>
        </div>
      </div>

      {/* Sécurité */}
      <div className="rounded-3xl p-6 sm:p-8 bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-white/40 dark:border-slate-800/50 shadow-xl shadow-slate-200/50 dark:shadow-none">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400">
            <Lock size={20} />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Sécurité</h3>
        </div>
        <div className="space-y-2">
          {[
            { icon: <Shield size={18} />, label: "Sessions actives", desc: "2 appareils connectés" },
            { icon: <Globe size={18} />, label: "Historique de connexion", desc: "Voir les connexions récentes" },
          ].map((item) => (
            <button key={item.label} className="w-full flex items-center justify-between p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group">
              <div className="flex items-center gap-4">
                <div className="text-slate-400 dark:text-slate-500 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
                  {item.icon}
                </div>
                <div className="text-left">
                  <div className="text-sm font-semibold text-slate-800 dark:text-slate-200">{item.label}</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{item.desc}</div>
                </div>
              </div>
              <ChevronRight size={18} className="text-slate-300 dark:text-slate-600 group-hover:text-slate-400 dark:group-hover:text-slate-400 transition-colors" />
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={handleSave}
        className={`w-full py-4 rounded-2xl font-bold text-sm transition-all duration-300 shadow-lg ${
          saved 
            ? "bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-500/25" 
            : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-blue-500/25 active:scale-[0.98]"
        }`}
      >
        {saved ? "✓ Enregistré avec succès !" : "Enregistrer les modifications"}
      </button>
    </div>
  );
}
