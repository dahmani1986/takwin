
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Course } from './types';
import { parseCsv, generateSampleCsv } from './services/CsvParser';
import CourseCard from './components/CourseCard';
import FilterBar from './components/FilterBar';

const App: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWilaya, setSelectedWilaya] = useState<string | null>(null);
  const [selectedMode, setSelectedMode] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load sample data on initial mount
  useEffect(() => {
    const sample = generateSampleCsv();
    const parsed = parseCsv(sample);
    setCourses(parsed);
  }, []);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      if (text) {
        const parsed = parseCsv(text);
        setCourses(parsed);
      }
      setIsLoading(false);
    };
    reader.onerror = () => {
      alert('حدث خطأ أثناء قراءة الملف');
      setIsLoading(false);
    };
    reader.readAsText(file, 'UTF-8');
  };

  const wilayas = useMemo(() => {
    const unique = new Set(courses.map(c => c.wilaya));
    return Array.from(unique).sort();
  }, [courses]);

  const modes = useMemo(() => {
    const unique = new Set(courses.map(c => c.mode));
    return Array.from(unique).sort();
  }, [courses]);

  const filteredCourses = useMemo(() => {
    return courses.filter(course => {
      const matchesSearch = course.specialty.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesWilaya = selectedWilaya ? course.wilaya === selectedWilaya : true;
      const matchesMode = selectedMode ? course.mode === selectedMode : true;
      return matchesSearch && matchesWilaya && matchesMode;
    });
  }, [courses, searchQuery, selectedWilaya, selectedMode]);

  return (
    <div className="min-h-screen pb-24">
      {/* Top App Bar */}
      <header className="bg-white px-6 py-6 shadow-sm flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">تكويني - التخصصات المتاحة</h1>
          <p className="text-sm text-gray-500 mt-1">عرض وفلترة عروض التكوين المهني</p>
        </div>
        <button 
          onClick={() => {
            setCourses(parseCsv(generateSampleCsv()));
            setSelectedWilaya(null);
            setSelectedMode(null);
            setSearchQuery('');
          }}
          className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
        >
          إعادة تعيين
        </button>
      </header>

      {/* Filters & Search */}
      <FilterBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        wilayas={wilayas}
        selectedWilaya={selectedWilaya}
        setSelectedWilaya={setSelectedWilaya}
        modes={modes}
        selectedMode={selectedMode}
        setSelectedMode={setSelectedMode}
      />

      {/* Main Content */}
      <main className="px-4 mt-2">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            <p className="mt-4 text-gray-600">جاري تحميل البيانات...</p>
          </div>
        ) : filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 max-w-3xl mx-auto">
            {filteredCourses.map((course) => (
              <CourseCard key={`${course.id}-${course.specialty}`} course={course} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="bg-gray-100 p-6 rounded-full mb-4">
               <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800">لا توجد نتائج</h3>
            <p className="text-gray-500 mt-2 max-w-xs">جرب تغيير معايير البحث أو رفع ملف CSV جديد يحتوي على تخصصات.</p>
          </div>
        )}
      </main>

      {/* Floating Action Button */}
      <div className="fixed bottom-8 left-8">
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileUpload} 
          accept=".csv" 
          className="hidden" 
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          className="bg-indigo-600 hover:bg-indigo-700 text-white w-16 h-16 rounded-2xl shadow-xl flex items-center justify-center transition-transform active:scale-90"
          title="تحميل ملف CSV"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default App;
