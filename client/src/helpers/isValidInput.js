export const isEmpty = value => value.trim() === '';
export const isFiveChars = value => value.trim().length >= 5;
export const isEmail = value => value.trim().length === 0 || !value.trim().includes('@');