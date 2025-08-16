import { Types, model , Document, Schema } from "mongoose";
// mongoose is the ODM (Object Document Mapper) for MongoDB, allowing us to interact with MongoDB using JavaScript/TypeScript objects.

// Document is a TypeScript interface that represents a MongoDB document (i.e., a record in a collection).

// Schema is used to define the structure of the documents (like defining the columns of a table in SQL).

export interface User extends Document{
    _id:Types.ObjectId
    name: string
    email: string
    password?: string // becasue all methods of authentication doesnt require password 
    authprovider: "email" | "phone" | "googleId" | "facebookID" | "twitterId"
    phone?: string 
    profilePicture: string
    bio?: string
    savedItems: Types.ObjectId[];
    createdAt: Date
    updatedAt: Date
    otp?: string
    otpExpiry?: Date 
}

const UserSchema = new Schema<User>({
    name: { type:String, required: true },
    email: {type: String, required: true , unique:true},
    password: {type: String }, //NOT required for auth users , this field can be optional but not null
    phone: {type: String ,unique:true, sparse: true  }, //sparse allows the feild to be null 
    authprovider: {type: String, unique: true , sparse: true},
    profilePicture: {type: String, sparse:true},
    bio: {type: String, sparse:true},
    savedItems:[{type: Schema.Types.ObjectId, ref:"SavedItems"}],
    otp: {type: String},
    otpExpiry: {type: Date}
},{
  timestamps: true // Automatically adds two fields to every document: createdAt → When the user was created. updatedAt → Last time the user data was modified. Why Important? For tracking user activities, debugging, or auditing purposes.
})

export interface SavedItems extends Document{
    _id:Types.ObjectId
    user:Types.ObjectId // Reference to User
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

const SavedItemsSchema = new Schema<SavedItems>({
    user: {type: Schema.Types.ObjectId, ref: "User", required:true},
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
    _id:Types.ObjectId
    user: Types.ObjectId
    savedItems: Types.ObjectId
    question: string
    answer: string 
    createdAt: Date
}

const AIinteraactionsSchema = new Schema<AIinteraactions>({
    user: {type: Schema.Types.ObjectId, ref:"User", required:true },
    savedItems: {type: Schema.Types.ObjectId, ref:"SavedItems", required:true},
    question: {type: String, required:true},
    answer: {type: String, required:true},
},
{
    timestamps:true

});

export interface Tag extends Document{
    _id:Types.ObjectId
    name: string
    User: Types.ObjectId
    createAt: Date
}

const TagSchema = new Schema<Tag>({
    name: {type: String, required:true},
    User: {type: Schema.Types.ObjectId , ref:"User", required: true}
},{
    timestamps:true 
});

export interface Profile extends Document{
    _id:Types.ObjectId
    User: Types.ObjectId
    interests: string[];
    learningProgress: {[key: string]:number} //tracks how much user has read/watched
    recommendations: Types.ObjectId[]; // for AI powered suggestions
    createAt: Date
}

const ProfileSchema = new Schema<Profile>({
    User: {type: Schema.Types.ObjectId, ref:"User" , required:true},
    interests: [{type: String}],
    learningProgress:{type: Map, of: Number},// it maps a key to a value 
    recommendations: [{type: Schema.Types.ObjectId, ref: "SavedItems"}]

},{
    timestamps:true

})

export interface SharedItems extends Document {
    _id:Types.ObjectId
    User: Types.ObjectId
    savedItems: Types.ObjectId[]
    shareId: string
    message?:string
    createdAt:Date
    expiresAt?: Date
}

const SharedItemsSchema = new Schema<SharedItems>({
    User: {type: Schema.Types.ObjectId , ref: "User" , required:true}, 
    savedItems: [{type:Schema.Types.ObjectId, ref: "SavedItems" , required:true}],
    shareId: {type:String, required:true , unique:true},
    message: {type:String , sparse:true},
    expiresAt:{type:Date}
},{
    timestamps:true
})

export const UserModel = model<User>("User", UserSchema);
export const savedItemsModel = model<SavedItems>("SavedItems", SavedItemsSchema);
export const AIinteraactionsModel = model<AIinteraactions>("AIinteraactions", AIinteraactionsSchema);
export const TagModel = model<Tag>("Tags",TagSchema);
export const profileModel = model<Profile>("profile", ProfileSchema);
export const sharedItemsModel = model<SharedItems>("sharedItems" , SharedItemsSchema)