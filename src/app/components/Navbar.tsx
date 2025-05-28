'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Bell, User, LogOut } from 'lucide-react';

export default function NavBar() {
  const [userRole] = useState<'Student' | 'Teacher'>('Student');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleLogout = () => {
    setDropdownOpen(false);
    // Add logout logic here if needed (clear tokens, etc.)
    router.push('/login');
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-white shadow-md border-b border-gray-200">
      <div className="flex items-center space-x-3"></div>

      <div className="flex items-center space-x-3 sm:space-x-4">
        <Link href="/notifications" className="relative">
          <Bell className="w-5 h-5 sm:w-6 sm:h-6 text-[#0F214D] cursor-pointer hover:text-[#2BA3EC] transition-colors" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            3
          </span>
        </Link>

        <div className="flex items-center space-x-2 sm:space-x-3 relative">
          <span className="text-sm font-medium text-[#0F214D] bg-[#2BA3EC]/10 px-2 py-1 rounded-md">
            {userRole}
          </span>

          <div className="relative">
            <div
              className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-300 rounded-full overflow-hidden cursor-pointer border-2 border-[#2BA3EC]/30 hover:border-[#2BA3EC] transition-all"
              onClick={toggleDropdown}
            >
              <Image
                src="/placeholder-avatar.jpg"
                alt={`${userRole} Avatar`}
                width={48}
                height={48}
                className="w-full h-full object-cover"
              />
            </div>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded-md z-50">
                <ul className="flex flex-col">
                  <li className="px-4 py-2 hover:bg-[#E6F0FA] cursor-pointer transition-colors">
                    <Link
                      href="/profile"
                      className="flex items-center space-x-2 text-[#0F214D]"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <User className="w-4 h-4" />
                      <span>Profile</span>
                    </Link>
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-[#E6F0FA] cursor-pointer transition-colors"
                    onClick={handleLogout}
                  >
                    <div className="flex items-center space-x-2 text-[#0F214D]">
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </div>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
