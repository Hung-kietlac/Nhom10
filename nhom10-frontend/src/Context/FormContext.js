import React, { createContext, useState } from 'react';

// Tạo context
export const FormContext = createContext();

// Tạo provider
export const FormProvider = ({ children }) => {
    // State để lưu trữ dữ liệu form
    const [formData, setFormData] = useState({
        customerName: '',
        password: '',
        gender: '',
        dob: '',
        phone: ''
    });

    return (
        <FormContext.Provider value={{ formData, setFormData }}>
            {children}
        </FormContext.Provider>
    );
};