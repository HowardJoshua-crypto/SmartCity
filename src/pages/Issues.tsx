import { useState } from 'react';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';
import IssueCard from '../components/IssueCard';
import { issues } from '../data/mockData';
import type { IssueCategory, IssueStatus } from '../types';

const categories: { value: '' | IssueCategory; label: string }[] = [
  { value: '', label: 'All Categories' },
  { value: 'pothole', label: 'Pothole' },
  { value: 'power_outage', label: 'Power Outage' },
  { value: 'drainage', label: 'Drainage' },
  { value: 'waste_management', label: 'Waste Management' },
  { value: 'infrastructure', label: 'Infrastructure' },
  { value: 'public_complaint', label: 'Public Complaint' },
  { value: 'other', label: 'Other' },
];

const statuses: { value: '' | IssueStatus; label: string }[] = [
  { value: '', label: 'All Statuses' },
  { value: 'open', label: 'Open' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'resolved', label: 'Resolved' },
  { value: 'closed', label: 'Closed' },
];

export default function Issues() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<'' | IssueCategory>('');
  const [status, setStatus] = useState<'' | IssueStatus>('');
  const [showFilters, setShowFilters] = useState(false);

  const filtered = issues.filter((issue) => {
    const matchesSearch =
      !search ||
      issue.title.toLowerCase().includes(search.toLowerCase()) ||
      issue.description.toLowerCase().includes(search.toLowerCase()) ||
      issue.location.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = !category || issue.category === category;
    const matchesStatus = !status || issue.status === status;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Community Issues</h1>
        <p className="text-slate-500 mt-1">Browse and track service-delivery issues reported by citizens</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search issues by title, description or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-300 bg-white"
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-600 hover:bg-slate-50 bg-white transition-colors"
        >
          <SlidersHorizontal size={15} />
          Filters
          {(category || status) && (
            <span className="w-2 h-2 bg-primary-500 rounded-full" />
          )}
        </button>
      </div>

      {showFilters && (
        <div className="flex flex-wrap gap-3 mb-5 p-4 bg-white border border-slate-200 rounded-xl animate-fade-in">
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1.5">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as '' | IssueCategory)}
              className="text-sm border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-300 bg-white text-slate-700"
            >
              {categories.map((c) => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1.5">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as '' | IssueStatus)}
              className="text-sm border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-300 bg-white text-slate-700"
            >
              {statuses.map((s) => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
          </div>
          {(category || status) && (
            <div className="flex items-end">
              <button
                onClick={() => { setCategory(''); setStatus(''); }}
                className="text-sm text-primary-600 hover:text-primary-700 font-medium pb-2"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      )}

      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-slate-500">
          Showing <span className="font-medium text-slate-800">{filtered.length}</span> of {issues.length} issues
        </p>
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Filter size={14} />
          <span>Most recent</span>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16 text-slate-400">
          <Search size={40} className="mx-auto mb-3 opacity-40" />
          <p className="font-medium text-slate-600">No issues found</p>
          <p className="text-sm mt-1">Try adjusting your search or filters</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((issue) => (
            <IssueCard key={issue.id} issue={issue} />
          ))}
        </div>
      )}
    </div>
  );
}
