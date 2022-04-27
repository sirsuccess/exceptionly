
const baseURL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

const endpoints = {
    getUserById: (userId:string) => `${baseURL}/users/${userId}`,
    getAllUsers: `${baseURL}/users`,
    createUser: `${baseURL}/users/sign_up`,
    login: `${baseURL}/users/login`,
    
};

export default endpoints
