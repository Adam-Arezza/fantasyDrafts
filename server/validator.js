const {validationResult, body} = require('express-validator')

const rules = () => {
    return [
        body('email').isEmail(),
        body('password').isLength({min:5})
    ]    
}

const validate = (req, res, next) => {
    const errors = validationResult(req)
    if(errors.isEmpty()){
        return next()
    }
    const errorArray = errors.array()
    if(errorArray[0].param === 'email'){
        return res.json({success: false, message: "Invalid email"})
    }
    if(errorArray[0].param === 'password'){
        return res.json({success:false, message: "Invalid password, password must be at least 5 characters long."})
    } 
}

module.exports = {
    rules, validate
}