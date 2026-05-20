import { ThumbsUp, MessageCircle, MapPin, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Issue } from '../types';
import StatusBadge from './StatusBadge';

const categoryLabels: Record<string, string> = {
  pothole: 'Pothole',
  power_outage: 'Power Outage',
  drainage: 'Drainage',
  waste_management: 'Waste Management',
  infrastructure: 'Infrastructure',
  public_complaint: 'Public Complaint',
  other: 'Other',
};

export default function IssueCard({ issue }: { issue: Issue }) {
  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString('en-UG', { day: 'numeric', month: 'short', year: 'numeric' });

  return (
    <Link to={`/issues/${issue.id}`} className="block">
      <div className="bg-white border border-slate-200 rounded-xl p-5 hover:border-primary-300 hover:shadow-md transition-all duration-200 animate-fade-in">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
              {categoryLabels[issue.category]}
            </span>
            <StatusBadge status={issue.status} />
          </div>
        </div>

        <h3 className="font-semibold text-slate-800 mb-1.5 line-clamp-2 leading-snug">{issue.title}</h3>
        <p className="text-sm text-slate-500 line-clamp-2 mb-3">{issue.description}</p>

        <div className="flex items-center gap-3 text-xs text-slate-400 mb-3">
          <span className="flex items-center gap-1">
            <MapPin size={11} />
            {issue.constituency}
          </span>
          <span className="flex items-center gap-1">
            <Calendar size={11} />
            {formatDate(issue.submittedAt)}
          </span>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
          <span className="text-xs text-slate-400">By {issue.submittedBy}</span>
          <div className="flex items-center gap-3">
            <button
              className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-primary-600 transition-colors"
              onClick={(e) => e.preventDefault()}
            >
              <ThumbsUp size={13} />
              {issue.upvotes}
            </button>
            <span className="flex items-center gap-1.5 text-xs text-slate-500">
              <MessageCircle size={13} />
              {issue.comments}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
