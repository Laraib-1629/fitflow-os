"use client";

import React, { useEffect, useRef, useState, ReactNode } from 'react';
import { 
  Activity,
  MessageSquare,
  ArrowUpRight, 
  BarChart3, 
  Smartphone,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  TrendingUp,
  Wallet,
  Target,
  Heart,
  Bot,
  Globe,
  Layout,
  Terminal,
  Zap,
  CheckCircle,
  Menu,
  Play,
  X,
  Sparkles
} from 'lucide-react';

/* -------------------------------------------------------------------------- */
/* COMPONENT: Proximity Glow Card                                             */
/* -------------------------------------------------------------------------- */
const GlowCard = ({ children, className = "" }: { children: ReactNode, className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    ref.current.style.setProperty('--mouse-x', `${x}px`);
    ref.current.style.setProperty('--mouse-y', `${y}px`);
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
          background: 'radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(16,185,129,0.5), transparent 40%)'
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
/* COMPONENT: Realistic Browser Mockup Card                                   */
/* -------------------------------------------------------------------------- */
const WebMockup = ({ 
  brandName, 
  tagline, 
  image, 
  buttonColor 
}: { 
  brandName: string, 
  tagline: string, 
  image: string,
  buttonColor: string
}) => (
  <div className="w-[320px] md:w-[400px] h-[280px] md:h-[350px] shrink-0 rounded-xl overflow-hidden relative group border border-white/10 bg-[#0A0A0A] shadow-2xl flex flex-col cursor-pointer">
    
    <div className="h-8 bg-[#1A1A1A] border-b border-white/5 flex items-center px-3 gap-1.5 shrink-0 z-20">
      <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] opacity-80" />
      <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] opacity-80" />
      <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F] opacity-80" />
      <div className="mx-auto w-1/2 h-4 bg-white/5 rounded-md flex items-center justify-center">
         <span className="text-[8px] text-white/30 font-mono tracking-widest">{brandName.toLowerCase().replace(' ', '')}.com</span>
      </div>
    </div>

    <div className="relative flex-1 w-full overflow-hidden bg-black">
      <img 
        src={image} 
        alt={brandName} 
        className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700" 
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20 transition-opacity duration-500 group-hover:opacity-90" />
      
      <div className="relative z-10 p-6 h-full flex flex-col justify-between">
        <div className="flex justify-between items-center">
          <span className="font-bold text-white tracking-widest uppercase text-[10px] drop-shadow-md">{brandName}</span>
          <div className="hidden sm:flex gap-4 text-[8px] text-white/70 uppercase tracking-widest font-medium">
            <span className="hover:text-white transition-colors">About</span>
            <span className="hover:text-white transition-colors">Classes</span>
            <span className="hover:text-white transition-colors">Contact</span>
          </div>
          <Menu className="w-4 h-4 text-white shadow-sm sm:hidden" />
        </div>
        
        <div className="space-y-4">
          <h3 className="text-2xl md:text-3xl font-medium text-white leading-tight drop-shadow-lg max-w-[85%]">{tagline}</h3>
          <div className="flex gap-3 pt-2">
            <div className={`px-5 py-2.5 rounded-sm text-[10px] font-bold text-white uppercase tracking-widest shadow-lg ${buttonColor}`}>
              Book Class
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

/* -------------------------------------------------------------------------- */
/* MAIN COMPONENT                                                             */
/* -------------------------------------------------------------------------- */
export default function PremiumLanding() {
  const [activeStep, setActiveStep] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 3);
    }, 6000); 
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsModalOpen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const getWheelStyles = (index: number) => {
    if (activeStep === index) {
      return { opacity: 1, transform: 'translateY(0) scale(1)', zIndex: 20 };
    } else if (activeStep > index || (activeStep === 0 && index === 2)) {
      return { opacity: 0, transform: 'translateY(-60px) scale(0.95)', zIndex: 0, pointerEvents: 'none' as const };
    } else {
      return { opacity: 0, transform: 'translateY(60px) scale(0.95)', zIndex: 0, pointerEvents: 'none' as const };
    }
  };

  const mockups = [
    { brandName: "Oasis Yoga", tagline: "Find your center in the city.", image: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?q=80&w=800&auto=format&fit=crop", buttonColor: "bg-emerald-600" },
    { brandName: "Iron Athletics", tagline: "Forged in sweat and chalk.", image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop", buttonColor: "bg-orange-600" },
    { brandName: "Rhythm Dance", tagline: "Move to your own beat.", image: "https://images.unsplash.com/photo-1547153760-18fc86324498?q=80&w=800&auto=format&fit=crop", buttonColor: "bg-fuchsia-600" },
    { brandName: "Core Pilates", tagline: "Strength through control.", image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800&auto=format&fit=crop", buttonColor: "bg-sky-600" },
    { brandName: "Combat Club", tagline: "Leave it on the mat.", image: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?q=80&w=800&auto=format&fit=crop", buttonColor: "bg-white text-black" },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-slate-50 font-sans selection:bg-emerald-500/30 overflow-hidden relative">
      
      {/* Inline Styles */}
      <style dangerouslySetInnerHTML={{__html: `
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
          0%, 100% { transform: translateY(0px) rotate(-6deg); }
          50% { transform: translateY(-20px) rotate(-4deg); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(3deg); }
          50% { transform: translateY(-15px) rotate(5deg); }
        }
        .word-carousel {
          display: inline-block;
          overflow: hidden;
          vertical-align: bottom;
          height: 1.1em;
        }
        .word-carousel-inner {
          display: flex;
          flex-direction: column;
          animation: scroll-words 9s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
        @keyframes scroll-words {
          0%, 25% { transform: translateY(0); }
          33%, 58% { transform: translateY(-33.33%); }
          66%, 91% { transform: translateY(-66.66%); }
          100% { transform: translateY(0); }
        }
        
        @keyframes modal-enter {
          from { opacity: 0; transform: scale(0.95) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-modal-enter {
          animation: modal-enter 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}} />

      {/* INFO DIALOGUE BOX */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
            onClick={() => setIsModalOpen(false)}
          />
          <div className="relative w-full max-w-md bg-[#0A0A0B] border border-white/10 rounded-3xl p-8 shadow-[0_0_80px_rgba(16,185,129,0.15)] overflow-hidden animate-modal-enter text-center">
            <div className="absolute top-[-20%] right-[-20%] w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
            
            <button 
              onClick={() => setIsModalOpen(false)} 
              className="absolute top-6 right-6 text-white/30 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 mx-auto mb-6 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
              <Sparkles className="w-6 h-6 text-emerald-400" />
            </div>
            
            <h3 className="text-2xl font-medium text-white mb-3">Public Beta Rolling Out</h3>
            <p className="text-white/50 text-sm leading-relaxed mb-8">
              We are currently scaling our infrastructure with select private beta studios. Public 30-day free trials will automatically roll out starting in <strong className="text-white font-medium">early October 2026</strong>. Stay tuned!
            </p>
            
            <button 
              onClick={() => setIsModalOpen(false)} 
              className="w-full bg-white text-black font-bold uppercase tracking-widest text-[10px] py-4 rounded-xl hover:bg-emerald-50 transition-colors shadow-lg"
            >
              Got it, thanks
            </button>
          </div>
        </div>
      )}

      {/* Matte Noise Overlay */}
      <div className="fixed inset-0 z-[100] pointer-events-none opacity-[0.015]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />

      {/* Navigation (Fixed Nav Button Size) */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/[0.05] bg-black/40 backdrop-blur-2xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-emerald-600 p-[1px]">
              <div className="w-full h-full bg-black rounded-full flex items-center justify-center">
                <Activity className="w-5 h-5 text-emerald-400" />
              </div>
            </div>
            <span className="text-sm font-medium tracking-[0.2em] uppercase text-white/90">FitFlow OS</span>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="text-[10px] sm:text-xs font-bold tracking-widest uppercase bg-white text-black px-4 sm:px-6 py-2.5 sm:py-3 rounded-full hover:bg-emerald-50 hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)] shrink-0"
          >
            Start Free Trial
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-36 md:pt-48 pb-20 md:pb-32 px-6 min-h-[100vh] flex flex-col items-center justify-center text-center overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-[#050505] to-[#050505]">
        
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-emerald-900/10 rounded-full mix-blend-screen filter blur-[120px] animate-pulse" style={{ animationDuration: '10s' }} />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-indigo-900/10 rounded-full mix-blend-screen filter blur-[150px] animate-pulse" style={{ animationDuration: '15s' }} />

        {/* Desktop Floating Sticker 1 */}
        <div className="absolute top-[15%] lg:left-8 xl:left-[10%] 2xl:left-[15%] animate-[float_6s_ease-in-out_infinite] hidden lg:flex items-center gap-4 bg-white/5 backdrop-blur-2xl border border-white/10 px-5 py-4 rounded-3xl shadow-[0_0_40px_rgba(0,0,0,0.5)] z-0">
          <div className="w-10 h-10 bg-indigo-500/20 rounded-full flex items-center justify-center border border-indigo-500/30 shrink-0">
            <MessageSquare className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-left">
            <div className="text-[10px] text-indigo-300/70 font-semibold uppercase tracking-widest mb-0.5">Automated Booking</div>
            <div className="text-sm font-medium text-white/90">"Book 1 spot for Dance"</div>
          </div>
        </div>


        <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/20 bg-emerald-500/[0.02] backdrop-blur-md mb-6 shadow-lg">
            <Heart className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-medium text-emerald-200/80 tracking-widest uppercase">The Operating System for Creators</span>
          </div>
          
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-medium tracking-tighter mb-6 text-transparent bg-clip-text bg-gradient-to-b from-white via-white/90 to-white/30 leading-[1.1]">
            Run your <br className="md:hidden" />
            <span className="word-carousel text-white">
              <span className="word-carousel-inner">
                <span className="pb-2">fitness</span>
                <span className="pb-2">dance</span>
                <span className="pb-2">wellness</span>
              </span>
            </span> <br className="hidden md:block"/>
            studio, not your phone.
          </h1>
          
          <p className="text-base md:text-xl text-white/40 max-w-2xl mx-auto font-light leading-relaxed mb-8">
            You opened your studio to teach, not to spend 15 hours a week chasing payments and answering booking messages at midnight. Let the agents handle the rest.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="group flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:scale-105 transition-all duration-300 shadow-[0_0_40px_rgba(255,255,255,0.15)]"
            >
              Start Free Trial
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
            <p className="text-xs sm:text-sm font-medium text-white/50 px-4 py-2">
              Sets up in 10 minutes.
            </p>
          </div>

          {/* MOBILE STICKERS ROW (Tighter spacing, optimized for mobile screens) */}
          <div className="flex w-full max-w-xs lg:hidden z-10 px-2">
            <div className="flex items-center gap-3 bg-white/5 backdrop-blur-2xl border border-white/10 px-4 py-3 rounded-2xl shadow-lg">
              <div className="w-8 h-8 bg-indigo-500/20 rounded-full flex items-center justify-center border border-indigo-500/30 shrink-0">
                <MessageSquare className="w-3.5 h-3.5 text-indigo-400" />
              </div>
              <div className="text-left">
                <div className="text-[9px] text-indigo-300/70 font-semibold uppercase tracking-widest">Automated Booking</div>
                <div className="text-xs font-medium text-white/90">"Book 1 spot for Dance"</div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* CAROUSEL WHEEL: The Journey */}
      <section className="relative z-10 border-y border-white/[0.02] bg-black py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-16 relative">
          
          <div className="hidden lg:flex flex-col gap-4 absolute left-0 top-1/2 -translate-y-1/2 z-30">
            {[0, 1, 2].map((step) => (
              <button 
                key={step}
                onClick={() => setActiveStep(step)}
                className={`w-1 transition-all duration-500 rounded-full ${activeStep === step ? 'h-12 bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 'h-4 bg-white/10 hover:bg-white/30'}`}
              />
            ))}
          </div>

          <div className="w-full lg:w-1/2 relative h-[450px] md:h-[500px] pl-0 lg:pl-12">
            <div className="absolute inset-0 flex flex-col justify-center transition-all duration-700 cubic-bezier(0.4, 0, 0.2, 1)" style={getWheelStyles(0)}>
              <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(239,68,68,0.2)]">
                <MessageSquare className="w-6 h-6 text-red-400" />
              </div>
              <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-white mb-4 md:mb-6">Lost in the noise.</h2>
              <p className="text-base md:text-xl text-white/50 font-light leading-relaxed mb-6 md:mb-8">
                Right now, your business lives in endless WhatsApp threads. Late-night cancellation texts, manual price explanations, and forgotten cash payments. You are the bottleneck of your own growth.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-red-500/5 border border-red-500/10 rounded-xl p-4 flex flex-col items-center justify-center text-center">
                  <span className="text-red-400 font-bold text-xl md:text-2xl mb-1">30%</span>
                  <span className="text-[10px] md:text-xs text-white/40 uppercase tracking-widest">No-Show Rate</span>
                </div>
                <div className="bg-red-500/5 border border-red-500/10 rounded-xl p-4 flex flex-col items-center justify-center text-center">
                  <span className="text-red-400 font-bold text-xl md:text-2xl mb-1">15hrs</span>
                  <span className="text-[10px] md:text-xs text-white/40 uppercase tracking-widest">Admin / Week</span>
                </div>
              </div>
            </div>

            <div className="absolute inset-0 flex flex-col justify-center transition-all duration-700 cubic-bezier(0.4, 0, 0.2, 1)" style={getWheelStyles(1)}>
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(99,102,241,0.2)]">
                <Bot className="w-6 h-6 text-indigo-400" />
              </div>
              <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-white mb-4 md:mb-6">The Agents take over.</h2>
              <p className="text-base md:text-xl text-white/50 font-light leading-relaxed mb-6 md:mb-8">
                Deploy an intelligent AI agent that acts as your 24/7 front desk. It converses naturally in local phrasing, instantly checks your live schedule, and secures bookings while you sleep.
              </p>
              <div className="p-4 md:p-6 bg-indigo-500/5 border border-indigo-500/20 rounded-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse" />
                  <span className="text-xs font-mono text-indigo-400 uppercase tracking-widest">Live Inference Pipeline</span>
                </div>
                <div className="space-y-3 font-mono text-xs text-white/60">
                  <div className="flex justify-between items-center"><span className="text-white/40">Input:</span> <span className="text-indigo-200">"bghit nbooki yoga"</span></div>
                  <div className="flex justify-between items-center"><span className="text-white/40">Intent:</span> <span className="text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded">book_class (98%)</span></div>
                  <div className="flex justify-between items-center"><span className="text-white/40">Action:</span> <span className="text-blue-400">check_availability()</span></div>
                </div>
              </div>
            </div>

            <div className="absolute inset-0 flex flex-col justify-center transition-all duration-700 cubic-bezier(0.4, 0, 0.2, 1)" style={getWheelStyles(2)}>
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                <Target className="w-6 h-6 text-emerald-400" />
              </div>
              <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-white mb-4 md:mb-6">Human when needed. Automated everywhere else.</h2>
              <p className="text-base md:text-xl text-white/50 font-light leading-relaxed mb-6 md:mb-8">
                Operations run flawlessly in the background. Post-class payments are dispatched, and analytics are calculated. If a client needs special attention, the system seamlessly escalates to you.
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

          <div className="w-full lg:w-1/2 relative h-[420px] md:h-[500px]">
            <div className="relative h-full w-full max-w-md mx-auto bg-[#0A0A0B]/80 backdrop-blur-3xl border border-white/10 rounded-3xl overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.6)] z-10">
              
              <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-center transition-all duration-700 cubic-bezier(0.4, 0, 0.2, 1)" style={getWheelStyles(0)}>
                  <div className="space-y-4">
                    {[1,2,3].map((i) => (
                      <div key={i} className="flex gap-4 items-center bg-red-900/10 p-4 rounded-xl border border-red-500/20 shadow-lg">
                        <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse shrink-0" />
                        <div>
                          <div className="text-xs text-red-400 font-medium tracking-widest uppercase mb-1">Unread Message</div>
                          <div className="text-sm text-white/80 line-clamp-1">"Hey, do you have spots left?"</div>
                        </div>
                      </div>
                    ))}
                  </div>
              </div>

              <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end transition-all duration-700 cubic-bezier(0.4, 0, 0.2, 1)" style={getWheelStyles(1)}>
                  <div className="flex items-center gap-3 border-b border-white/10 pb-4 mb-4">
                  <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-indigo-400" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">AI Studio Agent</div>
                    <div className="text-xs text-indigo-400 animate-pulse">Operating autonomously...</div>
                  </div>
                </div>
                <div className="space-y-4 mb-4">
                  <div className="flex justify-end">
                    <div className="bg-white/5 border border-white/10 text-white/70 text-sm py-3 px-5 rounded-2xl rounded-tr-sm shadow-md">
                      Bghit nbooki yoga class ghda
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="bg-indigo-600/20 border border-indigo-500/30 text-indigo-100 text-sm py-3 px-5 rounded-2xl rounded-tl-sm backdrop-blur-md shadow-[0_0_20px_rgba(99,102,241,0.2)]">
                      Perfect! I have a Yoga class available tomorrow at 6 PM. Shall I secure your spot?
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-center transition-all duration-700 cubic-bezier(0.4, 0, 0.2, 1)" style={getWheelStyles(2)}>
                  <div className="text-center mb-8">
                    <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto mb-4 drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
                    <div className="text-2xl font-medium text-white mb-2">Operations Nominal</div>
                    <div className="text-sm text-emerald-400/60 font-mono">System monitoring 3 active workflows</div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-5 shadow-lg">
                      <div className="text-xs text-emerald-400/70 uppercase tracking-widest mb-2 font-semibold">Bookings</div>
                      <div className="text-4xl text-emerald-400 font-light">12/12</div>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-xl p-5 shadow-lg">
                      <div className="text-xs text-white/40 uppercase tracking-widest mb-2 font-semibold">Payments</div>
                      <div className="text-4xl text-white font-light">100%</div>
                    </div>
                  </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* INFINITE MARQUEE SECTION */}
      <section id="shipped-with" className="relative z-10 py-20 md:py-32 bg-[#020202] border-t border-white/[0.02] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
          <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-white mb-4 md:mb-6">
            Shipped with FitFlow OS
          </h2>
          <p className="text-base md:text-lg text-white/40 font-light max-w-2xl mx-auto">
            The moment you sign up, our system automatically generates a beautiful, high-converting website completely synchronized with your new WhatsApp booking engine.
          </p>
        </div>

        <div className="relative w-full flex flex-col gap-6">
          <div className="absolute top-0 bottom-0 left-0 w-16 md:w-32 bg-gradient-to-r from-[#020202] to-transparent z-20 pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-16 md:w-32 bg-gradient-to-l from-[#020202] to-transparent z-20 pointer-events-none" />

          {/* Row 1 */}
          <div className="flex w-max animate-scroll-left pause-on-hover gap-6 px-3">
            {[...mockups, ...mockups].map((mockup, idx) => (
              <WebMockup 
                key={`row1-${idx}`} 
                brandName={mockup.brandName} 
                tagline={mockup.tagline} 
                image={mockup.image}
                buttonColor={mockup.buttonColor}
              />
            ))}
          </div>

          {/* Row 2 */}
          <div className="flex w-max animate-scroll-right pause-on-hover gap-6 px-3">
            {[...mockups.reverse(), ...mockups].map((mockup, idx) => (
              <WebMockup 
                key={`row2-${idx}`} 
                brandName={mockup.brandName} 
                tagline={mockup.tagline} 
                image={mockup.image}
                buttonColor={mockup.buttonColor}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section className="relative z-10 py-20 md:py-32 border-t border-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-white mb-4">Built for peace of mind.</h2>
            <p className="text-base md:text-lg text-white/40 font-light max-w-2xl mx-auto">FitFlow OS solves your three biggest headaches instantly.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <GlowCard>
              <Clock className="w-8 h-8 text-indigo-400 mb-6" />
              <h3 className="text-xl font-medium text-white/90 mb-3">Reclaim Your Evenings</h3>
              <p className="text-white/40 text-sm leading-relaxed">
                Your new smart assistant handles all incoming messages, answers questions, and books clients 24/7.
              </p>
            </GlowCard>
            
            <GlowCard>
              <TrendingUp className="w-8 h-8 text-blue-400 mb-6" />
              <h3 className="text-xl font-medium text-white/90 mb-3">End Empty Mats</h3>
              <p className="text-white/40 text-sm leading-relaxed">
                Friendly, automated reminders are sent directly to your clients' WhatsApp 24 hours before class.
              </p>
            </GlowCard>
            
            <GlowCard>
              <Wallet className="w-8 h-8 text-emerald-400 mb-6" />
              <h3 className="text-xl font-medium text-white/90 mb-3">Guaranteed Cash Flow</h3>
              <p className="text-white/40 text-sm leading-relaxed">
                We automatically dispatch secure payment links to attendees, ensuring the money hits your bank account seamlessly.
              </p>
            </GlowCard>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="relative z-10 py-20 md:py-32 px-6 border-t border-white/5">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-white mb-4">Simple, honest pricing.</h2>
          <p className="text-base md:text-lg text-white/40 font-light mb-8 md:mb-12">No hidden fees. No percentage cuts. Just one flat rate for total automation.</p>
          
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-white text-black px-10 py-4 rounded-full text-xs md:text-sm font-bold uppercase tracking-widest hover:scale-105 transition-transform duration-300 shadow-[0_0_30px_rgba(255,255,255,0.2)]"
          >
            Start Your 30-Day Free Trial
          </button>
        </div>
      </section>

    </div>
  );
}