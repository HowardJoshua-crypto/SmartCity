import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Calendar, ThumbsUp, MessageCircle, User } from 'lucide-react';
import StatusBadge from '../components/StatusBadge';
import { issues } from '../data/mockData';

const categoryLabels: Record<string, string> = {
  pothole: 'Pothole / Road Damage',
  power_outage: 'Power Outage',
  drainage: 'Drainage / Flooding',
  waste_management: 'Waste Management',
  infrastructure: 'Infrastructure',
  public_complaint: 'Public Complaint',
  other: 'Other',
};

export default function IssueDetail() {
  const { id } = useParams<{ id: string }>();
  const issue = issues.find((i) => i.id === id);

  if (!issue) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <p className="text-slate-500 mb-4">Issue not found.</p>
        <Link to="/issues" className="text-primary-600 hover:underline text-sm">Back to issues</Link>
      </div>
    );
  }

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString('en-UG', {
      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
    });

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 animate-fade-in">
      <Link
        to="/issues"
        className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 mb-6"
      >
        <ArrowLeft size={15} />
        Back to Issues
      </Link>

      <div className="bg-white border border-slate-200 rounded-xl p-6 mb-5">
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
            {categoryLabels[issue.category]}
          </span>
          <StatusBadge status={issue.status} />
        </div>

        <h1 className="text-xl font-bold text-slate-900 mb-2">{issue.title}</h1>
        <p className="text-slate-600 leading-relaxed mb-5">{issue.description}</p>

        <div className="grid sm:grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2 text-slate-500">
            <MapPin size={15} className="text-slate-400 flex-shrink-0" />
            <div>
              <span className="block text-xs text-slate-400">Location</span>
              <span className="text-slate-700 font-medium">{issue.location}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-slate-500">
            <MapPin size={15} className="text-slate-400 flex-shrink-0" />
            <div>
              <span className="block text-xs text-slate-400">Constituency</span>
              <span className="text-slate-700 font-medium">{issue.constituency}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-slate-500">
            <Calendar size={15} className="text-slate-400 flex-shrink-0" />
            <div>
              <span className="block text-xs text-slate-400">Submitted</span>
              <span className="text-slate-700 font-medium">{formatDate(issue.submittedAt)}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-slate-500">
            <User size={15} className="text-slate-400 flex-shrink-0" />
            <div>
              <span className="block text-xs text-slate-400">Reported by</span>
              <span className="text-slate-700 font-medium">{issue.submittedBy}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 mb-5">
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-600 hover:border-primary-300 hover:text-primary-700 hover:bg-primary-50 transition-all">
          <ThumbsUp size={15} />
          Upvote ({issue.upvotes})
        </button>
        <span className="flex items-center gap-2 text-sm text-slate-500">
          <MessageCircle size={15} />
          {issue.comments} comments
        </span>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-6">
        <h2 className="font-semibold text-slate-800 mb-4">Status Timeline</h2>
        <div className="relative">
          <div className="absolute left-3 top-1 bottom-1 w-px bg-slate-100" />
          <div className="space-y-5">
            {[
              { date: issue.updatedAt, event: `Status: ${issue.status.replace('_', ' ')}`, color: 'bg-primary-400' },
              { date: issue.submittedAt, event: 'Issue reported and submitted', color: 'bg-slate-300' },
            ].map((step, idx) => (
              <div key={idx} className="flex items-start gap-4 pl-8 relative">
                <div className={`absolute left-2 top-1.5 w-2.5 h-2.5 rounded-full ring-2 ring-white ${step.color}`} />
                <div>
                  <p className="text-sm font-medium text-slate-800 capitalize">{step.event}</p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {new Date(step.date).toLocaleDateString('en-UG', {
                      day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
