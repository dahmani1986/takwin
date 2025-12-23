
import React from 'react';

interface FilterBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  wilayas: string[];
  selectedWilaya: string | null;
  setSelectedWilaya: (wilaya: string | null) => void;
  modes: string[];
  selectedMode: string | null;
  setSelectedMode: (mode: string | null) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  searchQuery,
  setSearchQuery,
  wilayas,
  selectedWilaya,
  setSelectedWilaya,
  modes,
  selectedMode,
  setSelectedMode
}) => {
  return (
    <div className="sticky top-0 bg-[#f7f9fc] pt-4 pb-2 px-4 z-10 space-y-3">
      {/* Search Input */}
      <div className="relative">
        <input
          type="text"
          placeholder="ابحث عن التخصص..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-white rounded-2xl py-3.5 px-12 shadow-sm border-none focus:ring-2 focus:ring-indigo-500 text-lg outline-none"
        />
        <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
          <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      <div className="space-y-2">
        {/* Mode Filter Chips */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-gray-400 whitespace-nowrap">النمط:</span>
          <div className="flex overflow-x-auto gap-2 py-1 no-scrollbar scroll-smooth flex-1">
            <button
              onClick={() => setSelectedMode(null)}
              className={`whitespace-nowrap px-4 py-1.5 rounded-xl text-xs font-medium transition-all ${
                selectedMode === null
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              الكل
            </button>
            {modes.map((mode) => (
              <button
                key={mode}
                onClick={() => setSelectedMode(mode)}
                className={`whitespace-nowrap px-4 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  selectedMode === mode
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>

        {/* Wilaya Filter Chips */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-gray-400 whitespace-nowrap">الولاية:</span>
          <div className="flex overflow-x-auto gap-2 py-1 no-scrollbar scroll-smooth flex-1">
            <button
              onClick={() => setSelectedWilaya(null)}
              className={`whitespace-nowrap px-4 py-1.5 rounded-xl text-xs font-medium transition-all ${
                selectedWilaya === null
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              الكل
            </button>
            {wilayas.map((wilaya) => (
              <button
                key={wilaya}
                onClick={() => setSelectedWilaya(wilaya)}
                className={`whitespace-nowrap px-4 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  selectedWilaya === wilaya
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                }`}
              >
                {wilaya}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
