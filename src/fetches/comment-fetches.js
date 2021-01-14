import request from "superagent";

const URL = 'https://petreon-api.herokuapp.com/'


export async function createComment(newComment) {
    try {
        const response = await request
            .post(`${URL}api/v1/comments`)
            .send(newComment)
            .withCredentials()
        return response.body;
    } catch (err) {
        throw err;
    }
}


export async function deleteComment(id) {
    try {
        const response = await request
            .delete(`${URL}api/v1/comments/${id}`)
            .withCredentials()
        return response.body;
    } catch (err) {
        throw err;
    }
}
