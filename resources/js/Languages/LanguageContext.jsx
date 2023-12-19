import React, { createContext, useState } from 'react';

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const initialLanguage = localStorage.getItem('language') || 'en';
    console.log('Initial language:', initialLanguage);
    const [language, setLanguage] = useState(initialLanguage);

    const setLanguageValue = (newLanguage) => {
        console.log('New language:', newLanguage);
        localStorage.setItem('language', newLanguage);
        setLanguage(newLanguage);
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage: setLanguageValue }}>
            {children}
        </LanguageContext.Provider>
    );
};