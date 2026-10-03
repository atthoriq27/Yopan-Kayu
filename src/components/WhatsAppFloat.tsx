import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { getBusinessProfile, getWhatsAppUrl, PROFILE_UPDATED_EVENT } from '../lib/dataService';
import { BusinessProfile } from '../types';
import { WhatsAppIcon } from './icons/WhatsAppIcon';

export const WhatsAppFloat: React.FC = () => {
  const [profile, setProfile] = useState<BusinessProfile | null>(null);
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const location = useLocation();

  const dragRef = useRef<{
    startX: number;
    startY: number;
    initialX: number;
    initialY: number;
    hasMoved: boolean;
  }>({
    startX: 0,
    startY: 0,
    initialX: 0,
    initialY: 0,
    hasMoved: false,
  });

  const buttonRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    getBusinessProfile().then(setProfile);

    const handleProfileUpdate = (e: any) => {
      if (e.detail) {
        setProfile(e.detail);
      }
    };

    window.addEventListener(PROFILE_UPDATED_EVENT, handleProfileUpdate);
    return () => {
      window.removeEventListener(PROFILE_UPDATED_EVENT, handleProfileUpdate);
    };
  }, []);

  // Update clamp on resize or initial load
  const clampPosition = useCallback((x: number, y: number) => {
    const btnSize = 56;
    const padding = 12;
    const maxX = window.innerWidth - btnSize - padding;
    const maxY = window.innerHeight - btnSize - padding;
    return {
      x: Math.min(Math.max(padding, x), Math.max(padding, maxX)),
      y: Math.min(Math.max(padding, y), Math.max(padding, maxY)),
    };
  }, []);

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return; // Left click only
    const btn = buttonRef.current;
    if (!btn) return;

    const rect = btn.getBoundingClientRect();
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      initialX: rect.left,
      initialY: rect.top,
      hasMoved: false,
    };
    // Note: Do NOT set isDragging(true) here! Only set it when actual movement exceeds threshold.

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const dx = moveEvent.clientX - dragRef.current.startX;
      const dy = moveEvent.clientY - dragRef.current.startY;

      // Only trigger dragging if moved more than 8 pixels
      if (!dragRef.current.hasMoved && Math.hypot(dx, dy) > 8) {
        dragRef.current.hasMoved = true;
        setIsDragging(true);
      }

      if (dragRef.current.hasMoved) {
        const nextX = dragRef.current.initialX + dx;
        const nextY = dragRef.current.initialY + dy;
        setPosition(clampPosition(nextX, nextY));
      }
    };

    const handleMouseUp = () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      setTimeout(() => {
        setIsDragging(false);
      }, 50);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  // Touch drag handlers for mobile / tablet
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    const btn = buttonRef.current;
    if (!btn) return;

    const rect = btn.getBoundingClientRect();
    dragRef.current = {
      startX: touch.clientX,
      startY: touch.clientY,
      initialX: rect.left,
      initialY: rect.top,
      hasMoved: false,
    };
    // Note: Do NOT set isDragging(true) here!
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    const dx = touch.clientX - dragRef.current.startX;
    const dy = touch.clientY - dragRef.current.startY;

    if (!dragRef.current.hasMoved && Math.hypot(dx, dy) > 10) {
      dragRef.current.hasMoved = true;
      setIsDragging(true);
    }

    if (dragRef.current.hasMoved) {
      if (e.cancelable) e.preventDefault();
      const nextX = dragRef.current.initialX + dx;
      const nextY = dragRef.current.initialY + dy;
      setPosition(clampPosition(nextX, nextY));
    }
  };

  const handleTouchEnd = () => {
    setTimeout(() => {
      setIsDragging(false);
    }, 50);
  };

  // Click handler: only prevent following link if user deliberately dragged the button
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (dragRef.current.hasMoved) {
      e.preventDefault();
      e.stopPropagation();
      dragRef.current.hasMoved = false;
      return;
    }
    // Normal click cleanly executes the link navigation
  };

  if (location.pathname.startsWith('/kelola') || location.pathname.startsWith('/admin')) {
    return null;
  }

  const waUrl = getWhatsAppUrl(
    profile?.whatsapp || '6281234567890',
    'Halo Yopan Kayu, saya ingin konsultasi kebutuhan mebel kriya kayu solid.'
  );

  // Position styles: either custom dragged coordinates or default bottom-right
  const style: React.CSSProperties = position
    ? {
        position: 'fixed',
        left: `${position.x}px`,
        top: `${position.y}px`,
        zIndex: 60,
        touchAction: isDragging ? 'none' : 'manipulation',
      }
    : {
        position: 'fixed',
        bottom: '80px', // Comfortably clears mobile bottom navigation bar (z-50)
        right: '16px',
        zIndex: 60,
        touchAction: isDragging ? 'none' : 'manipulation',
      };

  return (
    <aside
      ref={buttonRef}
      aria-label="Konsultasi Cepat"
      style={style}
      className={`select-none ${isDragging ? 'cursor-grabbing scale-105' : 'cursor-grab'}`}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="relative group">
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleClick}
          aria-label="Konsultasi WhatsApp (Bisa digeser/dipindah)"
          className="flex items-center justify-center w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#006c47] hover:bg-[#085a3c] text-white shadow-[0_6px_20px_rgba(0,108,71,0.4)] hover:shadow-[0_8px_28px_rgba(0,108,71,0.55)] transition-all duration-200 border-2 border-white active:scale-95 cursor-pointer"
          title="Klik untuk chat WhatsApp (bisa digeser jika menutupi konten)"
        >
          <WhatsAppIcon className="w-7 h-7 fill-white" />

          {/* Active online pulse dot */}
          <span className="absolute -top-0.5 -right-0.5 flex h-3.5 w-3.5 pointer-events-none">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#92f7c2] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-full w-full bg-[#92f7c2] border border-white"></span>
          </span>
        </a>

        {/* Desktop Elegant Hover Tooltip */}
        <div className="hidden md:flex absolute right-full mr-3 top-1/2 -translate-y-1/2 items-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="bg-[#1c1c19]/90 text-white text-[11px] font-semibold px-2.5 py-1 rounded-lg shadow-md whitespace-nowrap backdrop-blur-xs flex items-center gap-1.5">
            <span>Konsultasi WA</span>
            <span className="text-[9px] text-[#e8dfd5]/60">• Geser bebas</span>
          </div>
          <div className="w-1.5 h-1.5 bg-[#1c1c19]/90 rotate-45 -mr-1"></div>
        </div>
      </div>
    </aside>
  );
};
