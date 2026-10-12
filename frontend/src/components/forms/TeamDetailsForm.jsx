import { useApp } from '../../context/AppContext.jsx';

export default function TeamDetailsForm() {
  const { showToast } = useApp();

  return (
    <div className="form-section">
      <h3><span className="num">2</span>Team Details</h3>
      <div className="grid-2">
        <div className="field"><label>Team Name</label><input type="text" placeholder="e.g. Chennai Strikers FC" /></div>
        <div className="field">
          <label>Team Logo Upload</label>
          <div className="upload-box" onClick={() => showToast('Logo upload — connect storage to enable.')}>
            Click to upload logo (PNG/JPG)
          </div>
        </div>
      </div>
      <div className="grid-2">
        <div className="field">
          <label>Primary Color</label>
          <div className="color-row">
            <input type="color" defaultValue="#D4AF37" />
            <span style={{ fontSize: 12.5, color: 'var(--muted)' }}>Team primary</span>
          </div>
        </div>
        <div className="field">
          <label>Secondary Color</label>
          <div className="color-row">
            <input type="color" defaultValue="#0B0B0B" />
            <span style={{ fontSize: 12.5, color: 'var(--muted)' }}>Team secondary</span>
          </div>
        </div>
      </div>
      <div className="field">
        <label>Upload Reference Image</label>
        <div className="upload-box" onClick={() => showToast('Reference upload — connect storage to enable.')}>
          Click to upload a design reference
        </div>
      </div>
    </div>
  );
}
