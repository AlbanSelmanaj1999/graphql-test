const {Student}=require('./Student.js');
const {User}=require("./User.js");
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const {checkToken}=require('./middleware.js');
const resolvers={

    Query:{
        test: (_,args,context)=>{
            const {session_token}=context.req.cookies;
            checkToken(session_token);
            return "test edmondi";
        },
        getUsers:async ()=>{
            const {session_token}=context.req.cookies;
            checkToken(session_token);
            const students=await Student.find({})
            return students;
        },
        getUser:async (_,args,context)=>{
            const {session_token}=context.req.cookies;
            checkToken(session_token);
            const student=await Student.findById(args.id);
            return student;
        },
        signIn:async (_,args,context)=>{
            console.log(context.req);
            console.log(process.env.jwt_secret_key)
            const user=await User.findOne({email:args.email});
            if(user && await bcrypt.compare(args.password,user.password)){
                const token=jwt.sign({id:user.id,email:user.email},process.env.jwt_secret_key,{expiresIn:'1h'});
                context.res.cookie("session_token",token,{httpOnly:true});
                return "User logged in successfully"
            }
            throw Error('Error,wrong email or password');
        }

    },
    Mutation:{
        createStudent:async (_,args,context)=>{
            const {session_token}=context.req.cookies;
            checkToken(session_token);
            const student=new Student({firstname:args.firstname,lastname:args.lastname,
            age:args.age})
            await student.save();
            return student;
        },
        updateStudent:async (_,args,context)=>{
            const {session_token}=context.req.cookies;
            checkToken(session_token);
            const student=await Student.findByIdAndUpdate({_id:args.id},{firstname:args.firstname
            ,lastname:args.lastname,age:args.age},{returnOriginal:false});

            return student;
        },
        deleteStudent:async (_,args,context)=>{
            try{
                const {session_token}=context.req.cookies;
                checkToken(session_token);
                const student=await Student.findByIdAndDelete(args.id)

                return "gasgasgas";

            }
            catch(error){
                throw new Error("Error!");
            }
        },
        signUp:async (_,args,context)=>{
            const password=await bcrypt.hash(args.password,10);
            const user= new User({email:args.email,password:password});
            await user.save();
            return user;
        },
        signOut:async (_,args,context)=>{
            try{
                context.res.clearCookie('session_token');
                return "User has logged out";

            }
            catch(error){
                console.log(error);
                throw new Error('Failed to logout');
            }
        },
    }
}
module.exports={resolvers};