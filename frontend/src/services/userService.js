
const validateUserRegister = (formData) => {
    
    let errors = [];

    

    if(formData.password !== formData.confirmPassword){
        errors.push('Passwords do not match');
    }

    return errors;
}