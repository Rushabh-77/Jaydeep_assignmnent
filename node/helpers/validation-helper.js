exports.validateEmailPassword = (email = '', password = '') => {
    let response = ''
    if (email.length > 0) {
        const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!email.match(mailformat)) {
            response += 'Invalid Email. '
        }
    } 
    
    if (password.length > 0) {
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=<>?])[A-Za-z\d!@#$%^&*()_\-+=<>?]{8,}$/;
        if (!passwordRegex.test(password)) {
            response += 'Invalid Password.'
        } 
    }
    return response
}