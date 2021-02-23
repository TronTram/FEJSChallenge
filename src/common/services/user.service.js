
import isObject from 'lodash/isObject';
import isEmpty from 'lodash/isEmpty';

class UserService {

    static async getUsers() {
        const response = await fetch("https://dummyapi.io/data/api/user?limit=10", {
            headers: {
                "app-id": "60349db146ff8b0837d18351"
            }
        });

        return await response.json();
    }

    static async getUserDetail(userId) {
        if (!userId) return null;
        const response = await fetch(`https://dummyapi.io/data/api/user/${userId}`, {
            headers: {
                "app-id": "60349db146ff8b0837d18351"
            }
        });

        return await response.json();
    }
}

export default UserService;