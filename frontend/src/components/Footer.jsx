import React from 'react';
import { BookOpen, Heart, Globe, Mail } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-white">
              <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-amber-400">
                <BookOpen className="w-4 h-4" />
              </div>
              <span className="font-serif-book font-bold text-lg">BookShelf</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Handcrafted full-stack e-book library management system built with MongoDB, Express, React, and Node.js.
            </p>
          </div>

          <div>
            <h4 className="text-white text-xs font-bold tracking-wider uppercase mb-3">Reader Services</h4>
            <ul className="space-y-2 text-xs">
              <li><span className="hover:text-white transition-colors cursor-pointer">Catalog & Book Browsing</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">In-Browser E-Book Reader</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Offline Book Downloads</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Author Biographies</span></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white text-xs font-bold tracking-wider uppercase mb-3">Technology Stack</h4>
            <div className="flex flex-wrap gap-1.5 text-[11px]">
              <span className="px-2 py-0.5 bg-slate-800 text-slate-300 rounded border border-slate-700">MongoDB</span>
              <span className="px-2 py-0.5 bg-slate-800 text-slate-300 rounded border border-slate-700">Express.js</span>
              <span className="px-2 py-0.5 bg-slate-800 text-slate-300 rounded border border-slate-700">React 18</span>
              <span className="px-2 py-0.5 bg-slate-800 text-slate-300 rounded border border-slate-700">Node.js</span>
              <span className="px-2 py-0.5 bg-slate-800 text-slate-300 rounded border border-slate-700">Tailwind CSS</span>
            </div>
          </div>

          <div>
            <h4 className="text-white text-xs font-bold tracking-wider uppercase mb-3">Library Support</h4>
            <p className="text-xs text-slate-400 mb-2 leading-relaxed">
              Open digital knowledge repository for software engineers, designers, and students worldwide.
            </p>
            <div className="text-xs text-slate-400 flex items-center gap-1.5 mt-2">
              <Mail className="w-3.5 h-3.5 text-indigo-400" />
              <span>support@libris-library.org</span>
            </div>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Libris MERN System. All rights reserved.</p>
          <div className="mt-2 sm:mt-0 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span className="text-[11px] font-mono text-emerald-400">Library Services Active</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
