"use client";

import GridShape from "@/components/common/GridShape";
/* import ThemeTogglerTwo from "@/components/common/ThemeTogglerTwo"; */

import { ThemeProvider } from "@/context/ThemeContext";
import React from "react";

function EmployeeBadgeAnimation() {
  return (
    <div className="relative z-10">
      <div className="card-float relative h-72 w-[420px] [perspective:1200px]">
        <div className="card-tilt relative h-full w-full rounded-[28px] border border-white/30 bg-white/90 shadow-[0_20px_60px_rgba(0,0,0,0.12)] backdrop-blur">
          <div className="absolute inset-0 overflow-hidden rounded-[28px]">
            <div className="card-shimmer absolute -left-1/2 top-0 h-full w-1/2 bg-gradient-to-r from-transparent via-white/70 to-transparent opacity-60" />
          </div>

          <div className="relative flex h-full flex-col justify-between p-7">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold">
                  GE
                </div>
                <div>
                  <div className="text-[10px] font-bold tracking-[0.2em] text-blue-600 uppercase">Gestion · Employé</div>
                  <div className="mt-0.5 text-base font-bold tracking-tight text-slate-900">Badge Numérique</div>
                </div>
              </div>
              <div className="nfc-pulse relative h-8 w-8 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                <div className="h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
              </div>
            </div>

            <div className="flex items-center gap-5 mt-4">
              <div className="h-20 w-20 rounded-2xl bg-slate-200 border-2 border-white shadow-sm overflow-hidden flex-shrink-0">
                <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                  <svg className="w-12 h-12 text-slate-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                </div>
              </div>
              <div className="flex-1">
                <div className="text-xl font-bold text-slate-900 leading-tight">Jean Dupont</div>
                <div className="text-sm font-medium text-blue-600">Développeur Senior</div>
                <div className="mt-1 text-xs text-slate-500 flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
                  Présent · Tech Dept.
                </div>
              </div>
            </div>

            <div className="flex items-end justify-between border-t border-slate-100 pt-4 mt-auto">
              <div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">ID Matricule</div>
                <div className="text-sm font-mono font-medium text-slate-700 mt-0.5">EMP-2024-0892</div>
              </div>
              <div className="h-12 w-12 rounded-xl bg-slate-100 p-2 opacity-50">
                <svg className="w-full h-full text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 grid grid-cols-3 gap-4 text-center text-xs text-slate-700">
        <div className="rounded-2xl border border-white/40 bg-white/70 px-4 py-3.5 shadow-sm backdrop-blur-md flex flex-col items-center gap-1 hover:bg-white/80 transition-colors">
          <span className="text-blue-600 font-bold">124</span>
          <span className="font-medium">Employés</span>
        </div>
        <div className="rounded-2xl border border-white/40 bg-white/70 px-4 py-3.5 shadow-sm backdrop-blur-md flex flex-col items-center gap-1 hover:bg-white/80 transition-colors">
          <span className="text-emerald-600 font-bold">92%</span>
          <span className="font-medium">Présences</span>
        </div>
        <div className="rounded-2xl border border-white/40 bg-white/70 px-4 py-3.5 shadow-sm backdrop-blur-md flex flex-col items-center gap-1 hover:bg-white/80 transition-colors">
          <span className="text-purple-600 font-bold">12</span>
          <span className="font-medium">Congés</span>
        </div>
      </div>

      <style jsx>{`
        .card-float {
          animation: cardFloat 6s ease-in-out infinite;
        }
        .card-tilt {
          transform: rotateX(10deg) rotateY(-16deg);
          transform-style: preserve-3d;
          animation: cardTilt 7.5s ease-in-out infinite;
        }
        .card-shimmer {
          transform: skewX(-12deg);
          animation: shimmer 3.5s ease-in-out infinite;
        }
        .nfc-pulse::after {
          content: '';
          position: absolute;
          inset: -8px;
          border-radius: 50%;
          border: 1px solid rgba(37, 99, 235, 0.4);
          animation: nfcPulse 2.4s ease-out infinite;
        }
        @keyframes cardFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes cardTilt {
          0%, 100% { transform: rotateX(10deg) rotateY(-16deg); }
          50% { transform: rotateX(6deg) rotateY(-10deg); }
        }
        @keyframes shimmer {
          0% { transform: translateX(-120%) skewX(-12deg); opacity: 0; }
          20% { opacity: 0.5; }
          50% { transform: translateX(220%) skewX(-12deg); opacity: 0; }
          100% { transform: translateX(220%) skewX(-12deg); opacity: 0; }
        }
        @keyframes nfcPulse {
          0% { transform: scale(0.9); opacity: 0; }
          30% { opacity: 1; }
          100% { transform: scale(1.4); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative w-full h-screen flex flex-col lg:flex-row">
      <ThemeProvider>
        {/* Partie gauche : formulaire */}
        <div className="lg:w-1/2 w-full flex items-center justify-center p-6 bg-white dark:bg-gray-900">
          {children}
        </div>

        {/* Partie droite : gradient doux animé */}
        <div className="lg:w-1/2 w-full relative hidden lg:flex items-center justify-center overflow-hidden">
          {/* Gradient animé adouci */}
          <div className="absolute inset-0 animate-gradient bg-gradient-to-tr from-blue-200 via-indigo-200 to-purple-200 bg-[length:400%_400%]"></div>

          {/* Formes SVG flottantes */}
          <svg
            className="absolute w-full h-full"
            viewBox="0 0 200 200" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle className="float1" cx="50" cy="50" r="50" fill="rgba(255,255,255,0.15)" />
            <circle className="float2" cx="150" cy="150" r="40" fill="rgba(255,255,255,0.1)" />
            <circle className="float3" cx="120" cy="80" r="30" fill="rgba(255,255,255,0.08)" />
          </svg>

          {/* Grid shapes si besoin */}
          <GridShape />

          <EmployeeBadgeAnimation />
        </div>


        
      </ThemeProvider>

      {/* Animations CSS */}
      <style jsx>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          animation: gradientShift 20s ease infinite;
        }

        @keyframes float1Anim {
          0% { transform: translate(0,0) rotate(0deg); }
          50% { transform: translate(15px,-10px) rotate(45deg); }
          100% { transform: translate(0,0) rotate(0deg); }
        }
        @keyframes float2Anim {
          0% { transform: translate(0,0) rotate(0deg); }
          50% { transform: translate(-10px,10px) rotate(-30deg); }
          100% { transform: translate(0,0) rotate(0deg); }
        }
        @keyframes float3Anim {
          0% { transform: translate(0,0) rotate(0deg); }
          50% { transform: translate(8px,15px) rotate(60deg); }
          100% { transform: translate(0,0) rotate(0deg); }
        }

        .float1 { animation: float1Anim 8s ease-in-out infinite; }
        .float2 { animation: float2Anim 10s ease-in-out infinite; }
        .float3 { animation: float3Anim 12s ease-in-out infinite; }
      `}</style>
    </div>
  );
}
