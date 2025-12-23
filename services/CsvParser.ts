
import { Course, COLUMN_MAPPING } from '../types';

export const parseCsv = (csvText: string): Course[] => {
  const lines = csvText.split(/\r?\n/).filter(line => line.trim() !== "");
  if (lines.length < 2) return [];

  const headers = lines[0].split(';').map(h => h.trim());
  const headerIndices: Record<string, number> = {};

  // Map header names to their column indices
  headers.forEach((header, index) => {
    const mappedKey = COLUMN_MAPPING[header];
    if (mappedKey) {
      headerIndices[mappedKey] = index;
    }
  });

  const courses: Course[] = [];

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(';').map(v => v.trim());
    if (values.length < headers.length) continue;

    const course: Partial<Course> = {};
    
    // Extract values based on mapped indices
    Object.entries(headerIndices).forEach(([key, index]) => {
      course[key as keyof Course] = values[index] || "";
    });

    if (course.specialty) {
      courses.push(course as Course);
    }
  }

  return courses;
};

export const generateSampleCsv = (): string => {
  return [
    "الرقم;التخصص;الشهادة;نمط التكوين;الولاية;تاريخ البداية;تاريخ النهاية",
    "1;برمجة الحاسوب;تقني سامي;حضوري;الجزائر;2024-09-01;2026-06-30",
    "2;تصميم جرافيك;تقني;عن بعد;وهران;2024-10-15;2025-07-15",
    "3;تسيير المخزونات;تقني سامي;حضوري;قسنطينة;2024-09-01;2026-06-30",
    "4;الالكترونيك;تقني;تمهين;الجزائر;2024-11-01;2025-11-01",
    "5;المحاسبة;تقني سامي;حضوري;عنابة;2024-09-15;2026-06-15",
    "6;الطاقة المتجددة;مهندس دولة;حضوري;تمنراست;2024-09-01;2029-06-30",
    "7;الفندقة والسياحة;تقني;حضوري;بجاية;2024-10-01;2025-10-01"
  ].join("\n");
};
