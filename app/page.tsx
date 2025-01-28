'use client';

import { useState, useEffect } from 'react'
import type { ReactElement } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AttendanceModal } from '@/components/attendance-modal'

export default function UserDashboard(): ReactElement {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentTime, setCurrentTime] = useState<string>('')
  const [currentDate, setCurrentDate] = useState<string>('')

  useEffect(() => {
    // Set initial values
    const now = new Date()
    setCurrentDate(now.toLocaleDateString())
    setCurrentTime(now.toLocaleTimeString())

    // Update time every second
    const timer = setInterval(() => {
      const date = new Date()
      setCurrentDate(date.toLocaleDateString())
      setCurrentTime(date.toLocaleTimeString())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleAttendanceSubmit = (data: {
    image: string
    location: { lat: number; lng: number }
  }) => {
    // TODO: Send data to backend
    console.log('Attendance data:', data)
    setIsModalOpen(false)
  }

  // Mock attendance data
  const mockAttendance = [
    { date: '2024-01-29', time: '09:00 AM' },
    { date: '2024-01-28', time: '08:55 AM' },
    { date: '2024-01-27', time: '09:05 AM' },
  ]

  return (
    <main className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Welcome, John Doe
          </h1>
          <p className="text-gray-500 mt-2">
            Mark your attendance for today
          </p>
        </div>

        {/* Attendance Card */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Mark Attendance</CardTitle>
            <CardDescription>
              Your location and photo will be captured to mark your attendance
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center py-8">
            <Button
              size="lg"
              className="w-full max-w-sm"
              onClick={() => setIsModalOpen(true)}
            >
              Mark Attendance
            </Button>
            <p className="text-sm text-gray-500 mt-4 text-center">
              Make sure you&apos;re in a well-lit area and your face is clearly visible
            </p>
          </CardContent>
        </Card>

        {/* Recent Attendance Section */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Attendance</CardTitle>
            <CardDescription>
              Your attendance history for the past week
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="divide-y divide-gray-100">
              {mockAttendance.map((record, index) => (
                <div key={index} className="py-4 flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">
                      {record.date}
                    </p>
                    <p className="text-sm text-gray-500">
                      Marked at {record.time}
                    </p>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Present
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <AttendanceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAttendanceSubmit}
      />
    </main>
  )
}
