import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import {
  Lock,
  LogOut,
  Eye,
  EyeOff,
  Plus,
  Trash2,
  Edit2,
  Check,
  AlertCircle,
  FolderGit2,
  Briefcase,
  Map,
  Compass,
  Layers,
  GraduationCap,
  User,
  Mail,
  FileText,
  Key,
  Database,
  ArrowLeft,
  Upload,
  Download,
  Image as ImageIcon,
  Loader2,
} from 'lucide-react';
import { FileInputField } from './components/FileInputField';
import { AnalyticsSection } from './components/AnalyticsSection';
import {
  ProjectDetail,
  ExperienceItem,
  CartoItem,
  FieldworkItem,
  EducationItem,
  SkillCategory,
} from '../types/portfolio';

export const AdminApp: React.FC = () => {
  const {
    data,
    isAdmin,
    login,
    logout,
    updateProfile,
    updateAbout,
    updateProfileAndAbout,
    updateContact,
    saveProject,
    deleteProject,
    saveExperience,
    deleteExperience,
    saveCarto,
    deleteCarto,
    saveFieldwork,
    deleteFieldwork,
    saveSkills,
    saveEducation,
    deleteEducation,
    changeAdminPassword,
    savePortfolio,
  } = usePortfolio();

  // Navigation interne de l'administration
  const [currentTab, setCurrentTab] = useState<
    'dashboard' | 'profile' | 'projects' | 'experiences' | 'maps' | 'fieldwork' | 'skills' | 'education' | 'contact' | 'cv' | 'settings'
  >('dashboard');

  // État de connexion
  const [passwordInput, setPasswordInput] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // État de notification / feedback
  const [feedbackMessage, setFeedbackMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const showFeedback = (text: string, type: 'success' | 'error' = 'success') => {
    setFeedbackMessage({ text, type });
    setTimeout(() => setFeedbackMessage(null), 4000);
  };

  // Gestion du formulaire de connexion
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setIsLoggingIn(true);

    const res = await login(passwordInput);
    setIsLoggingIn(false);

    if (!res.success) {
      setLoginError(res.error || 'Mot de passe incorrect.');
    } else {
      setPasswordInput('');
    }
  };

  // État d'édition : Profil & Accueil
  const [profileForm, setProfileForm] = useState(data.profile);
  const [aboutForm, setAboutForm] = useState(data.about);
  const [contactForm, setContactForm] = useState(data.contact);

  const [isSavingProfile, setIsSavingProfile] = useState(false);

  // Synchronisation continue des formulaires avec les données du serveur
  React.useEffect(() => {
    setProfileForm(data.profile);
    setAboutForm(data.about);
    setContactForm(data.contact);
  }, [data.profile, data.about, data.contact]);

  // Synchronisation lors de l'ouverture du profil
  const handleOpenProfileTab = () => {
    setProfileForm(data.profile);
    setAboutForm(data.about);
    setCurrentTab('profile');
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingProfile(true);
    try {
      const res = await updateProfileAndAbout(profileForm, aboutForm);
      if (res.success) {
        showFeedback('Profil, photo et présentation enregistrés avec succès.');
      } else {
        showFeedback(res.error || 'Erreur lors de l\'enregistrement du profil.', 'error');
      }
    } catch {
      showFeedback('Erreur réseau lors de l\'enregistrement.', 'error');
    } finally {
      setIsSavingProfile(false);
    }
  };

  const handleSaveContact = async (e: React.FormEvent) => {
    e.preventDefault();
    const ok = await updateContact(contactForm);
    if (ok) {
      showFeedback('Coordonnées enregistrées avec succès.');
    } else {
      showFeedback('Erreur lors de l\'enregistrement des coordonnées.', 'error');
    }
  };

  // Édition de Projet
  const [editingProject, setEditingProject] = useState<ProjectDetail | null>(null);
  const [isCreatingProject, setIsCreatingProject] = useState(false);

  const handleStartCreateProject = () => {
    const num = data.projects.length + 1;
    setEditingProject({
      id: `proj-${Date.now()}`,
      title: `Projet ${num < 10 ? '0' + num : num}`,
      category: 'Analyse Spatiale',
      shortDescription: '',
      year: '2026',
      tools: ['QGIS'],
      mainImage: '',
      context: '',
      objective: '',
      methodology: '',
      dataUsed: [],
      softwareAndTech: ['QGIS'],
      results: '',
      mapsAndScreenshots: [],
      conclusion: '',
    });
    setIsCreatingProject(true);
  };

  const handleSaveProjectForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;
    const ok = await saveProject(editingProject);
    if (ok) {
      showFeedback('Projet enregistré avec succès.');
      setEditingProject(null);
      setIsCreatingProject(false);
    } else {
      showFeedback('Erreur lors de l\'enregistrement du projet.', 'error');
    }
  };

  // Édition d'Expérience
  const [editingExperience, setEditingExperience] = useState<ExperienceItem | null>(null);
  const [isCreatingExperience, setIsCreatingExperience] = useState(false);

  const handleStartCreateExperience = () => {
    setEditingExperience({
      id: `exp-${Date.now()}`,
      role: '',
      organization: '',
      location: '',
      period: '',
      description: '',
      missions: [],
      skillsUsed: [],
    });
    setIsCreatingExperience(true);
  };

  const handleSaveExperienceForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingExperience) return;
    const ok = await saveExperience(editingExperience);
    if (ok) {
      showFeedback('Expérience enregistrée avec succès.');
      setEditingExperience(null);
      setIsCreatingExperience(false);
    } else {
      showFeedback('Erreur lors de l\'enregistrement de l\'expérience.', 'error');
    }
  };

  // Édition de Carte (Cartothèque)
  const [editingCarto, setEditingCarto] = useState<CartoItem | null>(null);
  const [isCreatingCarto, setIsCreatingCarto] = useState(false);

  const handleStartCreateCarto = () => {
    setEditingCarto({
      id: `carto-${Date.now()}`,
      title: '',
      description: '',
      date: '',
      studyArea: '',
      softwareUsed: ['QGIS'],
      imageUrl: '',
      scaleOrProjection: '',
    });
    setIsCreatingCarto(true);
  };

  const handleSaveCartoForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCarto) return;
    const ok = await saveCarto(editingCarto);
    if (ok) {
      showFeedback('Carte enregistrée avec succès.');
      setEditingCarto(null);
      setIsCreatingCarto(false);
    } else {
      showFeedback('Erreur lors de l\'enregistrement de la carte.', 'error');
    }
  };

  // Édition de Mission Terrain
  const [editingFieldwork, setEditingFieldwork] = useState<FieldworkItem | null>(null);
  const [isCreatingFieldwork, setIsCreatingFieldwork] = useState(false);

  const handleStartCreateFieldwork = () => {
    setEditingFieldwork({
      id: `field-${Date.now()}`,
      mission: '',
      location: '',
      date: '',
      objective: '',
      equipment: ['GPS RTK'],
      collectionMethods: '',
      results: '',
      photos: [],
    });
    setIsCreatingFieldwork(true);
  };

  const handleSaveFieldworkForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingFieldwork) return;
    const ok = await saveFieldwork(editingFieldwork);
    if (ok) {
      showFeedback('Mission de terrain enregistrée avec succès.');
      setEditingFieldwork(null);
      setIsCreatingFieldwork(false);
    } else {
      showFeedback('Erreur lors de l\'enregistrement de la mission de terrain.', 'error');
    }
  };

  // Édition de Formation
  const [editingEducation, setEditingEducation] = useState<EducationItem | null>(null);
  const [isCreatingEducation, setIsCreatingEducation] = useState(false);

  const handleStartCreateEducation = () => {
    setEditingEducation({
      id: `edu-${Date.now()}`,
      degree: '',
      institution: '',
      location: '',
      period: '',
      description: '',
    });
    setIsCreatingEducation(true);
  };

  const handleSaveEducationForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEducation) return;
    const ok = await saveEducation(editingEducation);
    if (ok) {
      showFeedback('Formation enregistrée avec succès.');
      setEditingEducation(null);
      setIsCreatingEducation(false);
    } else {
      showFeedback('Erreur lors de l\'enregistrement de la formation.', 'error');
    }
  };

  // Compétences : gestion simplifiée
  const [newCatTitle, setNewCatTitle] = useState('');
  const [newSkillCatId, setNewSkillCatId] = useState('');
  const [newSkillName, setNewSkillName] = useState('');

  const handleAddCategory = async () => {
    if (!newCatTitle.trim()) return;
    const newCat: SkillCategory = {
      id: `cat-${Date.now()}`,
      title: newCatTitle.trim(),
      skills: [],
    };
    const ok = await saveSkills([...data.skills, newCat]);
    if (ok) {
      setNewCatTitle('');
      showFeedback('Catégorie ajoutée avec succès.');
    }
  };

  const handleDeleteCategory = async (catId: string) => {
    if (window.confirm('Supprimer cette catégorie et ses compétences ?')) {
      const ok = await saveSkills(data.skills.filter((c) => c.id !== catId));
      if (ok) showFeedback('Catégorie supprimée.');
    }
  };

  const handleAddSkillToCat = async (catId: string) => {
    if (!newSkillName.trim()) return;
    const updated = data.skills.map((c) => {
      if (c.id === catId) {
        return {
          ...c,
          skills: [...c.skills, { id: `sk-${Date.now()}`, name: newSkillName.trim() }],
        };
      }
      return c;
    });
    const ok = await saveSkills(updated);
    if (ok) {
      setNewSkillName('');
      setNewSkillCatId('');
      showFeedback('Compétence ajoutée.');
    }
  };

  const handleDeleteSkill = async (catId: string, skillId: string) => {
    const updated = data.skills.map((c) => {
      if (c.id === catId) {
        return {
          ...c,
          skills: c.skills.filter((s) => s.id !== skillId),
        };
      }
      return c;
    });
    const ok = await saveSkills(updated);
    if (ok) showFeedback('Compétence retirée.');
  };

  // Changement de mot de passe
  const [currentPwd, setCurrentPwd] = useState('');
  const [newPwd, setNewPwd] = useState('');
  const [showCurrentPwd, setShowCurrentPwd] = useState(false);
  const [showNewPwd, setShowNewPwd] = useState(false);
  const [pwdMsg, setPwdMsg] = useState<string | null>(null);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwdMsg(null);
    const res = await changeAdminPassword(currentPwd, newPwd);
    if (res.success) {
      setPwdMsg('Mot de passe administrateur modifié avec succès.');
      setCurrentPwd('');
      setNewPwd('');
    } else {
      setPwdMsg(`Erreur : ${res.error}`);
    }
  };

  // =========================================================================
  // ÉCRAN 1 : FORMULAIRE DE CONNEXION SÉCURISÉ (SI NON AUTHENTIFIÉ)
  // =========================================================================

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col justify-center items-center p-4 selection:bg-emerald-800 selection:text-white">
        <div className="max-w-md w-full bg-slate-950 border border-slate-800 rounded-2xl p-8 shadow-2xl space-y-6">
          
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-xl bg-emerald-950/80 text-emerald-400 border border-emerald-800/80 flex items-center justify-center mx-auto">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="text-xl font-bold text-white tracking-tight">
              Espace d'administration
            </h1>
            <p className="text-xs text-slate-400">
              Accès réservé exclusivement au gestionnaire du portfolio.
            </p>
          </div>

          {loginError && (
            <div className="p-3.5 rounded-lg bg-red-950/80 border border-red-800 text-red-200 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Mot de passe administrateur
              </label>
              <div className="relative">
                <input
                  type={showLoginPassword ? 'text' : 'password'}
                  required
                  autoFocus
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-3.5 pr-10 py-2.5 text-sm bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowLoginPassword(!showLoginPassword)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 p-1"
                  title={showLoginPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                  aria-label={showLoginPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                >
                  {showLoginPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-600 disabled:bg-slate-700 rounded-lg transition-colors shadow-xs"
            >
              {isLoggingIn ? 'Vérification en cours...' : 'Se connecter à l\'espace privé'}
            </button>
          </form>

          <div className="pt-4 border-t border-slate-800 text-center">
            <button
              type="button"
              onClick={() => {
                window.location.hash = '';
                if (window.location.pathname.includes('/admin')) {
                  window.location.href = window.location.pathname.replace(/\/admin\/?$/, '') || './';
                }
              }}
              className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Retourner au site public</span>
            </button>
          </div>

        </div>
      </div>
    );
  }

  // =========================================================================
  // ÉCRAN 2 : TABLEAU DE BORD ADMINISTRATEUR (AUTHENTIFIÉ)
  // =========================================================================

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col font-sans">
      
      {/* Barre supérieure d'administration */}
      <header className="bg-slate-900 text-white px-4 sm:px-8 py-3.5 flex items-center justify-between border-b border-slate-800 sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-900/60 border border-emerald-500/30 text-emerald-400 flex items-center justify-center font-bold text-xs">
            SIG
          </div>
          <div>
            <h1 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
              <span>Espace d'administration</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                Session active
              </span>
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              window.location.hash = '';
              if (window.location.pathname.includes('/admin')) {
                window.location.href = window.location.pathname.replace(/\/admin\/?$/, '') || './';
              }
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-200 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-md transition-colors cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">Voir le site public</span>
          </button>

          <button
            type="button"
            onClick={async () => {
              await logout();
              window.location.hash = '';
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-200 hover:text-white bg-red-950/60 hover:bg-red-900 border border-red-800/80 rounded-md transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Déconnexion</span>
          </button>
        </div>
      </header>

      {/* Bannière de notification / feedback */}
      {feedbackMessage && (
        <div
          className={`px-4 py-2.5 text-xs font-medium text-center ${
            feedbackMessage.type === 'success'
              ? 'bg-emerald-700 text-white'
              : 'bg-red-700 text-white'
          }`}
        >
          {feedbackMessage.text}
        </div>
      )}

      {/* Corps avec navigation par onglets */}
      <div className="max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex-1 flex flex-col lg:flex-row gap-6">
        
        {/* Menu latéral gauche */}
        <aside className="lg:w-64 shrink-0 bg-white rounded-xl border border-slate-200 p-3 shadow-2xs space-y-1 h-fit">
          <div className="px-3 py-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Gestion du contenu
          </div>

          <button
            onClick={() => setCurrentTab('dashboard')}
            className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-lg text-left transition-colors ${
              currentTab === 'dashboard' ? 'bg-slate-900 text-white font-semibold' : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <Database className="w-4 h-4 text-emerald-500" />
            <span>Tableau de bord</span>
          </button>

          <button
            onClick={handleOpenProfileTab}
            className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-lg text-left transition-colors ${
              currentTab === 'profile' ? 'bg-slate-900 text-white font-semibold' : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <User className="w-4 h-4 text-emerald-500" />
            <span>Profil &amp; Présentation</span>
          </button>

          <button
            onClick={() => {
              setEditingProject(null);
              setCurrentTab('projects');
            }}
            className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium rounded-lg text-left transition-colors ${
              currentTab === 'projects' ? 'bg-slate-900 text-white font-semibold' : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <FolderGit2 className="w-4 h-4 text-emerald-500" />
              <span>Projets SIG</span>
            </div>
            <span className="font-mono text-[11px] opacity-70">{data.projects.length}</span>
          </button>

          <button
            onClick={() => {
              setEditingExperience(null);
              setCurrentTab('experiences');
            }}
            className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium rounded-lg text-left transition-colors ${
              currentTab === 'experiences' ? 'bg-slate-900 text-white font-semibold' : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Briefcase className="w-4 h-4 text-emerald-500" />
              <span>Expériences</span>
            </div>
            <span className="font-mono text-[11px] opacity-70">{data.experiences.length}</span>
          </button>

          <button
            onClick={() => {
              setEditingCarto(null);
              setCurrentTab('maps');
            }}
            className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium rounded-lg text-left transition-colors ${
              currentTab === 'maps' ? 'bg-slate-900 text-white font-semibold' : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Map className="w-4 h-4 text-emerald-500" />
              <span>Cartothèque</span>
            </div>
            <span className="font-mono text-[11px] opacity-70">{data.cartography.length}</span>
          </button>

          <button
            onClick={() => {
              setEditingFieldwork(null);
              setCurrentTab('fieldwork');
            }}
            className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium rounded-lg text-left transition-colors ${
              currentTab === 'fieldwork' ? 'bg-slate-900 text-white font-semibold' : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Compass className="w-4 h-4 text-emerald-500" />
              <span>Missions Terrain</span>
            </div>
            <span className="font-mono text-[11px] opacity-70">{data.fieldwork.length}</span>
          </button>

          <button
            onClick={() => setCurrentTab('skills')}
            className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium rounded-lg text-left transition-colors ${
              currentTab === 'skills' ? 'bg-slate-900 text-white font-semibold' : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Layers className="w-4 h-4 text-emerald-500" />
              <span>Compétences</span>
            </div>
            <span className="font-mono text-[11px] opacity-70">
              {data.skills.reduce((acc, cat) => acc + cat.skills.length, 0)}
            </span>
          </button>

          <button
            onClick={() => {
              setEditingEducation(null);
              setCurrentTab('education');
            }}
            className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium rounded-lg text-left transition-colors ${
              currentTab === 'education' ? 'bg-slate-900 text-white font-semibold' : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <GraduationCap className="w-4 h-4 text-emerald-500" />
              <span>Formation</span>
            </div>
            <span className="font-mono text-[11px] opacity-70">{data.education.length}</span>
          </button>

          <button
            onClick={() => setCurrentTab('contact')}
            className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-lg text-left transition-colors ${
              currentTab === 'contact' ? 'bg-slate-900 text-white font-semibold' : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <Mail className="w-4 h-4 text-emerald-500" />
            <span>Coordonnées</span>
          </button>

          <button
            onClick={() => setCurrentTab('cv')}
            className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-lg text-left transition-colors ${
              currentTab === 'cv' ? 'bg-slate-900 text-white font-semibold' : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <FileText className="w-4 h-4 text-emerald-500" />
            <span>Curriculum Vitae</span>
          </button>

          <div className="pt-3 border-t border-slate-100">
            <button
              onClick={() => setCurrentTab('settings')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-lg text-left transition-colors ${
                currentTab === 'settings' ? 'bg-slate-900 text-white font-semibold' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Key className="w-4 h-4 text-emerald-500" />
              <span>Sécurité &amp; Sauvegardes</span>
            </button>
          </div>
        </aside>

        {/* Panneau principal de gestion */}
        <main className="flex-1 bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-2xs">
          
          {/* ============================================================ */}
          {/* TAB : TABLEAU DE BORD                                       */}
          {/* ============================================================ */}
          {currentTab === 'dashboard' && (
            <div className="space-y-8">
              {/* Module de Statistiques d'utilisation et d'engagement (Recharts) */}
              <AnalyticsSection />

              {/* Carte Export du code source pour GitHub */}
              <div className="p-4 sm:p-5 rounded-xl bg-gradient-to-r from-slate-900 via-slate-850 to-slate-800 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-md border border-slate-700/50">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                    <Download className="w-4 h-4" />
                    <span>Export pour GitHub</span>
                  </div>
                  <h3 className="text-base font-bold text-white">
                    Télécharger l'archive ZIP du projet complet
                  </h3>
                  <p className="text-xs text-slate-300 max-w-xl">
                    Contient l'intégralité du code source, les dossiers <code className="bg-slate-800 px-1.5 py-0.5 rounded text-emerald-300">docs/</code> pré-compilés pour GitHub Pages, et le workflow d'automatisation.
                  </p>
                </div>
                <a
                  href="/download-zip"
                  download="Nourou_LY_Portfolio_cv.zip"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-xs transition-colors shrink-0"
                >
                  <Download className="w-4 h-4" />
                  <span>Télécharger ZIP (7.2 Mo)</span>
                </a>
              </div>

              <div className="pt-2 border-t border-slate-200">
                <h2 className="text-xl font-bold text-slate-900">
                  Gestion des collections &amp; Contenus
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Accédez rapidement aux différents modules du portfolio pour ajouter ou modifier vos données professionnelles.
                </p>
              </div>

              {/* Compteurs réels */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div
                  onClick={() => setCurrentTab('projects')}
                  className="p-4 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer hover:border-emerald-600 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <FolderGit2 className="w-5 h-5 text-emerald-700" />
                    <span className="text-2xl font-bold font-mono text-slate-900">{data.projects.length}</span>
                  </div>
                  <div className="text-xs font-medium text-slate-700 mt-2">Projets SIG</div>
                </div>

                <div
                  onClick={() => setCurrentTab('maps')}
                  className="p-4 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer hover:border-emerald-600 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <Map className="w-5 h-5 text-emerald-700" />
                    <span className="text-2xl font-bold font-mono text-slate-900">{data.cartography.length}</span>
                  </div>
                  <div className="text-xs font-medium text-slate-700 mt-2">Cartes</div>
                </div>

                <div
                  onClick={() => setCurrentTab('fieldwork')}
                  className="p-4 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer hover:border-emerald-600 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <Compass className="w-5 h-5 text-emerald-700" />
                    <span className="text-2xl font-bold font-mono text-slate-900">{data.fieldwork.length}</span>
                  </div>
                  <div className="text-xs font-medium text-slate-700 mt-2">Missions Terrain</div>
                </div>

                <div
                  onClick={() => setCurrentTab('experiences')}
                  className="p-4 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer hover:border-emerald-600 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <Briefcase className="w-5 h-5 text-emerald-700" />
                    <span className="text-2xl font-bold font-mono text-slate-900">{data.experiences.length}</span>
                  </div>
                  <div className="text-xs font-medium text-slate-700 mt-2">Expériences</div>
                </div>

                <div
                  onClick={() => setCurrentTab('skills')}
                  className="p-4 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer hover:border-emerald-600 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <Layers className="w-5 h-5 text-emerald-700" />
                    <span className="text-2xl font-bold font-mono text-slate-900">
                      {data.skills.reduce((acc, cat) => acc + cat.skills.length, 0)}
                    </span>
                  </div>
                  <div className="text-xs font-medium text-slate-700 mt-2">Compétences</div>
                </div>

                <div
                  onClick={() => setCurrentTab('education')}
                  className="p-4 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer hover:border-emerald-600 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <GraduationCap className="w-5 h-5 text-emerald-700" />
                    <span className="text-2xl font-bold font-mono text-slate-900">{data.education.length}</span>
                  </div>
                  <div className="text-xs font-medium text-slate-700 mt-2">Diplômes / Formations</div>
                </div>
              </div>

              {/* Rappel des règles de sécurité */}
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 space-y-1">
                <div className="font-bold flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-700" />
                  <span>Sécurité active : Lecture seule pour les visiteurs</span>
                </div>
                <p className="text-emerald-900/90 leading-relaxed">
                  L'interface publique ne contient aucun bouton de modification. Seule cette interface d'administration authentifiée possède le droit d'écrire ou de supprimer des éléments dans la base de données.
                </p>
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* TAB : PROFIL & PRÉSENTATION                                 */}
          {/* ============================================================ */}
          {currentTab === 'profile' && (
            <form onSubmit={handleSaveProfile} className="space-y-6 max-w-3xl">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Profil &amp; Présentation
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Modifiez votre identité, votre accroche et les textes de présentation de la section À propos.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Nom et prénom *
                  </label>
                  <input
                    type="text"
                    required
                    value={profileForm.fullName}
                    onChange={(e) => setProfileForm({ ...profileForm, fullName: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Titre professionnel *
                  </label>
                  <input
                    type="text"
                    required
                    value={profileForm.title}
                    onChange={(e) => setProfileForm({ ...profileForm, title: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-md"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Courte phrase de présentation (Accueil)
                </label>
                <textarea
                  rows={3}
                  value={profileForm.headline}
                  onChange={(e) => setProfileForm({ ...profileForm, headline: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-md"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Localisation
                  </label>
                  <input
                    type="text"
                    value={profileForm.location || ''}
                    onChange={(e) => setProfileForm({ ...profileForm, location: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Statut de disponibilité
                  </label>
                  <input
                    type="text"
                    value={profileForm.availability || ''}
                    onChange={(e) => setProfileForm({ ...profileForm, availability: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-md"
                  />
                </div>
              </div>

              <FileInputField
                label="Photo de profil professionnelle"
                value={profileForm.avatarUrl || ''}
                onChange={(val) => setProfileForm({ ...profileForm, avatarUrl: val })}
                isImage={true}
                helperText="JPG, PNG, WebP — compression automatique"
              />

              <FileInputField
                label="Document CV (PDF)"
                value={profileForm.cvPdfUrl || ''}
                onChange={(val) => setProfileForm({ ...profileForm, cvPdfUrl: val })}
                isImage={false}
                accept="application/pdf"
                helperText="Document PDF téléchargeable par les recruteurs"
              />

              <div className="pt-4 border-t border-slate-100 space-y-4">
                <h3 className="text-sm font-bold text-slate-900">Section À propos</h3>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    01. Mon parcours
                  </label>
                  <textarea
                    rows={4}
                    value={aboutForm.journey}
                    onChange={(e) => setAboutForm({ ...aboutForm, journey: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    02. Mon profil professionnel
                  </label>
                  <textarea
                    rows={4}
                    value={aboutForm.profileDescription}
                    onChange={(e) => setAboutForm({ ...aboutForm, profileDescription: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    03. Mon orientation professionnelle
                  </label>
                  <textarea
                    rows={3}
                    value={aboutForm.careerGoals}
                    onChange={(e) => setAboutForm({ ...aboutForm, careerGoals: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-md"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="submit"
                  disabled={isSavingProfile}
                  className="px-6 py-2.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 disabled:bg-slate-400 rounded-lg transition-colors flex items-center gap-2"
                >
                  {isSavingProfile ? (
                    <>
                      <Loader2 className="w-4 h-4 text-emerald-400 animate-spin" />
                      <span>Enregistrement en cours...</span>
                    </>
                  ) : (
                    <span>Enregistrer les modifications</span>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* ============================================================ */}
          {/* TAB : PROJETS SIG                                           */}
          {/* ============================================================ */}
          {currentTab === 'projects' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Projets SIG</h2>
                  <p className="text-xs text-slate-500">Ajout, modification et suppression des études et projets géomatiques.</p>
                </div>
                {!editingProject && (
                  <button
                    onClick={handleStartCreateProject}
                    className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Nouveau projet</span>
                  </button>
                )}
              </div>

              {/* Formulaire d'édition / création de projet */}
              {editingProject ? (
                <form onSubmit={handleSaveProjectForm} className="space-y-4 bg-slate-50 p-6 rounded-xl border border-slate-200">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                    <h3 className="font-bold text-sm text-slate-900">
                      {isCreatingProject ? 'Création d\'un nouveau projet' : 'Modification du projet'}
                    </h3>
                    <button
                      type="button"
                      onClick={() => setEditingProject(null)}
                      className="text-xs text-slate-600 hover:text-slate-900"
                    >
                      Annuler
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-medium text-slate-700 mb-1">Titre du projet *</label>
                      <input
                        type="text"
                        required
                        value={editingProject.title}
                        onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                        className="w-full px-3 py-1.5 text-sm bg-white border border-slate-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">Année</label>
                      <input
                        type="text"
                        value={editingProject.year}
                        onChange={(e) => setEditingProject({ ...editingProject, year: e.target.value })}
                        className="w-full px-3 py-1.5 text-sm bg-white border border-slate-300 rounded-md"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">Catégorie</label>
                      <input
                        type="text"
                        value={editingProject.category}
                        onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                        className="w-full px-3 py-1.5 text-sm bg-white border border-slate-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">Outils utilisés (séparés par des virgules)</label>
                      <input
                        type="text"
                        value={editingProject.tools.join(', ')}
                        onChange={(e) =>
                          setEditingProject({
                            ...editingProject,
                            tools: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                          })
                        }
                        className="w-full px-3 py-1.5 text-sm bg-white border border-slate-300 rounded-md"
                      />
                    </div>
                  </div>

                  <FileInputField
                    label="Image principale du projet"
                    value={editingProject.mainImage || ''}
                    onChange={(val) => setEditingProject({ ...editingProject, mainImage: val })}
                    isImage={true}
                    helperText="Couverture ou capture cartographique"
                  />

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Courte description (Galerie)</label>
                    <textarea
                      rows={2}
                      value={editingProject.shortDescription}
                      onChange={(e) => setEditingProject({ ...editingProject, shortDescription: e.target.value })}
                      className="w-full px-3 py-1.5 text-sm bg-white border border-slate-300 rounded-md"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">Contexte</label>
                      <textarea
                        rows={3}
                        value={editingProject.context}
                        onChange={(e) => setEditingProject({ ...editingProject, context: e.target.value })}
                        className="w-full px-3 py-1.5 text-sm bg-white border border-slate-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">Objectif</label>
                      <textarea
                        rows={3}
                        value={editingProject.objective}
                        onChange={(e) => setEditingProject({ ...editingProject, objective: e.target.value })}
                        className="w-full px-3 py-1.5 text-sm bg-white border border-slate-300 rounded-md"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Méthodologie</label>
                    <textarea
                      rows={3}
                      value={editingProject.methodology}
                      onChange={(e) => setEditingProject({ ...editingProject, methodology: e.target.value })}
                      className="w-full px-3 py-1.5 text-sm bg-white border border-slate-300 rounded-md"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Résultats</label>
                    <textarea
                      rows={3}
                      value={editingProject.results}
                      onChange={(e) => setEditingProject({ ...editingProject, results: e.target.value })}
                      className="w-full px-3 py-1.5 text-sm bg-white border border-slate-300 rounded-md"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Conclusion</label>
                    <textarea
                      rows={2}
                      value={editingProject.conclusion}
                      onChange={(e) => setEditingProject({ ...editingProject, conclusion: e.target.value })}
                      className="w-full px-3 py-1.5 text-sm bg-white border border-slate-300 rounded-md"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200">
                    <button
                      type="button"
                      onClick={() => setEditingProject(null)}
                      className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg"
                    >
                      Annuler
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors"
                    >
                      Enregistrer le projet
                    </button>
                  </div>
                </form>
              ) : (
                /* Liste des projets existants */
                <div className="space-y-3">
                  {data.projects.length === 0 ? (
                    <div className="p-8 text-center bg-slate-50 rounded-xl border border-dashed border-slate-300 text-xs text-slate-500">
                      Aucun projet enregistré. Cliquez sur « Nouveau projet » pour en ajouter un.
                    </div>
                  ) : (
                    data.projects.map((proj) => (
                      <div
                        key={proj.id}
                        className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200 hover:border-slate-300 transition-colors"
                      >
                        <div>
                          <div className="text-xs font-semibold text-slate-900">{proj.title}</div>
                          <div className="text-[11px] text-slate-500 font-mono">
                            {proj.category} · {proj.year}
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setEditingProject(proj);
                              setIsCreatingProject(false);
                            }}
                            className="p-1.5 text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded"
                            title="Modifier"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={async () => {
                              if (window.confirm(`Supprimer le projet "${proj.title}" ?`)) {
                                const ok = await deleteProject(proj.id);
                                if (ok) showFeedback('Projet supprimé.');
                              }
                            }}
                            className="p-1.5 text-red-600 hover:text-red-900 bg-white border border-slate-200 rounded"
                            title="Supprimer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          )}

          {/* ============================================================ */}
          {/* TAB : EXPÉRIENCES                                           */}
          {/* ============================================================ */}
          {currentTab === 'experiences' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Expériences professionnelles</h2>
                  <p className="text-xs text-slate-500">Gestion chronologique de votre parcours en bureau d'études ou collectivité.</p>
                </div>
                {!editingExperience && (
                  <button
                    onClick={handleStartCreateExperience}
                    className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Nouvelle expérience</span>
                  </button>
                )}
              </div>

              {editingExperience ? (
                <form onSubmit={handleSaveExperienceForm} className="space-y-4 bg-slate-50 p-6 rounded-xl border border-slate-200">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                    <h3 className="font-bold text-sm text-slate-900">
                      {isCreatingExperience ? 'Nouvelle expérience' : 'Modifier l\'expérience'}
                    </h3>
                    <button type="button" onClick={() => setEditingExperience(null)} className="text-xs text-slate-600">
                      Annuler
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">Poste / Fonction *</label>
                      <input
                        type="text"
                        required
                        value={editingExperience.role}
                        onChange={(e) => setEditingExperience({ ...editingExperience, role: e.target.value })}
                        className="w-full px-3 py-1.5 text-sm bg-white border border-slate-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">Organisation / Structure *</label>
                      <input
                        type="text"
                        required
                        value={editingExperience.organization}
                        onChange={(e) => setEditingExperience({ ...editingExperience, organization: e.target.value })}
                        className="w-full px-3 py-1.5 text-sm bg-white border border-slate-300 rounded-md"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">Lieu</label>
                      <input
                        type="text"
                        value={editingExperience.location}
                        onChange={(e) => setEditingExperience({ ...editingExperience, location: e.target.value })}
                        className="w-full px-3 py-1.5 text-sm bg-white border border-slate-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">Période (ex. 2024 - Présent)</label>
                      <input
                        type="text"
                        value={editingExperience.period}
                        onChange={(e) => setEditingExperience({ ...editingExperience, period: e.target.value })}
                        className="w-full px-3 py-1.5 text-sm bg-white border border-slate-300 rounded-md"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Description</label>
                    <textarea
                      rows={2}
                      value={editingExperience.description}
                      onChange={(e) => setEditingExperience({ ...editingExperience, description: e.target.value })}
                      className="w-full px-3 py-1.5 text-sm bg-white border border-slate-300 rounded-md"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Missions (une par ligne)</label>
                    <textarea
                      rows={3}
                      value={editingExperience.missions.join('\n')}
                      onChange={(e) =>
                        setEditingExperience({
                          ...editingExperience,
                          missions: e.target.value.split('\n').filter(Boolean),
                        })
                      }
                      className="w-full px-3 py-1.5 text-sm bg-white border border-slate-300 rounded-md"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Compétences mobilisées (séparées par virgules)</label>
                    <input
                      type="text"
                      value={editingExperience.skillsUsed.join(', ')}
                      onChange={(e) =>
                        setEditingExperience({
                          ...editingExperience,
                          skillsUsed: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                        })
                      }
                      className="w-full px-3 py-1.5 text-sm bg-white border border-slate-300 rounded-md"
                    />
                  </div>

                  <div className="space-y-3 pt-3 border-t border-slate-200">
                    <label className="block text-xs font-semibold text-slate-800">
                      Documents ou photographies associées
                    </label>

                    {editingExperience.documentsOrPhotos && editingExperience.documentsOrPhotos.length > 0 && (
                      <div className="space-y-2">
                        {editingExperience.documentsOrPhotos.map((doc, dIdx) => (
                          <div key={dIdx} className="flex items-center gap-3 p-2 rounded-lg bg-white border border-slate-200">
                            <FileText className="w-4 h-4 text-emerald-600 shrink-0" />
                            <input
                              type="text"
                              value={doc.title}
                              onChange={(e) => {
                                const updated = [...(editingExperience.documentsOrPhotos || [])];
                                updated[dIdx] = { ...doc, title: e.target.value };
                                setEditingExperience({ ...editingExperience, documentsOrPhotos: updated });
                              }}
                              placeholder="Titre du document..."
                              className="flex-1 text-xs px-2 py-1 border border-slate-200 rounded"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const updated = editingExperience.documentsOrPhotos?.filter((_, idx) => idx !== dIdx);
                                setEditingExperience({ ...editingExperience, documentsOrPhotos: updated });
                              }}
                              className="text-red-500 hover:text-red-700 p-1"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    <FileInputField
                      label="Joindre un document ou une photo"
                      value=""
                      onChange={(val) => {
                        if (val) {
                          setEditingExperience({
                            ...editingExperience,
                            documentsOrPhotos: [
                              ...(editingExperience.documentsOrPhotos || []),
                              { title: 'Attestation / Document', url: val, type: 'document' },
                            ],
                          });
                        }
                      }}
                      isImage={false}
                      accept="application/pdf,image/*"
                      helperText="PDF, JPG, PNG"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200">
                    <button
                      type="button"
                      onClick={() => setEditingExperience(null)}
                      className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg"
                    >
                      Annuler
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors"
                    >
                      Enregistrer l'expérience
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-3">
                  {data.experiences.length === 0 ? (
                    <div className="p-8 text-center bg-slate-50 rounded-xl border border-dashed border-slate-300 text-xs text-slate-500">
                      Aucune expérience enregistrée. Cliquez sur « Nouvelle expérience » pour en ajouter une.
                    </div>
                  ) : (
                    data.experiences.map((exp) => (
                      <div
                        key={exp.id}
                        className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200"
                      >
                        <div>
                          <div className="text-xs font-semibold text-slate-900">{exp.role}</div>
                          <div className="text-[11px] text-slate-500 font-mono">
                            {exp.organization} · {exp.period}
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setEditingExperience(exp);
                              setIsCreatingExperience(false);
                            }}
                            className="p-1.5 text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={async () => {
                              if (window.confirm(`Supprimer l'expérience "${exp.role}" ?`)) {
                                const ok = await deleteExperience(exp.id);
                                if (ok) showFeedback('Expérience supprimée.');
                              }
                            }}
                            className="p-1.5 text-red-600 hover:text-red-900 bg-white border border-slate-200 rounded"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          )}

          {/* ============================================================ */}
          {/* TAB : CARTOTHÈQUE                                           */}
          {/* ============================================================ */}
          {currentTab === 'maps' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Cartothèque</h2>
                  <p className="text-xs text-slate-500">Gestion des cartes thématiques pour la galerie publique.</p>
                </div>
                {!editingCarto && (
                  <button
                    onClick={handleStartCreateCarto}
                    className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Nouvelle carte</span>
                  </button>
                )}
              </div>

              {editingCarto ? (
                <form onSubmit={handleSaveCartoForm} className="space-y-4 bg-slate-50 p-6 rounded-xl border border-slate-200">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                    <h3 className="font-bold text-sm text-slate-900">
                      {isCreatingCarto ? 'Ajouter une carte' : 'Modifier la carte'}
                    </h3>
                    <button type="button" onClick={() => setEditingCarto(null)} className="text-xs text-slate-600">
                      Annuler
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-medium text-slate-700 mb-1">Titre de la carte *</label>
                      <input
                        type="text"
                        required
                        value={editingCarto.title}
                        onChange={(e) => setEditingCarto({ ...editingCarto, title: e.target.value })}
                        className="w-full px-3 py-1.5 text-sm bg-white border border-slate-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">Date</label>
                      <input
                        type="text"
                        value={editingCarto.date}
                        onChange={(e) => setEditingCarto({ ...editingCarto, date: e.target.value })}
                        className="w-full px-3 py-1.5 text-sm bg-white border border-slate-300 rounded-md"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">Zone d'étude</label>
                      <input
                        type="text"
                        value={editingCarto.studyArea}
                        onChange={(e) => setEditingCarto({ ...editingCarto, studyArea: e.target.value })}
                        className="w-full px-3 py-1.5 text-sm bg-white border border-slate-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">Échelle ou Système de projection</label>
                      <input
                        type="text"
                        value={editingCarto.scaleOrProjection || ''}
                        onChange={(e) => setEditingCarto({ ...editingCarto, scaleOrProjection: e.target.value })}
                        placeholder="ex. RGF93 / Lambert-93 - 1:25 000"
                        className="w-full px-3 py-1.5 text-sm bg-white border border-slate-300 rounded-md"
                      />
                    </div>
                  </div>

                  <FileInputField
                    label="Image de la carte (haute résolution)"
                    value={editingCarto.imageUrl || ''}
                    onChange={(val) => setEditingCarto({ ...editingCarto, imageUrl: val })}
                    isImage={true}
                    helperText="JPEG, PNG, WebP"
                  />

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Description de la carte</label>
                    <textarea
                      rows={2}
                      value={editingCarto.description}
                      onChange={(e) => setEditingCarto({ ...editingCarto, description: e.target.value })}
                      className="w-full px-3 py-1.5 text-sm bg-white border border-slate-300 rounded-md"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200">
                    <button
                      type="button"
                      onClick={() => setEditingCarto(null)}
                      className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg"
                    >
                      Annuler
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors"
                    >
                      Enregistrer la carte
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-3">
                  {data.cartography.length === 0 ? (
                    <div className="p-8 text-center bg-slate-50 rounded-xl border border-dashed border-slate-300 text-xs text-slate-500">
                      Aucune carte enregistrée. Cliquez sur « Nouvelle carte » pour alimenter la cartothèque.
                    </div>
                  ) : (
                    data.cartography.map((mapItem) => (
                      <div
                        key={mapItem.id}
                        className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200"
                      >
                        <div>
                          <div className="text-xs font-semibold text-slate-900">{mapItem.title}</div>
                          <div className="text-[11px] text-slate-500 font-mono">
                            {mapItem.studyArea} · {mapItem.date}
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setEditingCarto(mapItem);
                              setIsCreatingCarto(false);
                            }}
                            className="p-1.5 text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={async () => {
                              if (window.confirm(`Supprimer la carte "${mapItem.title}" ?`)) {
                                const ok = await deleteCarto(mapItem.id);
                                if (ok) showFeedback('Carte supprimée.');
                              }
                            }}
                            className="p-1.5 text-red-600 hover:text-red-900 bg-white border border-slate-200 rounded"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          )}

          {/* ============================================================ */}
          {/* TAB : MISSIONS TERRAIN                                      */}
          {/* ============================================================ */}
          {currentTab === 'fieldwork' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Missions de terrain</h2>
                  <p className="text-xs text-slate-500">Activités in situ, levés GNSS/RTK et inventaires déconnectés.</p>
                </div>
                {!editingFieldwork && (
                  <button
                    onClick={handleStartCreateFieldwork}
                    className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Nouvelle mission</span>
                  </button>
                )}
              </div>

              {editingFieldwork ? (
                <form onSubmit={handleSaveFieldworkForm} className="space-y-4 bg-slate-50 p-6 rounded-xl border border-slate-200">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                    <h3 className="font-bold text-sm text-slate-900">
                      {isCreatingFieldwork ? 'Nouvelle mission terrain' : 'Modifier la mission'}
                    </h3>
                    <button type="button" onClick={() => setEditingFieldwork(null)} className="text-xs text-slate-600">
                      Annuler
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-medium text-slate-700 mb-1">Intitulé de la mission *</label>
                      <input
                        type="text"
                        required
                        value={editingFieldwork.mission}
                        onChange={(e) => setEditingFieldwork({ ...editingFieldwork, mission: e.target.value })}
                        className="w-full px-3 py-1.5 text-sm bg-white border border-slate-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">Date</label>
                      <input
                        type="text"
                        value={editingFieldwork.date}
                        onChange={(e) => setEditingFieldwork({ ...editingFieldwork, date: e.target.value })}
                        className="w-full px-3 py-1.5 text-sm bg-white border border-slate-300 rounded-md"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">Localisation</label>
                      <input
                        type="text"
                        value={editingFieldwork.location}
                        onChange={(e) => setEditingFieldwork({ ...editingFieldwork, location: e.target.value })}
                        className="w-full px-3 py-1.5 text-sm bg-white border border-slate-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">Matériel utilisé (séparé par virgules)</label>
                      <input
                        type="text"
                        value={editingFieldwork.equipment.join(', ')}
                        onChange={(e) =>
                          setEditingFieldwork({
                            ...editingFieldwork,
                            equipment: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                          })
                        }
                        className="w-full px-3 py-1.5 text-sm bg-white border border-slate-300 rounded-md"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Objectif de l'intervention</label>
                    <textarea
                      rows={2}
                      value={editingFieldwork.objective}
                      onChange={(e) => setEditingFieldwork({ ...editingFieldwork, objective: e.target.value })}
                      className="w-full px-3 py-1.5 text-sm bg-white border border-slate-300 rounded-md"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Méthodes de collecte</label>
                    <textarea
                      rows={2}
                      value={editingFieldwork.collectionMethods}
                      onChange={(e) => setEditingFieldwork({ ...editingFieldwork, collectionMethods: e.target.value })}
                      className="w-full px-3 py-1.5 text-sm bg-white border border-slate-300 rounded-md"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Résultats obtenus</label>
                    <textarea
                      rows={2}
                      value={editingFieldwork.results}
                      onChange={(e) => setEditingFieldwork({ ...editingFieldwork, results: e.target.value })}
                      className="w-full px-3 py-1.5 text-sm bg-white border border-slate-300 rounded-md"
                    />
                  </div>

                  <div className="space-y-3 pt-3 border-t border-slate-200">
                    <label className="block text-xs font-semibold text-slate-800">
                      Photographies de terrain
                    </label>

                    {editingFieldwork.photos && editingFieldwork.photos.length > 0 && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {editingFieldwork.photos.map((photo, pIdx) => (
                          <div key={pIdx} className="flex items-center gap-3 p-2.5 rounded-lg bg-white border border-slate-200">
                            <img src={photo.url} alt="Photo" className="w-12 h-12 object-cover rounded" />
                            <div className="flex-1 min-w-0">
                              <input
                                type="text"
                                value={photo.caption}
                                onChange={(e) => {
                                  const updatedPhotos = [...editingFieldwork.photos];
                                  updatedPhotos[pIdx] = { ...photo, caption: e.target.value };
                                  setEditingFieldwork({ ...editingFieldwork, photos: updatedPhotos });
                                }}
                                placeholder="Légende de la photo..."
                                className="w-full text-xs px-2 py-1 border border-slate-200 rounded"
                              />
                            </div>
                            <button
                              type="button"
                              onClick={() => {
                                const updatedPhotos = editingFieldwork.photos.filter((_, idx) => idx !== pIdx);
                                setEditingFieldwork({ ...editingFieldwork, photos: updatedPhotos });
                              }}
                              className="text-red-500 hover:text-red-700 p-1"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    <FileInputField
                      label="Ajouter une photo de terrain"
                      value=""
                      onChange={(val) => {
                        if (val) {
                          setEditingFieldwork({
                            ...editingFieldwork,
                            photos: [...(editingFieldwork.photos || []), { url: val, caption: '' }],
                          });
                        }
                      }}
                      isImage={true}
                      helperText="Prend en charge photos d'appareil et smartphone"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200">
                    <button
                      type="button"
                      onClick={() => setEditingFieldwork(null)}
                      className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg"
                    >
                      Annuler
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors"
                    >
                      Enregistrer la mission
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-3">
                  {data.fieldwork.length === 0 ? (
                    <div className="p-8 text-center bg-slate-50 rounded-xl border border-dashed border-slate-300 text-xs text-slate-500">
                      Aucune mission de terrain enregistrée.
                    </div>
                  ) : (
                    data.fieldwork.map((mission) => (
                      <div
                        key={mission.id}
                        className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200"
                      >
                        <div>
                          <div className="text-xs font-semibold text-slate-900">{mission.mission}</div>
                          <div className="text-[11px] text-slate-500 font-mono">
                            {mission.location} · {mission.date}
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setEditingFieldwork(mission);
                              setIsCreatingFieldwork(false);
                            }}
                            className="p-1.5 text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={async () => {
                              if (window.confirm(`Supprimer la mission "${mission.mission}" ?`)) {
                                const ok = await deleteFieldwork(mission.id);
                                if (ok) showFeedback('Mission supprimée.');
                              }
                            }}
                            className="p-1.5 text-red-600 hover:text-red-900 bg-white border border-slate-200 rounded"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          )}

          {/* ============================================================ */}
          {/* TAB : COMPÉTENCES                                           */}
          {/* ============================================================ */}
          {currentTab === 'skills' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Compétences techniques</h2>
                <p className="text-xs text-slate-500">Organisez vos compétences par catégorie sans faux niveaux ou pourcentages.</p>
              </div>

              {/* Ajouter une catégorie */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row items-center gap-3">
                <input
                  type="text"
                  value={newCatTitle}
                  onChange={(e) => setNewCatTitle(e.target.value)}
                  placeholder="Nouvelle catégorie (ex. SIG & Cartographie, Télédétection...)"
                  className="w-full sm:flex-1 px-3 py-2 text-xs bg-white border border-slate-300 rounded-md"
                />
                <button
                  type="button"
                  onClick={handleAddCategory}
                  className="w-full sm:w-auto px-4 py-2 text-xs font-semibold text-white bg-slate-900 rounded-md"
                >
                  Ajouter la catégorie
                </button>
              </div>

              {/* Catégories existantes */}
              <div className="space-y-6">
                {data.skills.map((category) => (
                  <div key={category.id} className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-4">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                      <h3 className="font-bold text-sm text-slate-900">{category.title}</h3>
                      <button
                        onClick={() => handleDeleteCategory(category.id)}
                        className="text-xs text-red-600 hover:text-red-800"
                      >
                        Supprimer la catégorie
                      </button>
                    </div>

                    {/* Liste des compétences */}
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill) => (
                        <span
                          key={skill.id}
                          className="inline-flex items-center gap-2 px-2.5 py-1 text-xs bg-white border border-slate-300 rounded-md"
                        >
                          <span className="font-medium text-slate-800">{skill.name}</span>
                          <button
                            onClick={() => handleDeleteSkill(category.id, skill.id)}
                            className="text-slate-400 hover:text-red-600"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>

                    {/* Formulaire ajout compétence à la catégorie */}
                    <div className="pt-2 flex gap-2">
                      <input
                        type="text"
                        placeholder="Ajouter une compétence (ex. QGIS, PostGIS...)"
                        value={newSkillCatId === category.id ? newSkillName : ''}
                        onFocus={() => setNewSkillCatId(category.id)}
                        onChange={(e) => {
                          setNewSkillCatId(category.id);
                          setNewSkillName(e.target.value);
                        }}
                        className="px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-md flex-1"
                      />
                      <button
                        type="button"
                        onClick={() => handleAddSkillToCat(category.id)}
                        className="px-3 py-1.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-md"
                      >
                        Ajouter
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* TAB : FORMATION                                             */}
          {/* ============================================================ */}
          {currentTab === 'education' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Formation &amp; Diplômes</h2>
                  <p className="text-xs text-slate-500">Ajout et gestion de vos diplômes universitaires.</p>
                </div>
                {!editingEducation && (
                  <button
                    onClick={handleStartCreateEducation}
                    className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Nouvelle formation</span>
                  </button>
                )}
              </div>

              {editingEducation ? (
                <form onSubmit={handleSaveEducationForm} className="space-y-4 bg-slate-50 p-6 rounded-xl border border-slate-200">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                    <h3 className="font-bold text-sm text-slate-900">
                      {isCreatingEducation ? 'Nouvelle formation' : 'Modifier la formation'}
                    </h3>
                    <button type="button" onClick={() => setEditingEducation(null)} className="text-xs text-slate-600">
                      Annuler
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">Diplôme *</label>
                      <input
                        type="text"
                        required
                        value={editingEducation.degree}
                        onChange={(e) => setEditingEducation({ ...editingEducation, degree: e.target.value })}
                        className="w-full px-3 py-1.5 text-sm bg-white border border-slate-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">Établissement / Université *</label>
                      <input
                        type="text"
                        required
                        value={editingEducation.institution}
                        onChange={(e) => setEditingEducation({ ...editingEducation, institution: e.target.value })}
                        className="w-full px-3 py-1.5 text-sm bg-white border border-slate-300 rounded-md"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">Lieu</label>
                      <input
                        type="text"
                        value={editingEducation.location}
                        onChange={(e) => setEditingEducation({ ...editingEducation, location: e.target.value })}
                        className="w-full px-3 py-1.5 text-sm bg-white border border-slate-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">Période (ex. 2022 - 2024)</label>
                      <input
                        type="text"
                        value={editingEducation.period}
                        onChange={(e) => setEditingEducation({ ...editingEducation, period: e.target.value })}
                        className="w-full px-3 py-1.5 text-sm bg-white border border-slate-300 rounded-md"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Description</label>
                    <textarea
                      rows={2}
                      value={editingEducation.description}
                      onChange={(e) => setEditingEducation({ ...editingEducation, description: e.target.value })}
                      className="w-full px-3 py-1.5 text-sm bg-white border border-slate-300 rounded-md"
                    />
                  </div>

                  <div className="space-y-3 pt-3 border-t border-slate-200">
                    <label className="block text-xs font-semibold text-slate-800">
                      Diplômes et attestations associées
                    </label>

                    {editingEducation.documents && editingEducation.documents.length > 0 && (
                      <div className="space-y-2">
                        {editingEducation.documents.map((doc, dIdx) => (
                          <div key={dIdx} className="flex items-center gap-3 p-2 rounded-lg bg-white border border-slate-200">
                            <FileText className="w-4 h-4 text-emerald-600 shrink-0" />
                            <input
                              type="text"
                              value={doc.title}
                              onChange={(e) => {
                                const updated = [...(editingEducation.documents || [])];
                                updated[dIdx] = { ...doc, title: e.target.value };
                                setEditingEducation({ ...editingEducation, documents: updated });
                              }}
                              placeholder="Titre du document..."
                              className="flex-1 text-xs px-2 py-1 border border-slate-200 rounded"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const updated = editingEducation.documents?.filter((_, idx) => idx !== dIdx);
                                setEditingEducation({ ...editingEducation, documents: updated });
                              }}
                              className="text-red-500 hover:text-red-700 p-1"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    <FileInputField
                      label="Joindre un diplôme ou attestation"
                      value=""
                      onChange={(val) => {
                        if (val) {
                          setEditingEducation({
                            ...editingEducation,
                            documents: [
                              ...(editingEducation.documents || []),
                              { title: 'Attestation / Diplôme', url: val },
                            ],
                          });
                        }
                      }}
                      isImage={false}
                      accept="application/pdf,image/*"
                      helperText="PDF, JPG, PNG"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200">
                    <button
                      type="button"
                      onClick={() => setEditingEducation(null)}
                      className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg"
                    >
                      Annuler
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors"
                    >
                      Enregistrer la formation
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-3">
                  {data.education.length === 0 ? (
                    <div className="p-8 text-center bg-slate-50 rounded-xl border border-dashed border-slate-300 text-xs text-slate-500">
                      Aucune formation renseignée.
                    </div>
                  ) : (
                    data.education.map((edu) => (
                      <div
                        key={edu.id}
                        className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200"
                      >
                        <div>
                          <div className="text-xs font-semibold text-slate-900">{edu.degree}</div>
                          <div className="text-[11px] text-slate-500 font-mono">
                            {edu.institution} · {edu.period}
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setEditingEducation(edu);
                              setIsCreatingEducation(false);
                            }}
                            className="p-1.5 text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={async () => {
                              if (window.confirm(`Supprimer la formation "${edu.degree}" ?`)) {
                                const ok = await deleteEducation(edu.id);
                                if (ok) showFeedback('Formation supprimée.');
                              }
                            }}
                            className="p-1.5 text-red-600 hover:text-red-900 bg-white border border-slate-200 rounded"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          )}

          {/* ============================================================ */}
          {/* TAB : COORDONNÉES                                           */}
          {/* ============================================================ */}
          {currentTab === 'contact' && (
            <form onSubmit={handleSaveContact} className="space-y-6 max-w-2xl">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Coordonnées professionnelles</h2>
                <p className="text-xs text-slate-500">Mettez à jour vos coordonnées réelles.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Adresse email</label>
                  <input
                    type="text"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Téléphone</label>
                  <input
                    type="text"
                    value={contactForm.phone || ''}
                    onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-md"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">URL LinkedIn</label>
                  <input
                    type="text"
                    value={contactForm.linkedin || ''}
                    onChange={(e) => setContactForm({ ...contactForm, linkedin: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">URL GitHub</label>
                  <input
                    type="text"
                    value={contactForm.github || ''}
                    onChange={(e) => setContactForm({ ...contactForm, github: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-md"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="px-6 py-2.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors"
              >
                Enregistrer les coordonnées
              </button>
            </form>
          )}

          {/* ============================================================ */}
          {/* TAB : CV                                                    */}
          {/* ============================================================ */}
          {currentTab === 'cv' && (
            <div className="space-y-6 max-w-2xl">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Curriculum Vitae</h2>
                <p className="text-xs text-slate-500">Gestion du document PDF téléchargé par les visiteurs.</p>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Chemin ou lien vers le fichier CV actuel :
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={profileForm.cvPdfUrl}
                      onChange={(e) => setProfileForm({ ...profileForm, cvPdfUrl: e.target.value })}
                      placeholder="/cv.pdf ou https://..."
                      className="flex-1 px-3 py-2 text-xs border border-slate-300 rounded-md bg-white"
                    />
                    <button
                      type="button"
                      onClick={async () => {
                        const ok = await updateProfile({ ...data.profile, cvPdfUrl: profileForm.cvPdfUrl });
                        if (ok) showFeedback('Chemin du CV enregistré avec succès.');
                      }}
                      className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 rounded-md"
                    >
                      Enregistrer
                    </button>
                  </div>
                </div>

                <div className="text-xs text-slate-600 bg-white p-3.5 rounded-lg border border-slate-200 space-y-1">
                  <div className="font-semibold text-slate-800">Comment déposer un nouveau fichier ?</div>
                  <p>
                    Pour remplacer directement le fichier sans modifier l'URL, placez votre document PDF sous le nom <code className="font-mono text-emerald-800">cv.pdf</code> dans le dossier <code className="font-mono text-emerald-800">public/</code> du projet.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* TAB : SÉCURITÉ & PARAMÈTRES                                 */}
          {/* ============================================================ */}
          {currentTab === 'settings' && (
            <div className="space-y-8 max-w-2xl">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Sécurité &amp; Sauvegardes</h2>
                <p className="text-xs text-slate-500">Gestion des identifiants d'accès et exports de données.</p>
              </div>

              {/* Formulaire de modification de mot de passe */}
              <form onSubmit={handleChangePassword} className="bg-slate-50 p-6 rounded-xl border border-slate-200 space-y-4">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Key className="w-4 h-4 text-emerald-700" />
                  <span>Modifier le mot de passe administrateur</span>
                </h3>

                {pwdMsg && (
                  <div className="p-3 rounded-lg text-xs bg-white border border-slate-200 text-slate-800">
                    {pwdMsg}
                  </div>
                )}

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Mot de passe actuel</label>
                  <div className="relative">
                    <input
                      type={showCurrentPwd ? 'text' : 'password'}
                      required
                      value={currentPwd}
                      onChange={(e) => setCurrentPwd(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full pl-3 pr-10 py-2 text-sm bg-white border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPwd(!showCurrentPwd)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                      title={showCurrentPwd ? 'Masquer' : 'Afficher'}
                    >
                      {showCurrentPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Nouveau mot de passe (min. 6 caractères)</label>
                  <div className="relative">
                    <input
                      type={showNewPwd ? 'text' : 'password'}
                      required
                      value={newPwd}
                      onChange={(e) => setNewPwd(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full pl-3 pr-10 py-2 text-sm bg-white border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPwd(!showNewPwd)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                      title={showNewPwd ? 'Masquer' : 'Afficher'}
                    >
                      {showNewPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors"
                >
                  Mettre à jour le mot de passe
                </button>
              </form>

              {/* Sauvegarde JSON */}
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 space-y-3">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Database className="w-4 h-4 text-emerald-700" />
                  <span>Sauvegarde des données (JSON)</span>
                </h3>
                <p className="text-xs text-slate-500">
                  Exportez l'état complet du portfolio pour vos archives ou pour les intégrer directement dans <code className="font-mono text-emerald-800">src/data/portfolioData.ts</code>.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
                    showFeedback('Données complètes copiées dans le presse-papier !');
                  }}
                  className="px-4 py-2 text-xs font-semibold text-slate-800 bg-white border border-slate-300 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  Copier le JSON complet
                </button>
              </div>
            </div>
          )}

        </main>
      </div>

    </div>
  );
};
