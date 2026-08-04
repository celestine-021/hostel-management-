import axios from "axios";

const api = axios.create({
  baseURL: "https://dashboard.render.com/web/srv-d9ov8nnlk1mc73a2su8g/deploys/dep-d9ovbbb7uimc73a9q10g",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;