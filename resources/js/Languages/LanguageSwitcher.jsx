import React, { useState, useEffect, useContext } from 'react';
import Select from 'react-select';
import { LanguageContext } from '@/Languages/LanguageContext';

const LanguageSwitcher = ({ onLanguageChange }) => {
    const languageOptions = [
        { value: "en", label: "English" },
        { value: "id", label: "Bahasa Indonesia" },
    ];

    const [selectedOption, setSelectedOption] = useState(null);

    useEffect(() => {
        const storedLanguage = localStorage.getItem('language') || 'en';
        const defaultOption = languageOptions.find(option => option.value === storedLanguage);
        setSelectedOption(defaultOption);
    }, []);

    const handleChange = (selectedOption) => {
        console.log('Language selected:', selectedOption.value);
        onLanguageChange(selectedOption.value);
    };


    return ( 
        <Select
                                        options={languageOptions}
                                        onChange={handleChange}
                                        value={selectedOption}
                                        placeholder={"Select..."}
                                        menuPosition={'fixed'}
                                        styles={{
                                            control: (base, state) => ({
                                                ...base,
                                                boxShadow: state.isFocused
                                                    ? 0
                                                    : 0,
                                                borderColor: state.isFocused
                                                    ? "#1A202C"
                                                    : base.borderColor,
                                                borderWidth: state.isFocused
                                                    ? "2px"
                                                    : "1px",
                                                "&:hover": {
                                                    borderColor: state.isFocused
                                                        ? "#1A202C"
                                                        : base.borderColor,
                                                },
                                                borderRadius: "6px",
                                            }),
                                            input: (base) => ({
                                                ...base,
                                                "input:focus": {
                                                    boxShadow: "none",
                                                },
                                            }),
                                        }}
                                    />
    );
};

export default LanguageSwitcher;