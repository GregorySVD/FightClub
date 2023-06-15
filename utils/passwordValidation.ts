
export const passwordValidation = (password: string): boolean => {
    const uppercasePattern = /[A-Z]/;
    const lowercasePattern = /[a-z]/;
    const numberPattern = /[0-9]/;
    const specialCharPattern = /[!@#$%^&*()\-=_+[\]{}|\\,.<>/?]/;


// Check if the password meets the criteria
const hasUppercase = uppercasePattern.test(password);
const hasLowercase = lowercasePattern.test(password);
const hasNumber = numberPattern.test(password);
const hasSpecialChar = specialCharPattern.test(password);

// Return true if all criteria are met, otherwise return false
return hasUppercase && hasLowercase && hasNumber && hasSpecialChar;
}
