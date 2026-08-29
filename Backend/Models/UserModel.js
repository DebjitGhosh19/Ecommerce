import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, 'Username is required'],
      trim: true,
      minlength: 3,
      maxlength: 50,
      unique: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: 6,
    },
    cardData:{
        type: Object, 
        default: {},
    }
  
}
, {minimize: false}
    
);

const User = mongoose.model('User', userSchema);
export default User;
