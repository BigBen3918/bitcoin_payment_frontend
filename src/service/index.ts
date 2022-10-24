import axios from "axios";

// Auth Manage
const Request_Payment = async (data: any) => {
    const request = axios.post(
        process.env.REACT_APP_BACKENDURL + "/api/request",
        data
    );

    return request;
};

const Check_OrderId = async (data: any) => {
    const request = axios.post(
        process.env.REACT_APP_BACKENDURL + "/api/check-order",
        data
    );

    return request;
};

// Export Functions
const Action = {
    Request_Payment,
    Check_OrderId,
};

export default Action;
