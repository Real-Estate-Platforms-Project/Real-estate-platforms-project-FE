import React from 'react';
import Select from 'react-select';

const AddressSelect = ({ label, name, options, onChange, value }) => (
    <div className="col-6 mt-3">
        <label htmlFor={name} className="form-label">
            {label} <span className="text-danger">*</span>
        </label>
        <Select
            id={name}
            options={options}
            onChange={onChange}
            value={options.find(option => option.value === value)}
            placeholder="Chọn"
        />
    </div>
);

export default AddressSelect;
