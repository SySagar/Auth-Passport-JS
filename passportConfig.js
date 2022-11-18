const LocalStrategy = require('passport-local').Strategy;
const {User} = require('./database');

const initializingPassport = (passport)=>{
    passport.use(new LocalStrategy(async (username,password,next)=>{
        const user = await User.findOne({username});

        try {

            if(!user)
            return next(null , false)
    
            if(user.password!=passport)
            return next(null , false)

        } catch (error) {
            return next(error , false);
        }
     
    }))

    passport.serializeUser((user , next)=>{
        next(null, user.id)
    })

    passport.deserializeUser(async (id,done)=>{
        try{
            const user = await User.findById(id)
            next(error,false)
        }
        catch(error){
            next(error,false);
        }
    })
}

const isAuth = (req,res,next)=>{
    if(req.user)
    return next();

    res.redirect('/login');
}

module.exports={initializingPassport , isAuth}