'use client';

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { ClientProvider } from "@/components/providers/client-provider";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

// First, let's add a type for our attendance record
type AttendanceRecord = {
  date: string;
  checkIn: string;
  checkOut: string;
  status: string;
};

// Mock data - replace with API call
const employeeData = {
  id: 1,
  name: "Alex Thompson",
  email: "alex.t@company.com",
  department: "Engineering",
  avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
  attendance: [
    {
      date: "2024-03-01",
      checkIn: "09:00 AM",
      checkOut: "05:30 PM",
      status: "present"
    },
    {
      date: "2024-03-02",
      checkIn: "09:15 AM",
      checkOut: "", // Example of incomplete day
      status: "incomplete"
    },
    // Add more attendance records
  ]
};

const calendarClassName = cn(
  "rounded-md border p-3",
  "[&_.rdp]:p-0",
  "[&_.rdp-months]:grid [&_.rdp-months]:grid-cols-1",
  "[&_.rdp-month]:w-full",
  "[&_.rdp-table]:w-full",
  "[&_.rdp-cell]:p-0",
  "[&_.rdp-head_cell]:font-normal [&_.rdp-head_cell]:text-muted-foreground [&_.rdp-head_cell]:pb-2",
  "[&_.rdp-tbody]:gap-1",
  "[&_.rdp-day]:p-0 [&_.rdp-day]:h-9 [&_.rdp-day]:w-9",
  "[&_.rdp-day_button]:h-9 [&_.rdp-day_button]:w-9",
  "[&_.rdp-button]:h-9 [&_.rdp-button]:w-9",
  "[&_.rdp-button:hover]:bg-primary/50",
  "[&_.rdp-day_selected]:bg-primary [&_.rdp-day_selected]:rounded-md",
  "[&_.rdp-day_today]:bg-accent [&_.rdp-day_today]:rounded-md",
  "text-sm",
  "mx-auto"
);

export default function EmployeeDetails() {
  const params = useParams();
  const router = useRouter();
  const [date, setDate] = useState<Date>(new Date());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Format date consistently
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  if (!mounted) {
    return null;
  }

  // Update the attendance status filtering
  const presentDates = employeeData.attendance
    .filter(record => record.checkIn && record.checkOut)
    .map(record => new Date(record.date));

  const absentDates = employeeData.attendance
    .filter(record => !record.checkIn)
    .map(record => new Date(record.date));

  // In real app, fetch employee data based on params.employeeId

  return (
    <ClientProvider>
      <div className="min-h-screen bg-background p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex justify-between items-center">
            <Button 
              variant="ghost" 
              onClick={() => router.back()}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
            <ThemeToggle />
          </div>

          <div className="grid gap-8 md:grid-cols-[1fr,300px]">
            <div className="space-y-8">
              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={employeeData.avatarUrl} alt={employeeData.name} />
                    <AvatarFallback>{employeeData.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-2xl">{employeeData.name}</CardTitle>
                    <p className="text-muted-foreground">{employeeData.department}</p>
                    <p className="text-sm text-muted-foreground">{employeeData.email}</p>
                  </div>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Attendance History</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Check In</TableHead>
                        <TableHead>Check Out</TableHead>
                        <TableHead className="text-center">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {employeeData.attendance.map((record) => (
                        <TableRow key={record.date}>
                          <TableCell>
                            {formatDate(record.date)}
                          </TableCell>
                          <TableCell>{record.checkIn}</TableCell>
                          <TableCell>{record.checkOut}</TableCell>
                          <TableCell className="text-center">
                            {record.checkIn ? (
                              record.checkOut ? (
                                <span className="inline-flex items-center justify-center rounded-full px-3 py-1 text-xs font-medium bg-success/10 text-success">
                                  Present
                                </span>
                              ) : (
                                <span className="inline-flex items-center justify-center w-full text-muted-foreground">
                                  -
                                </span>
                              )
                            ) : (
                              <span className="inline-flex items-center justify-center rounded-full px-3 py-1 text-xs font-medium bg-destructive/10 text-destructive">
                                Absent
                              </span>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-8">
              <Card className="overflow-hidden">
                <CardHeader>
                  <CardTitle>Calendar View</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="px-4 pb-4">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={(date) => date && setDate(date)}
                      className={calendarClassName}
                      modifiers={{
                        present: presentDates,
                        absent: absentDates
                      }}
                      modifiersStyles={{
                        present: { 
                          backgroundColor: 'hsl(142 76% 36%)',
                          color: 'white',
                          fontWeight: '500'
                        },
                        absent: {
                          backgroundColor: 'hsl(0 84.2% 60.2%)',
                          color: 'white',
                          fontWeight: '500'
                        }
                      }}
                      modifiersClassNames={{
                        present: "rounded-md hover:opacity-90",
                        absent: "rounded-md hover:opacity-90"
                      }}
                      showOutsideDays={false}
                      fixedWeeks
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </ClientProvider>
  );
} 