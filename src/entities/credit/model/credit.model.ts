import { model, Schema, Document } from 'mongoose';

export interface ICredit extends Document {
    credit: number,
    user: object
}

const creditSchema = new Schema({
    credit: {type: Number, default: 0 },
    user: { type: Schema.Types.ObjectId, ref: "user" },
    date: { type: Date, default: Date.now },
});


export default model<ICredit>('credit', creditSchema);
