import React from 'react';
import { Field, ErrorMessage } from 'formik';
import Select from 'react-select';

const FormField = ({ label, name, type, options, placeholder, onChange, value, ...props }) => (
    <div className="col-6 mt-3">
        <label htmlFor={name} className="form-label">
            {label} <span className="text-danger">*</span>
        </label>
        {options ? (
            <Select
                id={name}
                options={options}
                onChange={onChange}
                value={options.find(option => option.value === value)}
                placeholder={placeholder}
            />
        ) : (
            <Field type={type} name={name} id={name} className="form-control" placeholder={placeholder} {...props} />
        )}
        <ErrorMessage name={name} component="div" className="text-danger" />
    </div>
);

export default FormField;
