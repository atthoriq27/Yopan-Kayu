import React, { useState, useRef, useEffect } from 'react';

export interface SelectOption {
  value: string;
  label: string;
}

interface CustomSelectProps {
  value: string;
  onChange: (val: string) => void;
  options: SelectOption[];
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
  value,
  onChange,
  options,
  placeholder = 'Pilih salah satu...',
  className = '',
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close when clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div ref={containerRef} className={`relative w-full min-w-0 max-w-full box-border ${className}`}>
      {/* Trigger Button */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full min-w-0 max-w-full box-border px-3.5 sm:px-4 py-2.5 bg-[#faf7f2] border border-[#ede5d8] rounded-xl text-xs sm:text-sm text-[#1c1c19] flex items-center justify-between cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#6f3c16]/30 text-left transition-all active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span className={`truncate mr-2 ${selectedOption ? 'font-medium text-[#1c1c19]' : 'text-[#85746a]'}`}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <span
          className={`material-symbols-outlined text-[18px] text-[#85746a] flex-shrink-0 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-[#6f3c16]' : ''
          }`}
        >
          expand_more
        </span>
      </button>

      {/* Dropdown Menu Popup - Stays strictly within the input width */}
      {isOpen && (
        <div className="absolute z-50 left-0 right-0 top-full mt-1.5 w-full bg-white border border-[#ede5d8] rounded-xl shadow-xl overflow-hidden py-1 max-h-60 overflow-y-auto box-border">
          {options.length === 0 ? (
            <div className="px-4 py-2.5 text-xs text-[#85746a] text-center">
              Tidak ada pilihan
            </div>
          ) : (
            options.map((option) => {
              const isSelected = option.value === value;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className={`w-full min-w-0 px-3.5 sm:px-4 py-2.5 text-xs sm:text-sm text-left flex items-center justify-between transition-colors ${
                    isSelected
                      ? 'bg-[#6f3c16]/10 text-[#6f3c16] font-bold'
                      : 'text-[#1c1c19] hover:bg-[#faf7f2]'
                  }`}
                >
                  <span className="truncate mr-2">{option.label}</span>
                  {isSelected && (
                    <span className="material-symbols-outlined text-[16px] text-[#6f3c16] flex-shrink-0">
                      check
                    </span>
                  )}
                </button>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};
