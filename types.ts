
export interface Course {
  id: string;
  specialty: string;
  diploma: string;
  mode: string;
  wilaya: string;
  startDate: string;
  endDate: string;
}

export type CourseKey = keyof Course;

export const COLUMN_MAPPING: Record<string, CourseKey> = {
  "الرقم": "id",
  "التخصص": "specialty",
  "الشهادة": "diploma",
  "نمط التكوين": "mode",
  "الولاية": "wilaya",
  "تاريخ البداية": "startDate",
  "تاريخ النهاية": "endDate"
};
