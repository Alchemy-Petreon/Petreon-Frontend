import request from "superagent";

const URL = 'https://petreon-api.herokuapp.com/'

export async function fetchPosts() {
    try {
        const response = await request
            .get(`${URL}api/v1/posts`)
            .withCredentials()
        return response.body;
    } catch (err) {
        throw err;
    }
}

export async function fetchPost(id) {
    try {
        const response = await request
            .get(`${URL}api/v1/posts/${id}`)
            .withCredentials()
        return response.body;
    } catch (err) {
        throw err;
    }
}

export async function createPost(newPost) {
    try {
        const response = await request
            .post(`${URL}api/v1/posts`)
            .send(newPost)
            .withCredentials()
        return response.body;
    } catch (err) {
        throw err;
    }
}

export async function updatePost(id, newPost) {
    try {
        const response = await request
            .put(`${URL}api/v1/posts/${id}`)
            .send(newPost)
            .withCredentials()
        return response.body;
    } catch (err) {
        throw err;
    }
}

export async function deletePost(id) {
    try {
        const response = await request
            .delete(`${URL}api/v1/posts/${id}`)
            .withCredentials()
        return response.body;
    } catch (err) {
        throw err;
    }
}

export async function updatePostPicture(file, postId) {
    try {
        const response = await request
            .post(`${URL}api/v1/posts/media/${postId}`)
            .send(file)
            .withCredentials();
        return response.body;

    } catch (err) {
        throw err;
    }
}

export async function fetchSubscriptions() {
    try {
        const response = await request
            .get(`${URL}api/v1/posts/subscriptions`)
            .withCredentials();

        return response.body
    } catch (err) {
        throw err;
    }
}