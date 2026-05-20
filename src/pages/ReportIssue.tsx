import { useState } from 'react';
import { CheckCircle, Upload, MapPin, AlertCircle } from 'lucide-react';
import type { IssueCategory } from '../types';

const categories: { value: IssueCategory; label: string; description: string }[] = [
  { value: 'pothole', label: 'Pothole / Road Damage', description: 'Damaged roads, potholes, cracks' },
  { value: 'power_outage', label: 'Power Outage', description: 'Electricity supply issues' },
  { value: 'drainage', label: 'Drainage / Flooding', description: 'Blocked drains, flooding' },
  { value: 'waste_management', label: 'Waste Management', description: 'Garbage collection problems' },
  { value: 'infrastructure', label: 'Damaged Infrastructure', description: 'Bridges, buildings, lights' },
  { value: 'public_complaint', label: 'Public Complaint', description: 'Other public service issues' },
  { value: 'other', label: 'Other', description: 'Any other civic issue' },
];

const constituencies = [
  'Kampala Central', 'Kawempe North', 'Kawempe South', 'Lubaga North', 'Lubaga South',
  'Nakawa East', 'Nakawa West', 'Makindye East', 'Makindye West', 'Rubaga',
];

export default function ReportIssue() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: '' as IssueCategory | '',
    location: '',
    constituency: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isValid = form.title && form.description && form.category && form.location && form.constituency;

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16 text-center animate-fade-in">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
          <CheckCircle size={32} className="text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Issue Reported Successfully</h2>
        <p className="text-slate-500 mb-2">
          Your report has been submitted and assigned reference number{' '}
          <span className="font-semibold text-slate-700">#CP-{Math.floor(Math.random() * 90000) + 10000}</span>
        </p>
        <p className="text-slate-500 mb-8 text-sm">
          The relevant authority will review and respond to your report. You can track its progress in{' '}
          <a href="/my-reports" className="text-primary-600 hover:underline">My Reports</a>.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => { setSubmitted(false); setForm({ title: '', description: '', category: '', location: '', constituency: '' }); }}
            className="px-6 py-2.5 bg-primary-700 text-white rounded-lg font-medium hover:bg-primary-800 transition-colors"
          >
            Report Another Issue
          </button>
          <a href="/" className="px-6 py-2.5 border border-slate-200 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-colors">
            Back to Dashboard
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Report a Service Issue</h1>
        <p className="text-slate-500 mt-1">Submit a report about a public service delivery problem in your community</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <h2 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
            <AlertCircle size={18} className="text-primary-600" />
            Issue Details
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Issue Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Brief description of the issue (e.g. Large pothole on Entebbe Road)"
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Category <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat.value}
                    type="button"
                    onClick={() => setForm((prev) => ({ ...prev, category: cat.value }))}
                    className={`text-left p-3 rounded-lg border text-xs transition-all ${
                      form.category === cat.value
                        ? 'border-primary-500 bg-primary-50 text-primary-700'
                        : 'border-slate-200 hover:border-slate-300 text-slate-600'
                    }`}
                  >
                    <span className="font-medium block">{cat.label}</span>
                    <span className="text-slate-400 block mt-0.5">{cat.description}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Detailed Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={4}
                placeholder="Provide as much detail as possible about the issue, its severity, and impact on the community..."
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-300 resize-none"
              />
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <h2 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
            <MapPin size={18} className="text-primary-600" />
            Location Information
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Specific Location <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="Street name, landmark, or area (e.g. Entebbe Road, near Shell Station)"
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Constituency <span className="text-red-500">*</span>
              </label>
              <select
                name="constituency"
                value={form.constituency}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-300 bg-white text-slate-700"
              >
                <option value="">Select constituency</option>
                {constituencies.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <h2 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
            <Upload size={18} className="text-primary-600" />
            Photo Evidence (Optional)
          </h2>
          <div className="border-2 border-dashed border-slate-200 rounded-lg p-8 text-center hover:border-primary-300 transition-colors cursor-pointer">
            <Upload size={24} className="mx-auto text-slate-300 mb-2" />
            <p className="text-sm text-slate-500">Click to upload or drag and drop</p>
            <p className="text-xs text-slate-400 mt-1">PNG, JPG up to 10MB</p>
          </div>
        </div>

        <button
          type="submit"
          disabled={!isValid}
          className={`w-full py-3 rounded-xl font-semibold text-sm transition-all ${
            isValid
              ? 'bg-primary-700 text-white hover:bg-primary-800 shadow-sm'
              : 'bg-slate-100 text-slate-400 cursor-not-allowed'
          }`}
        >
          Submit Issue Report
        </button>
      </form>
    </div>
  );
}
