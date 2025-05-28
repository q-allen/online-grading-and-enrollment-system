"use client";

import { useState } from "react";
import Navbar from "@/app/components/Navbar";
import TeacherSidebarPage from "@/app/components/TeacherSidebar";
import { Plus, Trash, Search, ClipboardList, Edit, User, CalendarDays } from "lucide-react";

type Student = {
  id: number;
  name: string;
  course: string;
  email: string;
};

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([
    { id: 1, name: "Alice Johnson", course: "CS101", email: "alice@example.com" },
    { id: 2, name: "Bob Smith", course: "ENG105", email: "bob@example.com" },
    { id: 3, name: "Carol Martinez", course: "CS201", email: "carol@example.com" },
  ]);

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [activeStudent, setActiveStudent] = useState<Student | null>(null);
  const [isAddingStudent, setIsAddingStudent] = useState<boolean>(false);
  const [isEditingStudent, setIsEditingStudent] = useState<boolean>(false);
  const [formData, setFormData] = useState<{ name: string; course: string; email: string }>({
    name: "",
    course: "",
    email: "",
  });
  const [activeTab, setActiveTab] = useState<string>("details");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleAddStudent = () => {
    setIsAddingStudent(true);
    setActiveStudent(null);
    setIsEditingStudent(false);
    setFormData({ name: "", course: "", email: "" });
    setActiveTab("details");
  };

  const handleEditStudent = (e: React.MouseEvent<HTMLButtonElement>, student: Student) => {
    e.stopPropagation();
    setIsEditingStudent(true);
    setActiveStudent(student);
    setFormData({ name: student.name, course: student.course, email: student.email });
    setActiveTab("details");
  };

  const handleFormSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (isEditingStudent && activeStudent) {
      setStudents(
        students.map((student) =>
          student.id === activeStudent.id ? { ...student, ...formData } : student
        )
      );
    } else {
      setStudents([...students, { id: students.length + 1, ...formData }]);
    }
    setIsAddingStudent(false);
    setIsEditingStudent(false);
    setActiveStudent(null);
    setFormData({ name: "", course: "", email: "" });
  };

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>, id: number) => {
    e.stopPropagation();
    if (confirm("Are you sure you want to delete this student?")) {
      setStudents(students.filter((student) => student.id !== id));
      if (activeStudent?.id === id) {
        setActiveStudent(null);
      }
    }
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const filteredStudents = searchTerm
    ? students.filter(
        (student) =>
          student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          student.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
          student.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : students;

  const getAttendanceForActiveStudent = () => {
    return [
      { id: "1", date: "2023-10-01", status: "Present" },
      { id: "2", date: "2023-10-02", status: "Absent" },
    ];
  };

  return (
    <div className="min-h-screen flex font-sans bg-gradient-to-b from-[#EBFCFF] to-[#D6F0FF]">
      <TeacherSidebarPage />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <div className="space-y-4 p-4 sm:p-6 md:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-[#0F214D]">My Students</h1>
            <button
              onClick={handleAddStudent}
              className="bg-[#0F214D] text-white px-3 py-1 sm:px-4 sm:py-2 rounded-md flex items-center hover:bg-[#0D1A3D] transition-colors text-sm sm:text-base"
            >
              <Plus className="mr-2 h-4 w-4 sm:h-5 sm:w-5" /> Add New Student
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            <div className="space-y-4 sm:space-y-6">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search students..."
                  className="w-full pl-8 px-3 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#0F214D] bg-white text-sm sm:text-base"
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>

              <div className="rounded-lg border bg-white text-card-foreground shadow-sm space-y-4 p-3 sm:p-4">
                <div className="flex flex-col space-y-1.5 p-0">
                  <h3 className="text-base sm:text-lg font-semibold leading-none tracking-tight text-[#0F214D]">
                    Your Students ({filteredStudents.length})
                  </h3>
                </div>
                <div className="p-0">
                  {filteredStudents.length > 0 ? (
                    <div className="space-y-2">
                      {filteredStudents.map((student) => (
                        <div
                          key={student.id}
                          className={`border cursor-pointer p-3 sm:p-4 rounded-md transition-colors ${
                            activeStudent === student
                              ? "border-[#2BA3EC] bg-[#E6F0FA]"
                              : "hover:border-[#2BA3EC]"
                          }`}
                          onClick={() => {
                            setActiveStudent(student);
                            setIsAddingStudent(false);
                            setIsEditingStudent(false);
                            setActiveTab("details");
                          }}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="text-sm font-medium text-[#020817]">{student.name}</h3>
                              <p className="text-xs sm:text-sm text-gray-600">{student.course}</p>
                              <span className="inline-block bg-[#2BA3EC] text-white text-xs px-2 py-1 rounded mt-2">
                                {student.email}
                              </span>
                            </div>
                            <div className="flex gap-1 sm:gap-2">
                              <button
                                className="text-[#020817] hover:text-gray-500"
                                title="Edit"
                                onClick={(e) => handleEditStudent(e, student)}
                              >
                                <Edit className="w-2 h-2 sm:w-4 sm:h-4" />
                              </button>
                              <button
                                className="text-red-500 hover:text-red-700 w-8 h-8"
                                title="Delete student"
                                onClick={(e) => handleDelete(e, student.id)}
                              >
                                <Trash className="w-2 h-2 sm:w-4 sm:h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center p-4 text-gray-500 text-sm sm:text-base">No students found</div>
                  )}
                </div>
              </div>
            </div>

            <div className="md:col-span-2">
              {(activeStudent || isAddingStudent || isEditingStudent) ? (
                <div className="bg-white rounded-lg shadow-md">
                  <div className="p-4 sm:p-6">
                    <h2 className="text-lg sm:text-xl font-semibold text-[#0F214D]">
                      {isAddingStudent ? "Add New Student" : isEditingStudent ? "Edit Student" : "Student Details"}
                    </h2>
                    <p className="text-sm text-gray-600 mt-1">
                      {isAddingStudent
                        ? "Add a new student to your list"
                        : isEditingStudent
                        ? "Update the student information"
                        : "View and manage this student's details"}
                    </p>
                  </div>

                  {(isAddingStudent || isEditingStudent) ? (
                    <div className="px-4 sm:px-6 pb-4 sm:pb-6">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-[#0F214D]">Full Name</label>
                          <input
                            name="name"
                            type="text"
                            placeholder="e.g., Alice Johnson"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#0F214D] bg-white text-sm sm:text-base"
                            value={formData.name}
                            onChange={handleFormChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-[#0F214D]">Course</label>
                          <input
                            name="course"
                            type="text"
                            placeholder="e.g., CS101"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#0F214D] bg-white text-sm sm:text-base"
                            value={formData.course}
                            onChange={handleFormChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-[#0F214D]">Email</label>
                          <input
                            name="email"
                            type="email"
                            placeholder="e.g., student@example.com"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#0F214D] bg-white text-sm sm:text-base"
                            value={formData.email}
                            onChange={handleFormChange}
                          />
                        </div>
                      </div>
                      <div className="flex justify-end gap-2 mt-4">
                        <button
                          type="button"
                          className="border border-gray-300 rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                          onClick={() => {
                            setIsAddingStudent(false);
                            setIsEditingStudent(false);
                            setActiveStudent(null);
                          }}
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          className="bg-[#0F214D] text-white px-4 py-2 rounded-md hover:bg-[#0D1A3D] transition-colors text-sm"
                          onClick={handleFormSubmit}
                        >
                          {isAddingStudent ? "Add Student" : "Save Changes"}
                        </button>
                      </div>
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
                              <User className="mr-2 h-4 w-4" />
                              Details
                            </button>
                            <button
                              className={`inline-flex items-center justify-center whitespace-nowrap rounded-t-md px-3 py-2 text-sm font-medium transition-all border-b-2 ${
                                activeTab === "attendance"
                                  ? "border-[#0F214D] text-[#0F214D]"
                                  : "border-transparent text-gray-500 hover:text-gray-700"
                              }`}
                              onClick={() => setActiveTab("attendance")}
                            >
                              <CalendarDays className="mr-2 h-4 w-4" />
                              Attendance
                            </button>
                          </div>
                        </div>

                        {activeTab === "details" && (
                          <div className="space-y-4 pt-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <h3 className="text-sm font-medium text-gray-600">Name</h3>
                                <p className="mt-1 text-[#020817]">{activeStudent?.name}</p>
                              </div>
                              <div>
                                <h3 className="text-sm font-medium text-gray-600">Course</h3>
                                <p className="mt-1 text-[#020817]">{activeStudent?.course}</p>
                              </div>
                              <div className="col-span-2">
                                <h3 className="text-sm font-medium text-gray-600">Email</h3>
                                <p className="mt-1 text-[#020817]">{activeStudent?.email}</p>
                              </div>
                            </div>
                          </div>
                        )}

                        {activeTab === "attendance" && (
                          <div className="space-y-4 pt-4">
                            {getAttendanceForActiveStudent().length > 0 ? (
                              <div className="space-y-3">
                                {getAttendanceForActiveStudent().map((attendance) => (
                                  <div key={attendance.id} className="border rounded-md p-4">
                                    <div className="flex justify-between items-center">
                                      <div className="flex items-center">
                                        <div className="bg-[#2BA3EC]/10 text-[#2BA3EC] p-2 rounded-md mr-4">
                                          <CalendarDays className="h-5 w-5" />
                                        </div>
                                        <div>
                                          <p className="font-medium text-[#020817]">{attendance.date}</p>
                                          <p className="text-sm text-gray-600">{attendance.status}</p>
                                        </div>
                                      </div>
                                      <span className="inline-block bg-[#0F214D] text-white text-xs px-2 py-1 rounded-full">
                                        {attendance.status}
                                      </span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div className="text-center p-4 text-gray-500">
                                No attendance records found for this student
                              </div>
                            )}
                            <button className="w-full bg-[#0F214D] border border-gray-300 rounded-md h-10 px-4 py-2 flex items-center justify-center text-sm font-medium text-white hover:bg-[#0D1A3D]">
                              <Plus className="mr-2 h-4 w-4 sm:h-5 sm:w-5" /> Add Attendance Record
                            </button>
                          </div>
                        )}
                      </div>
                      <div className="flex justify-between p-4 sm:p-6">
                        <button
                          className="border border-gray-300 rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                          onClick={() => setActiveStudent(null)}
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
                    <h3 className="mt-4 text-base sm:text-lg font-medium text-gray-600">No Student Selected</h3>
                    <p className="mt-2 text-sm sm:text-base text-gray-500">Select a student from the list or add a new one</p>
                    <button
                      onClick={handleAddStudent}
                      className="mt-4 bg-[#0F214D] text-white px-3 py-1 sm:px-4 sm:py-2 rounded-md flex items-center justify-center hover:bg-[#0D1A3D] transition-colors text-sm sm:text-base mx-auto"
                    >
                      <Plus className="mr-2 h-4 w-4 sm:h-5 sm:w-5" /> Add New Student
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
}