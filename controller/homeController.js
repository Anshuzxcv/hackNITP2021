
exports.home = async(req,res)=>{
    res.render('index.ejs');
}
exports.signupPage = async(req,res)=>{
    res.render('signup.ejs');
}
exports.loginPage = async(req,res)=>{
    res.render('login.ejs');
}
exports.signup = async(req,res)=>{
    const email = req.body.email;
    const phone = req.body.phone;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    console.log(email, phone, password, confirmPassword);
    if(password !== confirmPassword) return res.send('<html><head><title>500 Internal Server Error</title></head><body bgcolor="white"><center><h1>Password and Confirm password do not match!</h1></center><hr><center><a href="/signup">Try Signup again!</a></center></body></html>');
    res.render('signup.ejs');
}