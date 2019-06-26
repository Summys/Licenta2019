export const User = {
  fullName(user) {
    const { profile = {} } = user;
    return `${profile.firstName} ${profile.lastName}`;
  }
};
