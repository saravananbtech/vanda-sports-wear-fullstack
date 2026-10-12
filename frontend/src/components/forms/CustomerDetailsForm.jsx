export default function CustomerDetailsForm() {
  return (
    <div className="form-section">
      <h3><span className="num">1</span>Customer Details</h3>
      <div className="grid-2">
        <div className="field"><label>Customer Name</label><input type="text" placeholder="Full name" /></div>
        <div className="field"><label>Mobile Number</label><input type="tel" placeholder="10-digit mobile" /></div>
        <div className="field"><label>WhatsApp Number</label><input type="tel" placeholder="10-digit WhatsApp" /></div>
        <div className="field"><label>Email</label><input type="email" placeholder="you@email.com" /></div>
      </div>
      <div className="field"><label>Delivery Address</label><input type="text" placeholder="House no, street, area" /></div>
      <div className="grid-3">
        <div className="field"><label>State</label><input type="text" placeholder="State" /></div>
        <div className="field"><label>City</label><input type="text" placeholder="City" /></div>
        <div className="field"><label>Pincode</label><input type="text" placeholder="6-digit pincode" /></div>
      </div>
    </div>
  );
}
