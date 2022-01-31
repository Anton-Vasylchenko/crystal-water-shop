import React from 'react';

function useInput(inputValue, inputType) {
    const [isValid, setIsValid] = React.useState(true);

    if (inputValue.trim().lenght === 0) {
        setIsValid(false);
    }

    if (inputType === 'email' && !inputValue.includes('@')) {
        setIsValid(false);
    }

    if (inputType === 'password' && inputValue.trim().length < 3) {
        setIsValid(false);
    }

    return isValid;
}

export default useInput
