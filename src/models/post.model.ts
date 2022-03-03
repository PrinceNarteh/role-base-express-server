import { Schema, Document, Model, model } from 'mongoose';

export interface IPost {
  author: Schema.Types.ObjectId;
  title: string;
  content: string;
  published: boolean;
}

interface IPostDocument extends IPost, Document {}
interface IPostModel extends Model<IPostDocument> {
  searchByTitle: (search: string) => Promise<IPostDocument[]>;
}

const postSchema: Schema<IPostDocument> = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true,
      minlength: [3, 'Minimun character for the title is three(3) characters'],
    },
    content: {
      type: String,
      required: true,
      minlength: [10, 'Minimun character for the title is ten(10) characters'],
    },
    published: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

postSchema.statics.searchByTitle = async function (search: string) {
  return this.find({ $text: { $search: search } });
};

const Post = model<IPostDocument, IPostModel>('Post', postSchema);
export default Post;
