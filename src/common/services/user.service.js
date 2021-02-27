
const APP_ID = "60365cf26aca29288e6df97b"
class UserService {

    static async getUsers(page = 0) {
        const response = await fetch(`https://dummyapi.io/data/api/user?page=${page}&limit=10`, {
            headers: {
                "app-id": APP_ID
            }
        });

        return await response.json();
    }

    static async getUserDetail(userId) {
        if (!userId) return null;
        const response = await fetch(`https://dummyapi.io/data/api/user/${userId}`, {
            headers: {
                "app-id": APP_ID
            }
        });

        return await response.json();
    }
}

export default UserService;