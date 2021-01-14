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
export async function fetchPets() {
    try {
        const response = await request
            .get(`${URL}api/v1/pets`)
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
export async function fetchPet(id) {
    try {
        const response = await request
            .get(`${URL}api/v1/pets/${id}`)
            .withCredentials()
        return response.body;
    } catch (err) {
        throw err;
    }
}
export async function createUser(newUser) {
    try {
        const response = await request
            .get(`${URL}api/v1/users`)
            .send(newUser)
            .withCredentials()
        return response.body;
    } catch (err) {
        throw err;
    }
}



