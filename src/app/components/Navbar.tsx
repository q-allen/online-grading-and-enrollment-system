'use client';

import Image from 'next/image';

export default function NavBar() {
  return (
    <nav className="flex justify-between items-center p-4 bg-white">
      <div className="text-xl font-bold text-[#0F214D]">College Information System</div>
      <div className="flex items-center">
        <span className="text-blue-700 mr-2">Student</span>
        <div className="w-10 h-10 bg-gray-300 rounded-full overflow-hidden">
          <Image src="/placeholder-avatar.jpg" alt="Student Avatar" width={40} height={40} className="w-full h-full object-cover" />
        </div>
      </div>
    </nav>
  );
}