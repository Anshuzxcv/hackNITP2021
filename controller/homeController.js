const bcrypt = require('bcrypt');
const userModel = require('../schema/userSchema');

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
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;

    if(password !== confirmPassword) return res.send('<html><head><title>500 Internal Server Error</title></head><body bgcolor="white"><center><h1>Password and Confirm password do not match!</h1></center><hr><center><a href="/signup">Try Signup again!</a></center></body></html>');
    res.render('signup.ejs');

    const user = await userModel.create(req.body);
    // user.save({ validateBeforeSave: false });
}

exports.login = async(req,res)=>{
    try{
        const email = req.body.email;
        const password = req.body.password;
        const loginuser = await userModel.findOne({ email: email });
        console.log(loginuser);
        if (!loginuser) { res.send({ status: "fail", message: 'wrong email or password', stat: '-1' }); }
            // else if (loginuser.status == "not registered") {
            // 	res.send({ stat: '-1', message: 'you have not verified your email.' });
            // }
        else {
            try{
                if(await loginuser.isValidPass(password)){
                    res.send({stat: 200, message:'login successful'});
                } else{
                    res.status(400).send('wrong email or password');
                }
            } catch(err){
                if(err)
                    res.status(500).send(err);
            }
            // bcrypt.compare(password, loginuser.password, function(err, result) {
            //     console.log(result);
            //     if(err) return res.send(err);
            //     if(result) {
            //         res.send({stat: 200, message:'login successful'});
            //     } else {
            //         res.send({ status: "fail", message: 'wrong email or password', stat: '-1' });
            //     }
            // });
        }
    }
    catch (err) { res.send({ stat: 500, err }); }
    
}