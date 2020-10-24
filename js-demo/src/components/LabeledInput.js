import React from 'react';

const LabeledInput = ({ label, value }) => (
  <div className="form-group">
    <label className="form-label">{label}</label>

    <input className="form-control" value={value} readOnly />
  </div>
);

export default LabeledInput;
