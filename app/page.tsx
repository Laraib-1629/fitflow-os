"use client";

import React, { useEffect, useRef, useState, ReactNode } from 'react';
import {
  Activity, MessageSquare, ArrowUpRight, Smartphone,
  ShieldCheck, CheckCircle2, Clock, TrendingUp,
  Target, Bot, Menu, X, Sparkles, Calendar,
  TestTube, Brain, Heart, Cpu, FileText, Bell,
  Zap, Stethoscope, FlaskConical, CalendarDays
} from 'lucide-react';

/* -------------------------------------------------------------------------- */
/* COMPONENT: Proximity Glow Card                                             */
/* -------------------------------------------------------------------------- */
const GlowCard = ({
  children,
  className = "",
  glowRgb = "6,182,212",
}: {
  children: ReactNode;
  className?: string;
  glowRgb?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    ref.current.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    ref.current.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      className={`group relative rounded-3xl overflow-hidden ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-0"
        style={{
          background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(${glowRgb},0.45), transparent 40%)`,
        }}
      />
      <div className="absolute inset-[1px] rounded-[23px] bg-[#0A0A0B] z-0" />
      <div className="relative z-10 p-8 h-full flex flex-col justify-center">
        {children}
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* COMPONENT: Clinic Browser Mockup Card                                      */
/* -------------------------------------------------------------------------- */
const ClinicMockup = ({
  brandName,
  tagline,
  image,
  buttonColor,
}: {
  brandName: string;
  tagline: string;
  image: string;
  buttonColor: string;
}) => (
  <div className="w-[320px] md:w-[400px] h-[280px] md:h-[350px] shrink-0 rounded-xl overflow-hidden relative group border border-white/10 bg-[#0A0A0A] shadow-2xl flex flex-col cursor-pointer">
    <div className="h-8 bg-[#1A1A1A] border-b border-white/5 flex items-center px-3 gap-1.5 shrink-0 z-20">
      <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] opacity-80" />
      <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] opacity-80" />
      <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F] opacity-80" />
      <div className="mx-auto w-1/2 h-4 bg-white/5 rounded-md flex items-center justify-center">
        <span className="text-[8px] text-white/30 font-mono tracking-widest">
          {brandName.toLowerCase().replace(/\s+/g, '')}.clinic
        </span>
      </div>
    </div>
    <div className="relative flex-1 w-full overflow-hidden bg-black">
      <img
        src={image}
        alt={brandName}
        className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />
      <div className="relative z-10 p-6 h-full flex flex-col justify-between">
        <div className="flex justify-between items-center">
          <span className="font-bold text-white tracking-widest uppercase text-[10px] drop-shadow-md">
            {brandName}
          </span>
          <div className="hidden sm:flex gap-4 text-[8px] text-white/70 uppercase tracking-widest font-medium">
            <span>About</span>
            <span>Services</span>
            <span>Contact</span>
          </div>
          <Menu className="w-4 h-4 text-white sm:hidden" />
        </div>
        <div className="space-y-4">
          <h3 className="text-2xl md:text-3xl font-medium text-white leading-tight drop-shadow-lg max-w-[85%]">
            {tagline}
          </h3>
          <div
            className={`w-fit px-5 py-2.5 rounded-sm text-[10px] font-bold text-white uppercase tracking-widest shadow-lg ${buttonColor}`}
          >
            Book Appointment
          </div>
        </div>
      </div>
    </div>
  </div>
);

/* -------------------------------------------------------------------------- */
/* MAIN COMPONENT                                                             */
/* -------------------------------------------------------------------------- */
export default function ClinicOSLanding() {
  const [activeStep, setActiveStep] = useState(0);
  const [chatPhase, setChatPhase] = useState(-1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [form, setForm] = useState({
    name: '',
    number: '',
    email: '',
    studioName: '',
    location: '',
    city: '',
  });
  const chatTimers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError('');
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Failed to submit.');
      setSubmitted(true);
    } catch {
      setSubmitError('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setSubmitted(false);
      setSubmitError('');
      setForm({ name: '', number: '', email: '', studioName: '', location: '', city: '' });
    }, 300);
  };

  /* Step carousel */
  useEffect(() => {
    const timer = setInterval(() => setActiveStep((p) => (p + 1) % 3), 6000);
    return () => clearInterval(timer);
  }, []);

  /* Chat animation loop */
  useEffect(() => {
    const clearAll = () => chatTimers.current.forEach(clearTimeout);
    const s = (fn: () => void, ms: number) => {
      const t = setTimeout(fn, ms);
      chatTimers.current.push(t);
    };
    const runCycle = () => {
      clearAll();
      chatTimers.current = [];
      s(() => setChatPhase(0), 0);
      s(() => setChatPhase(1), 700);
      s(() => setChatPhase(2), 1400);
      s(() => setChatPhase(3), 2700);
      s(() => setChatPhase(4), 4600);
      s(() => setChatPhase(5), 5300);
      s(() => setChatPhase(6), 6600);
      s(() => setChatPhase(7), 7500);
      s(runCycle, 13500);
    };
    runCycle();
    return clearAll;
  }, []);

  /* ESC key */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') closeModal(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const getWheelStyles = (index: number) => {
    if (activeStep === index)
      return { opacity: 1, transform: 'translateY(0) scale(1)', zIndex: 20 };
    if (activeStep > index || (activeStep === 0 && index === 2))
      return { opacity: 0, transform: 'translateY(-60px) scale(0.95)', zIndex: 0, pointerEvents: 'none' as const };
    return { opacity: 0, transform: 'translateY(60px) scale(0.95)', zIndex: 0, pointerEvents: 'none' as const };
  };

  const clinicMockups = [
    { brandName: "LifeCare Clinic", tagline: "Your health, our priority.", image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=800&auto=format&fit=crop", buttonColor: "bg-cyan-600" },
    { brandName: "Nova Medical", tagline: "Advanced care, simplified.", image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800&auto=format&fit=crop", buttonColor: "bg-violet-600" },
    { brandName: "Serenity Dental", tagline: "Smile with confidence.", image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=800&auto=format&fit=crop", buttonColor: "bg-blue-600" },
    { brandName: "PulsePhysio", tagline: "Recover stronger.", image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=800&auto=format&fit=crop", buttonColor: "bg-emerald-600" },
    { brandName: "MindWell Center", tagline: "Mental health matters.", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop", buttonColor: "bg-indigo-600" },
  ];

  const chatFeatures = [
    { icon: Brain, color: 'cyan', label: 'AI Patient Assistant', desc: '24/7 natural language support', activeWhen: chatPhase >= 1 && chatPhase <= 3 },
    { icon: CalendarDays, color: 'violet', label: 'Calendar Synchronization', desc: 'Real-time schedule management', activeWhen: chatPhase >= 4 && chatPhase <= 6 },
    { icon: FlaskConical, color: 'emerald', label: 'Lab Management', desc: 'Automated lab order routing', activeWhen: chatPhase >= 6 },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-slate-50 font-sans selection:bg-cyan-500/30 overflow-hidden relative">

      {/* ── Inline Styles ── */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-50% - 12px)); }
        }
        @keyframes scroll-right {
          0% { transform: translateX(calc(-50% - 12px)); }
          100% { transform: translateX(0); }
        }
        .animate-scroll-left { animation: scroll-left 40s linear infinite; }
        .animate-scroll-right { animation: scroll-right 40s linear infinite; }
        .pause-on-hover:hover { animation-play-state: paused; }

        @keyframes float {
          0%,100% { transform: translateY(0px) rotate(-3deg); }
          50% { transform: translateY(-18px) rotate(-1deg); }
        }
        @keyframes float-delayed {
          0%,100% { transform: translateY(0px) rotate(2deg); }
          50% { transform: translateY(-14px) rotate(4deg); }
        }

        .word-carousel { display:inline-block; overflow:hidden; vertical-align:bottom; height:1.1em; }
        .word-carousel-inner {
          display:flex; flex-direction:column;
          animation: scroll-words 9s cubic-bezier(0.4,0,0.2,1) infinite;
        }
        @keyframes scroll-words {
          0%,25% { transform:translateY(0); }
          33%,58% { transform:translateY(-33.33%); }
          66%,91% { transform:translateY(-66.66%); }
          100% { transform:translateY(0); }
        }

        @keyframes modal-enter {
          from { opacity:0; transform:scale(0.95) translateY(10px); }
          to { opacity:1; transform:scale(1) translateY(0); }
        }
        .animate-modal-enter { animation: modal-enter 0.3s cubic-bezier(0.16,1,0.3,1) forwards; }

        @keyframes msg-in {
          from { opacity:0; transform:translateY(10px) scale(0.97); }
          to { opacity:1; transform:translateY(0) scale(1); }
        }
        .msg-in { animation: msg-in 0.35s cubic-bezier(0.16,1,0.3,1) forwards; }

        @keyframes badge-in {
          from { opacity:0; transform:translateX(-10px); }
          to { opacity:1; transform:translateX(0); }
        }
        .badge-in-1 { animation: badge-in 0.4s 0ms cubic-bezier(0.16,1,0.3,1) forwards; }
        .badge-in-2 { animation: badge-in 0.4s 120ms cubic-bezier(0.16,1,0.3,1) forwards; }
        .badge-in-3 { animation: badge-in 0.4s 240ms cubic-bezier(0.16,1,0.3,1) forwards; }

        @keyframes typing-pulse {
          0%,60%,100% { transform:translateY(0); opacity:0.5; }
          30% { transform:translateY(-4px); opacity:1; }
        }
        .t1 { animation: typing-pulse 1.1s infinite 0ms; }
        .t2 { animation: typing-pulse 1.1s infinite 160ms; }
        .t3 { animation: typing-pulse 1.1s infinite 320ms; }

        @keyframes feature-glow {
          from { box-shadow: 0 0 0 rgba(6,182,212,0); }
          to { box-shadow: 0 0 24px rgba(6,182,212,0.15); }
        }
        .feature-active { animation: feature-glow 0.4s forwards; }

        @keyframes orb-drift {
          0%,100% { transform: translate(0,0) scale(1); }
          50% { transform: translate(30px,20px) scale(1.05); }
        }
      ` }} />

      {/* ── REGISTRATION MODAL ── */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={closeModal} />
          <div className="relative w-full max-w-lg bg-[#0A0A0B] border border-white/10 rounded-3xl shadow-[0_0_80px_rgba(6,182,212,0.1)] overflow-hidden animate-modal-enter">
            <div className="absolute top-[-20%] right-[-20%] w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
            <button onClick={closeModal} className="absolute top-5 right-5 text-white/30 hover:text-white transition-colors z-10">
              <X className="w-5 h-5" />
            </button>

            {submitted ? (
              <div className="p-10 text-center flex flex-col items-center">
                <div className="w-14 h-14 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(6,182,212,0.2)]">
                  <CheckCircle2 className="w-7 h-7 text-cyan-400" />
                </div>
                <h3 className="text-2xl font-medium text-white mb-3">You're on the list!</h3>
                <p className="text-white/50 text-sm leading-relaxed mb-8">
                  We'll be in touch shortly to set up your clinic's AI integration.
                </p>
                <button onClick={closeModal} className="w-full bg-white text-black font-bold uppercase tracking-widest text-[10px] py-4 rounded-xl hover:bg-cyan-50 transition-colors">
                  Close
                </button>
              </div>
            ) : (
              <div className="p-8">
                <div className="mb-7">
                  <div className="flex items-center gap-3 mb-1">
                    <div className="w-8 h-8 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-cyan-400" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-400">Book a Demo</span>
                  </div>
                  <h3 className="text-2xl font-medium text-white mt-3">Set up your clinic.</h3>
                  <p className="text-white/40 text-sm mt-1">Takes 2 minutes. No credit card required.</p>
                </div>
                <form onSubmit={handleFormSubmit} className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] uppercase tracking-widest text-white/40 font-semibold">Name</label>
                      <input name="name" type="text" required value={form.name} onChange={handleFormChange} placeholder="Dr. Sarah Ali"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-cyan-500/50 focus:bg-white/[0.07] transition-all" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] uppercase tracking-widest text-white/40 font-semibold">Phone Number</label>
                      <input name="number" type="tel" required value={form.number} onChange={handleFormChange} placeholder="+1 234 567 8900"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-cyan-500/50 focus:bg-white/[0.07] transition-all" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase tracking-widest text-white/40 font-semibold">Email Address</label>
                    <input name="email" type="email" required value={form.email} onChange={handleFormChange} placeholder="dr.sarah@yourclinic.com"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-cyan-500/50 focus:bg-white/[0.07] transition-all" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase tracking-widest text-white/40 font-semibold">Clinic / Studio Name</label>
                    <input name="studioName" type="text" required value={form.studioName} onChange={handleFormChange} placeholder="LifeCare Medical Center"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-cyan-500/50 focus:bg-white/[0.07] transition-all" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] uppercase tracking-widest text-white/40 font-semibold">Location</label>
                      <input name="location" type="text" required value={form.location} onChange={handleFormChange} placeholder="123 Main St"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-cyan-500/50 focus:bg-white/[0.07] transition-all" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] uppercase tracking-widest text-white/40 font-semibold">City</label>
                      <input name="city" type="text" required value={form.city} onChange={handleFormChange} placeholder="Karachi"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-cyan-500/50 focus:bg-white/[0.07] transition-all" />
                    </div>
                  </div>
                  {submitError && <p className="text-red-400 text-xs text-center">{submitError}</p>}
                  <button type="submit" disabled={submitting}
                    className="w-full bg-white text-black font-bold uppercase tracking-widest text-[10px] py-4 rounded-xl hover:bg-cyan-50 transition-colors shadow-lg mt-2 disabled:opacity-50 disabled:cursor-not-allowed">
                    {submitting ? 'Submitting…' : 'Book My Free Demo'}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Noise Overlay ── */}
      <div className="fixed inset-0 z-[100] pointer-events-none opacity-[0.015]"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/%3E%3C/svg%3E")' }} />

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* NAV                                                                   */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/[0.05] bg-black/40 backdrop-blur-2xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-violet-600 p-[1px]">
              <div className="w-full h-full bg-black rounded-full flex items-center justify-center">
                <Stethoscope className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
            <span className="text-sm font-medium tracking-[0.2em] uppercase text-white/90">ClinicOS</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-xs text-white/40 uppercase tracking-widest font-medium">
            <span className="hover:text-white transition-colors cursor-pointer">Features</span>
            <span className="hover:text-white transition-colors cursor-pointer">Integrations</span>
            <span className="hover:text-white transition-colors cursor-pointer">Pricing</span>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="text-[10px] sm:text-xs font-bold tracking-widest uppercase bg-white text-black px-4 sm:px-6 py-2.5 sm:py-3 rounded-full hover:bg-cyan-50 hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)] shrink-0"
          >
            Book a Demo
          </button>
        </div>
      </nav>

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* HERO                                                                  */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      <section className="relative z-10 pt-36 md:pt-48 pb-20 md:pb-32 px-6 min-h-[100vh] flex flex-col items-center justify-center text-center overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/20 via-[#050505] to-[#050505]">

        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-cyan-900/10 rounded-full mix-blend-screen filter blur-[120px] animate-pulse" style={{ animationDuration: '10s' }} />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-violet-900/10 rounded-full mix-blend-screen filter blur-[150px] animate-pulse" style={{ animationDuration: '15s' }} />

        {/* Floating AI sticker – desktop */}
        <div className="absolute top-[18%] lg:left-8 xl:left-[8%] 2xl:left-[14%] hidden lg:flex items-center gap-4 bg-white/5 backdrop-blur-2xl border border-white/10 px-5 py-4 rounded-3xl shadow-[0_0_40px_rgba(0,0,0,0.5)] z-0"
          style={{ animation: 'float 6s ease-in-out infinite' }}>
          <div className="w-10 h-10 bg-cyan-500/20 rounded-full flex items-center justify-center border border-cyan-500/30 shrink-0">
            <Bot className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-left">
            <div className="text-[10px] text-cyan-300/70 font-semibold uppercase tracking-widest mb-0.5">AI Reply</div>
            <div className="text-sm font-medium text-white/90">"Your 10 AM slot is confirmed."</div>
          </div>
        </div>

        {/* Floating lab sticker – desktop */}
        <div className="absolute top-[40%] lg:right-8 xl:right-[8%] 2xl:right-[14%] hidden lg:flex items-center gap-4 bg-white/5 backdrop-blur-2xl border border-white/10 px-5 py-4 rounded-3xl shadow-[0_0_40px_rgba(0,0,0,0.5)] z-0"
          style={{ animation: 'float-delayed 7s ease-in-out infinite' }}>
          <div className="w-10 h-10 bg-violet-500/20 rounded-full flex items-center justify-center border border-violet-500/30 shrink-0">
            <FlaskConical className="w-4 h-4 text-violet-400" />
          </div>
          <div className="text-left">
            <div className="text-[10px] text-violet-300/70 font-semibold uppercase tracking-widest mb-0.5">Lab Order</div>
            <div className="text-sm font-medium text-white/90">CBC + Lipid Panel sent</div>
          </div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/20 bg-cyan-500/[0.04] backdrop-blur-md mb-6 shadow-lg">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-medium text-cyan-200/80 tracking-widest uppercase">Custom AI Integration for Clinics & Studios</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-medium tracking-tighter mb-6 text-transparent bg-clip-text bg-gradient-to-b from-white via-white/90 to-white/30 leading-[1.1]">
            The AI operating<br className="hidden md:block" /> system for your{' '}
            <span className="word-carousel text-white">
              <span className="word-carousel-inner">
                <span className="pb-2">clinic.</span>
                <span className="pb-2">practice.</span>
                <span className="pb-2">studio.</span>
              </span>
            </span>
          </h1>

          <p className="text-base md:text-xl text-white/40 max-w-2xl mx-auto font-light leading-relaxed mb-10">
            AI assistant, calendar synchronization, and lab management — woven into one seamless layer. Your staff focuses on patients. The AI handles everything else.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <button
              onClick={() => setIsModalOpen(true)}
              className="group flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:scale-105 transition-all duration-300 shadow-[0_0_40px_rgba(255,255,255,0.15)]"
            >
              Book a Free Demo
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
            <p className="text-xs sm:text-sm font-medium text-white/40 px-4 py-2">
              Live in your clinic within 7 days.
            </p>
          </div>

          {/* Mobile sticker */}
          <div className="flex lg:hidden mt-8 z-10">
            <div className="flex items-center gap-3 bg-white/5 backdrop-blur-2xl border border-white/10 px-4 py-3 rounded-2xl shadow-lg">
              <div className="w-8 h-8 bg-cyan-500/20 rounded-full flex items-center justify-center border border-cyan-500/30 shrink-0">
                <Bot className="w-3.5 h-3.5 text-cyan-400" />
              </div>
              <div className="text-left">
                <div className="text-[9px] text-cyan-300/70 font-semibold uppercase tracking-widest">AI Reply</div>
                <div className="text-xs font-medium text-white/90">"Your 10 AM slot is confirmed."</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* CAROUSEL WHEEL — The Journey                                          */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      <section className="relative z-10 border-y border-white/[0.02] bg-black py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-16 relative">

          {/* Step indicators */}
          <div className="hidden lg:flex flex-col gap-4 absolute left-0 top-1/2 -translate-y-1/2 z-30">
            {[0, 1, 2].map((step) => (
              <button key={step} onClick={() => setActiveStep(step)}
                className={`w-1 transition-all duration-500 rounded-full ${activeStep === step ? 'h-12 bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]' : 'h-4 bg-white/10 hover:bg-white/30'}`} />
            ))}
          </div>

          {/* Left: Text content */}
          <div className="w-full lg:w-1/2 relative h-[450px] md:h-[500px] pl-0 lg:pl-12">

            {/* Step 0 — The problem */}
            <div className="absolute inset-0 flex flex-col justify-center transition-all duration-700" style={getWheelStyles(0)}>
              <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(239,68,68,0.2)]">
                <Bell className="w-6 h-6 text-red-400" />
              </div>
              <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-white mb-4 md:mb-6">Buried in admin work.</h2>
              <p className="text-base md:text-xl text-white/50 font-light leading-relaxed mb-6 md:mb-8">
                Missed calls, double-booked appointments, lost lab results, and patients left waiting. Your clinic deserves better infrastructure — not more chaos.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-red-500/5 border border-red-500/10 rounded-xl p-4 flex flex-col items-center text-center">
                  <span className="text-red-400 font-bold text-xl md:text-2xl mb-1">40%</span>
                  <span className="text-[10px] md:text-xs text-white/40 uppercase tracking-widest">Appointment No-Shows</span>
                </div>
                <div className="bg-red-500/5 border border-red-500/10 rounded-xl p-4 flex flex-col items-center text-center">
                  <span className="text-red-400 font-bold text-xl md:text-2xl mb-1">3hrs</span>
                  <span className="text-[10px] md:text-xs text-white/40 uppercase tracking-widest">Daily Admin Overhead</span>
                </div>
              </div>
            </div>

            {/* Step 1 — AI takes over */}
            <div className="absolute inset-0 flex flex-col justify-center transition-all duration-700" style={getWheelStyles(1)}>
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(6,182,212,0.2)]">
                <Bot className="w-6 h-6 text-cyan-400" />
              </div>
              <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-white mb-4 md:mb-6">AI takes the wheel.</h2>
              <p className="text-base md:text-xl text-white/50 font-light leading-relaxed mb-6 md:mb-8">
                A custom-trained AI agent handles patient messages, books appointments into your live calendar, and routes lab orders — around the clock, in any language.
              </p>
              <div className="p-4 md:p-6 bg-cyan-500/5 border border-cyan-500/20 rounded-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                  <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">Live Inference Pipeline</span>
                </div>
                <div className="space-y-3 font-mono text-xs text-white/60">
                  <div className="flex justify-between items-center">
                    <span className="text-white/40">Input:</span>
                    <span className="text-cyan-200">"I need to see a doctor tomorrow"</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/40">Intent:</span>
                    <span className="text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded">book_appointment (97%)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/40">Action:</span>
                    <span className="text-blue-400">check_availability() → confirm()</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2 — Peace of mind */}
            <div className="absolute inset-0 flex flex-col justify-center transition-all duration-700" style={getWheelStyles(2)}>
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                <Target className="w-6 h-6 text-emerald-400" />
              </div>
              <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-white mb-4 md:mb-6">Your clinic, on autopilot.</h2>
              <p className="text-base md:text-xl text-white/50 font-light leading-relaxed mb-6 md:mb-8">
                Operations flow flawlessly. Reminders go out, labs get tracked, and your calendar stays clean. If a patient needs special attention, the system escalates instantly.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span className="text-xs md:text-sm font-medium text-white/80">Auto-Pilot Active</span>
                </div>
                <div className="p-4 bg-white/5 border border-white/10 rounded-xl flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-white/50 shrink-0" />
                  <span className="text-xs md:text-sm font-medium text-white/80">Human Fallback</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Visual mockup */}
          <div className="w-full lg:w-1/2 relative h-[420px] md:h-[500px]">
            <div className="relative h-full w-full max-w-md mx-auto bg-[#0A0A0B]/80 backdrop-blur-3xl border border-white/10 rounded-3xl overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.6)]">

              {/* Step 0 visual */}
              <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-center transition-all duration-700" style={getWheelStyles(0)}>
                <div className="space-y-4">
                  {['Missed call from patient', 'Lab results unread (3)', 'Double-booking conflict'].map((msg, i) => (
                    <div key={i} className="flex gap-4 items-center bg-red-900/10 p-4 rounded-xl border border-red-500/20 shadow-lg">
                      <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse shrink-0" />
                      <div>
                        <div className="text-xs text-red-400 font-medium tracking-widest uppercase mb-1">Alert</div>
                        <div className="text-sm text-white/80">{msg}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step 1 visual */}
              <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end transition-all duration-700" style={getWheelStyles(1)}>
                <div className="flex items-center gap-3 border-b border-white/10 pb-4 mb-4">
                  <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">ClinicOS AI Agent</div>
                    <div className="text-xs text-cyan-400 animate-pulse">Operating autonomously…</div>
                  </div>
                </div>
                <div className="space-y-4 mb-4">
                  <div className="flex justify-end">
                    <div className="bg-white/5 border border-white/10 text-white/70 text-sm py-3 px-5 rounded-2xl rounded-tr-sm shadow-md">
                      I need to see a doctor tomorrow
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="bg-cyan-600/20 border border-cyan-500/30 text-cyan-100 text-sm py-3 px-5 rounded-2xl rounded-tl-sm shadow-[0_0_20px_rgba(6,182,212,0.2)]">
                      Of course! Dr. Ahmed has 10 AM or 2 PM available. Which do you prefer?
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 2 visual */}
              <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-center transition-all duration-700" style={getWheelStyles(2)}>
                <div className="text-center mb-8">
                  <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto mb-4 drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
                  <div className="text-2xl font-medium text-white mb-2">Clinic Running Smoothly</div>
                  <div className="text-sm text-emerald-400/60 font-mono">All systems nominal</div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-5 shadow-lg">
                    <div className="text-xs text-emerald-400/70 uppercase tracking-widest mb-2 font-semibold">Appointments</div>
                    <div className="text-4xl text-emerald-400 font-light">24/24</div>
                  </div>
                  <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-xl p-5 shadow-lg">
                    <div className="text-xs text-cyan-400/70 uppercase tracking-widest mb-2 font-semibold">Lab Queue</div>
                    <div className="text-4xl text-cyan-400 font-light">0</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* ANIMATED CHAT DEMO SECTION                                           */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      <section className="relative z-10 py-24 md:py-36 px-6 bg-[#020202] border-t border-white/[0.03] overflow-hidden">

        {/* Background orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-900/10 rounded-full blur-[100px] pointer-events-none" style={{ animation: 'orb-drift 12s ease-in-out infinite' }} />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-900/8 rounded-full blur-[100px] pointer-events-none" style={{ animation: 'orb-drift 16s ease-in-out infinite reverse' }} />

        <div className="max-w-7xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16 md:mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/20 bg-cyan-500/[0.04] mb-5">
              <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">Live Demo</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-white mb-4">
              Watch the AI work in real time.
            </h2>
            <p className="text-base md:text-lg text-white/40 font-light max-w-2xl mx-auto">
              A patient sends a message. The AI books the appointment, syncs the calendar, and orders the lab — without a single human click.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

            {/* Left — Feature callouts */}
            <div className="w-full lg:w-1/2 space-y-4 order-2 lg:order-1">
              {chatFeatures.map(({ icon: Icon, color, label, desc, activeWhen }) => (
                <div key={label}
                  className={`flex items-start gap-5 p-5 rounded-2xl border transition-all duration-500 ${
                    activeWhen
                      ? color === 'cyan'
                        ? 'bg-cyan-500/10 border-cyan-500/30 shadow-[0_0_30px_rgba(6,182,212,0.1)]'
                        : color === 'violet'
                        ? 'bg-violet-500/10 border-violet-500/30 shadow-[0_0_30px_rgba(139,92,246,0.1)]'
                        : 'bg-emerald-500/10 border-emerald-500/30 shadow-[0_0_30px_rgba(16,185,129,0.1)]'
                      : 'bg-white/[0.02] border-white/5'
                  }`}>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-all duration-500 ${
                    activeWhen
                      ? color === 'cyan' ? 'bg-cyan-500/20 border border-cyan-500/30'
                        : color === 'violet' ? 'bg-violet-500/20 border border-violet-500/30'
                        : 'bg-emerald-500/20 border border-emerald-500/30'
                      : 'bg-white/5 border border-white/10'
                  }`}>
                    <Icon className={`w-5 h-5 transition-colors duration-500 ${
                      activeWhen
                        ? color === 'cyan' ? 'text-cyan-400'
                          : color === 'violet' ? 'text-violet-400'
                          : 'text-emerald-400'
                        : 'text-white/30'
                    }`} />
                  </div>
                  <div>
                    <div className={`text-sm font-semibold mb-1 transition-colors duration-500 ${activeWhen ? 'text-white' : 'text-white/50'}`}>
                      {label}
                    </div>
                    <div className="text-xs text-white/30">{desc}</div>
                    {activeWhen && (
                      <div className={`mt-2 text-[10px] uppercase tracking-widest font-bold animate-pulse ${
                        color === 'cyan' ? 'text-cyan-400' : color === 'violet' ? 'text-violet-400' : 'text-emerald-400'
                      }`}>
                        ● Active now
                      </div>
                    )}
                  </div>
                </div>
              ))}

              <div className="pt-4 pl-1">
                <p className="text-xs text-white/25 font-light">
                  All three systems work together silently. Your patients just see a fast, friendly response.
                </p>
              </div>
            </div>

            {/* Right — Phone mockup with live chat */}
            <div className="w-full lg:w-1/2 flex justify-center order-1 lg:order-2">
              <div className="relative">
                {/* Glow ring behind phone */}
                <div className="absolute inset-0 scale-110 bg-gradient-to-b from-cyan-500/20 to-violet-500/10 rounded-[3rem] blur-2xl pointer-events-none" />

                {/* Phone frame */}
                <div className="relative w-[300px] sm:w-[320px] bg-[#0D0D0D] border-2 border-white/15 rounded-[3rem] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.8)]"
                  style={{ aspectRatio: '9/19.5' }}>

                  {/* Status bar */}
                  <div className="h-10 bg-[#0D0D0D] flex items-center justify-between px-6 pt-2 shrink-0">
                    <span className="text-white/40 text-[9px] font-medium">9:41</span>
                    <div className="w-24 h-5 bg-black rounded-full border border-white/10" />
                    <div className="flex gap-1 items-center">
                      <div className="w-3.5 h-2 border border-white/30 rounded-sm flex items-center px-0.5">
                        <div className="h-full w-2/3 bg-white/50 rounded-sm" />
                      </div>
                    </div>
                  </div>

                  {/* Chat header */}
                  <div className="flex items-center gap-3 px-5 py-3 border-b border-white/[0.07] shrink-0">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-400 to-violet-600 flex items-center justify-center shrink-0">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <div className="text-[13px] font-semibold text-white">ClinicOS Assistant</div>
                      <div className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                        <span className="text-[10px] text-emerald-400">Online · 24/7</span>
                      </div>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 px-4 py-4 space-y-3 overflow-hidden flex flex-col" style={{ minHeight: 0, height: 'calc(100% - 160px)' }}>

                    {chatPhase >= 1 && (
                      <div className="flex justify-end msg-in">
                        <div className="bg-white/10 border border-white/10 text-white/90 text-[13px] py-2.5 px-4 rounded-2xl rounded-tr-sm max-w-[85%] leading-relaxed">
                          Hi, I need to schedule a blood test
                        </div>
                      </div>
                    )}

                    {chatPhase === 2 && (
                      <div className="flex justify-start msg-in">
                        <div className="bg-cyan-900/30 border border-cyan-500/20 py-3 px-4 rounded-2xl rounded-tl-sm">
                          <div className="flex gap-1.5 items-center">
                            <div className="w-2 h-2 bg-cyan-400 rounded-full t1" />
                            <div className="w-2 h-2 bg-cyan-400 rounded-full t2" />
                            <div className="w-2 h-2 bg-cyan-400 rounded-full t3" />
                          </div>
                        </div>
                      </div>
                    )}

                    {chatPhase >= 3 && (
                      <div className="flex justify-start msg-in">
                        <div className="bg-cyan-900/30 border border-cyan-500/20 text-cyan-50 text-[13px] py-2.5 px-4 rounded-2xl rounded-tl-sm max-w-[90%] leading-relaxed shadow-[0_0_20px_rgba(6,182,212,0.1)]">
                          Of course! Our lab has morning (9–12) and afternoon (2–5) slots tomorrow. Which works for you?
                        </div>
                      </div>
                    )}

                    {chatPhase >= 4 && (
                      <div className="flex justify-end msg-in">
                        <div className="bg-white/10 border border-white/10 text-white/90 text-[13px] py-2.5 px-4 rounded-2xl rounded-tr-sm max-w-[85%] leading-relaxed">
                          Morning, 10am please
                        </div>
                      </div>
                    )}

                    {chatPhase === 5 && (
                      <div className="flex justify-start msg-in">
                        <div className="bg-cyan-900/30 border border-cyan-500/20 py-3 px-4 rounded-2xl rounded-tl-sm">
                          <div className="flex gap-1.5 items-center">
                            <div className="w-2 h-2 bg-cyan-400 rounded-full t1" />
                            <div className="w-2 h-2 bg-cyan-400 rounded-full t2" />
                            <div className="w-2 h-2 bg-cyan-400 rounded-full t3" />
                          </div>
                        </div>
                      </div>
                    )}

                    {chatPhase >= 6 && (
                      <div className="flex justify-start msg-in">
                        <div className="bg-cyan-900/30 border border-cyan-500/20 text-cyan-50 text-[13px] py-2.5 px-4 rounded-2xl rounded-tl-sm max-w-[90%] leading-relaxed shadow-[0_0_20px_rgba(6,182,212,0.1)]">
                          ✓ Done! Lab appointment confirmed for tomorrow at <span className="text-cyan-300 font-semibold">10:00 AM</span>. Prep instructions sent to your phone.
                        </div>
                      </div>
                    )}

                    {chatPhase >= 7 && (
                      <div className="space-y-2 pl-0">
                        <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-3 py-1.5 w-fit badge-in-1 opacity-0">
                          <CalendarDays className="w-3 h-3 text-emerald-400" />
                          <span className="text-[10px] text-emerald-400 font-medium">Calendar synced</span>
                        </div>
                        <div className="flex items-center gap-2 bg-violet-500/10 border border-violet-500/20 rounded-full px-3 py-1.5 w-fit badge-in-2 opacity-0">
                          <FlaskConical className="w-3 h-3 text-violet-400" />
                          <span className="text-[10px] text-violet-400 font-medium">Lab order created</span>
                        </div>
                        <div className="flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-3 py-1.5 w-fit badge-in-3 opacity-0">
                          <Smartphone className="w-3 h-3 text-blue-400" />
                          <span className="text-[10px] text-blue-400 font-medium">SMS sent to patient</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Input bar */}
                  <div className="absolute bottom-0 left-0 right-0 px-4 py-3 bg-[#0D0D0D] border-t border-white/[0.07]">
                    <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2.5">
                      <span className="text-[12px] text-white/20 flex-1">Type a message…</span>
                      <div className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center">
                        <ArrowUpRight className="w-3 h-3 text-cyan-400" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* FEATURES GRID                                                         */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      <section className="relative z-10 py-24 md:py-32 border-t border-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-white mb-4">Three systems. One integration.</h2>
            <p className="text-base md:text-lg text-white/40 font-light max-w-2xl mx-auto">
              ClinicOS brings together the three pillars of modern clinic operations into a single, AI-powered layer.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <GlowCard glowRgb="6,182,212">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-6">
                <Brain className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-xl font-medium text-white/90 mb-3">AI Patient Assistant</h3>
              <p className="text-white/40 text-sm leading-relaxed mb-6">
                A conversational AI trained on your clinic's services, doctors, and policies. It handles inquiries, bookings, and follow-ups 24/7 — in any language.
              </p>
              <ul className="space-y-2">
                {['Multi-language support', 'Instant appointment booking', 'FAQ & policy answers', 'Escalation to human staff'].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-xs text-white/50">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </GlowCard>

            <GlowCard glowRgb="139,92,246">
              <div className="w-12 h-12 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center mb-6">
                <CalendarDays className="w-6 h-6 text-violet-400" />
              </div>
              <h3 className="text-xl font-medium text-white/90 mb-3">Calendar Synchronization</h3>
              <p className="text-white/40 text-sm leading-relaxed mb-6">
                Your AI reads live availability across all doctors and departments, books into the right slot, and sends automated reminders to cut no-shows.
              </p>
              <ul className="space-y-2">
                {['Google / Outlook sync', 'Real-time availability checks', 'Automated reminders (SMS/WhatsApp)', 'Conflict detection & resolution'].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-xs text-white/50">
                    <CheckCircle2 className="w-3.5 h-3.5 text-violet-400 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </GlowCard>

            <GlowCard glowRgb="16,185,129">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-6">
                <FlaskConical className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="text-xl font-medium text-white/90 mb-3">Lab Management</h3>
              <p className="text-white/40 text-sm leading-relaxed mb-6">
                Automatically create and route lab orders from patient conversations. Results are tracked, flagged when abnormal, and delivered directly to the ordering physician.
              </p>
              <ul className="space-y-2">
                {['Automated lab order creation', 'Result tracking & notifications', 'Abnormal flag alerts', 'Direct physician delivery'].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-xs text-white/50">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </GlowCard>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* CLINIC MOCKUPS MARQUEE                                               */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      <section className="relative z-10 py-20 md:py-32 bg-[#020202] border-t border-white/[0.02] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
          <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-white mb-4 md:mb-6">
            Shipped with ClinicOS
          </h2>
          <p className="text-base md:text-lg text-white/40 font-light max-w-2xl mx-auto">
            When you sign up, we generate a beautiful, conversion-ready website for your clinic — fully synchronized with your AI booking engine from day one.
          </p>
        </div>

        <div className="relative w-full flex flex-col gap-6">
          <div className="absolute top-0 bottom-0 left-0 w-16 md:w-32 bg-gradient-to-r from-[#020202] to-transparent z-20 pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-16 md:w-32 bg-gradient-to-l from-[#020202] to-transparent z-20 pointer-events-none" />

          <div className="flex w-max animate-scroll-left pause-on-hover gap-6 px-3">
            {[...clinicMockups, ...clinicMockups].map((m, i) => (
              <ClinicMockup key={`r1-${i}`} brandName={m.brandName} tagline={m.tagline} image={m.image} buttonColor={m.buttonColor} />
            ))}
          </div>
          <div className="flex w-max animate-scroll-right pause-on-hover gap-6 px-3">
            {[...clinicMockups.slice().reverse(), ...clinicMockups.slice().reverse()].map((m, i) => (
              <ClinicMockup key={`r2-${i}`} brandName={m.brandName} tagline={m.tagline} image={m.image} buttonColor={m.buttonColor} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* STATS STRIP                                                           */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      <section className="relative z-10 py-20 md:py-24 border-t border-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
            {[
              { value: '↓ 40%', label: 'Reduction in no-shows', color: 'text-cyan-400' },
              { value: '3hrs', label: 'Daily admin time saved', color: 'text-violet-400' },
              { value: '24/7', label: 'AI patient coverage', color: 'text-emerald-400' },
              { value: '7 days', label: 'To go fully live', color: 'text-white' },
            ].map(({ value, label, color }) => (
              <div key={label} className="text-center">
                <div className={`text-3xl md:text-4xl font-light mb-2 ${color}`}>{value}</div>
                <div className="text-xs text-white/30 uppercase tracking-widest font-medium">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* CTA                                                                   */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      <section className="relative z-10 py-24 md:py-36 px-6 border-t border-white/5 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-900/15 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-3xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/20 bg-cyan-500/[0.04] mb-8">
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">No credit card required</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-white mb-6 leading-tight">
            Ready to transform your clinic?
          </h2>
          <p className="text-base md:text-lg text-white/40 font-light mb-10 max-w-xl mx-auto">
            Book a free 30-minute demo. We'll show you exactly how ClinicOS integrates with your existing workflows and goes live in 7 days.
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="group inline-flex items-center gap-3 bg-white text-black px-10 py-5 rounded-full text-xs md:text-sm font-bold uppercase tracking-widest hover:scale-105 transition-transform duration-300 shadow-[0_0_40px_rgba(255,255,255,0.15)]"
          >
            Book a Free Demo
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
          <p className="text-xs text-white/20 mt-5">Live in 7 days · Custom AI training included · Dedicated onboarding</p>
        </div>
      </section>

    </div>
  );
}
