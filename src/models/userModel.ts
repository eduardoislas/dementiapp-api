import { Schema, model, Document } from 'mongoose';

export interface User extends Document {
    caregiverId: string;
    username: string;
    patientId: string;
    threadId?: string;
    informedConsent?: boolean;
    dataConfirmed?: boolean;
}

const userSchema = new Schema<User>({
    caregiverId: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    patientId: { type: String, required: true },
    threadId: { type: String, default: null },
    informedConsent: { type: Boolean, default: false },
    dataConfirmed: { type: Boolean, default: false }
});

export const UserModel = model<User>('User', userSchema, 'users');
