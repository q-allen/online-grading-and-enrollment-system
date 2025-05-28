"use client";

import { useState } from 'react';
import Image from 'next/image';
import { FaSchool, FaChalkboardTeacher } from 'react-icons/fa';
import { CiLogin } from 'react-icons/ci';
import Link from 'next/link';

const LoginPage = () => {
  const [role, setRole] = useState<'student' | 'teacher'>('student');
  const [studentId, setStudentId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (role === 'student') {
      console.log('Student Login:', { studentId, password });
    } else {
      console.log('Teacher Login:', { email, password });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-[#EBFCFF] to-[#D6F0FF] font-sans px-4">
      {/* Logo and Title */}
      <div className="flex flex-row items-center mb-8">
        <Image
          src="/images/logo.png"
          alt="SCSIT Logo"
          width={100}
          height={100}
          priority
          className="mr-4"
        />
        <h1 className="text-4xl font-bold text-[#0F214D]">SCSIT</h1>
      </div>

      {/* Login Form */}
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-[#0F214D] mb-2">LOGIN</h2>
        <p className="text-center text-gray-600 mb-6">Sign in to access your college account</p>

        <form onSubmit={handleSubmit}>
          {/* Role-Based Input Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {role === 'student' ? 'Student ID No.' : 'Email Address'}
            </label>
            <input
              type={role === 'student' ? 'text' : 'email'}
              value={role === 'student' ? studentId : email}
              onChange={(e) => (role === 'student' ? setStudentId(e.target.value) : setEmail(e.target.value))}
              placeholder={role === 'student' ? 'Enter your student ID' : 'Enter your email address'}
              className="w-full p-3 border rounded-md bg-[#AAFIFF] text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#0F214D]"
              required
            />
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full p-3 border rounded-md bg-[#AAFIFF] text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#0F214D]"
              required
            />
          </div>

          {/* Role Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">I am a:</label>
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => setRole('student')}
                className={`flex-1 flex items-center justify-center p-3 border rounded-md ${
                  role === 'student' ? 'border-[#0F214D] text-[#0F214D]' : 'border-gray-300 text-gray-600'
                }`}
              >
                <FaSchool className="mr-2" />
                Student
              </button>
              <button
                type="button"
                onClick={() => setRole('teacher')}
                className={`flex-1 flex items-center justify-center p-3 border rounded-md ${
                  role === 'teacher' ? 'border-[#0F214D] text-[#0F214D]' : 'border-gray-300 text-gray-600'
                }`}
              >
                <FaChalkboardTeacher className="mr-2" />
                Teacher
              </button>
            </div>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            className="w-full flex items-center justify-center bg-[#0B5FB0] text-white p-3 rounded-md hover:bg-[#2BA3EC]"
          >
            <CiLogin className="mr-2" />
            Sign In
          </button>
        </form>

        {/* Sign Up Link — only show for student */}
        {role === 'student' && (
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link href="/signup" className="text-[#0B5FB0] hover:underline font-medium">
                Sign up here
              </Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
