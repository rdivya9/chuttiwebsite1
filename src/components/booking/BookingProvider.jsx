'use client';

import { createContext, useContext, useState, useCallback } from 'react';

/**
 * BookingProvider — React context that exposes openBooking({ reason }) globally.
 *
 * Any button anywhere can call openBooking() to open the modal,
 * optionally with a reason preselected (e.g. the aligner button
 * preselects "Aligners / crooked teeth").
 *
 * Usage:
 *   const { openBooking } = useBooking();
 *   openBooking({ reason: "Aligners / crooked teeth" });
 */
const BookingContext = createContext(null);

export function BookingProvider({ children, modal: BookingModal }) {
  const [isOpen, setIsOpen]       = useState(false);
  const [preselectedReason, setPreselectedReason] = useState('');

  const openBooking = useCallback(({ reason = '' } = {}) => {
    setPreselectedReason(reason);
    setIsOpen(true);
  }, []);

  const closeBooking = useCallback(() => {
    setIsOpen(false);
    setPreselectedReason('');
  }, []);

  return (
    <BookingContext.Provider value={{ openBooking, closeBooking, isOpen }}>
      {children}
      {BookingModal && (
        <BookingModal
          isOpen={isOpen}
          onClose={closeBooking}
          preselectedReason={preselectedReason}
        />
      )}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error('useBooking must be used within BookingProvider');
  return ctx;
}
