import mongoose, { Schema, Document } from 'mongoose';

export interface IAttendance {
  date: Date;
  checkIn: Date;
  checkOut: Date;
}

export interface IEmployee extends Document {
  empId: number;
  name: string;
  email: string;
  department: string;
  attendance: IAttendance[];
  avatarUrl: string;
}

const AttendanceSchema: Schema = new Schema({
  date: { type: Date, required: true },
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
});

const EmployeeSchema: Schema = new Schema({
  empId: { type: Number },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  department: { type: String, required: true },
  attendance: { type: [AttendanceSchema], default: [] },
  avatarUrl: { type: String },
});

export default mongoose.models.Employee || mongoose.model<IEmployee>('Employee', EmployeeSchema);
