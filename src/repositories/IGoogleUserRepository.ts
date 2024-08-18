import { ObjectId } from "mongodb";
import { GoogleUser } from "../entities/GoogleUser";

export interface IGoogleUserRepository {
    findByEmail(email: string): Promise<GoogleUser>
    findById(id: ObjectId): Promise<GoogleUser>

    update(id: ObjectId, newUser: Omit<GoogleUser, 'id'>): Promise<void>
    save(user: Omit<GoogleUser, 'id'>): Promise<void>
    upsert: (email: string, user:Omit<GoogleUser, 'id'>) => Promise<void>

}