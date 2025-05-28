'use client';

import { useState } from 'react';
import { GraduationCap, ListChecks, CalendarDays, BookOpen, ChevronLeft, ChevronRight, Clock, LayoutDashboard } from 'lucide-react';
import Image from 'next/image';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const userRole = 'student' as "student" | "teacher"; // This can be dynamically set based on user authentication (e.g., "student" or "teacher")

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const studentLinks = [
    { path: "/student", label: "Dashboard", icon: <LayoutDashboard className="h-5 w-5" /> },
    { path: "/student/courses", label: "Available Courses", icon: <BookOpen className="h-5 w-5" /> },
    { path: "/student/enrolled", label: "Enrolled", icon: <GraduationCap className="h-5 w-5" /> },
    { path: "/student/grades", label: "My Grades", icon: <ListChecks className="h-5 w-5" /> },
    { path: "/student/record", label: "Academic Record", icon: <CalendarDays className="h-5 w-5" /> },
  ];

  const teacherLinks = [
    { path: "#", label: "Manage Courses", icon: <BookOpen className="h-5 w-5" /> },
    { path: "#", label: "Class Schedules", icon: <Clock className="h-5 w-5" /> },
    { path: "#", label: "Manage Grades", icon: <ListChecks className="h-5 w-5" /> },
  ];

  const links = userRole === "teacher" ? teacherLinks : studentLinks;

  return (
    <aside
      className={`bg-[#0F214D] text-white flex flex-col transition-all duration-300 z-10 ${isOpen ? 'w-64' : 'w-20'}`}
    >
      <div className="flex items-center justify-between p-4 border-b border-blue-800">
        <div className="flex items-center space-x-2 overflow-hidden">
          <Image src="/images/logo.png" alt="SCSIT Logo" width={40} height={40} />
          {isOpen && <span className="text-3xl font-semibold">SCSIT</span>}
        </div>
        <button 
          onClick={toggleSidebar} 
          className="text-white hover:bg-blue-800 p-1 rounded"
        >
          {isOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
        </button>
      </div>
      
      <nav className="flex-1 pt-4">
        <div className="px-3 mb-4">
          {isOpen && (
            <p className="text-xs uppercase font-semibold opacity-70 px-3 mb-2">
              {userRole === "teacher" ? "Teaching" : "Learning"}
            </p>
          )}
          
          <ul className="space-y-1">
            {links.map((link, index) => (
              <li key={index}>
                <a
                  href={link.path}
                  className={`flex items-center py-2 px-3 rounded-md transition-colors text-gray-200 hover:bg-blue-600/50 ${!isOpen && 'justify-center'}`}
                >
                  {link.icon}
                  {isOpen && <span className="ml-3">{link.label}</span>}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <div className="p-4 border-t border-blue-800">
        <div className={`flex items-center ${!isOpen && 'justify-center'}`}>
          <Image src="/images/logo.png" alt="Version Logo" width={24} height={24} />
          {isOpen && <span className="ml-3 text-sm">v1.0.0</span>}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;