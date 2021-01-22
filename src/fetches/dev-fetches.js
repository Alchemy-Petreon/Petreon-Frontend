import request from "superagent";

const URL = process.env.REACT_APP_SERVER_URL

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