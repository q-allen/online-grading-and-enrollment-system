"use client";

import Image from "next/image";
import { useState } from "react";
import { Pencil, Save, X, Camera } from "lucide-react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function StudentProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    fullName: "Juan Dela Cruz",
    studentId: "2023-0001",
    email: "juan@student.edu.ph",
    course: "BS Computer Science",
    year: "3rd Year",
    contact: "0917-123-4567",
    emergencyContact: "",
    address: "",
    avatar: "/images/avatar.png",
  });
  const [avatarPreview, setAvatarPreview] = useState(profile.avatar);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
        setProfile({ ...profile, avatar: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setAvatarPreview(profile.avatar); // Reset avatar preview on cancel
    setProfile({
      ...profile,
      fullName: "Juan Dela Cruz",
      studentId: "2023-0001",
      email: "juan@student.edu.ph",
      course: "BS Computer Science",
      year: "3rd Year",
      contact: "0917-123-4567",
      emergencyContact: "",
      address: "",
    });
  };

  const calculateProfileCompleteness = () => {
    const requiredFields = [
      profile.fullName,
      profile.studentId,
      profile.email,
      profile.course,
      profile.year,
      profile.contact,
    ];
    const filledFields = requiredFields.filter((field) => field.trim() !== "").length;
    return Math.round((filledFields / requiredFields.length) * 100);
  };

  return (
    <div className="min-h-screen flex font-sans bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <div className="space-y-6 p-4 sm:p-6 md:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#0F214D] uppercase">My Profile</h1>

          <div className="bg-white rounded-lg shadow-md">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-[#0F214D] uppercase">Personal Information</h2>
              <p className="text-sm text-gray-600 mt-1">
                Profile completeness: {calculateProfileCompleteness()}%
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                <div
                  className="bg-[#2BA3EC] h-2.5 rounded-full"
                  style={{ width: `${calculateProfileCompleteness()}%` }}
                />
              </div>
            </div>

            <div className="p-6">
              <div className="flex flex-col sm:flex-row gap-6">
                {/* Avatar */}
                <div className="flex flex-col items-center space-y-3 w-full sm:w-auto">
                  <div className="relative">
                    <Image
                      src={avatarPreview}
                      alt="Student Avatar"
                      width={120}
                      height={120}
                      className="rounded-full border-2 border-[#2BA3EC]/30"
                    />
                    {isEditing && (
                      <label
                        htmlFor="avatar-upload"
                        className="absolute bottom-0 right-0 bg-[#2BA3EC] text-white p-2 rounded-full cursor-pointer hover:bg-[#1d7ec9] transition-colors"
                      >
                        <Camera className="w-5 h-5" />
                        <input
                          id="avatar-upload"
                          type="file"
                          accept="image/*"
                          onChange={handleAvatarChange}
                          className="hidden"
                          title="Upload avatar"
                          placeholder="Upload avatar"
                        />
                      </label>
                    )}
                  </div>
                  <p className="text-lg font-semibold text-center text-[#0F214D]">
                    {profile.fullName}
                  </p>
                </div>

                {/* Profile Info */}
                <div className="flex-1">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-[#0F214D]">Student ID</label>
                      <input
                        type="text"
                        name="studentId"
                        value={profile.studentId}
                        onChange={handleChange}
                        disabled={!isEditing}
                        placeholder="Enter Student ID"
                        className="w-full border px-3 py-2 rounded-md mt-1 disabled:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#2BA3EC]"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-[#0F214D]">Full Name</label>
                      <input
                        type="text"
                        name="fullName"
                        value={profile.fullName}
                        onChange={handleChange}
                        disabled={!isEditing}
                        placeholder="Enter Full Name"
                        className="w-full border px-3 py-2 rounded-md mt-1 disabled:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#2BA3EC]"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-[#0F214D]">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={profile.email}
                        onChange={handleChange}
                        disabled={!isEditing}
                        placeholder="Enter Email"
                        className="w-full border px-3 py-2 rounded-md mt-1 disabled:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#2BA3EC]"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-[#0F214D]">Contact Number</label>
                      <input
                        type="text"
                        name="contact"
                        value={profile.contact}
                        onChange={handleChange}
                        disabled={!isEditing}
                        placeholder="Enter Contact Number"
                        className="w-full border px-3 py-2 rounded-md mt-1 disabled:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#2BA3EC]"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-[#0F214D]">Course</label>
                      <input
                        type="text"
                        name="course"
                        value={profile.course}
                        onChange={handleChange}
                        disabled={!isEditing}
                        placeholder="Enter Course"
                        className="w-full border px-3 py-2 rounded-md mt-1 disabled:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#2BA3EC]"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-[#0F214D]">Year Level</label>
                      <input
                        type="text"
                        name="year"
                        value={profile.year}
                        onChange={handleChange}
                        disabled={!isEditing}
                        placeholder="Enter Year Level"
                        className="w-full border px-3 py-2 rounded-md mt-1 disabled:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#2BA3EC]"
                      />
                    </div>
                  </div>

                  {/* Additional Details (Collapsible) */}
                  <div className="mt-6">
                    <button
                      type="button"
                      className="text-[#2BA3EC] text-sm font-medium flex items-center hover:underline"
                      onClick={() => setProfile((prev) => ({ ...prev, emergencyContact: prev.emergencyContact ? "" : "0917-987-6543", address: prev.address ? "" : "123 Example St, Manila" }))}
                    >
                      {profile.emergencyContact || profile.address ? "Hide Additional Details" : "Show Additional Details"}
                    </button>
                    {(profile.emergencyContact || profile.address) && (
                      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-[#0F214D]">Emergency Contact</label>
                          <input
                            type="text"
                            name="emergencyContact"
                            value={profile.emergencyContact}
                            onChange={handleChange}
                            disabled={!isEditing}
                            placeholder="Enter Emergency Contact"
                            className="w-full border px-3 py-2 rounded-md mt-1 disabled:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#2BA3EC]"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-[#0F214D]">Address</label>
                          <input
                            type="text"
                            name="address"
                            value={profile.address}
                            onChange={handleChange}
                            disabled={!isEditing}
                            placeholder="Enter Address"
                            className="w-full border px-3 py-2 rounded-md mt-1 disabled:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#2BA3EC]"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-end gap-2 mt-6">
                    {isEditing && (
                      <button
                        type="button"
                        onClick={handleCancel}
                        className="inline-flex items-center gap-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-100 transition-colors"
                      >
                        <X className="w-4 h-4" /> Cancel
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={handleEditToggle}
                      className="inline-flex items-center gap-2 bg-[#0F214D] text-white px-4 py-2 rounded-md hover:bg-[#1d7ec9] transition-colors"
                    >
                      {isEditing ? (
                        <>
                          <Save className="w-4 h-4" /> Save
                        </>
                      ) : (
                        <>
                          <Pencil className="w-4 h-4" /> Edit
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}