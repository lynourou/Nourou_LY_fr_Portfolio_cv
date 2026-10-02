import React, { useEffect, useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { AnalyticsSummary } from '../../types/portfolio';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from 'recharts';
import {
  TrendingUp,
  MousePointerClick,
  FileDown,
  Eye,
  Mail,
  RefreshCw,
  RotateCcw,
  Sparkles,
  BarChart3,
  PieChart as PieIcon,
  Activity,
  Layers,
} from 'lucide-react';

export const AnalyticsSection: React.FC = () => {
  const { getAnalytics, resetAnalytics } = usePortfolio();
  const [analytics, setAnalytics] = useState<AnalyticsSummary | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [activeMetric, setActiveMetric] = useState<'all' | 'projects' | 'visits' | 'cv'>('all');

  const fetchStats = async () => {
    setIsRefreshing(true);
    const data = await getAnalytics();
    if (data) {
      setAnalytics(data);
    }
    setIsLoading(false);
    setIsRefreshing(false);
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleReset = async () => {
    if (window.confirm('Voulez-vous vraiment réinitialiser les compteurs de statistiques à zéro ?')) {
      const ok = await resetAnalytics();
      if (ok) {
        await fetchStats();
      }
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-xs flex flex-col items-center justify-center min-h-[320px] text-slate-400 space-y-3">
        <RefreshCw className="w-8 h-8 animate-spin text-emerald-600" />
        <p className="text-xs font-medium text-slate-500">Chargement des métriques d'engagement...</p>
      </div>
    );
  }

  if (!analytics) {
    return null;
  }

  // Couleurs soignées pour les graphiques
  const COLORS = ['#059669', '#0284c7', '#d97706', '#8b5cf6', '#ec4899', '#14b8a6', '#64748b'];

  const maxProjectClicks = Math.max(1, ...analytics.projectBreakdown.map((p) => p.count));

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-7 shadow-xs space-y-8">
      
      {/* En-tête de la section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-1">
            <Activity className="w-4 h-4" />
            <span>Audience &amp; Engagement</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <span>Statistiques d'utilisation</span>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
              Temps réel
            </span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Suivi des consultations de vos projets SIG, téléchargements de CV et interactions des recruteurs.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            type="button"
            onClick={fetchStats}
            disabled={isRefreshing}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors disabled:opacity-50"
            title="Actualiser les données"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-emerald-600' : 'text-slate-500'}`} />
            <span>Actualiser</span>
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-red-600 hover:text-red-700 hover:bg-red-50 border border-red-200 rounded-lg transition-colors"
            title="Remettre les compteurs à zéro"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Réinitialiser</span>
          </button>
        </div>
      </div>

      {/* Cartes KPI */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3.5">
        
        <div className="bg-slate-50/80 p-4 rounded-xl border border-slate-200/80 space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-medium uppercase tracking-wider text-slate-500">Visites globales</span>
            <Eye className="w-4 h-4 text-sky-600" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 font-mono">
            {analytics.totalVisits}
          </div>
          <div className="text-[11px] text-emerald-600 font-medium flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            <span>Trafic régulier</span>
          </div>
        </div>

        <div className="bg-slate-50/80 p-4 rounded-xl border border-slate-200/80 space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-medium uppercase tracking-wider text-slate-500">Projets consultés</span>
            <MousePointerClick className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 font-mono">
            {analytics.totalProjectClicks}
          </div>
          <div className="text-[11px] text-slate-500">
            Clics sur fiches détaillées
          </div>
        </div>

        <div className="bg-slate-50/80 p-4 rounded-xl border border-slate-200/80 space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-medium uppercase tracking-wider text-slate-500">Téléchargements CV</span>
            <FileDown className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 font-mono">
            {analytics.totalCvDownloads}
          </div>
          <div className="text-[11px] text-slate-500">
            Fichiers PDF récupérés
          </div>
        </div>

        <div className="bg-slate-50/80 p-4 rounded-xl border border-slate-200/80 space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-medium uppercase tracking-wider text-slate-500">Cartes agrandies</span>
            <Layers className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 font-mono">
            {analytics.totalMapViews}
          </div>
          <div className="text-[11px] text-slate-500">
            Ouvertures cartothèque
          </div>
        </div>

        <div className="col-span-2 lg:col-span-1 bg-slate-50/80 p-4 rounded-xl border border-slate-200/80 space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-medium uppercase tracking-wider text-slate-500">Interactions contact</span>
            <Mail className="w-4 h-4 text-rose-600" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 font-mono">
            {analytics.totalContactClicks}
          </div>
          <div className="text-[11px] text-slate-500">
            Formulaires &amp; copies
          </div>
        </div>

      </div>

      {/* Grille des visualisations graphiques avec Recharts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Graphique 1 : Évolution temporelle (Recharts AreaChart) */}
        <div className="lg:col-span-7 bg-slate-50/50 p-5 rounded-xl border border-slate-200 flex flex-col justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-700" />
                <span>Activité des 7 derniers jours</span>
              </h3>
              <p className="text-[11px] text-slate-500">
                Volume de visites quotidiennes et clics d'intérêt sur les réalisations.
              </p>
            </div>

            <div className="flex items-center gap-1 text-[11px] bg-white p-1 rounded-lg border border-slate-200 self-start sm:self-auto font-medium">
              <button
                type="button"
                onClick={() => setActiveMetric('all')}
                className={`px-2 py-0.5 rounded ${activeMetric === 'all' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900'}`}
              >
                Tout
              </button>
              <button
                type="button"
                onClick={() => setActiveMetric('projects')}
                className={`px-2 py-0.5 rounded ${activeMetric === 'projects' ? 'bg-emerald-700 text-white' : 'text-slate-600 hover:text-slate-900'}`}
              >
                Projets
              </button>
              <button
                type="button"
                onClick={() => setActiveMetric('visits')}
                className={`px-2 py-0.5 rounded ${activeMetric === 'visits' ? 'bg-sky-700 text-white' : 'text-slate-600 hover:text-slate-900'}`}
              >
                Visites
              </button>
            </div>
          </div>

          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={analytics.dailyActivity} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorProjects" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#059669" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#059669" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0284c7" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#0284c7" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="colorDownloads" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#d97706" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#d97706" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="label" tick={{ fontSize: 11, fill: '#64748b' }} stroke="#cbd5e1" tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#64748b' }} stroke="#cbd5e1" tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    border: '1px solid #334155',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '12px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  }}
                  itemStyle={{ padding: '2px 0' }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />

                {(activeMetric === 'all' || activeMetric === 'visits') && (
                  <Area
                    type="monotone"
                    name="Visites"
                    dataKey="visits"
                    stroke="#0284c7"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorVisits)"
                  />
                )}

                {(activeMetric === 'all' || activeMetric === 'projects') && (
                  <Area
                    type="monotone"
                    name="Consultations projets"
                    dataKey="projectClicks"
                    stroke="#059669"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorProjects)"
                  />
                )}

                {(activeMetric === 'all' || activeMetric === 'cv') && (
                  <Area
                    type="monotone"
                    name="Téléchargements CV"
                    dataKey="cvDownloads"
                    stroke="#d97706"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorDownloads)"
                  />
                )}
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Graphique 2 : Répartition par domaine / catégorie (Recharts Donut) */}
        <div className="lg:col-span-5 bg-slate-50/50 p-5 rounded-xl border border-slate-200 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <PieIcon className="w-4 h-4 text-emerald-700" />
              <span>Centres d'intérêt des visiteurs</span>
            </h3>
            <p className="text-[11px] text-slate-500">
              Part des consultations par domaine d'expertise SIG.
            </p>
          </div>

          <div className="w-full h-56 my-auto">
            {analytics.categoryDistribution.length === 0 ? (
              <div className="h-full flex items-center justify-center text-xs text-slate-400">
                Aucune donnée par catégorie pour l'instant.
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={analytics.categoryDistribution}
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="value"
                    nameKey="name"
                  >
                    {analytics.categoryDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color || COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0f172a',
                      border: '1px solid #334155',
                      borderRadius: '8px',
                      color: '#fff',
                      fontSize: '12px',
                    }}
                    formatter={(value: any, name: any) => [`${value} clics`, name]}
                  />
                  <Legend
                    iconType="circle"
                    layout="horizontal"
                    verticalAlign="bottom"
                    align="center"
                    wrapperStyle={{ fontSize: '10px', paddingTop: '8px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

      </div>

      {/* Graphique 3 : Classement de popularité des projets (Recharts BarChart horizontal) */}
      <div className="bg-slate-50/50 p-5 rounded-xl border border-slate-200 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-emerald-700" />
              <span>Palmarès des projets les plus consultés</span>
            </h3>
            <p className="text-[11px] text-slate-500">
              Nombre de consultations détaillées enregistrées par projet géomatique.
            </p>
          </div>
          <div className="text-xs text-slate-500 font-mono">
            {analytics.projectBreakdown.length} projet(s) suivi(s)
          </div>
        </div>

        {analytics.projectBreakdown.length === 0 ? (
          <div className="text-xs text-slate-400 text-center py-8">
            Aucun clic de projet enregistré pour le moment.
          </div>
        ) : (
          <div className="space-y-4">
            {/* Visualisation en BarChart Recharts */}
            <div className="w-full h-52">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={analytics.projectBreakdown.slice(0, 6)}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 10, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                  <XAxis type="number" tick={{ fontSize: 11, fill: '#64748b' }} stroke="#cbd5e1" />
                  <YAxis
                    dataKey="title"
                    type="category"
                    tick={{ fontSize: 11, fill: '#334155' }}
                    stroke="#cbd5e1"
                    width={180}
                    tickFormatter={(val: string) => (val.length > 25 ? `${val.substring(0, 24)}…` : val)}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0f172a',
                      border: '1px solid #334155',
                      borderRadius: '8px',
                      color: '#fff',
                      fontSize: '12px',
                    }}
                    formatter={(value: any) => [`${value} consultations`, 'Popularité']}
                  />
                  <Bar
                    dataKey="count"
                    name="Consultations"
                    fill="#059669"
                    radius={[0, 4, 4, 0]}
                    barSize={18}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Liste détaillée avec barre de progression */}
            <div className="divide-y divide-slate-200/80 pt-2">
              {analytics.projectBreakdown.map((item, idx) => {
                const percentage = Math.round((item.count / maxProjectClicks) * 100);
                return (
                  <div key={item.id} className="py-2.5 flex items-center justify-between gap-4 text-xs">
                    <div className="flex items-center gap-2 min-w-0 flex-1">
                      <span className="w-5 h-5 rounded-md bg-slate-200 text-slate-700 font-mono text-[10px] font-bold flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="font-semibold text-slate-800 truncate">{item.title}</div>
                        {item.category && (
                          <div className="text-[10px] text-slate-500 font-mono">{item.category}</div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-3 w-40 shrink-0">
                      <div className="flex-1 bg-slate-200 rounded-full h-1.5 overflow-hidden">
                        <div
                          className="bg-emerald-600 h-1.5 rounded-full transition-all duration-500"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="font-mono font-bold text-slate-900 w-12 text-right">
                        {item.count} <span className="font-sans font-normal text-[10px] text-slate-500">clics</span>
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

    </div>
  );
};
