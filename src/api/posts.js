import { posts } from ".";

function parseToNumber(id) {
  return isNaN(Number(id)) ? NaN : Number(id);
}

export function getPosts(params) {
  // GET /posts
  return posts.get("/", { params });
}

export function getPostById(id) {
  const numId = parseToNumber(id);
  // GET /posts/:id
  return posts.get(`/${numId}`);
}

export function createPost(data) {
  // POST /posts
  return posts.post("/", data);
}

export function updatePost(id, data) {
  const numId = parseToNumber(id);
  // PUT /posts/:id
  return posts.put(`/${numId}`, data);
}

export function deletePost(id) {
  const numId = parseToNumber(id);
  // DELETE /posts/:id
  return posts.delete(`/${numId}`);
}
