
const baseURL = process.env.REACT_APP_BASE_URL || "http://localhost:5000";

const endpoints = {
    getUserById: (userId:string) => `${baseURL}/users`,
    getAllUsers: `${baseURL}/users`,
    
};

export default endpoints
