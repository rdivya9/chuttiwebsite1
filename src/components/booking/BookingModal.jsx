'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { X, ChevronLeft, ChevronDown, Loader2, MessageCircle } from 'lucide-react';
import IllustrationImage from '@/components/ui/IllustrationImage';
import siteConfig from '@/data/siteConfig';

// ── Constants ────────────────────────────────────────────────────────────
const AGE_GROUPS   = ['Under 1', '1–3', '4–6', '7–12', '13–18'];
const REASONS      = [
  'First visit / check-up',
  'Tooth pain or cavity',
  'Injury to tooth',
  'Aligners / crooked teeth',
  'Habits (thumb-sucking etc.)',
  'Special healthcare needs',
  'Other',
];
const TIME_SLOTS   = ['11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM', '7 PM'];
const TOTAL_STEPS  = 3;

// ── Vine Progress ─────────────────────────────────────────────────────────
function VineProgress({ step }) {
  const pct = (step / TOTAL_STEPS) * 100;
  return (
    <div className="relative w-full h-5 mb-6 overflow-visible" aria-hidden="true">
      {/* Vine stem */}
      <div className="absolute top-1/2 left-0 right-0 h-[3px] bg-brand-navy/10 rounded-full -translate-y-1/2" />
      <div
        className="absolute top-1/2 left-0 h-[3px] bg-brand-green rounded-full -translate-y-1/2 transition-all duration-500 ease-out"
        style={{ width: `${pct}%` }}
      />
      {/* Three leaf knuckles */}
      {[1, 2, 3].map(s => (
        <div
          key={s}
          className={[
            'absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 transition-all duration-300',
            step >= s
              ? 'bg-brand-green border-brand-green scale-110'
              : 'bg-morning-white border-brand-navy/20 scale-100',
          ].join(' ')}
          style={{ left: `${(s / TOTAL_STEPS) * 100}%` }}
        />
      ))}
    </div>
  );
}

// ── Chip selector ─────────────────────────────────────────────────────────
function ChipGroup({ options, value, onChange, multi = false }) {
  const toggle = (opt) => {
    if (multi) {
      onChange(value === opt ? '' : opt);
    } else {
      onChange(opt);
    }
  };
  return (
    <div className="flex flex-wrap gap-2">
      {options.map(opt => (
        <button
          key={opt}
          type="button"
          onClick={() => toggle(opt)}
          className={[
            'px-4 py-2 rounded-chip font-body text-[14px] font-medium border transition-all duration-150',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-navy focus-visible:ring-offset-1',
            value === opt
              ? 'bg-brand-pink text-white border-brand-pink shadow-sm'
              : 'bg-morning-white text-brand-navy border-brand-navy/20 hover:border-brand-pink/50 hover:bg-blush',
          ].join(' ')}
          aria-pressed={value === opt}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

// ── Step 1: Who is the visit for? ─────────────────────────────────────────
function Step1({ data, onChange }) {
  return (
    <div className="space-y-6">
      <div>
        <label className="block font-body font-medium text-brand-navy text-[15px] mb-1" htmlFor="child-name">
          Child's name <span className="text-brand-navy/40 font-normal">(optional)</span>
        </label>
        <input
          id="child-name"
          type="text"
          value={data.childName}
          onChange={e => onChange('childName', e.target.value)}
          placeholder="e.g. Ananya"
          maxLength={60}
          className="w-full border border-brand-navy/20 rounded-xl px-4 py-3 font-body text-[15px] text-brand-navy placeholder:text-brand-navy/30 focus:outline-none focus:ring-2 focus:ring-brand-navy/30 bg-morning-white transition"
        />
      </div>

      <div>
        <p className="font-body font-medium text-brand-navy text-[15px] mb-3">
          Child's age <span className="text-brand-pink">*</span>
        </p>
        <ChipGroup options={AGE_GROUPS} value={data.ageGroup} onChange={v => onChange('ageGroup', v)} />
      </div>

      <div>
        <p className="font-body font-medium text-brand-navy text-[15px] mb-3">
          First visit to Chutti's? <span className="text-brand-pink">*</span>
        </p>
        <ChipGroup options={['Yes', 'No']} value={data.firstVisit} onChange={v => onChange('firstVisit', v)} />
      </div>
    </div>
  );
}

// ── Step 2: What's the visit for? ─────────────────────────────────────────
function Step2({ data, onChange }) {
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="space-y-6">
      <div>
        <p className="font-body font-medium text-brand-navy text-[15px] mb-3">
          Reason for visit <span className="text-brand-pink">*</span>
        </p>
        <div className="flex flex-wrap gap-2">
          {REASONS.map(r => (
            <button
              key={r}
              type="button"
              onClick={() => onChange('reason', r)}
              className={[
                'px-4 py-2.5 rounded-xl font-body text-[14px] font-medium border transition-all duration-150 text-left',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-navy focus-visible:ring-offset-1',
                data.reason === r
                  ? 'bg-brand-pink text-white border-brand-pink shadow-sm'
                  : 'bg-morning-white text-brand-navy border-brand-navy/20 hover:border-brand-pink/50 hover:bg-blush',
              ].join(' ')}
              aria-pressed={data.reason === r}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="pref-date" className="block font-body font-medium text-brand-navy text-[15px] mb-1">
          Preferred date
        </label>
        <input
          id="pref-date"
          type="date"
          min={today}
          value={data.preferredDate}
          onChange={e => onChange('preferredDate', e.target.value)}
          className="w-full border border-brand-navy/20 rounded-xl px-4 py-3 font-body text-[15px] text-brand-navy focus:outline-none focus:ring-2 focus:ring-brand-navy/30 bg-morning-white transition"
        />
      </div>

      <div>
        <p className="font-body font-medium text-brand-navy text-[15px] mb-3">Preferred time</p>
        <ChipGroup options={TIME_SLOTS} value={data.preferredSlot} onChange={v => onChange('preferredSlot', v)} />
      </div>
    </div>
  );
}

// ── Step 3: How do we reach you? ──────────────────────────────────────────
function Step3({ data, onChange, errors }) {
  return (
    <div className="space-y-5">
      <div>
        <label htmlFor="parent-name" className="block font-body font-medium text-brand-navy text-[15px] mb-1">
          Your name <span className="text-brand-pink">*</span>
        </label>
        <input
          id="parent-name"
          type="text"
          value={data.parentName}
          onChange={e => onChange('parentName', e.target.value)}
          placeholder="Parent or guardian name"
          maxLength={80}
          className={`w-full border rounded-xl px-4 py-3 font-body text-[15px] text-brand-navy placeholder:text-brand-navy/30 focus:outline-none focus:ring-2 focus:ring-brand-navy/30 bg-morning-white transition ${errors.parentName ? 'border-red-400' : 'border-brand-navy/20'}`}
        />
        {errors.parentName && <p className="mt-1 text-sm text-red-500 font-body">{errors.parentName}</p>}
      </div>

      <div>
        <label htmlFor="phone" className="block font-body font-medium text-brand-navy text-[15px] mb-1">
          Mobile number <span className="text-brand-pink">*</span>
        </label>
        <input
          id="phone"
          type="tel"
          inputMode="numeric"
          value={data.phone}
          onChange={e => onChange('phone', e.target.value.replace(/\D/g, ''))}
          placeholder="10-digit mobile number"
          maxLength={10}
          className={`w-full border rounded-xl px-4 py-3 font-body text-[15px] text-brand-navy placeholder:text-brand-navy/30 focus:outline-none focus:ring-2 focus:ring-brand-navy/30 bg-morning-white transition ${errors.phone ? 'border-red-400' : 'border-brand-navy/20'}`}
        />
        {errors.phone && <p className="mt-1 text-sm text-red-500 font-body">{errors.phone}</p>}
      </div>

      {/* Honeypot — hidden from users, checked server-side */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="sr-only"
        value={data.honeypot}
        onChange={e => onChange('honeypot', e.target.value)}
      />

      <div>
        <label htmlFor="notes" className="block font-body font-medium text-brand-navy text-[15px] mb-1">
          Tell us about your child <span className="text-brand-navy/40 font-normal">(optional)</span>
        </label>
        <textarea
          id="notes"
          value={data.notes}
          onChange={e => onChange('notes', e.target.value)}
          rows={4}
          maxLength={1000}
          placeholder="Anything that helps us make the visit easier: fears, past dental experiences, medical or developmental needs, sensitivities to sound or light, a favourite cartoon or comfort toy"
          className="w-full border border-brand-navy/20 rounded-xl px-4 py-3 font-body text-[15px] text-brand-navy placeholder:text-brand-navy/30 focus:outline-none focus:ring-2 focus:ring-brand-navy/30 bg-morning-white transition resize-none"
        />
      </div>

      <p className="font-body text-[14px] text-brand-navy/60 italic">
        We'll call you to confirm a time. If your child is nervous, tell us here — we'll plan the visit around them.
      </p>
    </div>
  );
}

// ── Success Screen ────────────────────────────────────────────────────────
function SuccessScreen({ onClose }) {
  const waUrl = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(siteConfig.whatsappPrefill)}`;
  return (
    <div className="flex flex-col items-center text-center py-6 space-y-6">
      <IllustrationImage
        name="success-celebration"
        className="w-48 h-auto"
        alt="The kids and animals celebrating"
      />
      <div className="space-y-2">
        <h3 className="font-display font-bold text-h3-mobile text-brand-navy">Request sent!</h3>
        <p className="font-body text-body-sm text-brand-navy/70">
          We'll call you to confirm a time. See you soon!
        </p>
      </div>
      <div className="flex flex-col gap-3 w-full max-w-xs">
        <button
          onClick={onClose}
          className="w-full py-3 bg-brand-pink text-white font-body font-semibold text-btn rounded-pill hover:bg-[#c41d63] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-navy focus-visible:ring-offset-2"
        >
          Done
        </button>
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-3 border border-brand-navy/20 rounded-pill text-brand-navy font-body font-medium text-btn hover:bg-brand-navy/5 transition-colors"
        >
          <MessageCircle size={16} aria-hidden="true" />
          WhatsApp for anything urgent
        </a>
      </div>
    </div>
  );
}

// ── Failure Screen ────────────────────────────────────────────────────────
function FailureScreen({ formData, onClose }) {
  const msg = [
    `Hi, I'd like to book an appointment for my child at Chutti's Dental.`,
    formData.parentName && `Parent: ${formData.parentName}`,
    formData.phone      && `Phone: ${formData.phone}`,
    formData.childName  && `Child: ${formData.childName}`,
    formData.ageGroup   && `Age: ${formData.ageGroup}`,
    formData.reason     && `Reason: ${formData.reason}`,
  ].filter(Boolean).join('\n');

  const waUrl = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(msg)}`;

  return (
    <div className="flex flex-col items-center text-center py-6 space-y-5">
      <p className="font-body text-body-sm text-brand-navy/80">
        We couldn't send your request automatically. Tap below to send it on WhatsApp instead — it takes just a second.
      </p>
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 w-full py-3.5 bg-brand-pink text-white font-body font-semibold text-btn rounded-pill hover:bg-[#c41d63] transition-colors"
      >
        <MessageCircle size={18} aria-hidden="true" />
        Send on WhatsApp instead
      </a>
      <button
        onClick={onClose}
        className="font-body text-[14px] text-brand-navy/50 hover:text-brand-navy underline underline-offset-2"
      >
        Close
      </button>
    </div>
  );
}

// ── Main BookingModal ─────────────────────────────────────────────────────
export default function BookingModal({ isOpen, onClose, preselectedReason = '' }) {
  const [step,   setStep]   = useState(1);
  const [status, setStatus] = useState('idle'); // idle | submitting | success | failure
  const [errors, setErrors] = useState({});
  const openedAt            = useRef(null);
  const firstFocusRef       = useRef(null);
  const [formData, setFormData] = useState({
    childName:     '',
    ageGroup:      '',
    firstVisit:    '',
    reason:        preselectedReason,
    preferredDate: '',
    preferredSlot: '',
    parentName:    '',
    phone:         '',
    notes:         '',
    honeypot:      '',
  });

  // Sync preselected reason when modal opens
  useEffect(() => {
    if (isOpen) {
      setFormData(prev => ({ ...prev, reason: preselectedReason }));
      setStep(1);
      setStatus('idle');
      setErrors({});
      openedAt.current = Date.now();
    }
  }, [isOpen, preselectedReason]);

  // Focus first element on open; return focus on close handled by BookingProvider
  useEffect(() => {
    if (isOpen && firstFocusRef.current) {
      setTimeout(() => firstFocusRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Scroll lock
  useEffect(() => {
    document.body.classList.toggle('overflow-hidden', isOpen);
    return () => document.body.classList.remove('overflow-hidden');
  }, [isOpen]);

  // Esc to close
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  const update = useCallback((field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  }, [errors]);

  const validateStep = (s) => {
    if (s === 1) {
      if (!formData.ageGroup)  { alert('Please select your child\'s age.'); return false; }
      if (!formData.firstVisit){ alert('Please tell us if this is your child\'s first visit.'); return false; }
      return true;
    }
    if (s === 2) {
      if (!formData.reason) { alert('Please select a reason for the visit.'); return false; }
      return true;
    }
    if (s === 3) {
      const newErrors = {};
      if (!formData.parentName.trim()) newErrors.parentName = 'Please enter your name.';
      const phone = formData.phone.replace(/\D/g, '');
      if (!phone || phone.length !== 10) newErrors.phone = 'Please enter a 10-digit mobile number.';
      if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return false; }
      return true;
    }
    return true;
  };

  const handleNext = () => {
    if (!validateStep(step)) return;
    setStep(s => Math.min(s + 1, TOTAL_STEPS));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep(3)) return;

    // Spam check: minimum 3 seconds on form
    if (Date.now() - openedAt.current < 3000) {
      setStatus('failure'); return;
    }

    setStatus('submitting');
    try {
      const res = await fetch('/api/booking', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(formData),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json.success) {
        setStatus('success');
      } else {
        setStatus('failure');
      }
    } catch {
      setStatus('failure');
    }
  };

  if (!isOpen) return null;

  const stepTitles = ['Who is the visit for?', "What's the visit for?", 'How do we reach you?'];

  return (
    <>
      {/* Overlay */}
      <div
        className="modal-overlay"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Dialog */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Book an appointment"
        className={[
          'fixed z-[80] bg-morning-white overflow-y-auto',
          // Desktop: centred dialog
          'md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2',
          'md:w-full md:max-w-modal md:max-h-[90svh] md:rounded-modal md:shadow-modal',
          // Mobile: bottom sheet
          'bottom-0 left-0 right-0 max-h-[92svh] rounded-t-[24px] shadow-modal',
          'md:bottom-auto md:rounded-modal',
        ].join(' ')}
      >
        {/* Drag handle (mobile) */}
        <div className="md:hidden flex justify-center pt-3 pb-1" aria-hidden="true">
          <div className="w-10 h-1 bg-brand-navy/20 rounded-full" />
        </div>

        <div className="px-6 pb-8 pt-4 md:pt-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-bold text-[20px] text-brand-navy" ref={firstFocusRef} tabIndex={-1}>
              Book a visit
            </h2>
            <button
              onClick={onClose}
              aria-label="Close booking form"
              className="flex items-center justify-center w-9 h-9 rounded-full text-brand-navy/50 hover:bg-brand-navy/5 hover:text-brand-navy transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-navy"
            >
              <X size={20} aria-hidden="true" />
            </button>
          </div>

          {/* Status screens */}
          {status === 'success' && <SuccessScreen onClose={onClose} />}
          {status === 'failure' && <FailureScreen formData={formData} onClose={onClose} />}

          {/* Form steps */}
          {(status === 'idle' || status === 'submitting') && (
            <form onSubmit={handleSubmit} noValidate>
              {/* Vine progress */}
              <VineProgress step={step} />

              {/* Step label */}
              <p className="font-body text-meta text-brand-navy/50 mb-1">
                Step {step} of {TOTAL_STEPS}
              </p>
              <h3 className="font-display font-semibold text-[18px] text-brand-navy mb-5">
                {stepTitles[step - 1]}
              </h3>

              {/* Step content */}
              {step === 1 && <Step1 data={formData} onChange={update} />}
              {step === 2 && <Step2 data={formData} onChange={update} />}
              {step === 3 && <Step3 data={formData} onChange={update} errors={errors} />}

              {/* Navigation */}
              <div className="flex items-center justify-between mt-8 gap-3">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={() => setStep(s => s - 1)}
                    className="flex items-center gap-1 font-body text-[15px] font-medium text-brand-navy/60 hover:text-brand-navy transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-navy rounded-lg px-2 py-1"
                  >
                    <ChevronLeft size={16} aria-hidden="true" />
                    Back
                  </button>
                ) : <div />}

                {step < TOTAL_STEPS ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-6 py-3 bg-brand-pink text-white font-body font-semibold text-btn rounded-pill hover:bg-[#c41d63] transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-navy focus-visible:ring-offset-2"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="flex items-center gap-2 px-6 py-3 bg-brand-pink text-white font-body font-semibold text-btn rounded-pill hover:bg-[#c41d63] disabled:opacity-60 disabled:cursor-not-allowed transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-navy focus-visible:ring-offset-2"
                  >
                    {status === 'submitting' && <Loader2 size={16} className="animate-spin" aria-hidden="true" />}
                    {status === 'submitting' ? 'Sending…' : 'Send booking request'}
                  </button>
                )}
              </div>

              {/* Consent line (Step 3 only) */}
              {step === TOTAL_STEPS && (
                <p className="mt-4 font-body text-[12px] text-brand-navy/40 text-center">
                  By sending this, you agree to us contacting you about this appointment.{' '}
                  <a href="/privacy" className="underline hover:text-brand-navy/60">See our Privacy Policy.</a>
                </p>
              )}
            </form>
          )}
        </div>
      </div>
    </>
  );
}
