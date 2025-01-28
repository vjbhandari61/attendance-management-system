import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/db';
import Employee from '@/models/Employee';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method === 'GET') {
    const employees = await Employee.find({});
    return res.status(200).json(employees);
  }

  if (req.method === 'POST') {
    const { name, email, department, avatarUrl } = req.body;
    const count = await Employee.countDocuments();

    const newEmployee = new Employee({ empId: count+1, name, email, department, avatarUrl });
    await newEmployee.save();
    return res.status(201).json(newEmployee);
  }

  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
} 