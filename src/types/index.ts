export type UserRole = 'citizen' | 'leader' | 'institution' | 'admin';

export type IssueStatus = 'open' | 'in_progress' | 'resolved' | 'closed';

export type IssueCategory =
  | 'pothole'
  | 'power_outage'
  | 'drainage'
  | 'waste_management'
  | 'infrastructure'
  | 'public_complaint'
  | 'other';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  constituency?: string;
  avatar?: string;
  verified: boolean;
  createdAt: string;
}

export interface Issue {
  id: string;
  title: string;
  description: string;
  category: IssueCategory;
  status: IssueStatus;
  location: string;
  constituency: string;
  submittedBy: string;
  submittedAt: string;
  updatedAt: string;
  upvotes: number;
  comments: number;
  imageUrl?: string;
}

export interface Poll {
  id: string;
  title: string;
  description: string;
  options: PollOption[];
  createdBy: string;
  createdByName: string;
  constituency: string;
  endDate: string;
  totalVotes: number;
  status: 'active' | 'closed';
}

export interface PollOption {
  id: string;
  text: string;
  votes: number;
}

export interface Feedback {
  id: string;
  subject: string;
  message: string;
  category: string;
  submittedBy: string;
  submittedAt: string;
  status: 'pending' | 'reviewed' | 'actioned';
  targetInstitution: string;
}

export interface DashboardStats {
  totalIssues: number;
  openIssues: number;
  resolvedIssues: number;
  activePolls: number;
  totalFeedback: number;
  totalCitizens: number;
}
