import request from "superagent";

const URL = 'https://petreon-api.herokuapp.com/'

export async function seedData() {
    try {
        const response = await request
            .get(`${URL}api/v1/dev/seed`)
            .withCredentials()
        return response.body
    } catch (err) {
        throw err;
    }
}