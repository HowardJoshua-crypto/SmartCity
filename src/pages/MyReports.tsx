import { ClipboardList, MessageCircle, ThumbsUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import StatusBadge from '../components/StatusBadge';
import { issues } from '../data/mockData';
import { currentUser } from '../data/mockData';

const myIssues = issues.filter((_, i) => i < 3);

const timelineEvents = [
  { date: '14 Nov 2024', event: 'Status updated to In Progress', type: 'update' },
  { date: '12 Nov 2024', event: 'Assigned to KCCA Roads Department', type: 'assign' },
  { date: '10 Nov 2024', event: 'Issue report submitted', type: 'submit' },
];

export default function MyReports() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          <ClipboardList size={26} className="text-primary-600" />
          My Reports
        </h1>
        <p className="text-slate-500 mt-1">Track and manage the issues you have reported</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {myIssues.length === 0 ? (
            <div className="text-center py-16 bg-white border border-slate-200 rounded-xl text-slate-400">
              <ClipboardList size={40} className="mx-auto mb-3 opacity-40" />
              <p className="font-medium text-slate-600">No reports yet</p>
              <p className="text-sm mt-1">
                <Link to="/report" className="text-primary-600 hover:underline">Report your first issue</Link>
              </p>
            </div>
          ) : (
            myIssues.map((issue) => (
              <div key={issue.id} className="bg-white border border-slate-200 rounded-xl p-5">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <h3 className="font-semibold text-slate-800 mb-1">{issue.title}</h3>
                    <p className="text-sm text-slate-500 line-clamp-1">{issue.description}</p>
                  </div>
                  <StatusBadge status={issue.status} />
                </div>

                <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-400 mb-3">
                  <span>{issue.location}</span>
                  <span>{issue.constituency}</span>
                  <span>Submitted {new Date(issue.submittedAt).toLocaleDateString('en-UG', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                  <div className="flex items-center gap-4 text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <ThumbsUp size={12} />
                      {issue.upvotes} upvotes
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle size={12} />
                      {issue.comments} comments
                    </span>
                  </div>
                  <Link
                    to={`/issues/${issue.id}`}
                    className="text-xs font-medium text-primary-600 hover:text-primary-700"
                  >
                    View details
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="space-y-5">
          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <h2 className="font-semibold text-slate-800 mb-4">Account Summary</h2>
            <div className="flex items-center gap-3 mb-4 pb-4 border-b border-slate-100">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                <span className="text-primary-700 font-bold">
                  {currentUser.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div>
                <p className="font-semibold text-slate-800">{currentUser.name}</p>
                <p className="text-sm text-slate-400">{currentUser.constituency}</p>
                {currentUser.verified && (
                  <span className="text-xs text-green-600 font-medium">Verified Citizen</span>
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="bg-slate-50 rounded-lg p-3">
                <p className="text-2xl font-bold text-primary-700">{myIssues.length}</p>
                <p className="text-xs text-slate-500 mt-0.5">Issues Reported</p>
              </div>
              <div className="bg-slate-50 rounded-lg p-3">
                <p className="text-2xl font-bold text-green-600">{myIssues.filter(i => i.status === 'resolved').length}</p>
                <p className="text-xs text-slate-500 mt-0.5">Resolved</p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <h2 className="font-semibold text-slate-800 mb-4">Latest Activity</h2>
            <div className="relative">
              <div className="absolute left-3 top-1 bottom-1 w-px bg-slate-100" />
              <div className="space-y-4">
                {timelineEvents.map((event, idx) => (
                  <div key={idx} className="flex items-start gap-3 pl-7 relative">
                    <div className="absolute left-2 top-1.5 w-2 h-2 rounded-full bg-primary-400 ring-2 ring-white" />
                    <div>
                      <p className="text-xs font-medium text-slate-700">{event.event}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{event.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
