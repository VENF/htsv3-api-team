import { model, Schema, Document } from 'mongoose';

export interface IRepository extends Document {
    name: string;
    url: string;
    description: string;
    stack: Array<object>
    author: object
}

const repositorySchema = new Schema({
    author: { type: Schema.Types.ObjectId, ref: 'users' },
    name: { type: String },
    url: { type: String },
    description: { type: String },
    stack: []
});


export default model<IRepository>('repository', repositorySchema);
