import React, { useState, useEffect, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, Sun, Moon, Coffee, Download, Maximize, Minimize, Volume2, BookOpen } from 'lucide-react';
import { useLibrary } from '../context/LibraryContext';

export const BookReaderModal = () => {
  const { activeReaderBook, closeReader, downloadBook } = useLibrary();

  const [currentChapterIdx, setCurrentChapterIdx] = useState(0);
  const [theme, setTheme] = useState('sepia'); // 'light', 'sepia', 'dark', 'charcoal'
  const [fontSize, setFontSize] = useState('text-lg'); // 'text-base', 'text-lg', 'text-xl'
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const [isNarrating, setIsNarrating] = useState(false);
  const contentContainerRef = useRef(null);

  useEffect(() => {
    setCurrentChapterIdx(0);
    setReadingProgress(0);
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    setIsNarrating(false);
  }, [activeReaderBook]);

  if (!activeReaderBook) return null;

  const chapters = activeReaderBook.chapters && activeReaderBook.chapters.length > 0
    ? activeReaderBook.chapters
    : [
        {
          title: 'Full Book Overview & Sample Excerpt',
          content: `${activeReaderBook.description}\n\nFull publication available in library archives.\nAuthor: ${activeReaderBook.author?.name || 'Authorized Contributor'}\nISBN: ${activeReaderBook.isbn}\nYear: ${activeReaderBook.publishedYear}`,
        },
      ];

  const currentChapter = chapters[currentChapterIdx] || chapters[0];
  const totalChapters = chapters.length;

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    const total = scrollHeight - clientHeight;
    if (total > 0) {
      setReadingProgress(Math.min(100, Math.round((scrollTop / total) * 100)));
    }
  };

  const toggleNarration = () => {
    if (!('speechSynthesis' in window)) return;

    if (isNarrating) {
      window.speechSynthesis.cancel();
      setIsNarrating(false);
    } else {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(currentChapter.content);
      utterance.rate = 0.95;
      utterance.pitch = 1.0;
      utterance.onend = () => setIsNarrating(false);
      utterance.onerror = () => setIsNarrating(false);
      window.speechSynthesis.speak(utterance);
      setIsNarrating(true);
    }
  };

  const handleClose = () => {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    setIsNarrating(false);
    closeReader();
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
        setIsFullscreen(false);
      }
    }
  };

  const getThemeWrapperClass = () => {
    switch (theme) {
      case 'dark':
        return 'theme-dark';
      case 'charcoal':
        return 'theme-charcoal';
      case 'sepia':
        return 'theme-sepia';
      case 'light':
      default:
        return 'theme-ivory';
    }
  };

  return (
    <div className={`fixed inset-0 z-50 flex flex-col ${getThemeWrapperClass()} animate-fadeIn`}>
      
      {/* Top Reading Scroll Progress Bar */}
      <div className="h-1 bg-black/10 w-full">
        <div 
          className="h-full bg-amber-500 transition-all duration-150"
          style={{ width: `${readingProgress}%` }}
        ></div>
      </div>

      {/* Top Reader Navigation Bar */}
      <div className="px-6 py-3 border-b border-black/10 flex items-center justify-between text-xs backdrop-blur-md">
        
        {/* Book & Chapter Details */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleClose}
            className="p-1.5 px-3 rounded-xl bg-black/5 hover:bg-black/10 font-bold transition-colors flex items-center gap-1.5"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Exit</span>
          </button>
          <div>
            <h3 className="font-serif-display font-bold text-sm truncate max-w-xs">{activeReaderBook.title}</h3>
            <p className="text-[10px] opacity-75">{activeReaderBook.author?.name || 'Author'} • {readingProgress}% read</p>
          </div>
        </div>

        {/* Middle: Chapter Navigation Pills */}
        {chapters.length > 1 && (
          <div className="hidden md:flex items-center gap-1.5 bg-black/5 p-1 rounded-xl">
            {chapters.map((ch, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setCurrentChapterIdx(idx);
                  if (contentContainerRef.current) contentContainerRef.current.scrollTop = 0;
                }}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  currentChapterIdx === idx ? 'bg-black/15 font-bold shadow-xs' : 'opacity-70 hover:opacity-100'
                }`}
              >
                Ch. {idx + 1}
              </button>
            ))}
          </div>
        )}

        {/* Right Controls: Audio Narration, Themes, Fonts & Download */}
        <div className="flex items-center gap-2">
          
          {/* Audiobook Narration */}
          <button
            onClick={toggleNarration}
            className={`px-2.5 py-1.5 rounded-xl text-[11px] font-bold flex items-center gap-1.5 transition-colors ${
              isNarrating ? 'bg-amber-500 text-slate-950 shadow-xs' : 'bg-black/5 hover:bg-black/10'
            }`}
            title="Listen to Chapter (Audio Reader)"
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{isNarrating ? 'Narrating' : 'Listen'}</span>
            {isNarrating && (
              <div className="flex items-center gap-0.5">
                <span className="eq-bar"></span>
                <span className="eq-bar"></span>
                <span className="eq-bar"></span>
              </div>
            )}
          </button>

          {/* Theme Selector */}
          <div className="flex items-center bg-black/5 p-0.5 rounded-xl">
            <button
              onClick={() => setTheme('sepia')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold ${theme === 'sepia' ? 'bg-amber-100 text-amber-900 shadow-xs' : 'opacity-70'}`}
            >
              Sepia
            </button>
            <button
              onClick={() => setTheme('light')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold ${theme === 'light' ? 'bg-white text-slate-900 shadow-xs' : 'opacity-70'}`}
            >
              Day
            </button>
            <button
              onClick={() => setTheme('dark')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold ${theme === 'dark' ? 'bg-slate-900 text-white shadow-xs' : 'opacity-70'}`}
            >
              Night
            </button>
          </div>

          {/* Font Size Adjuster */}
          <div className="flex items-center bg-black/5 p-0.5 rounded-xl font-mono-code text-[11px]">
            <button
              onClick={() => setFontSize('text-base')}
              className={`px-2 py-1 rounded-lg ${fontSize === 'text-base' ? 'bg-black/15 font-bold' : 'opacity-70'}`}
            >
              A-
            </button>
            <button
              onClick={() => setFontSize('text-xl')}
              className={`px-2 py-1 rounded-lg ${fontSize === 'text-xl' ? 'bg-black/15 font-bold' : 'opacity-70'}`}
            >
              A+
            </button>
          </div>

          {/* Fullscreen */}
          <button
            onClick={toggleFullscreen}
            className="hidden sm:block p-2 bg-black/5 hover:bg-black/10 rounded-xl transition-colors"
            title="Fullscreen"
          >
            {isFullscreen ? <Minimize className="w-3.5 h-3.5" /> : <Maximize className="w-3.5 h-3.5" />}
          </button>

          {/* Download */}
          <button
            onClick={() => downloadBook(activeReaderBook)}
            title="Download offline copy"
            className="p-2 bg-black/5 hover:bg-black/10 rounded-xl transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
          </button>

        </div>

      </div>

      {/* Reader Scrollable Main Content */}
      <div 
        ref={contentContainerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto p-6 md:p-12 flex justify-center"
      >
        <div className="reader-page-box max-w-3xl w-full p-8 md:p-16 rounded-3xl shadow-xl border space-y-8 min-h-full">
          
          <div className="space-y-6">
            <div className="border-b border-black/10 pb-6 text-center space-y-2">
              <span className="text-[11px] font-mono-code uppercase tracking-widest opacity-60">
                Chapter {currentChapterIdx + 1} of {totalChapters}
              </span>
              <h2 className="font-serif-display font-bold text-2xl sm:text-3xl">
                {currentChapter.title}
              </h2>
            </div>

            <div className={`${fontSize} font-serif-reading leading-relaxed whitespace-pre-line tracking-normal space-y-4`}>
              {currentChapter.content}
            </div>

            {/* Next / Previous Chapter navigation at the bottom of the page */}
            <div className="pt-12 border-t border-black/10 flex items-center justify-between text-xs font-bold">
              <button
                disabled={currentChapterIdx === 0}
                onClick={() => {
                  setCurrentChapterIdx(prev => prev - 1);
                  if (contentContainerRef.current) contentContainerRef.current.scrollTop = 0;
                }}
                className={`px-4 py-2 rounded-xl bg-black/5 hover:bg-black/10 transition-colors flex items-center gap-1.5 ${
                  currentChapterIdx === 0 ? 'opacity-30 cursor-not-allowed' : ''
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous Chapter</span>
              </button>

              <button
                disabled={currentChapterIdx >= totalChapters - 1}
                onClick={() => {
                  setCurrentChapterIdx(prev => prev + 1);
                  if (contentContainerRef.current) contentContainerRef.current.scrollTop = 0;
                }}
                className={`px-4 py-2 rounded-xl bg-black/5 hover:bg-black/10 transition-colors flex items-center gap-1.5 ${
                  currentChapterIdx >= totalChapters - 1 ? 'opacity-30 cursor-not-allowed' : ''
                }`}
              >
                <span>Next Chapter</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};
