
import mongoose, { Schema, Document } from "mongoose";


export interface Message extends Document {
  content: String;
  createdAt: Date;
}

const MessageSchema: Schema<Message> = new Schema({
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

export interface User extends Document {
  username: String;
  password: String;
  email: String;
  createdAt: Date;
  verifyCode: String;
  verifyExpiry: Date;
  isVerified: boolean;

  isAcceptingMessage: boolean;
   messages: Message[];
}
const UserSchema: Schema<User> = new Schema({
  username: {
    type: String,
    required: [true, "User is required"],
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: true,
    trim: true,
    match: [/.+\@.+\..+/, "please use a valid email"],
  },
  password: {
    type: String,
    required: [true, "password is required"],
  },
  verifyCode: {
    type: String,
    required: [true, "verifyCode is required"],
  },
  verifyExpiry: {
    type: Date,
    required: [true, "verify code Expiry is required"],
  },
  isAcceptingMessage: {
    type: Boolean,
    default: true,
  },

  isVerified: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  messages: [MessageSchema],
//   Messages:{
//     type: Schema.Types.ObjectId,
//     ref: "Message",

//   }
});


// const UserModel = ( mongoose.model<User>("User", UserSchema)) ||( ) 
const UserModel = (mongoose.models.User as mongoose.Model<User>) || 
  mongoose.model<User>("User", UserSchema);

// const UserModel = mongoose.model<User>("User", UserSchema);

export default UserModel;