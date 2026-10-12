import { SIZE_OPTS } from '../../utils/data.js';
import { useApp } from '../../context/AppContext.jsx';

function DuplicateIcon(p) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...p}>
      <rect x="9" y="9" width="12" height="12" rx="2" /><path d="M5 15V5a2 2 0 0 1 2-2h10" />
    </svg>
  );
}

function TrashIcon(p) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...p}>
      <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m2 0v14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V6" />
    </svg>
  );
}

export default function PlayersTable({ players, onAdd, onRemove, onDuplicate, onUpdate }) {
  const { showToast } = useApp();
  const playerCountOk = players.length >= 10;

  return (
    <div className="form-section">
      <h3><span className="num">3</span>Player Details</h3>
      <div className="players-toolbar">
        <span className={`players-count ${playerCountOk ? 'ok' : 'bad'}`}>
          {players.length} players added — {playerCountOk ? 'minimum met ✓' : 'minimum 10 required'}
        </span>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <button type="button" className="small-btn" onClick={() => showToast('CSV upload — connect a file input + parser to enable in the full build')}>
            Bulk CSV Upload
          </button>
          <button type="button" className="small-btn primary" onClick={onAdd}>+ Add Player</button>
        </div>
      </div>
      <div className="players-table-wrap">
        <table className="players">
          <thead>
            <tr>
              <th style={{ width: 40 }}>#</th>
              <th>Player Name</th>
              <th style={{ width: 90 }}>Number</th>
              <th style={{ width: 100 }}>Jersey Size</th>
              <th style={{ width: 100 }}>Shorts Size</th>
              <th>Role (Optional)</th>
              <th style={{ width: 80 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {players.map((pl, idx) => (
              <tr key={pl.id}>
                <td style={{ color: 'var(--muted)', fontSize: 12.5 }}>{idx + 1}</td>
                <td>
                  <input
                    type="text"
                    placeholder="Player name"
                    value={pl.name}
                    onChange={(e) => onUpdate(pl.id, 'name', e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    placeholder="No."
                    value={pl.number}
                    onChange={(e) => onUpdate(pl.id, 'number', e.target.value)}
                  />
                </td>
                <td>
                  <select value={pl.jsize} onChange={(e) => onUpdate(pl.id, 'jsize', e.target.value)}>
                    {SIZE_OPTS.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </td>
                <td>
                  <select value={pl.ssize} onChange={(e) => onUpdate(pl.id, 'ssize', e.target.value)}>
                    <option value="">—</option>
                    {SIZE_OPTS.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </td>
                <td>
                  <input
                    type="text"
                    placeholder="Captain, GK..."
                    value={pl.role}
                    onChange={(e) => onUpdate(pl.id, 'role', e.target.value)}
                  />
                </td>
                <td>
                  <div className="row-actions">
                    <button title="Duplicate" type="button" onClick={() => onDuplicate(pl.id)}><DuplicateIcon /></button>
                    <button
                      title="Remove"
                      type="button"
                      className="danger"
                      onClick={() => {
                        if (players.length <= 1) {
                          showToast('At least one player row is required');
                          return;
                        }
                        onRemove(pl.id);
                      }}
                    >
                      <TrashIcon />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="min-note">Minimum order: 10 jerseys per team — no maximum limit.</p>
    </div>
  );
}
