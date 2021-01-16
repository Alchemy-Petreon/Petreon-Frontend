import request from "superagent";

const URL = 'https://petreon-api.herokuapp.com/'


export async function fetchPets() {
    try {
        const response = await request
            .get(`${URL}api/v1/pets`)
        // .withCredentials()
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

export async function createPet(newPet) {
    try {
        const response = await request
            .post(`${URL}api/v1/pets`)
            .send(newPet)
            .withCredentials()
        return response.body;
    } catch (err) {
        throw err;
    }
}

export async function updatePet(id, newPet) {
    try {
        const response = await request
            .put(`${URL}api/v1/pets/${id}`)
            .send(newPet)
            .withCredentials()
        return response.body;
    } catch (err) {
        throw err;
    }
}

export async function deletePet(id) {
    try {
        const response = await request
            .delete(`${URL}api/v1/pets/${id}`)
            .withCredentials()
        return response.body;
    } catch (err) {
        throw err;
    }
}
