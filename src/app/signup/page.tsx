'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MdAppRegistration } from 'react-icons/md';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    studentId: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // Student signup only
    console.log("Student Signup:", {
      firstName: formData.firstName,
      middleName: formData.middleName,
      lastName: formData.lastName,
      studentId: formData.studentId,
      password: formData.password,
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      {/* Logo and Title */}
      <div className="flex flex-row items-center mb-8">
        <Image src="/images/logo.png" alt="Logo" width={80} height={80} className="mr-4" />
        <h1 className="text-4xl font-bold text-[#0F214D]">SCSIT</h1>
      </div>

      {/* Signup Form */}
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-[#0F214D] mb-4">Create Your Account</h2>
        <p className="text-center text-gray-600 mb-6">
            Please fill in the details below to register as a student.
        </p>

        <form onSubmit={handleSubmit}>
          {/* Student Fields */}
          <div className="grid grid-cols-1 gap-4 mb-4">
            <input
              name="firstName"
              type="text"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="p-3 border rounded-md bg-[#AAFIFF] text-gray-700"
            />
            <input
              name="middleName"
              type="text"
              placeholder="Middle Name (Optional)"
              value={formData.middleName}
              onChange={handleChange}
              className="p-3 border rounded-md bg-[#AAFIFF] text-gray-700"
            />
            <input
              name="lastName"
              type="text"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="p-3 border rounded-md bg-[#AAFIFF] text-gray-700"
            />
            <input
              name="studentId"
              type="text"
              placeholder="Student ID"
              value={formData.studentId}
              onChange={handleChange}
              required
              className="p-3 border rounded-md bg-[#AAFIFF] text-gray-700"
            />
          </div>

          {/* Password Fields */}
          <div className="grid grid-cols-1 gap-4 mb-6">
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="p-3 border rounded-md bg-[#AAFIFF] text-gray-700"
            />
            <input
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="p-3 border rounded-md bg-[#AAFIFF] text-gray-700"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full flex items-center justify-center bg-[#0B5FB0] text-white p-3 rounded-md hover:bg-[#2BA3EC]"
          >
            <MdAppRegistration className="mr-2" />
            Sign Up
          </button>
        </form>

        {/* Login Link */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{' '}
          <Link href="/login" className="text-[#0B5FB0] hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;