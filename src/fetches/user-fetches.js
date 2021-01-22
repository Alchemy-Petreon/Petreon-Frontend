import request from "superagent";

const URL = process.env.REACT_APP_SERVER_URL

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

export async function uploadProfilePicture(file) {
    try {
        const response = await request
            .post(`${URL}api/v1/users/picture`)
            .withCredentials()
            .send(file)
        return response.body;
    } catch (err) {
        throw err;
    }
}

export async function logoutUser() {
    try {
        await request
            .get(`${URL}api/v1/auth/logout`)
            .withCredentials()
    } catch (err) {
        throw err;
    }
}

export async function subscribe(petId) {
    try {
        const response = await request
            .get(`${URL}api/v1/users/subscribe/${petId}`)
            .withCredentials()
        return response.body;

    } catch (err) {
        throw err;
    }
}

export async function unsubscribe(petId) {
    try {
        const response = await request
            .get(`${URL}api/v1/users/unsubscribe/${petId}`)
            .withCredentials()

        return response.body;
    } catch (err) {
        throw err;
    }
}

export async function subscribedToPet(petId) {
    try {
        const response = await request
            .get(`${URL}api/v1/users/subscriptions/${petId}`)
            .withCredentials()

        return response.body
    } catch (err) {
        throw err;
    }
}