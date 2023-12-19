import React, { useContext } from 'react';
import Select from 'react-select';
import { LanguageContext } from '@/Languages/LanguageContext';

const LanguageSwitcher = ({ onLanguageChange }) => {
    const languageOptions = [
        { value: "en", label: "English" },
        { value: "id", label: "Bahasa Indonesia" },
    ];

    const handleChange = (selectedOption) => {
        console.log('Language selected:', selectedOption.value);
        onLanguageChange(selectedOption.value);
    };


    return ( 
        <Select
                                        options={languageOptions}
                                        onChange={handleChange}
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