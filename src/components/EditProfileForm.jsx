
import React, { useState } from 'react';

// =============================================
// EDIT PROFILE FORM COMPONENT
// =============================================
export default function EditProfileForm({ user, onBack, onSave }) {
  const [formData, setFormData] = useState({
    firstName: user.firstName || '',
    lastName: user.lastName || '',
    phone: user.phone || '',
    address: user.address || ''
  });
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await onSave(formData);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);
    } catch (error) {
      console.error("Error saving:", error);
    }
    setSaving(false);
  };

  return (
    <div className="auth-edit-profile">
      <button className="auth-back" onClick={onBack}>← Back</button>
      <h2 className="auth-title">แก้ไขข้อมูลส่วนตัว</h2>
      
      {success && <div className="auth-success">บันทึกข้อมูลเรียบร้อยแล้ว!</div>}
      
      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-row">
          <div className="form-group">
            <label>ชื่อ</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="ชื่อ"
            />
          </div>
          <div className="form-group">
            <label>นามสกุล</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="นามสกุล"
            />
          </div>
        </div>
        
        <div className="form-group">
          <label>เบอร์โทรศัพท์</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="เบอร์โทรศัพท์"
          />
        </div>
        
        <div className="form-group">
          <label>ที่อยู่จัดส่ง</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="ที่อยู่จัดส่ง"
            rows="3"
          />
        </div>
        
        <button type="submit" className="auth-submit-btn" disabled={saving}>
          {saving ? 'กำลังบันทึก...' : 'บันทึกข้อมูล'}
        </button>
      </form>
    </div>
  );
}
