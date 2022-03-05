import { Schema, model, Model, Document } from 'mongoose';
import { hash, compare } from 'bcryptjs';

export interface IUser {
  username: string;
  email: string;
  password: string;
  roles: {
    User: number;
    Editor: number;
    Admin: number;
  };
  posts: Schema.Types.ObjectId[];
  refreshToken?: string;
}

interface IUserDocument extends IUser, Document {
  comparePassword: (password: string) => Promise<boolean>;
}

interface IUserModel extends Model<IUserDocument> {
  findByUsername: (username: string) => Promise<IUserDocument>;
}

const userSchema: Schema<IUserDocument> = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    minlength: [3, 'Username should be at least three characters long'],
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  roles: {
    User: {
      type: Number,
      default: 2001,
    },
    Editor: Number,
    Admin: Number,
  },
  password: {
    type: String,
    required: true,
  },
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Post',
    },
  ],
  refreshToken: {
    type: String,
    default: null,
  },
});

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await hash(this.password, 12);
  }
  next();
});

userSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  return await compare(password, this.password);
};

const User = model<IUserDocument, IUserModel>('User', userSchema);
export default User;
