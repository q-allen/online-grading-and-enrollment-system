"use client";

import { useState } from "react";
import { Trash, Plus, Search, ClipboardList, Edit, Book, CalendarDays, Clock } from "lucide-react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import TeacherSidebarPage from "../../components/TeacherSidebar";

const TeacherCoursesPage = () => {
  const [courses] = useState([
    { name: "Introduction to Computer Science", code: "CS101", students: "28/30", enrolledStudents: 28, maxStudents: 30, credits: 3, semester: "Fall 2023", description: "Introduction to programming concepts." },
    { name: "Composition", code: "ENG105", students: "18/20", enrolledStudents: 18, maxStudents: 20, credits: 3, semester: "Fall 2023", description: "Principles of academic writing and rhetorical concepts." },
    { name: "Data Structures", code: "CS201", students: "10/25", enrolledStudents: 10, maxStudents: 25, credits: 3, semester: "Fall 2023", description: "Study of data structures and algorithms." },
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCourse, setActiveCourse] = useState<{
    name: string;
    code: string;
    students: string;
    enrolledStudents: number;
    maxStudents: number;
    credits: number;
    semester: string;
    description: string;
  } | null>(null);
  const [isAddingCourse, setIsAddingCourse] = useState(false);
  const [isEditingCourse, setIsEditingCourse] = useState(false);
  const [activeTab, setActiveTab] = useState("details");

  const handleAddCourse = () => {
    setIsAddingCourse(true);
    setActiveCourse(null);
  };

  const handleEditCourse = (e: React.MouseEvent<HTMLButtonElement>, course: { name: string; code: string; students: string; enrolledStudents: number; maxStudents: number; credits: number; semester: string; description: string }) => {
    e.stopPropagation();
    setIsEditingCourse(true);
    setActiveCourse(course);
    console.log("Edit course:", course);
  };

  const filteredCourses = searchTerm
    ? courses.filter((course) =>
        course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.code.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : courses;

  const getScheduleForActiveCourse = (): { id: string; day: string; startTime: string; endTime: string; room: string }[] => {
    return [
      { id: "1", day: "Monday", startTime: "10:00 AM", endTime: "12:00 PM", room: "Room 101" },
      { id: "2", day: "Wednesday", startTime: "2:00 PM", endTime: "4:00 PM", room: "Room 202" },
    ];
  };

  return (
    <div className="min-h-screen flex font-sans bg-gradient-to-b from-[#EBFCFF] to-[#D6F0FF]">
      <TeacherSidebarPage />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <div className="space-y-4 p-4 sm:p-6 md:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-[#0F214D]">My Courses</h1>
            <button
              onClick={handleAddCourse}
              className="bg-[#0F214D] text-white px-3 py-1 sm:px-4 sm:py-2 rounded-md flex items-center hover:bg-[#0D1A3D] transition-colors text-sm sm:text-base"
            >
              <Plus className="mr-2 h-4 w-4 sm:h-5 sm:w-5" /> Add New Course
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            <div className="space-y-4 sm:space-y-6">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search courses..."
                  className="w-full pl-8 px-3 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#0F214D] bg-white text-sm sm:text-base"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="rounded-lg border bg-white text-card-foreground shadow-sm space-y-4 p-3 sm:p-4">
                <div className="flex flex-col space-y-1.5 p-0">
                  <h3 className="text-base sm:text-lg font-semibold leading-none tracking-tight text-[#0F214D]">
                    Your Courses ({filteredCourses.length})
                  </h3>
                </div>
                <div className="p-0">
                  {filteredCourses.length > 0 ? (
                    <div className="space-y-2">
                      {filteredCourses.map((course) => (
                        <div
                          key={course.code}
                          className={`border cursor-pointer p-3 sm:p-4 rounded-md transition-colors ${
                            activeCourse === course
                              ? "border-[#2BA3EC] bg-[#E6F0FA]"
                              : "hover:border-[#2BA3EC]"
                          }`}
                          onClick={() => {
                            setActiveCourse(course);
                            setIsAddingCourse(false);
                            setIsEditingCourse(false);
                            setActiveTab("details");
                          }}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="text-sm font-medium text-[#020817]">{course.name}</h3>
                              <p className="text-xs sm:text-sm text-gray-600">{course.code}</p>
                              <span className="inline-block bg-[#2BA3EC] text-white text-xs px-2 py-1 rounded mt-2">
                                {course.students} students
                              </span>
                            </div>
                            <div className="flex gap-1 sm:gap-2">
                              <button
                                className="text-[#020817] hover:text-gray-500"
                                title="Edit"
                                onClick={(e) => handleEditCourse(e, course)}
                              >
                                <Edit className="w-2 h-2 sm:w-4 sm:h-4" />
                              </button>
                              <button
                                className="text-red-500 hover:text-red-700 w-8 h-8"
                                title="Delete course"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  console.log("Delete course:", course);
                                }}
                              >
                                <Trash className="w-2 h-2 sm:w-4 sm:h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center p-4 text-gray-500 text-sm sm:text-base">No courses found</div>
                  )}
                </div>
              </div>
            </div>

            <div className="md:col-span-2">
              {(activeCourse || isAddingCourse) ? (
                <div className="bg-white rounded-lg shadow-md">
                  <div className="p-4 sm:p-6">
                    <h2 className="text-lg sm:text-xl font-semibold text-[#0F214D]">
                      {isAddingCourse ? "Add New Course" : isEditingCourse ? "Edit Course" : "Course Details"}
                    </h2>
                    <p className="text-sm text-gray-600 mt-1">
                      {isAddingCourse
                        ? "Create a new course for your teaching schedule"
                        : isEditingCourse
                        ? "Update the course information"
                        : "View and manage this course's details"}
                    </p>
                  </div>

                  {(isAddingCourse || isEditingCourse) ? (
                    <div className="px-4 sm:px-6 pb-4 sm:pb-6">
                      <form className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-[#0F214D]">Course Code</label>
                            <input
                              type="text"
                              placeholder="e.g., CS101"
                              className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#0F214D] bg-white text-sm sm:text-base"
                              defaultValue={activeCourse?.code}
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-[#0F214D]">Course Name</label>
                            <input
                              type="text"
                              placeholder="e.g., Introduction to Computer Science"
                              className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#0F214D] bg-white text-sm sm:text-base"
                              defaultValue={activeCourse?.name}
                            />
                          </div>
                          <div className="space-y-2 md:col-span-2">
                            <label className="text-sm font-medium text-[#0F214D]">Description</label>
                            <input
                              type="text"
                              placeholder="Course description"
                              className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#0F214D] bg-white text-sm sm:text-base"
                              defaultValue={activeCourse?.description}
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-[#0F214D]">Credits</label>
                            <input
                              type="number"
                              placeholder="3"
                              className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#0F214D] bg-white text-sm sm:text-base"
                              defaultValue={activeCourse?.credits}
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-[#0F214D]">Semester</label>
                            <input
                              type="text"
                              placeholder="Fall 2023"
                              className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#0F214D] bg-white text-sm sm:text-base"
                              defaultValue={activeCourse?.semester}
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-[#0F214D]">Maximum Students</label>
                            <input
                              type="number"
                              placeholder="30"
                              className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#0F214D] bg-white text-sm sm:text-base"
                              defaultValue={activeCourse?.maxStudents}
                            />
                          </div>
                        </div>
                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            className="border border-gray-300 rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                            onClick={() => {
                              setIsAddingCourse(false);
                              setIsEditingCourse(false);
                              setActiveCourse(null);
                            }}
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="bg-[#0F214D] text-white px-4 py-2 rounded-md hover:bg-[#0D1A3D] transition-colors text-sm"
                            onClick={(e) => {
                              e.preventDefault();
                              setIsAddingCourse(false);
                              setIsEditingCourse(false);
                              console.log("Form submitted");
                            }}
                          >
                            {isAddingCourse ? "Add Course" : "Save Changes"}
                          </button>
                        </div>
                      </form>
                    </div>
                  ) : (
                    <>
                      <div className="px-4 sm:px-6">
                        <div className="border-b border-gray-200 mb-4">
                          <div className="grid w-full grid-cols-2">
                            <button
                              className={`inline-flex items-center justify-center whitespace-nowrap rounded-t-md px-3 py-2 text-sm font-medium transition-all border-b-2 ${
                                activeTab === "details"
                                  ? "border-[#0F214D] text-[#0F214D]"
                                  : "border-transparent text-gray-500 hover:text-gray-700"
                              }`}
                              onClick={() => setActiveTab("details")}
                            >
                              <Book className="mr-2 h-4 w-4" />
                              Details
                            </button>
                            <button
                              className={`inline-flex items-center justify-center whitespace-nowrap rounded-t-md px-3 py-2 text-sm font-medium transition-all border-b-2 ${
                                activeTab === "schedule"
                                  ? "border-[#0F214D] text-[#0F214D]"
                                  : "border-transparent text-gray-500 hover:text-gray-700"
                              }`}
                              onClick={() => setActiveTab("schedule")}
                            >
                              <CalendarDays className="mr-2 h-4 w-4" />
                              Schedule
                            </button>
                          </div>
                        </div>

                        {activeTab === "details" && (
                          <div className="space-y-4 pt-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <h3 className="text-sm font-medium text-gray-600">Course Code</h3>
                                <p className="mt-1 text-[#020817]">{activeCourse?.code}</p>
                              </div>
                              <div>
                                <h3 className="text-sm font-medium text-gray-600">Credits</h3>
                                <p className="mt-1 text-[#020817]">{activeCourse?.credits}</p>
                              </div>
                              <div>
                                <h3 className="text-sm font-medium text-gray-600">Semester</h3>
                                <p className="mt-1 text-[#020817]">{activeCourse?.semester}</p>
                              </div>
                              <div>
                                <h3 className="text-sm font-medium text-gray-600">Enrollment</h3>
                                <p className="mt-1 text-[#020817]">{activeCourse?.enrolledStudents}/{activeCourse?.maxStudents}</p>
                              </div>
                            </div>
                            <div>
                              <h3 className="text-sm font-medium text-gray-600">Description</h3>
                              <p className="mt-1 text-[#020817]">{activeCourse?.description}</p>
                            </div>
                          </div>
                        )}

                        {activeTab === "schedule" && (
                          <div className="space-y-4 pt-4">
                            {getScheduleForActiveCourse().length > 0 ? (
                              <div className="space-y-3">
                                {getScheduleForActiveCourse().map((schedule) => (
                                  <div key={schedule.id} className="border rounded-md p-4">
                                    <div className="flex justify-between items-center">
                                      <div className="flex items-center">
                                        <div className="bg-persian-blue/10 text-persian-blue p-2 rounded-md mr-4">
                                          <Clock className="h-5 w-5" />
                                        </div>
                                        <div>
                                          <p className="font-medium text-[#020817]">{schedule.day}</p>
                                          <p className="text-sm text-gray-600">
                                            {schedule.startTime} - {schedule.endTime}
                                          </p>
                                        </div>
                                      </div>
                                      <span className="inline-block bg-[#0F214D] text-white text-xs px-2 py-1 rounded-full">
                                        {schedule.room}
                                      </span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div className="text-center p-4 text-gray-500">
                                No schedule found for this course
                              </div>
                            )}
                            <button className="w-full bg-[#0F214D] border border-gray-300 rounded-md h-10 px-4 py-2 flex items-center justify-center text-sm font-medium text-white hover:bg-gray-800">
                              <Plus className="mr-2 h-4 w-4 sm:h-5 sm:w-5" /> Add Class Schedule
                            </button>
                          </div>
                        )}
                      </div>
                      <div className="flex justify-between p-4 sm:p-6">
                        <button
                          className="border border-gray-300 rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                          onClick={() => setActiveCourse(null)}
                        >
                          Cancel
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <div className="h-full flex items-center justify-center p-6 sm:p-8 bg-white rounded-lg shadow-md">
                  <div className="text-center">
                    <ClipboardList className="mx-auto h-10 w-10 sm:h-12 sm:w-12 text-gray-400" />
                    <h3 className="mt-4 text-base sm:text-lg font-medium text-gray-600">No Course Selected</h3>
                    <p className="mt-2 text-sm sm:text-base text-gray-500">Select a course from the list or add a new one</p>
                    <button
                      onClick={handleAddCourse}
                      className="mt-4 bg-[#0F214D] text-white px-3 py-1 sm:px-4 sm:py-2 rounded-md flex items-center justify-center hover:bg-[#0D1A3D] transition-colors text-sm sm:text-base mx-auto"
                    >
                      <Plus className="mr-2 h-4 w-4 sm:h-5 sm:w-5" /> Add New Course
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherCoursesPage;