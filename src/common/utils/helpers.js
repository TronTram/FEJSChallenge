export function updateUserDetail(users, updatedUser){
    const newUsers = users.map(function(user) {
        if(user.id === updatedUser.id) {
          return {
            ...updatedUser,
            dateOfBirth: updatedUser.dateOfBirth,
            gender: updatedUser.gender
          }
        }
        return user;
    });
    return newUsers;
}