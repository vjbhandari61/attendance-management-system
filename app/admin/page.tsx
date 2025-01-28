'use client';

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { PlusCircle, ArrowLeft } from "lucide-react";
import { AddEmployeeDialog } from "@/components/add-employee-dialog";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { IEmployee } from "@/models/Employee";

const AdminDashboard = () => {
  const [employees, setEmployees] = useState<IEmployee[]>([]); // Use the Employee type
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchEmployees = async () => {
      const response = await fetch('/api/employees');
      const data: IEmployee[] = await response.json(); // Type the response data
      setEmployees(data);
    };

    fetchEmployees();
  }, []);

  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    employee.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    employee.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddEmployee = async (data: IEmployee) => {
    data.avatarUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.name}`
    const response = await fetch('/api/employees', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const newEmployee = await response.json();
      // Update your state or UI accordingly
    }
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <Button
            variant="ghost"
            onClick={() => router.push('/')}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <ThemeToggle />
        </div>

        <div className="text-center">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage your employees and view attendance records</p>
        </div>

        <div className="flex justify-between items-center gap-4">
          <Input
            placeholder="Search employees..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-sm"
          />
          <Button onClick={() => setIsDialogOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Employee
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEmployees.map((employee) => (
            <Card
              key={employee.empId}
              className={cn(
                "transition-colors duration-200",
                "hover:bg-primary hover:text-primary-foreground",
                "group cursor-pointer"
              )}
              onClick={() => router.push(`/admin/${employee.empId}`)}
            >
              <CardHeader className="flex flex-row items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={employee.avatarUrl} alt={employee.name} />
                  <AvatarFallback>{employee.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <CardTitle className="text-lg">{employee.name}</CardTitle>
                  <p className="text-sm text-muted-foreground group-hover:text-primary-foreground/80">
                    {employee.department}
                  </p>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground group-hover:text-primary-foreground/80">
                      Email
                    </p>
                    <p className="text-sm truncate">{employee.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground group-hover:text-primary-foreground/80">
                      Attendance
                    </p>
                    <p
                      className={cn(
                        "text-sm font-medium",
                        "group-hover:text-primary-foreground",
                        !employee.attendance && "text-muted-foreground"
                      )}
                    >
                      {employee.attendance?.length > 0
                        ? employee.attendance.map((record, i) => {
                          if (record.checkIn && record.checkOut) {
                            return (
                              <span key={i} className="text-green-500">
                                Present
                              </span>
                            );
                          } else if (record.checkIn && !record.checkOut) {
                            return (
                              <span key={i} className="text-yellow-500">
                                -
                              </span>
                            );
                          } else {
                            return (
                              <span key={i} className="text-red-500">
                                Absent
                              </span>
                            );
                          }
                        })
                        : "No records"}
                    </p>
                  </div>

                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <AddEmployeeDialog
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          onSubmit={handleAddEmployee}
        />
      </div>
    </div>
  );
};

export default AdminDashboard; 