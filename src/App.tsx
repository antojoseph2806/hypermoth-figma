/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Search, MapPin, Menu, ChevronLeft, Share2, Bookmark, ArrowUpRight, X, Apple } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Mock Data ---

const POPULAR_EVENTS = [
  {
    id: 1,
    title: "Mountain Echoes",
    date: "15 Oct 2023",
    location: "Vagamon, Kerala",
    image: "https://picsum.photos/seed/event1/600/800",
    description: "The 12th edition of DIFF will be held from 30 October to 2 November 2023 at the Tibetan Children's Village (TCV) Upper Dharamshala. The four-day event is known for its bold and adventurous programming of feature fiction, documentaries and short films. Alongside film screenings, the festival will hold special programmes with filmmakers, including masterclasses and panel discussions. A curation of food and merchandise stalls will be opened across the venue."
  },
  {
    id: 2,
    title: "Sudan Live",
    date: "22 Oct 2023",
    location: "Kochi, Kerala",
    image: "https://picsum.photos/seed/event2/600/800",
    description: "Experience the soul-stirring music of Sudan in the heart of Kochi. A night dedicated to indie vibes and rhythmic storytelling."
  }
];

const ARTISTS = [
  { id: 1, name: "Ashwin Gopakumar", image: "https://picsum.photos/seed/artist1/200/200" },
  { id: 2, name: "Sudan", image: "https://picsum.photos/seed/artist2/200/200" },
  { id: 3, name: "Achyuth Jaigopal", image: "https://picsum.photos/seed/artist3/200/200" },
  { id: 4, name: "Job Kurian", image: "https://picsum.photos/seed/artist4/200/200" },
];

const ALL_EVENTS = [
  { id: 3, title: "Indie Night", image: "https://picsum.photos/seed/event3/400/500", date: "10 Nov 2023", location: "Bangalore", description: "A night of independent music." },
  { id: 4, title: "Jazz Fest", image: "https://picsum.photos/seed/event4/400/500", date: "12 Nov 2023", location: "Mumbai", description: "Smooth jazz under the stars." },
  { id: 5, title: "Rock On", image: "https://picsum.photos/seed/event5/400/500", date: "15 Nov 2023", location: "Delhi", description: "The ultimate rock experience." },
  { id: 6, title: "Aron Sevilla", image: "https://picsum.photos/seed/event6/400/500", date: "20 Nov 2023", location: "Goa", description: "Electronic beats by the beach." },
];

// --- Components ---

const SideMenu = ({ isOpen, onClose, onLogin, onRegister }: { isOpen: boolean, onClose: () => void, onLogin: () => void, onRegister: () => void }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[210]"
          />
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-[280px] bg-[#0a0f1a] z-[220] p-8 border-l border-white/5"
          >
            <div className="flex justify-end mb-12">
              <button onClick={onClose} className="p-2 bg-white/5 rounded-full">
                <X size={20} className="text-white/60" />
              </button>
            </div>

            <div className="space-y-8">
              <div className="flex flex-col gap-6">
                <button 
                  onClick={() => { onLogin(); onClose(); }}
                  className="text-2xl font-bold text-white hover:text-[#facc15] transition-colors text-left"
                >
                  Login
                </button>
                <button 
                  onClick={() => { onRegister(); onClose(); }}
                  className="text-2xl font-bold text-white hover:text-[#facc15] transition-colors text-left"
                >
                  Register
                </button>
              </div>

              <div className="h-px bg-white/5 w-full" />

              <div className="space-y-4">
                <p className="text-xs uppercase tracking-widest text-white/20">Quick Links</p>
                <div className="flex flex-col gap-4">
                  <button className="text-sm text-white/60 hover:text-white transition-colors text-left">My Bookings</button>
                  <button className="text-sm text-white/60 hover:text-white transition-colors text-left">Favorites</button>
                  <button className="text-sm text-white/60 hover:text-white transition-colors text-left">Settings</button>
                </div>
              </div>
            </div>

            <div className="absolute bottom-12 left-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#facc15] rounded-full flex items-center justify-center">
                  <span className="text-black font-bold">H</span>
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Hyper Moth</p>
                  <p className="text-[10px] text-white/40">v1.0.4</p>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const AuthLayout = ({ children, title, switchText, switchAction, switchLinkText }: { 
  children: React.ReactNode, 
  title: React.ReactNode, 
  switchText: string,
  switchAction: () => void,
  switchLinkText: string
}) => {
  return (
    <motion.div 
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ type: 'spring', damping: 30, stiffness: 300 }}
      className="fixed inset-0 bg-[#0a0f1a] z-[250] overflow-y-auto flex flex-col"
    >
      {/* Background Watermark */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none flex items-center justify-center overflow-hidden">
        <svg viewBox="0 0 100 100" className="w-[150%] h-[150%] text-white rotate-[-15deg]">
          <path d="M50 10 L20 40 L20 60 L50 90 L80 60 L80 40 Z" fill="currentColor" />
        </svg>
      </div>

      <div className="relative z-10 flex flex-col min-h-full px-8 py-12">
        {/* Logo */}
        <div className="flex flex-col items-center gap-4 mb-16">
          <div className="w-16 h-16 text-[#facc15]">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <path d="M50 10 L20 40 L20 60 L50 90 L80 60 L80 40 Z" fill="none" stroke="currentColor" strokeWidth="2" />
              <path d="M50 10 L50 90" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
              <circle cx="50" cy="30" r="2" fill="currentColor" />
              <path d="M35 45 L65 45" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
              <path d="M30 55 L70 55" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
            </svg>
          </div>
          <h1 className="text-xl font-black tracking-[0.2em] text-[#facc15] uppercase">Hyper Moth</h1>
        </div>

        {/* Form Content */}
        <div className="flex-1 flex flex-col items-center">
          <h2 className="text-2xl font-bold text-white mb-12">{title}</h2>
          
          <div className="w-full space-y-6">
            {children}
          </div>

          <div className="mt-12 text-sm">
            <span className="text-white/40">{switchText} </span>
            <button onClick={switchAction} className="text-[#4ade80] font-bold">{switchLinkText}</button>
          </div>
        </div>

        {/* Social Login */}
        <div className="mt-16 text-center">
          <p className="text-[10px] uppercase tracking-widest text-white/20 mb-6">Or continue with</p>
          <div className="flex justify-center gap-6">
            <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg active:scale-90 transition-transform">
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-6 h-6" />
            </button>
            <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg active:scale-90 transition-transform">
              <Apple size={24} className="text-black" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const LoginPage = ({ onBack, onSwitch }: { onBack: () => void, onSwitch: () => void }) => {
  return (
    <AuthLayout 
      title={<>Log <span className="text-[#4ade80]">Back</span> In!</>}
      switchText="Don't Have an Account?"
      switchAction={onSwitch}
      switchLinkText="Sign Up!"
    >
      <div className="space-y-4">
        <div>
          <p className="text-[10px] text-white/40 mb-2 ml-4">Email</p>
          <input 
            type="email" 
            defaultValue="Violet Markey|"
            className="w-full bg-transparent border border-[#facc15]/30 rounded-full px-6 py-4 text-white focus:border-[#facc15] outline-none transition-colors"
          />
        </div>
        <div>
          <p className="text-[10px] text-white/40 mb-2 ml-4">Password</p>
          <input 
            type="password" 
            defaultValue="**********"
            className="w-full bg-transparent border border-[#facc15]/30 rounded-full px-6 py-4 text-white focus:border-[#facc15] outline-none transition-colors"
          />
        </div>
      </div>
      <button onClick={onBack} className="w-full bg-[#facc15] text-black font-bold py-4 rounded-full mt-4 active:scale-95 transition-transform">
        Log In
      </button>
    </AuthLayout>
  );
};

const RegisterPage = ({ onBack, onSwitch }: { onBack: () => void, onSwitch: () => void }) => {
  return (
    <AuthLayout 
      title={<>Let's Sign <span className="text-[#4ade80]">You</span> Up!</>}
      switchText="Already Have an Account?"
      switchAction={onSwitch}
      switchLinkText="Log In"
    >
      <div className="space-y-4">
        <div>
          <p className="text-[10px] text-white/40 mb-2 ml-4">Email</p>
          <input 
            type="email" 
            defaultValue="Violet Markey|"
            className="w-full bg-transparent border border-[#facc15]/30 rounded-full px-6 py-4 text-white focus:border-[#facc15] outline-none transition-colors"
          />
        </div>
        <div>
          <p className="text-[10px] text-white/40 mb-2 ml-4">Password</p>
          <input 
            type="password" 
            defaultValue="**********"
            className="w-full bg-transparent border border-[#facc15]/30 rounded-full px-6 py-4 text-white focus:border-[#facc15] outline-none transition-colors"
          />
        </div>
        <div>
          <p className="text-[10px] text-white/40 mb-2 ml-4">Confirm Password</p>
          <input 
            type="password" 
            placeholder="Confirm Password"
            className="w-full bg-transparent border border-[#facc15]/30 rounded-full px-6 py-4 text-white focus:border-[#facc15] outline-none transition-colors"
          />
        </div>
      </div>
      <button onClick={onBack} className="w-full bg-[#facc15] text-black font-bold py-4 rounded-full mt-4 active:scale-95 transition-transform">
        Sign Up
      </button>
    </AuthLayout>
  );
};

const Header = ({ onMenuClick }: { onMenuClick: () => void }) => (
  <header className="flex items-center justify-between px-6 py-6">
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 bg-[#facc15] rounded-full flex items-center justify-center">
        <span className="text-black font-bold text-lg">H</span>
      </div>
      <span className="text-sm font-black tracking-[0.2em] text-white uppercase">Hyper Moth</span>
    </div>
    <button onClick={onMenuClick} className="p-1">
      <Menu size={28} className="text-[#facc15]" />
    </button>
  </header>
);

const SearchBar = () => (
  <div className="px-6 mb-8">
    <div className="relative flex items-center">
      <Search className="absolute left-4 text-white/40" size={18} />
      <input 
        type="text" 
        placeholder="Upcoming Events" 
        className="w-full bg-white/5 border border-white/10 rounded-full py-3 pl-12 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-white/20 transition-all placeholder:text-white/30"
      />
    </div>
  </div>
);

const SectionHeader = ({ title }: { title: string }) => (
  <div className="px-6 mb-4">
    <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
  </div>
);

const EventCard = ({ event, large = false, onClick }: { event: any, large?: boolean, onClick: () => void }) => (
  <motion.div 
    whileHover={{ scale: 0.98 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className={`relative flex-shrink-0 ${large ? 'w-[280px] h-[380px]' : 'w-full aspect-[3/4]'} rounded-2xl overflow-hidden group cursor-pointer`}
  >
    <img 
      src={event.image} 
      alt={event.title} 
      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      referrerPolicy="no-referrer"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
    {large && (
      <div className="absolute bottom-0 left-0 p-4 w-full">
        <p className="text-[10px] uppercase tracking-widest text-white/60 mb-1">{event.date}</p>
        <h3 className="text-lg font-bold leading-tight">{event.title}</h3>
        <p className="text-xs text-white/40 mt-1">{event.location}</p>
      </div>
    )}
  </motion.div>
);

const ArtistCard = ({ artist }: { artist: any, key?: React.Key }) => (
  <div className="flex flex-col items-center gap-3 flex-shrink-0 w-24">
    <div className="w-24 h-24 rounded-3xl overflow-hidden bg-white/5 border border-white/10">
      <img 
        src={artist.image} 
        alt={artist.name} 
        className="w-full h-full object-cover"
        referrerPolicy="no-referrer"
      />
    </div>
    <p className="text-[11px] font-medium text-center text-white/80 leading-tight line-clamp-2 px-1">
      {artist.name}
    </p>
  </div>
);

const SuccessPage = ({ event, quantity, onConfirm }: { event: any, quantity: number, onConfirm: () => void }) => {
  return (
    <motion.div 
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      className="fixed inset-0 bg-[#0a0f1a] z-[150] overflow-y-auto pb-12"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 sticky top-0 bg-[#0a0f1a]/80 backdrop-blur-md z-50">
        <div className="flex gap-3">
          <button 
            onClick={onConfirm}
            className="flex items-center gap-1 bg-[#1a2235] px-4 py-1.5 rounded-full text-xs font-medium text-white/80"
          >
            <ChevronLeft size={14} />
            Back
          </button>
          <button className="flex items-center gap-1 bg-[#facc15] px-4 py-1.5 rounded-full text-xs font-medium text-black shadow-[0_0_15px_rgba(250,204,21,0.3)]">
            <Share2 size={14} />
            Share
          </button>
        </div>
        <button className="p-1">
          <Menu size={24} className="text-[#facc15]" />
        </button>
      </div>

      {/* Ticket Container */}
      <div className="px-6 mt-8">
        <div className="relative">
          {/* Top Part of Ticket */}
          <div className="bg-gradient-to-br from-[#1a3a3a] to-[#1a2a3a] rounded-t-[40px] p-8 text-center relative overflow-hidden border-x border-t border-white/10">
            {/* Watermark */}
            <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none select-none">
              <span className="text-8xl font-black uppercase tracking-tighter rotate-[-15deg] whitespace-nowrap leading-none">VIP<br/>Pass</span>
            </div>
            
            <div className="relative z-10">
              <p className="text-white/40 text-[10px] uppercase tracking-[0.3em] mb-4 text-right">Hyper Moth</p>
              <h2 className="text-3xl font-bold text-[#facc15] mb-1">{quantity} Tickets</h2>
              <p className="text-lg font-medium text-white/90">{event.title}</p>
            </div>
          </div>
          
          {/* Perforation Line */}
          <div className="flex items-center bg-gradient-to-r from-[#1a3a3a] to-[#1a2a3a] border-x border-white/10 h-10">
            <div className="w-5 h-10 bg-[#0a0f1a] rounded-r-full -ml-2.5" />
            <div className="flex-1 border-t-2 border-dashed border-white/20 mx-3" />
            <div className="w-5 h-10 bg-[#0a0f1a] rounded-l-full -mr-2.5" />
          </div>

          {/* Bottom Part of Ticket */}
          <div className="bg-gradient-to-br from-[#1a3a3a] to-[#1a2a3a] rounded-b-[40px] p-8 border-x border-b border-white/10">
            <div className="space-y-6">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Seat:</p>
                <p className="text-sm font-medium text-[#facc15]">Zone A — Row 3, Seat 12 & 13</p>
              </div>
              
              <div>
                <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Venue:</p>
                <p className="text-sm font-medium text-[#facc15]">{event.location}</p>
              </div>

              <div>
                <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Date & Time:</p>
                <p className="text-sm font-medium text-[#facc15]">Saturday, 14 Dec 2025 | 8:00 PM</p>
              </div>

              {/* QR Code Section */}
              <div className="flex flex-col items-center gap-3 pt-4">
                <div className="bg-white p-2 rounded-xl">
                  <img 
                    src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=HM-92X47" 
                    alt="Ticket QR Code" 
                    className="w-24 h-24"
                  />
                </div>
                <p className="text-[10px] font-mono text-white/40 tracking-widest">X9L3Q7</p>
              </div>

              <div className="flex justify-between items-end pt-4">
                <p className="text-[10px] text-white/40">User Name: Tobey Marshall</p>
                <p className="text-[10px] text-white/40">Ticket ID: HM-92X47</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="mt-8 text-center">
        <p className="text-[10px] text-white/30 tracking-wider">Non-transferable | Valid for single entry</p>
      </div>

      {/* Action Button */}
      <div className="px-6 mt-12 pb-12">
        <button 
          onClick={onConfirm}
          className="w-full bg-[#facc15] text-black font-bold py-4 rounded-full shadow-[0_0_20px_rgba(250,204,21,0.2)] active:scale-95 transition-transform"
        >
          Confirm
        </button>
      </div>
    </motion.div>
  );
};


const FailurePage = ({ onRetry }: { onRetry: () => void }) => {
  return (
    <motion.div 
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      className="fixed inset-0 bg-[#0a0f1a] z-[150] flex flex-col items-center justify-center px-8 text-center"
    >
      <div className="w-24 h-24 bg-red-500/10 rounded-full flex items-center justify-center mb-8 border border-red-500/20">
        <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(239,68,68,0.4)]">
          <span className="text-4xl font-bold">!</span>
        </div>
      </div>
      <h1 className="text-3xl font-bold mb-4">Payment Failed</h1>
      <p className="text-white/60 leading-relaxed mb-12">
        Something went wrong with your transaction. Please check your payment details or try again later.
      </p>
      <div className="w-full space-y-4">
        <button 
          onClick={onRetry}
          className="w-full bg-white text-black font-bold py-4 rounded-full active:scale-95 transition-transform"
        >
          Try Again
        </button>
        <button 
          onClick={onRetry}
          className="w-full bg-white/5 text-white/60 font-medium py-4 rounded-full active:scale-95 transition-transform"
        >
          Back to Home
        </button>
      </div>
    </motion.div>
  );
};

const PaymentPage = ({ event, onBack, onContinue, quantity }: { event: any, onBack: () => void, onContinue: () => void, quantity: number }) => {
  return (
    <motion.div 
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 30, stiffness: 300 }}
      className="fixed inset-0 bg-[#0a0f1a] z-[130] overflow-y-auto pb-32"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 sticky top-0 bg-[#0a0f1a]/80 backdrop-blur-md z-50">
        <button 
          onClick={onBack}
          className="flex items-center gap-1 bg-[#1a2235] px-4 py-1.5 rounded-full text-xs font-medium text-white/80"
        >
          <ChevronLeft size={14} />
          Back
        </button>
        <h2 className="text-sm font-medium text-[#facc15] tracking-wide">Booking Process</h2>
        <button className="p-1">
          <Menu size={24} className="text-[#facc15]" />
        </button>
      </div>

      {/* Event Info Summary */}
      <div className="px-6 mt-8 text-center">
        <h1 className="text-xl font-bold leading-tight px-4">
          {event.title}
        </h1>
        <div className="mt-6 flex flex-col items-center gap-1 text-white/60 text-sm">
          <p>{event.location}</p>
          <div className="flex items-center gap-3">
            <span>{event.date || '14th December 2023'}</span>
            <span className="w-px h-3 bg-white/20" />
            <span>08:00 PM</span>
          </div>
        </div>
      </div>

      {/* Map Pin Icon */}
      <div className="flex justify-end px-6 -mt-4">
        <div className="bg-[#064e3b] p-3 rounded-xl border border-[#065f46]/30">
          <MapPin size={24} className="text-[#facc15]" />
        </div>
      </div>

      {/* Payment Options */}
      <div className="px-6 mt-8 space-y-8">
        <div>
          <p className="text-[10px] uppercase tracking-widest text-white/40 mb-4">Payment Options</p>
          <div className="space-y-3">
            <button className="w-full flex items-center justify-between bg-[#142a24] border border-[#1e3a32]/30 px-5 py-4 rounded-xl group">
              <span className="text-sm font-medium text-white/90">Card</span>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-[#4ade80]">Add</span>
                <div className="text-[#4ade80]">+</div>
              </div>
            </button>
            <button className="w-full flex items-center justify-between bg-[#142a24] border border-[#1e3a32]/30 px-5 py-4 rounded-xl group">
              <span className="text-sm font-medium text-white/90">UPI</span>
              <span className="text-sm font-medium text-[#4ade80]">Select</span>
            </button>
          </div>
        </div>

        {/* Add Coupons */}
        <div className="relative">
          <button className="w-full flex items-center justify-between bg-[#0a0f1a] border border-[#4ade80]/30 px-5 py-4 rounded-xl group">
            <span className="text-sm font-medium text-white/90">Add Coupons</span>
            <div className="text-[#4ade80]">+</div>
          </button>
        </div>

        {/* Terms */}
        <div className="border border-white/5 rounded-xl p-4 bg-white/[0.02]">
          <p className="text-xs font-medium text-white/40">Terms & Conditions</p>
        </div>
      </div>

      {/* Bottom Summary Footer */}
      <div className="fixed bottom-0 left-0 w-full bg-[#0a0f1a]/95 backdrop-blur-xl border-t border-white/5 px-6 py-6 pb-8 z-[140]">
        <div className="space-y-2 mb-6">
          <div className="flex justify-between text-[11px] text-white/60">
            <span>Ticket Quantity</span>
            <span>{quantity}</span>
          </div>
          <div className="flex justify-between text-[11px] text-white/60">
            <span>Coupon Discount</span>
            <span>0</span>
          </div>
          <div className="h-px bg-white/10 my-2" />
          <div className="flex justify-between text-xs font-bold text-white">
            <span>Total Amount</span>
            <span>{quantity * 999}</span>
          </div>
        </div>
        <button 
          onClick={onContinue}
          className="w-full bg-[#facc15] text-black font-bold py-4 rounded-full shadow-[0_0_20px_rgba(250,204,21,0.2)] active:scale-95 transition-transform"
        >
          Continue
        </button>
      </div>
    </motion.div>
  );
};

const BookingPage = ({ event, onBack, onBook }: { event: any, onBack: () => void, onBook: (q: number) => void }) => {
  const [quantity, setQuantity] = useState(0);
  
  return (
    <motion.div 
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ type: 'spring', damping: 30, stiffness: 300 }}
      className="fixed inset-0 bg-[#0a0f1a] z-[110] overflow-y-auto pb-32"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 sticky top-0 bg-[#0a0f1a]/80 backdrop-blur-md z-50">
        <button 
          onClick={onBack}
          className="flex items-center gap-1 bg-[#1a2235] px-4 py-1.5 rounded-full text-xs font-medium text-white/80"
        >
          <ChevronLeft size={14} />
          Back
        </button>
        <h2 className="text-sm font-medium text-[#facc15] tracking-wide">Booking Process</h2>
        <button className="p-1">
          <Menu size={24} className="text-[#facc15]" />
        </button>
      </div>

      {/* Event Info Summary */}
      <div className="px-6 mt-8 text-center">
        <h1 className="text-xl font-bold leading-tight px-4">
          {event.title}
        </h1>
        <div className="mt-6 flex flex-col items-center gap-1 text-white/60 text-sm">
          <p>{event.location}</p>
          <div className="flex items-center gap-3">
            <span>{event.date || '14th December 2023'}</span>
            <span className="w-px h-3 bg-white/20" />
            <span>08:00 PM</span>
          </div>
        </div>
      </div>

      {/* Map Pin Icon */}
      <div className="flex justify-end px-6 -mt-4">
        <div className="bg-[#064e3b] p-3 rounded-xl border border-[#065f46]/30">
          <MapPin size={24} className="text-[#facc15]" />
        </div>
      </div>

      {/* Ticket Sections */}
      <div className="px-6 mt-8 space-y-8">
        {/* Section 1 */}
        <div>
          <p className="text-[10px] uppercase tracking-widest text-white/40 mb-4">General Access</p>
          <div className="space-y-3">
            <button 
              onClick={() => setQuantity(q => q + 1)}
              className="w-full flex items-center justify-between bg-[#142a24] border border-[#1e3a32]/30 px-5 py-4 rounded-xl group"
            >
              <span className="text-sm font-medium text-white/90">Phase 1 | GA | Single Pass</span>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-white/60">INR 999</span>
                <div className="text-[#4ade80]">+</div>
              </div>
            </button>
            <div className="w-full flex items-center justify-between bg-[#2a1414] border border-[#3a1e1e]/30 px-5 py-4 rounded-xl opacity-60">
              <span className="text-sm font-medium text-white/90">Early Bird | GA | Single Pass</span>
              <span className="text-sm font-medium text-[#ef4444]">Sold Out</span>
            </div>
          </div>
        </div>

        {/* Section 2 */}
        <div>
          <p className="text-[10px] uppercase tracking-widest text-white/40 mb-4">General Access</p>
          <div className="space-y-3">
            <button 
              onClick={() => setQuantity(q => q + 1)}
              className="w-full flex items-center justify-between bg-[#142a24] border border-[#1e3a32]/30 px-5 py-4 rounded-xl group"
            >
              <span className="text-sm font-medium text-white/90">Phase 1 | Fanpit | Single Pass</span>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-white/60">INR 1499</span>
                <div className="text-[#4ade80]">+</div>
              </div>
            </button>
            <div className="w-full flex items-center justify-between bg-[#2a1414] border border-[#3a1e1e]/30 px-5 py-4 rounded-xl opacity-60">
              <span className="text-sm font-medium text-white/90">Early Bird | GA | Single Pass</span>
              <span className="text-sm font-medium text-[#ef4444]">Sold Out</span>
            </div>
          </div>
        </div>

        {/* Terms */}
        <div className="border border-white/5 rounded-xl p-4 bg-white/[0.02]">
          <p className="text-xs font-medium text-white/40">Terms & Conditions</p>
        </div>
      </div>

      {/* Bottom Summary Footer */}
      <div className="fixed bottom-0 left-0 w-full bg-[#0a0f1a]/95 backdrop-blur-xl border-t border-white/5 px-6 py-6 pb-8 z-[120]">
        <div className="space-y-2 mb-6">
          <div className="flex justify-between text-[11px] text-white/60">
            <span>Ticket Quantity</span>
            <span>{quantity}</span>
          </div>
          <div className="flex justify-between text-[11px] text-white/60">
            <span>Coupon Discount</span>
            <span>0</span>
          </div>
          <div className="h-px bg-white/10 my-2" />
          <div className="flex justify-between text-xs font-bold text-white">
            <span>Total Amount</span>
            <span>{quantity * 999}</span>
          </div>
        </div>
        <button 
          onClick={() => onBook(quantity)}
          className="w-full bg-[#facc15] text-black font-bold py-4 rounded-full shadow-[0_0_20px_rgba(250,204,21,0.2)] active:scale-95 transition-transform"
        >
          Book
        </button>
      </div>
    </motion.div>
  );
};

const EventDetails = ({ event, onBack, onBook }: { event: any, onBack: () => void, onBook: () => void }) => (
  <motion.div 
    initial={{ x: '100%' }}
    animate={{ x: 0 }}
    exit={{ x: '100%' }}
    transition={{ type: 'spring', damping: 25, stiffness: 200 }}
    className="fixed inset-0 bg-[#0a0a0a] z-[100] overflow-y-auto pb-12"
  >
    {/* Top Bar */}
    <div className="flex items-center justify-between px-6 py-4 sticky top-0 bg-[#0a0a0a]/80 backdrop-blur-md z-50">
      <div className="flex gap-3">
        <button 
          onClick={onBack}
          className="flex items-center gap-1 bg-[#451a1a] px-4 py-1.5 rounded-full text-xs font-medium text-[#ff4d4d]"
        >
          <ChevronLeft size={14} />
          Back
        </button>
        <button className="flex items-center gap-1 bg-[#e11d48] px-4 py-1.5 rounded-full text-xs font-medium">
          <Share2 size={14} />
          Share
        </button>
      </div>
      <button className="p-1">
        <Menu size={24} />
      </button>
    </div>

    {/* Poster */}
    <div className="px-6 mt-4">
      <div className="w-full aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
        <img 
          src={event.image} 
          alt={event.title} 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>
    </div>

    {/* Title & Bookmark */}
    <div className="px-6 mt-8 flex items-start justify-between">
      <h1 className="text-2xl font-bold leading-tight max-w-[80%]">
        {event.title}
      </h1>
      <button 
        onClick={onBook}
        className="bg-[#e11d48] p-3 rounded-xl shadow-[0_0_15px_rgba(225,29,72,0.3)]"
      >
        <Bookmark size={20} fill="currentColor" />
      </button>
    </div>

    {/* Date & Location */}
    <div className="px-6 mt-6 space-y-6">
      <div>
        <p className="text-[10px] uppercase tracking-widest text-white/40 mb-2">Date & Time</p>
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium">{event.date || '30 October - 02 November 2023'}</p>
          <div className="w-px h-4 bg-white/10" />
          <p className="text-sm font-medium">09:00 AM</p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="max-w-[80%]">
          <p className="text-[10px] uppercase tracking-widest text-white/40 mb-2">Location</p>
          <p className="text-sm font-medium leading-relaxed">
            {event.location}, India
          </p>
        </div>
        <button className="bg-[#e11d48] p-3 rounded-xl shadow-[0_0_15px_rgba(225,29,72,0.3)]">
          <MapPin size={20} fill="currentColor" />
        </button>
      </div>
    </div>

    {/* Tickets/Dates */}
    <div className="px-6 mt-8 space-y-3">
      <p className="text-[10px] uppercase tracking-widest text-white/40 mb-4">Tickets</p>
      {['30/10/23', '31/10/23', '01/11/23', '02/11/23'].map((date, idx) => (
        <button 
          key={idx}
          onClick={onBook}
          className="w-full flex items-center justify-between bg-[#1a2a1a] border border-[#2d4d2d]/30 px-5 py-4 rounded-xl group hover:bg-[#223a22] transition-colors"
        >
          <span className="text-sm font-medium text-[#4ade80]">{date}</span>
          <ArrowUpRight size={18} className="text-[#4ade80] opacity-60 group-hover:opacity-100 transition-opacity" />
        </button>
      ))}
    </div>

    {/* Description */}
    <div className="px-6 mt-10">
      <p className="text-[10px] uppercase tracking-widest text-white/40 mb-4">Description</p>
      <p className="text-sm text-white/60 leading-relaxed">
        {event.description}
      </p>
    </div>

    {/* Terms */}
    <div className="px-6 mt-8">
      <div className="border border-white/10 rounded-xl p-4">
        <p className="text-xs font-medium text-white/80">Terms & Conditions</p>
      </div>
    </div>

    {/* Footer */}
    <div className="mt-12 flex flex-col items-center gap-2 opacity-20">
      <p className="text-[10px] tracking-[0.3em] font-bold">WYW EVENTS</p>
    </div>
  </motion.div>
);

const Preloader = () => {
  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 bg-[#eab308] z-[200] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background Patterns */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-64 h-64 rotate-[-15deg]">
          <svg viewBox="0 0 24 24" fill="black" className="w-full h-full"><path d="M12 2L4.5 20.29L5.21 21L12 18L18.79 21L19.5 20.29L12 2Z" /></svg>
        </div>
        <div className="absolute bottom-[-5%] right-[-5%] w-80 h-80 rotate-[25deg]">
          <svg viewBox="0 0 24 24" fill="black" className="w-full h-full"><path d="M12 2L4.5 20.29L5.21 21L12 18L18.79 21L19.5 20.29L12 2Z" /></svg>
        </div>
        <div className="absolute top-[20%] right-[-15%] w-48 h-48 rotate-[10deg]">
          <svg viewBox="0 0 24 24" fill="black" className="w-full h-full"><path d="M12 2L4.5 20.29L5.21 21L12 18L18.79 21L19.5 20.29L12 2Z" /></svg>
        </div>
      </div>

      {/* Logo Content */}
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="relative z-10 flex flex-col items-center gap-6"
      >
        {/* Moth Icon */}
        <div className="w-24 h-24 relative">
          <svg viewBox="0 0 100 100" className="w-full h-full text-black">
            <path d="M50 10 L20 40 L20 60 L50 90 L80 60 L80 40 Z" fill="none" stroke="currentColor" strokeWidth="2" />
            <path d="M50 10 L50 90" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
            <circle cx="50" cy="30" r="2" fill="currentColor" />
            <path d="M35 45 L65 45" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
            <path d="M30 55 L70 55" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
            <path d="M40 25 L50 10 L60 25" fill="none" stroke="currentColor" strokeWidth="1" />
            <path d="M20 40 Q50 30 80 40" fill="none" stroke="currentColor" strokeWidth="1" />
            <path d="M20 60 Q50 70 80 60" fill="none" stroke="currentColor" strokeWidth="1" />
          </svg>
        </div>
        
        {/* Text Logo */}
        <h1 className="text-3xl font-black tracking-[0.15em] text-black uppercase">
          Hyper Moth
        </h1>
      </motion.div>

      {/* Loading Bar */}
      <div className="absolute bottom-20 w-48 h-1 bg-black/10 rounded-full overflow-hidden">
        <motion.div 
          initial={{ x: "-100%" }}
          animate={{ x: "0%" }}
          transition={{ duration: 2, ease: "easeInOut" }}
          className="w-full h-full bg-black"
        />
      </div>
    </motion.div>
  );
};

export default function App() {
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [isBooking, setIsBooking] = useState(false);
  const [isPayment, setIsPayment] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFailure, setIsFailure] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [bookingQuantity, setBookingQuantity] = useState(0);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const handleBook = (q: number) => {
    setBookingQuantity(q);
    setIsPayment(true);
  };

  const handlePaymentContinue = () => {
    // Simulate a random outcome for demo purposes
    if (Math.random() > 0.2) {
      setIsSuccess(true);
    } else {
      setIsFailure(true);
    }
  };

  const resetFlow = () => {
    setIsSuccess(false);
    setIsFailure(false);
    setIsPayment(false);
    setIsBooking(false);
    setSelectedEvent(null);
  };

  return (
    <div className="min-h-screen pb-12">
      <AnimatePresence>
        {loading && <Preloader key="preloader" />}
      </AnimatePresence>

      <Header onMenuClick={() => setIsMenuOpen(true)} />
      
      <main className="pt-4">
        <SearchBar />

        {/* Popular Section */}
        <section className="mb-10">
          <SectionHeader title="Popular" />
          <div className="flex gap-4 overflow-x-auto px-6 scrollbar-hide snap-x snap-mandatory">
            {POPULAR_EVENTS.map(event => (
              <div key={event.id} className="snap-center">
                <EventCard 
                  event={event} 
                  large 
                  onClick={() => setSelectedEvent(event)}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Popular Artists Section */}
        <section className="mb-10">
          <SectionHeader title="Popular Artists" />
          <div className="flex gap-5 overflow-x-auto px-6 scrollbar-hide">
            {ARTISTS.map(artist => (
              <ArtistCard key={artist.id} artist={artist} />
            ))}
          </div>
        </section>

        {/* All Events Section */}
        <section>
          <SectionHeader title="All Events" />
          <div className="flex gap-4 overflow-x-auto px-6 scrollbar-hide snap-x snap-mandatory">
            {ALL_EVENTS.map(event => (
              <div key={event.id} className="snap-center min-w-[160px]">
                <EventCard 
                  event={event} 
                  onClick={() => setSelectedEvent(event)}
                />
              </div>
            ))}
          </div>
        </section>
      </main>

      <SideMenu 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)}
        onLogin={() => setIsLoginOpen(true)}
        onRegister={() => setIsRegisterOpen(true)}
      />

      <AnimatePresence>
        {isLoginOpen && (
          <LoginPage 
            onBack={() => setIsLoginOpen(false)} 
            onSwitch={() => { setIsLoginOpen(false); setIsRegisterOpen(true); }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isRegisterOpen && (
          <RegisterPage 
            onBack={() => setIsRegisterOpen(false)} 
            onSwitch={() => { setIsRegisterOpen(false); setIsLoginOpen(true); }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedEvent && (
          <EventDetails 
            event={selectedEvent} 
            onBack={() => setSelectedEvent(null)} 
            onBook={() => setIsBooking(true)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isBooking && selectedEvent && (
          <BookingPage 
            event={selectedEvent} 
            onBack={() => setIsBooking(false)} 
            onBook={handleBook}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isPayment && selectedEvent && (
          <PaymentPage 
            event={selectedEvent} 
            quantity={bookingQuantity}
            onBack={() => setIsPayment(false)} 
            onContinue={handlePaymentContinue}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isSuccess && selectedEvent && (
          <SuccessPage 
            event={selectedEvent} 
            quantity={bookingQuantity}
            onConfirm={resetFlow}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isFailure && (
          <FailurePage 
            onRetry={() => setIsFailure(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}




