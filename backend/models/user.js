import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({

    name:{
        type:String,
    },

    license:{
    type:Number,
    },

    email:{
        type:String,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
    },

    force:{
    type:Number,
    },
    
    age:{
    type:Number,
    },

    number:{
    type:Number,
    },

    work:{
    type:String,
    },
    
    password:{
        type:String,
    },
    
    role:{
        type:String,
        enum:['User','Contractor','Worker','Supplier'],
    }

});
const User = mongoose.model("User",userSchema);
export default User;