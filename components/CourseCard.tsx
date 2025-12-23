
import React from 'react';
import { Course } from '../types';

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-xl font-bold text-gray-800">{course.specialty}</h3>
        <span className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-xs font-semibold">
          {course.id}
        </span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
        <div className="flex flex-col">
          <span className="font-semibold text-gray-400 text-xs mb-1">الشهادة</span>
          <span>{course.diploma}</span>
        </div>
        <div className="flex flex-col">
          <span className="font-semibold text-gray-400 text-xs mb-1">نمط التكوين</span>
          <span>{course.mode}</span>
        </div>
        <div className="flex flex-col">
          <span className="font-semibold text-gray-400 text-xs mb-1">الولاية</span>
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>{course.wilaya}</span>
          </div>
        </div>
        <div className="flex flex-col">
          <span className="font-semibold text-gray-400 text-xs mb-1">الفترة</span>
          <div className="flex items-center gap-1">
             <span className="whitespace-nowrap">{course.startDate}</span>
             <span className="mx-1">إلى</span>
             <span className="whitespace-nowrap">{course.endDate}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
