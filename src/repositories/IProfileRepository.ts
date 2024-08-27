import { Profile } from "../entities/Profile";

export interface IProfileRepository {
  findById: (id: string) => Promise<Profile>;
  all: () => Promise<Profile[]>;

  recents: () => Promise<Profile[]>;

  // save: (profile: Profile) => Promise<void>
  // update: (id: ObjectId, Profile: Profile) => Promise<void>
  // delete: (id: ObjectId) => Promise<void>
}
