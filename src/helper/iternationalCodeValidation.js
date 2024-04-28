import React from 'react'

const IternationalCodeValidation = (input) => {
    // بررسی صحت کد ملی

    if (!/^\d{10}$/.test(input)) return false;
    const check = +input[9];
    const sum = input.split('').slice(0, 9).reduce((acc, x, i) => acc + +x * (10 - i), 0) % 11;
    return sum < 2 ? check === sum : check + sum === 11;
}


export default IternationalCodeValidation