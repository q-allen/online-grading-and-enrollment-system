"use client";

import { useState } from "react";
import { Calendar, Clock, Edit, ChevronLeft, ChevronRight } from "lucide-react";
import NavBar from "@/app/components/Navbar";
import TeacherSidebar from "@/app/components/TeacherSidebar";


const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

// Helper function to format week range (e.g., "May 5 - May 11, 2025")
const formatWeekRange = (startDate: Date): string => {
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 6);
  const startMonth = startDate.toLocaleString("default", { month: "short" });
  const endMonth = endDate.toLocaleString("default", { month: "short" });
  const startDay = startDate.getDate();
  const endDay = endDate.getDate();
  const year = startDate.getFullYear();
  return `${startMonth} ${startDay} - ${endMonth} ${endDay}, ${year}`;
};

// Helper function to get the most recent Monday
const getMostRecentMonday = (date: Date): Date => {
  const result = new Date(date);
  const day = result.getDay(); // 0 (Sunday) to 6 (Saturday)
  const diff = day === 0 ? -6 : 1 - day; // Adjust to previous Monday
  result.setDate(result.getDate() + diff);
  result.setHours(0, 0, 0, 0); // Reset time
  return result;
};

const TeacherSchedulesPage = () => {
  const currentUser = { id: "teacher1", role: "teacher" }; // Mock user
  const [weekStart, setWeekStart] = useState(getMostRecentMonday(new Date("2025-05-10"))); // Initialize to Monday, May 5, 2025

  // Mock data for courses
  const courses = [
    { id: "1", name: "Composition", code: "ENG105", teacherId: "teacher1" },
    { id: "2", name: "Intro to Biology", code: "BIO110", teacherId: "teacher1" },
    { id: "3", name: "Data Structures", code: "CS201", teacherId: "teacher2" },
  ];

  // Mock function to get courses for teacher
  const getCoursesForTeacher = (teacherId: string) => {
    return courses.filter((course) => course.teacherId === teacherId);
  };

  // Mock data for schedules
  const schedules = [
    { id: "1", courseId: "1", day: "Monday", startTime: "10:00 AM", endTime: "11:30 AM", room: "Room 101" },
    { id: "2", courseId: "1", day: "Wednesday", startTime: "10:00 AM", endTime: "11:30 AM", room: "Room 101" },
    { id: "3", courseId: "2", day: "Tuesday", startTime: "2:00 PM", endTime: "3:30 PM", room: "Room 202" },
  ];

  // Mock function to get schedule for course
  const getScheduleForCourse = (courseId: string) => {
    return schedules.filter((schedule) => schedule.courseId === courseId);
  };

  if (!currentUser || currentUser.role !== "teacher") {
    return <div>Access Denied</div>;
  }

  const teacherCourses = getCoursesForTeacher(currentUser.id);

  // Get all schedules for the teacher's courses
  const teacherSchedules = teacherCourses.flatMap((course) => {
    const courseSchedules = getScheduleForCourse(course.id);
    return courseSchedules.map((schedule) => ({
      ...schedule,
      course: course,
    }));
  });

  // Create a structured schedule by days
  const scheduleByDay = daysOfWeek.reduce((acc, day) => {
    acc[day] = teacherSchedules
      .filter((s) => s.day === day)
      .sort((a, b) => a.startTime.localeCompare(b.startTime));
    return acc;
  }, {} as Record<string, typeof teacherSchedules>);

  const handlePreviousWeek = () => {
    const newWeekStart = new Date(weekStart);
    newWeekStart.setDate(weekStart.getDate() - 7);
    setWeekStart(newWeekStart);
  };

  const handleNextWeek = () => {
    const newWeekStart = new Date(weekStart);
    newWeekStart.setDate(weekStart.getDate() + 7);
    setWeekStart(newWeekStart);
  };

  return (
    <div className="min-h-screen flex">
      <TeacherSidebar />
      <div
        className={`flex-1 flex flex-col bg-gradient-to-r from-[#EBFCFF] to-[#D6F0FF] transition-all duration-300`}
      >
        <NavBar />
        <div className="space-y-6 p-4 sm:p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h1 className="text-3xl font-bold text-[#0F214D]">Class Schedules</h1>

            <div className="flex items-center space-x-2 bg-white rounded-md p-1 shadow-md">
              <button className="p-2 rounded-md hover:bg-gray-100 text-[#0F214D]" onClick={handlePreviousWeek} title="Previous Week">
                <ChevronLeft className="h-4 w-4" />
              </button>

              <div className="flex items-center px-2">
                <Calendar className="mr-2 h-4 w-4 text-[#0F214D]" />
                <span className="text-sm font-medium text-[#0F214D]">{formatWeekRange(weekStart)}</span>
              </div>

              <button className="p-2 rounded-md hover:bg-gray-100 text-[#0F214D]" onClick={handleNextWeek} title="Next Week">
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="grid gap-6">
            {daysOfWeek.map((day) => (
              <div key={day} className="bg-white rounded-lg shadow-md">
                <div className="p-0">
                  <div className="border-b bg-[#0F214D] text-white py-3 px-6 rounded-t-lg">
                    <h2 className="text-lg font-semibold">{day}</h2>
                  </div>

                  <div className="py-2 px-4">
                    {scheduleByDay[day].length > 0 ? (
                      <div className="divide-y">
                        {scheduleByDay[day].map((schedule) => (
                          <div
                            key={schedule.id}
                            className="py-3 px-2 flex flex-col md:flex-row md:items-center justify-between"
                          >
                            <div className="flex items-center mb-2 md:mb-0">
                              <div className="bg-[#2BA3EC]/10 text-[#0F214D] p-2 rounded-md mr-4">
                                <Clock className="h-5 w-5" />
                              </div>
                              <div>
                                <p className="font-medium text-[#0F214D]">{schedule.course.name}</p>
                                <p className="text-sm text-gray-600">{schedule.course.code}</p>
                              </div>
                            </div>

                            <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4">
                              <div className="inline-flex items-center px-2 py-1 text-sm border border-gray-300 rounded text-gray-700">
                                <Clock className="h-3 w-3 mr-2" />
                                {schedule.startTime} - {schedule.endTime}
                              </div>

                              <div className="inline-flex items-center px-2 py-1 text-sm rounded-full bg-[#E6F0FA] text-[#0F214D]">
                                {schedule.room}
                              </div>

                              <button
                                className="h-8 w-8 p-2 rounded-md hover:bg-gray-100 text-[#0F214D]"
                                title="Edit schedule"
                                aria-label="Edit schedule"
                              >
                                <Edit className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="py-8 text-center text-gray-600">
                        No classes scheduled for this day
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherSchedulesPage;