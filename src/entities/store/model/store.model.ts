import { model, Schema, Document } from 'mongoose';

export interface IStore extends Document {
    name: string
    id: string,
    credits: number,
    stock: number
}

const storeSchema = new Schema({
    id: { type: String },
    name: { type: String },
    credits: { type: Number, default: 0 },
    stock: { type: Number, default: 0 }
});


export default model<IStore>('store', storeSchema);
