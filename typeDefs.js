const {gql}=require('graphql-tag');


const typeDefs=gql`
    type Query{
        test:String
        getUsers:[Student]
        getUser(id:ID):Student
        signIn(email:String,password:String):String
    }
    type Student{
        id:ID,
        firstname:String,
        lastname:String,
        age:Int
    }
    type User{
        email:String,
        password:String
    }
    type Mutation{
        deleteStudent(id:ID):Int
        createStudent(firstname:String,lastname:String,age:Int):Student
        updateStudent(id:ID,firstname:String,lastname:String,age:Int):Student
        signUp(email:String,password:String):User
        signOut:String
    }
`



module.exports={typeDefs};