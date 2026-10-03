'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ChevronDown, Menu, X, MessageCircle,
  Shield, Zap, HeartHandshake, AlertTriangle,
  Smile, Star, Microscope, Moon, Dumbbell,
} from 'lucide-react';
import siteConfig from '@/data/siteConfig';
import { useBooking } from '@/components/booking/BookingProvider';

// ── Services dropdown items (narrative.md §11 Services table) ────────────
const serviceLinks = [
  { label: 'Preventive Care',               href: '/services/preventive-care',             icon: Shield },
  { label: 'Fillings, Crowns & Root Canal', href: '/services/fillings-crowns-root-canal',  icon: Star },
  { label: 'Early Orthodontics',            href: '/services/early-orthodontics',           icon: ChevronDown },
  { label: 'Dental Emergencies',            href: '/services/dental-emergencies',           icon: AlertTriangle },
  { label: 'Gentle Dentistry & Sedation',   href: '/services/gentle-dentistry-sedation',   icon: HeartHandshake },
  { label: 'Special Needs Dentistry',       href: '/services/special-needs-dentistry',     icon: Smile },
  { label: 'Laser Dentistry',               href: '/services/laser-dentistry',             icon: Zap },
  { label: 'Sleep Dentistry',               href: '/services/sleep-dentistry',             icon: Moon },
  { label: 'Sports Dentistry',              href: '/services/sports-dentistry',            icon: Dumbbell },
  { label: 'Aligners & Braces',             href: '/services/clear-aligners',              icon: Microscope },
];

// ── About dropdown items ─────────────────────────────────────────────────
const aboutLinks = [
  { label: 'About Us',             href: '/about' },
  { label: 'Dr. Bhuvanesswari',    href: '/about#dr-bhuvanesswari' },
  { label: 'Our Approach',         href: '/about#our-approach' },
  { label: 'Videos',               href: '/about#videos' },
];

// ── Dropdown hook (hover with 150ms intent delay + keyboard) ─────────────
function useDropdown() {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef(null);

  const handleMouseEnter = useCallback(() => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setOpen(true), 150);
  }, []);

  const handleMouseLeave = useCallback(() => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setOpen(false), 100);
  }, []);

  const toggle = useCallback(() => setOpen(v => !v), []);
  const close  = useCallback(() => setOpen(false), []);

  // Close on Esc
  useEffect(() => {
    if (!open) return;
    const handler = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open]);

  // Close on outside click
  const ref = useRef(null);
  useEffect(() => {
    if (!open) return;
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  return { open, ref, handleMouseEnter, handleMouseLeave, toggle, close };
}

// ── Desktop Dropdown ─────────────────────────────────────────────────────
function DesktopDropdown({ label, href, links, columns = 1 }) {
  const { open, ref, handleMouseEnter, handleMouseLeave, toggle, close } = useDropdown();

  const btnClass = [
    'flex items-center gap-1 px-3 py-2 rounded-lg text-brand-navy/80 font-body font-medium text-[15px]',
    'hover:text-brand-pink hover:bg-brand-pink/5 transition-colors duration-150',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-navy focus-visible:ring-offset-1',
    open ? 'text-brand-pink' : '',
  ].join(' ');

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {href ? (
        <div className="flex items-center">
          <Link href={href} className={btnClass} onClick={close}>
            {label}
          </Link>
          <button
            onClick={toggle}
            aria-expanded={open}
            aria-haspopup="true"
            className={[
              'flex items-center justify-center p-2 rounded-lg text-brand-navy/80',
              'hover:text-brand-pink hover:bg-brand-pink/5 transition-colors duration-150',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-navy focus-visible:ring-offset-1',
              open ? 'text-brand-pink' : '',
            ].join(' ')}
          >
            <ChevronDown size={15} aria-hidden="true" className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
          </button>
        </div>
      ) : (
        <button
          onClick={toggle}
          aria-expanded={open}
          aria-haspopup="true"
          className={btnClass}
        >
          {label}
          <ChevronDown size={15} aria-hidden="true" className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
        </button>
      )}

      {open && (
        <div
          role="menu"
          className={[
            'absolute top-full left-0 mt-1 py-2 bg-morning-white rounded-card shadow-modal border border-brand-navy/8',
            'z-50 min-w-[220px]',
            columns === 2 ? 'grid grid-cols-2 gap-x-2 min-w-[440px]' : '',
          ].join(' ')}
        >
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                role="menuitem"
                onClick={close}
                className={[
                  'flex items-center gap-3 px-4 py-2.5 text-[14px] font-body text-brand-navy/80',
                  'hover:text-brand-pink hover:bg-brand-pink/5 transition-colors duration-150',
                  'focus-visible:outline-none focus-visible:bg-brand-pink/5 focus-visible:text-brand-pink',
                ].join(' ')}
              >
                {Icon && (
                  <span className="flex items-center justify-center w-7 h-7 rounded-full bg-leaf-mint shrink-0">
                    <Icon size={14} className="text-brand-navy/60" aria-hidden="true" />
                  </span>
                )}
                {link.label}
              </Link>
            );
          })}
          {columns === 2 && (
            <div className="col-span-2 border-t border-brand-navy/8 mt-1 pt-1">
              <Link
                href="/services"
                role="menuitem"
                onClick={close}
                className="flex items-center gap-2 px-4 py-2.5 text-[14px] font-body font-medium text-brand-pink hover:bg-brand-pink/5 transition-colors duration-150"
              >
                See all services
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── Main Header ──────────────────────────────────────────────────────────
export default function Header() {
  const [scrolled,     setScrolled]     = useState(false);
  const [drawerOpen,   setDrawerOpen]   = useState(false);
  const { openBooking } = useBooking();

  // Scrolled state — header compresses and gets shadow
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.classList.toggle('overflow-hidden', drawerOpen);
    return () => document.body.classList.remove('overflow-hidden');
  }, [drawerOpen]);

  // Close drawer on Esc
  useEffect(() => {
    if (!drawerOpen) return;
    const handler = (e) => { if (e.key === 'Escape') setDrawerOpen(false); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [drawerOpen]);

  const waUrl = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(siteConfig.whatsappPrefill)}`;

  return (
    <>
      {/* ── Header bar ──────────────────────────────────────────────────── */}
      <header
        className={[
          'fixed top-0 left-0 right-0 z-50 transition-all duration-200',
          scrolled
            ? 'bg-morning-white/90 backdrop-blur-md shadow-header h-16 md:h-[68px]'
            : 'bg-transparent h-16 md:h-[76px]',
        ].join(' ')}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-8 h-full flex items-center justify-between gap-4">

          {/* Logo */}
          <Link
            href="/"
            aria-label={`${siteConfig.name} — Home`}
            className="shrink-0 flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-navy focus-visible:ring-offset-2 rounded-lg min-h-0 min-w-0"
          >
            <Image
              src={siteConfig.logo}
              alt={siteConfig.name}
              width={48}
              height={48}
              className="h-10 w-auto md:h-12 object-contain"
              priority
            />
          </Link>

          {/* ── Desktop navigation ──────────────────────────────────────── */}
          <nav aria-label="Main navigation" className="hidden md:flex items-center gap-1">
            <Link
              href="/"
              className="px-3 py-2 text-[15px] font-body font-medium text-brand-navy/80 hover:text-brand-pink hover:bg-brand-pink/5 rounded-lg transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-navy focus-visible:ring-offset-1 translate-y-[3px]"
            >
              Home
            </Link>

            <DesktopDropdown label="Services" links={serviceLinks} columns={2} />

            <Link
              href="/first-visit"
              className="px-3 py-2 text-[15px] font-body font-medium text-brand-navy/80 hover:text-brand-pink hover:bg-brand-pink/5 rounded-lg transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-navy focus-visible:ring-offset-1"
            >
              First Visit
            </Link>

            <DesktopDropdown label="About" href="/about" links={aboutLinks} columns={1} />

            <Link
              href="/blog"
              className="px-3 py-2 text-[15px] font-body font-medium text-brand-navy/80 hover:text-brand-pink hover:bg-brand-pink/5 rounded-lg transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-navy focus-visible:ring-offset-1"
            >
              Blog
            </Link>

            <Link
              href="/contact"
              className="px-3 py-2 text-[15px] font-body font-medium text-brand-navy/80 hover:text-brand-pink hover:bg-brand-pink/5 rounded-lg transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-navy focus-visible:ring-offset-1"
            >
              Contact
            </Link>
          </nav>

          {/* ── Desktop right actions ────────────────────────────────────── */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            {/* WhatsApp icon */}
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp the clinic"
              className="flex items-center justify-center w-10 h-10 rounded-full text-brand-navy/70 hover:text-brand-pink hover:bg-brand-pink/5 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-navy focus-visible:ring-offset-1"
            >
              <MessageCircle size={22} aria-hidden="true" />
            </a>

            {/* Book a visit pill */}
            <button
              onClick={() => openBooking()}
              className="px-5 py-2.5 bg-brand-pink text-white font-body font-semibold text-btn rounded-pill hover:bg-[#c41d63] active:bg-[#a8195a] transition-colors duration-150 shadow-sm focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-brand-navy focus-visible:ring-offset-2"
            >
              Book a visit
            </button>
          </div>

          {/* ── Mobile: Book pill + hamburger ────────────────────────────── */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => openBooking()}
              className="px-4 py-2 bg-brand-pink text-white font-body font-semibold text-[14px] rounded-pill hover:bg-[#c41d63] transition-colors duration-150 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-navy focus-visible:ring-offset-2"
            >
              Book
            </button>
            <button
              onClick={() => setDrawerOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={drawerOpen}
              className="flex items-center justify-center w-10 h-10 rounded-lg text-brand-navy hover:bg-brand-navy/5 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-navy focus-visible:ring-offset-1"
            >
              <Menu size={22} aria-hidden="true" />
            </button>
          </div>

        </div>
      </header>

      {/* ── Mobile Drawer ────────────────────────────────────────────────── */}
      {drawerOpen && (
        <>
          {/* Overlay */}
          <div
            className="md:hidden fixed inset-0 z-[60] bg-brand-navy/40 backdrop-blur-sm"
            onClick={() => setDrawerOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer panel */}
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            className={[
              'md:hidden fixed top-0 right-0 bottom-0 z-[70] w-[min(85vw,360px)]',
              'bg-morning-white flex flex-col overflow-y-auto',
              'shadow-modal',
            ].join(' ')}
          >
            {/* Drawer header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-brand-navy/10">
              <Image
                src={siteConfig.logo}
                alt={siteConfig.name}
                width={40}
                height={40}
                className="h-9 w-auto object-contain"
              />
              <button
                onClick={() => setDrawerOpen(false)}
                aria-label="Close navigation menu"
                className="flex items-center justify-center w-10 h-10 rounded-lg text-brand-navy hover:bg-brand-navy/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-navy"
              >
                <X size={22} aria-hidden="true" />
              </button>
            </div>

            {/* Drawer nav items */}
            <nav aria-label="Mobile navigation" className="flex-1 px-4 py-4 space-y-1">
              {[
                { label: 'Home',             href: '/' },
                { label: 'Services',         href: '/services' },
                { label: 'Sleep Dentistry',  href: '/services/sleep-dentistry' },
                { label: 'Sports Dentistry', href: '/services/sports-dentistry' },
                { label: 'First Visit',      href: '/first-visit' },
                { label: 'About',           href: '/about' },
                { label: 'Blog',            href: '/blog' },
                { label: 'Contact',         href: '/contact' },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setDrawerOpen(false)}
                  className="flex items-center px-4 py-3.5 rounded-xl text-brand-navy font-body font-medium text-[16px] hover:bg-brand-pink/5 hover:text-brand-pink transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-navy"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Drawer CTA */}
            <div className="px-4 pb-6 pt-2 border-t border-brand-navy/10 space-y-3">
              <button
                onClick={() => { setDrawerOpen(false); openBooking(); }}
                className="w-full py-3.5 bg-brand-pink text-white font-body font-semibold text-btn rounded-pill hover:bg-[#c41d63] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-navy focus-visible:ring-offset-2"
              >
                Book a visit
              </button>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setDrawerOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-3 border border-brand-navy/20 rounded-pill text-brand-navy font-body font-medium text-btn hover:bg-brand-navy/5 transition-colors duration-150"
              >
                <MessageCircle size={18} aria-hidden="true" />
                WhatsApp us
              </a>
            </div>

            {/* Decorative leaf corner — illustration placeholder */}
            <div
              className="absolute bottom-0 left-0 w-16 h-16 opacity-20 pointer-events-none"
              aria-hidden="true"
            >
              {/* TODO Phase 5: replace with divider-leaf-1 illustration accent */}
              <div className="w-full h-full bg-brand-green rounded-tr-full" />
            </div>
          </div>
        </>
      )}
    </>
  );
}
