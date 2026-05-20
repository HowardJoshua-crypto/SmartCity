import { Link } from 'react-router-dom';
import { AlertCircle, BarChart2, Users, MessageSquare, TrendingUp, ArrowRight, ClipboardList } from 'lucide-react';
import StatCard from '../components/StatCard';
import IssueCard from '../components/IssueCard';
import { dashboardStats, issues, polls } from '../data/mockData';

export default function Dashboard() {
  const recentIssues = issues.slice(0, 3);

  const activePoll = polls[0];
  const totalVotes = activePoll.totalVotes;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Community Dashboard</h1>
        <p className="text-slate-500 mt-1">Real-time overview of civic issues and engagement in your constituency</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        <div className="col-span-2 md:col-span-1 lg:col-span-2">
          <StatCard
            label="Total Issues Reported"
            value={dashboardStats.totalIssues}
            icon={<AlertCircle size={20} className="text-blue-600" />}
            color="bg-blue-50"
            subtext="All time"
          />
        </div>
        <div className="col-span-2 md:col-span-1 lg:col-span-2">
          <StatCard
            label="Issues Resolved"
            value={dashboardStats.resolvedIssues}
            icon={<TrendingUp size={20} className="text-green-600" />}
            color="bg-green-50"
            subtext={`${Math.round((dashboardStats.resolvedIssues / dashboardStats.totalIssues) * 100)}% resolution rate`}
          />
        </div>
        <div className="col-span-2 md:col-span-1 lg:col-span-2">
          <StatCard
            label="Registered Citizens"
            value={dashboardStats.totalCitizens}
            icon={<Users size={20} className="text-purple-600" />}
            color="bg-purple-50"
            subtext="Verified accounts"
          />
        </div>
        <div className="col-span-2 md:col-span-1 lg:col-span-2">
          <StatCard
            label="Open Issues"
            value={dashboardStats.openIssues}
            icon={<ClipboardList size={20} className="text-amber-600" />}
            color="bg-amber-50"
            subtext="Awaiting action"
          />
        </div>
        <div className="col-span-2 md:col-span-1 lg:col-span-2">
          <StatCard
            label="Active Polls"
            value={dashboardStats.activePolls}
            icon={<BarChart2 size={20} className="text-indigo-600" />}
            color="bg-indigo-50"
            subtext="Open for votes"
          />
        </div>
        <div className="col-span-2 md:col-span-1 lg:col-span-2">
          <StatCard
            label="Feedback Submitted"
            value={dashboardStats.totalFeedback}
            icon={<MessageSquare size={20} className="text-rose-600" />}
            color="bg-rose-50"
            subtext="To institutions"
          />
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-slate-800">Recent Issues</h2>
            <Link
              to="/issues"
              className="flex items-center gap-1 text-sm text-primary-600 hover:text-primary-700 font-medium"
            >
              View all <ArrowRight size={14} />
            </Link>
          </div>
          <div className="space-y-3">
            {recentIssues.map((issue) => (
              <IssueCard key={issue.id} issue={issue} />
            ))}
          </div>
        </div>

        <div className="space-y-5">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-slate-800">Featured Poll</h2>
              <Link to="/polls" className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1">
                All polls <ArrowRight size={14} />
              </Link>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-5">
              <div className="flex items-start justify-between gap-2 mb-1">
                <span className="text-xs font-medium text-primary-600 bg-primary-50 px-2 py-0.5 rounded-full">Active</span>
                <span className="text-xs text-slate-400">Ends {new Date(activePoll.endDate).toLocaleDateString('en-UG', { day: 'numeric', month: 'short' })}</span>
              </div>
              <h3 className="font-semibold text-slate-800 mt-2 mb-1 text-sm leading-snug">{activePoll.title}</h3>
              <p className="text-xs text-slate-500 mb-4">By {activePoll.createdByName}</p>

              <div className="space-y-2.5">
                {activePoll.options.map((option) => {
                  const pct = Math.round((option.votes / totalVotes) * 100);
                  return (
                    <div key={option.id}>
                      <div className="flex justify-between text-xs text-slate-600 mb-1">
                        <span>{option.text}</span>
                        <span className="font-medium">{pct}%</span>
                      </div>
                      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary-500 rounded-full transition-all duration-500"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100">
                <span className="text-xs text-slate-400">{totalVotes.toLocaleString()} votes</span>
                <Link to="/polls" className="text-xs font-medium text-primary-600 hover:text-primary-700">
                  Vote now
                </Link>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-slate-800 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-3">
              <Link to="/report" className="flex flex-col items-center gap-2 p-4 bg-primary-700 text-white rounded-xl hover:bg-primary-800 transition-colors text-center">
                <AlertCircle size={22} />
                <span className="text-xs font-semibold leading-tight">Report an Issue</span>
              </Link>
              <Link to="/polls" className="flex flex-col items-center gap-2 p-4 bg-white border border-slate-200 text-slate-700 rounded-xl hover:border-primary-300 hover:bg-primary-50 transition-colors text-center">
                <BarChart2 size={22} />
                <span className="text-xs font-semibold leading-tight">Vote in Poll</span>
              </Link>
              <Link to="/feedback" className="flex flex-col items-center gap-2 p-4 bg-white border border-slate-200 text-slate-700 rounded-xl hover:border-primary-300 hover:bg-primary-50 transition-colors text-center">
                <MessageSquare size={22} />
                <span className="text-xs font-semibold leading-tight">Send Feedback</span>
              </Link>
              <Link to="/my-reports" className="flex flex-col items-center gap-2 p-4 bg-white border border-slate-200 text-slate-700 rounded-xl hover:border-primary-300 hover:bg-primary-50 transition-colors text-center">
                <ClipboardList size={22} />
                <span className="text-xs font-semibold leading-tight">My Reports</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
