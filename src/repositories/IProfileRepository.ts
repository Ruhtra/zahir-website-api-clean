import { Profile } from "../entities/Profile";

export interface IProfileRepository {
  findById: (id: string) => Promise<Profile>;
  all: () => Promise<Profile[]>;

  recents: () => Promise<Profile[]>;

  save: (profile: Profile) => Promise<void>;
  delete: (id: string) => Promise<void>;
  // update: (id: ObjectId, Profile: Profile) => Promise<void>
}
