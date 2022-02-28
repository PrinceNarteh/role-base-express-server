import { Schema, model } from 'mongoose';
import { hash } from 'bcryptjs';

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: [3, 'Username should be at least three characters long'],
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.pre('save', (next) => {
  if (this.isModified('password')) {
    this.password = await hash(this.password, 12);
  }
  next();
});

const User = model('User', userSchema);
export default User;
