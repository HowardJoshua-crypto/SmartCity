import { useState } from 'react';
import { BarChart2, Calendar, Users, CheckCircle } from 'lucide-react';
import { polls } from '../data/mockData';
import type { Poll } from '../types';

function PollCard({ poll }: { poll: Poll }) {
  const [voted, setVoted] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [localPoll, setLocalPoll] = useState(poll);

  const totalVotes = localPoll.options.reduce((sum, o) => sum + o.votes, 0);

  const handleVote = () => {
    if (!selectedOption) return;
    setLocalPoll((prev) => ({
      ...prev,
      totalVotes: prev.totalVotes + 1,
      options: prev.options.map((o) =>
        o.id === selectedOption ? { ...o, votes: o.votes + 1 } : o
      ),
    }));
    setVoted(true);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 animate-fade-in">
      <div className="flex items-start justify-between gap-3 mb-2">
        <span
          className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${
            localPoll.status === 'active'
              ? 'bg-green-100 text-green-700'
              : 'bg-slate-100 text-slate-500'
          }`}
        >
          {localPoll.status === 'active' ? 'Active' : 'Closed'}
        </span>
        <span className="flex items-center gap-1 text-xs text-slate-400">
          <Calendar size={11} />
          Ends {new Date(localPoll.endDate).toLocaleDateString('en-UG', { day: 'numeric', month: 'short', year: 'numeric' })}
        </span>
      </div>

      <h3 className="font-semibold text-slate-800 mt-2 mb-1 leading-snug">{localPoll.title}</h3>
      <p className="text-sm text-slate-500 mb-1">{localPoll.description}</p>
      <p className="text-xs text-slate-400 mb-5">Created by {localPoll.createdByName} · {localPoll.constituency}</p>

      {voted ? (
        <div className="space-y-3">
          {localPoll.options.map((option) => {
            const pct = Math.round((option.votes / (totalVotes + 1)) * 100);
            const isSelected = option.id === selectedOption;
            return (
              <div key={option.id}>
                <div className="flex justify-between text-sm mb-1">
                  <span className={`${isSelected ? 'font-semibold text-primary-700' : 'text-slate-600'} flex items-center gap-1.5`}>
                    {isSelected && <CheckCircle size={14} className="text-primary-600" />}
                    {option.text}
                  </span>
                  <span className="font-medium text-slate-700">{pct}%</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${isSelected ? 'bg-primary-500' : 'bg-slate-300'}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
          <div className="flex items-center gap-1.5 text-xs text-slate-400 pt-2">
            <Users size={12} />
            {(totalVotes + 1).toLocaleString()} total votes
          </div>
        </div>
      ) : (
        <div className="space-y-2.5">
          {localPoll.options.map((option) => (
            <label
              key={option.id}
              className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                selectedOption === option.id
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <input
                type="radio"
                name={`poll-${localPoll.id}`}
                value={option.id}
                checked={selectedOption === option.id}
                onChange={() => setSelectedOption(option.id)}
                className="text-primary-600"
              />
              <span className="text-sm text-slate-700">{option.text}</span>
            </label>
          ))}
          <button
            onClick={handleVote}
            disabled={!selectedOption || localPoll.status !== 'active'}
            className={`w-full mt-2 py-2.5 rounded-lg text-sm font-semibold transition-all ${
              selectedOption && localPoll.status === 'active'
                ? 'bg-primary-700 text-white hover:bg-primary-800'
                : 'bg-slate-100 text-slate-400 cursor-not-allowed'
            }`}
          >
            Cast Vote
          </button>
          <p className="text-center text-xs text-slate-400">{totalVotes.toLocaleString()} people have voted</p>
        </div>
      )}
    </div>
  );
}

export default function Polls() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          <BarChart2 size={26} className="text-primary-600" />
          Constituency Polls
        </h1>
        <p className="text-slate-500 mt-1">
          Participate in polls created by your elected leaders and public institutions
        </p>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
        {polls.map((poll) => (
          <PollCard key={poll.id} poll={poll} />
        ))}
      </div>

      {polls.length === 0 && (
        <div className="text-center py-20 text-slate-400">
          <BarChart2 size={40} className="mx-auto mb-3 opacity-40" />
          <p className="font-medium text-slate-600">No active polls</p>
          <p className="text-sm mt-1">Check back soon for new constituency polls</p>
        </div>
      )}
    </div>
  );
}
