import { Role } from './auth';

export interface Employee {
  id: string;
  employeeCode: string;
  name: string;
  email: string;
  phone: string;
  role: Role;
  department: 'Management' | 'Sales' | 'Finance' | 'Operations' | 'Support';
  status: 'active' | 'on_leave' | 'terminated';
  joinDate: string;
  salaryMonthly: number;
}
