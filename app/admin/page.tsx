'use client';

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { PlusCircle, ArrowLeft } from "lucide-react";
import { AddEmployeeDialog } from "@/components/add-employee-dialog";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

// Mock data
const mockAttendanceRecords = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    date: "2024-01-29",
    time: "09:00 AM",
    location: { lat: "40.7128° N", lng: "74.0060° W" },
    status: "Present"
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    date: "2024-01-29",
    time: "08:45 AM",
    location: { lat: "40.7128° N", lng: "74.0060° W" },
    status: "Present"
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike@example.com",
    date: "2024-01-29",
    time: "09:15 AM",
    location: { lat: "40.7128° N", lng: "74.0060° W" },
    status: "Present"
  },
  {
    id: 4,
    name: "Sarah Wilson",
    email: "sarah@example.com",
    date: "2024-01-29",
    time: "09:30 AM",
    location: { lat: "40.7128° N", lng: "74.0060° W" },
    status: "Present"
  },
  {
    id: 5,
    name: "Alex Thompson",
    email: "alex@example.com",
    date: "2024-01-29",
    time: "08:30 AM",
    location: { lat: "40.7128° N", lng: "74.0060° W" },
    status: "Present"
  }
];

export default function AdminDashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const router = useRouter();

  const filteredRecords = mockAttendanceRecords.filter(record => {
    const matchesSearch = 
      record.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesDate = selectedDate ? record.date === selectedDate : true;
    
    return matchesSearch && matchesDate;
  });

  const handleAddEmployee = (data: { name: string; email: string; department: string }) => {
    // TODO: Integrate with your backend
    console.log("New employee:", data);
    setIsDialogOpen(false);
  };

  return (
    <main className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Admin Dashboard
          </h1>
          <p className="text-gray-500 mt-2">
            Manage and monitor employee attendance
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Total Attendance</CardTitle>
              <CardDescription>Today&apos;s attendance count</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-blue-600">25</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Present</CardTitle>
              <CardDescription>Employees present today</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-green-600">22</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Absent</CardTitle>
              <CardDescription>Employees absent today</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-red-600">3</p>
            </CardContent>
          </Card>
        </div>

        {/* Attendance List */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Attendance Records</CardTitle>
                <CardDescription>View and manage employee attendance</CardDescription>
              </div>
              <div className="flex gap-4">
                <input
                  type="search"
                  placeholder="Search employees..."
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <input
                  type="date"
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Employee</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Date & Time</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Location</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Photo</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredRecords.map((record) => (
                    <tr key={record.id} className="hover:bg-gray-50">
                      <td className="px-4 py-4">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            <div className="h-10 w-10 rounded-full bg-gray-200" />
                          </div>
                          <div className="ml-4">
                            <div className="font-medium text-gray-900">{record.name}</div>
                            <div className="text-gray-500">{record.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500">
                        <div>{record.date}</div>
                        <div>{record.time}</div>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500">
                        <div>Lat: {record.location.lat}</div>
                        <div>Long: {record.location.lng}</div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="h-12 w-12 rounded bg-gray-200" />
                      </td>
                      <td className="px-4 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {record.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-6">
              <div className="text-sm text-gray-500">
                Showing {filteredRecords.length} of {mockAttendanceRecords.length} entries
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">Previous</Button>
                <Button variant="outline" size="sm">Next</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
} 