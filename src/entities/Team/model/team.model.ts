import { model, Schema, Document } from 'mongoose';

export interface ITeam extends Document {
    team: Array<IUser>;
    description: string
}

const teamSchema = new Schema({
    id: { type: String },
    team: { type: [{ type: Schema.Types.ObjectId, ref: "user" }], default: [] },
    description: { type: String, default: "" }
});


export default model<ITeam>('team', teamSchema);
