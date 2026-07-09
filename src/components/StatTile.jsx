export default function StatTile({ icon, label, value }) {
  return (
    <div className="stat-tile">
      <div className="mb-2 flex justify-center" style={{ color: 'var(--gold)' }}>
        {icon}
      </div>
      <p className="mb-1 text-sm" style={{ color: 'var(--cyan)' }}>
        {label}
      </p>
      <p className="text-xl" style={{ fontFamily: 'var(--font-pixel)', color: 'var(--gold)' }}>
        {value}
      </p>
    </div>
  );
}
