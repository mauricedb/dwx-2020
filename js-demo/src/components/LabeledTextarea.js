import React from 'react';

const LabeledTextarea = ({ label, value, rows }) => (
  <div className="form-group">
    <label className="form-label">{label}</label>

    <textarea className="form-control" rows={rows} value={value} readOnly />
  </div>
);

export default LabeledTextarea;
