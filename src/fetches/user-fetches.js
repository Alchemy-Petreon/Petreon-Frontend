import request from "superagent";

const URL = 'https://petreon-api.herokuapp.com/'

export async function fetchUsers() {
    try {
        const response = await request
            .get(`${URL}api/v1/users`)
            .withCredentials()
        return response.body;
    } catch (err) {
        throw err;
    }
}

export async function fetchUser(id) {
    try {
        const response = await request
            .get(`${URL}api/v1/users/${id}`)
            .withCredentials()
        return response.body;
    } catch (err) {
        throw err;
    }
}

export async function fetchUserByEmail() {
    try {
        const response = await request
            .get(`${URL}api/v1/users/email`)
            .withCredentials()
        return response.body;
    } catch (err) {
        throw err;
    }
}

export async function createUser(newUser) {
    try {
        const response = await request
            .post(`${URL}api/v1/users`)
            .send(newUser)
            .withCredentials()
            return response.body;
        } catch (err) {
        throw err;
    }
}

export async function updateUser(id, newUser) {
    try {
        const response = await request
            .put(`${URL}api/v1/users/${id}`)
            .send(newUser)
            .withCredentials()
        return response.body;
    } catch (err) {
        throw err;
    }
}

export async function deleteUser(id) {
    try {
        const response = await request
            .delete(`${URL}api/v1/users/${id}`)
            .withCredentials()
        return response.body;
    } catch (err) {
        throw err;
    }
}

export async function checkUsername(username) {
    try {
        const response = await request
            .get(`${URL}api/v1/users/username/${username}`)
            .withCredentials()
        return response.body;
    } catch (err) {
        throw err;
    }
}
