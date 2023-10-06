import type { SoketUser, User } from "@/types";

/** soketUser -> User */
export function convertSoketUserToUser(soketUser: SoketUser): User {
  return {
    user_id: soketUser.userId,
    nickname: soketUser.userName,
    level: soketUser.level,
    profile: soketUser.profile,
  };
}

/** User -> socketUser */
export function convertUserToSoketUser(user: User): SoketUser {
  return {
    userId: user.user_id,
    userName: user.nickname,
    level: user.level,
    profile: user.profile,
  };
}
