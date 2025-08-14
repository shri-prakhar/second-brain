import mongoose, { Document, Schema } from "mongoose";
// mongoose is the ODM (Object Document Mapper) for MongoDB, allowing us to interact with MongoDB using JavaScript/TypeScript objects.

// Document is a TypeScript interface that represents a MongoDB document (i.e., a record in a collection).

// Schema is used to define the structure of the documents (like defining the columns of a table in SQL).

export interface User extends Document{
    name: string
    email: string
    password?: string // becasue all methods of authentication doesnt require password 
    authprovider: "email" | "phone" | "googleId" | "facebookID" | "twitterId"
    phone?: string 
    profilePicture: string
    bio?: string
    savedItems: mongoose.Types.ObjectId[];
    createdAt: Date
    updatedAt: Date
    otp?: string
    otpExpiry?: Date 
}

const userSchema = new Schema<User>({
    name: {type:String, required: true },
    email: {type: String, required: true , unique:true},
    password: {type: String }, //NOT required for auth users , this field can be optional but not null
    phone: {type: String ,unique:true, sparse: true  }, //sparse allows the feild to be null 
    authprovider: {type: String, unique: true , sparse: true},
    profilePicture: {type: String, sparse:true},
    bio: {type: String, sparse:true},
    savedItems:[{type: mongoose.Schema.Types.ObjectId, ref:"savedItems"}],
    otp: {type: String},
    otpExpiry: {type: Date}
},{
  timestamps: true // Automatically adds two fields to every document: createdAt → When the user was created. updatedAt → Last time the user data was modified. Why Important? For tracking user activities, debugging, or auditing purposes.
})

export interface savedItems extends Document{
    user:mongoose.Types.ObjectId // Reference to User
    title: string
    url: string
    description:string
    tags: string[]
    folder?: string
    aiSummary?: string
    sharedCount:number
    createdAt: Date 
    updateAt: Date 
}

const savedSchema = new Schema<savedItems>({
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User", required:true},
    title: {type: String, required: true },
    url: {type: String, required: true },
    description:{type: String},
    tags:[{type:String}],
    folder: {type : String},
    aiSummary: {type: String},
    sharedCount:{type: Number , default: 0},
},{
    timestamps:true
}); 

export interface AIinteraactions extends Document{
    User: mongoose.Types.ObjectId
    savedItems: mongoose.Types.ObjectId
    question: string
    answer: string 
    createdAt: Date
}

const AIinteraactionsSchema = new Schema<AIinteraactions>({
    User: {type: mongoose.Schema.Types.ObjectId, ref:"User", required:true },
    savedItems: {type: mongoose.Schema.Types.ObjectId, ref:"savedItems", required:true},
    question: {type: String, required:true},
    answer: {type: String, required:true},
},
{
    timestamps:true

});

export interface Tag extends Document{
    name: string
    User: mongoose.Types.ObjectId
    createAt: Date
}

const TagSchema = new Schema<Tag>({
    name: {type: String, required:true},
    User: {type: mongoose.Schema.Types.ObjectId , ref:"User", required: true}
},{
    timestamps:true 
});

export interface profile extends Document{
    User: mongoose.Types.ObjectId
    interests: string[];
    learningProgress: {[key: string]:number} //tracks how much user has read/watched
    recommendations: mongoose.Types.ObjectId[]; // for AI powered suggestions
    createAt: Date
}

const profileSchema = new Schema<profile>({
    User: {type: mongoose.Schema.Types.ObjectId, ref:"User" , required:true},
    interests: [{type: String}],
    learningProgress:{type: Map, of: Number},// it maps a key to a value 
    recommendations: [{type: mongoose.Schema.Types.ObjectId, ref: "savedItems"}]

},{
    timestamps:true

})

export interface sharedItems extends Document {
    User: mongoose.Types.ObjectId
    savedItems: mongoose.Types.ObjectId[]
    shareId: string
    message?:string
    createdAt:Date
    expiresAt?: Date
}

const sharedItemsSchema = new Schema<sharedItems>({
    User: {types: mongoose.Schema.Types.ObjectId , ref: "User" , required:true}, 
    savedItems: [{type:mongoose.Schema.Types.ObjectId, ref: "savedItems" , required:true}],
    shareId: {type:String, required:true , unique:true},
    message: {type:String , sparse:true},
    expiresAt:{type:Date}
},{
    timestamps:true
})

export const User = mongoose.model<User>("User", userSchema);
export const savedItems = mongoose.model<savedItems>("savedItems", savedSchema);
export const AIinteraactions = mongoose.model<AIinteraactions>("AIinteraactions", AIinteraactionsSchema);
export const Tag = mongoose.model<Tag>("Tags",TagSchema);
export const profile = mongoose.model<profile>("profile", profileSchema);
export const sharedItems = mongoose.model<sharedItems>("sharedItems" , sharedItemsSchema)