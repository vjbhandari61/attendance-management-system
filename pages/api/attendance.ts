import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/db';
import Employee from '@/models/Employee';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method === 'PUT') {
    const { email, attendance } = req.body;

    const employee = await Employee.findOneAndUpdate(
      { email },
      { attendance },
      { new: true }
    );

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    return res.status(200).json(employee);
  }

  res.setHeader('Allow', ['PUT']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
} 