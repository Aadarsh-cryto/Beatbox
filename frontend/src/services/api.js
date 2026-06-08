import axios from "axios";

const api = axios.create({
   baseURL: "https://beatbox-backend-0hhw.onrender.com/api",
    
  withCredentials: true
});

export default api;


// import axios from "axios";

// const api = axios.create({
//   baseURL: "https://beatbox-project-ls41.onrender.com",
//   withCredentials: true,
// });

// export default api;