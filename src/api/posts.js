import axios from "axios";

// const posts = [
//   { id: 1, title: "제목1", content: "내용1", createdAt: "2024-01-01" },
//   { id: 2, title: "제목2", content: "내용2", createdAt: "2024-02-01" },
//   { id: 3, title: "제목3", content: "내용3", createdAt: "2024-03-01" },
//   { id: 4, title: "제목4", content: "내용4", createdAt: "2024-04-01" },
//   { id: 5, title: "제목5", content: "내용5", createdAt: "2024-05-01" },
// ];

const API_URL = "http://localhost:5000/posts";

function fetchData(url, method = "GET", data, params) {
  return axios({
    url,
    method,
    data,
    params,
  });
}

function parseToNumber(id) {
  return isNaN(Number(id)) ? NaN : Number(id);
}

export function getPosts(params) {
  // return axios.get("http://localhost:5000/posts", { params });
  return fetchData(API_URL, "", "", params);
}

export function getPostById(id) {
  const numId = parseToNumber(id);
  // return axios.get(`http://localhost:5000/posts/${numId}`);
  return fetchData(`${API_URL}/${numId}`);
}

export function createPost(data) {
  // return axios.post("http://localhost:5000/posts", data);
  return fetchData(API_URL, "POST", data);
}
export function updatePost(id, data) {
  const numId = parseToNumber(id);
  // return axios.put(`http://localhost:5000/posts/${numId}`, data);
  return fetchData(`${API_URL}/${numId}`, "PUT", data);
}
export function deletePost(id) {
  const numId = parseToNumber(id);
  // return axios.delete(`http://localhost:5000/posts/${numId}`);
  return fetchData(`${API_URL}/${numId}`, "DELETE");
}
