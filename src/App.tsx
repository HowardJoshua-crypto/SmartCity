import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Issues from './pages/Issues';
import ReportIssue from './pages/ReportIssue';
import Polls from './pages/Polls';
import Feedback from './pages/Feedback';
import MyReports from './pages/MyReports';
import IssueDetail from './pages/IssueDetail';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/issues" element={<Issues />} />
            <Route path="/issues/:id" element={<IssueDetail />} />
            <Route path="/report" element={<ReportIssue />} />
            <Route path="/polls" element={<Polls />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/my-reports" element={<MyReports />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
