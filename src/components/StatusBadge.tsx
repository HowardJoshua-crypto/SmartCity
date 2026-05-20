import type { IssueStatus } from '../types';

const statusConfig: Record<IssueStatus, { label: string; className: string }> = {
  open: { label: 'Open', className: 'status-badge status-open' },
  in_progress: { label: 'In Progress', className: 'status-badge status-in-progress' },
  resolved: { label: 'Resolved', className: 'status-badge status-resolved' },
  closed: { label: 'Closed', className: 'status-badge status-closed' },
};

export default function StatusBadge({ status }: { status: IssueStatus }) {
  const config = statusConfig[status];
  return <span className={config.className}>{config.label}</span>;
}
