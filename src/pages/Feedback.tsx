import { useState } from 'react';
import { MessageSquare, CheckCircle, Send } from 'lucide-react';
import { feedbackItems } from '../data/mockData';

const institutions = [
  'Kampala Capital City Authority',
  'Ministry of Education and Sports',
  'Ministry of Health',
  'Ministry of Water and Environment',
  'Ministry of Works and Transport',
  'Uganda National Roads Authority (UNRA)',
  'Umeme Limited',
  'National Water and Sewerage Corporation',
  'Local Government - Kawempe Division',
  'Local Government - Nakawa Division',
  'Local Government - Lubaga Division',
  'Local Government - Makindye Division',
];

const feedbackCategories = [
  'Appreciation', 'Complaint', 'Suggestion', 'Education', 'Health',
  'Infrastructure', 'Water Services', 'Urban Planning', 'Other',
];

const statusConfig: Record<string, { label: string; className: string }> = {
  pending: { label: 'Pending Review', className: 'bg-amber-100 text-amber-700' },
  reviewed: { label: 'Reviewed', className: 'bg-blue-100 text-blue-700' },
  actioned: { label: 'Actioned', className: 'bg-green-100 text-green-700' },
};

export default function Feedback() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    subject: '',
    message: '',
    category: '',
    targetInstitution: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const isValid = form.subject && form.message && form.category && form.targetInstitution;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          <MessageSquare size={26} className="text-primary-600" />
          Submit Feedback
        </h1>
        <p className="text-slate-500 mt-1">
          Share your suggestions, complaints, or appreciation with public institutions and leaders
        </p>
      </div>

      <div className="grid lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3">
          {submitted ? (
            <div className="bg-white border border-slate-200 rounded-xl p-10 text-center animate-fade-in">
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={28} className="text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">Feedback Submitted</h3>
              <p className="text-slate-500 text-sm mb-6">
                Your feedback has been sent to <strong>{form.targetInstitution}</strong>. They will review it and respond accordingly.
              </p>
              <button
                onClick={() => { setSubmitted(false); setForm({ subject: '', message: '', category: '', targetInstitution: '' }); }}
                className="px-6 py-2.5 bg-primary-700 text-white rounded-lg text-sm font-medium hover:bg-primary-800 transition-colors"
              >
                Submit More Feedback
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-xl p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Target Institution <span className="text-red-500">*</span>
                </label>
                <select
                  name="targetInstitution"
                  value={form.targetInstitution}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 bg-white text-slate-700"
                >
                  <option value="">Select institution or leader</option>
                  {institutions.map((inst) => (
                    <option key={inst} value={inst}>{inst}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 bg-white text-slate-700"
                >
                  <option value="">Select category</option>
                  {feedbackCategories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Subject <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="Brief summary of your feedback"
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-300"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Write your detailed feedback, suggestion, or complaint here..."
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={!isValid}
                className={`w-full py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all ${
                  isValid
                    ? 'bg-primary-700 text-white hover:bg-primary-800 shadow-sm'
                    : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                }`}
              >
                <Send size={15} />
                Send Feedback
              </button>
            </form>
          )}
        </div>

        <div className="lg:col-span-2">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">Recent Community Feedback</h2>
          <div className="space-y-4">
            {feedbackItems.map((item) => {
              const s = statusConfig[item.status];
              return (
                <div key={item.id} className="bg-white border border-slate-200 rounded-xl p-4">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${s.className}`}>{s.label}</span>
                    <span className="text-xs text-slate-400">{item.category}</span>
                  </div>
                  <h4 className="text-sm font-semibold text-slate-800 mb-1">{item.subject}</h4>
                  <p className="text-xs text-slate-500 line-clamp-2 mb-2">{item.message}</p>
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>By {item.submittedBy}</span>
                    <span>To: {item.targetInstitution.split(' ').slice(0, 3).join(' ')}...</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
