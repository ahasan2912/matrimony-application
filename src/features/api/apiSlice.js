import Cookies from "js-cookie";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseQueryWithErrorHandling } from "./errorHandling";

export const baseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    credentials: "include",
    prepareHeaders: (headers) => {
        const resetToken = localStorage.getItem("resetToken");
        const token = Cookies.get("accessToken");
        if (token) {
            headers.set("Authorization", `Bearer ${token}`);
        }
        if (resetToken) {
            headers.set("token", resetToken);
        }
        return headers;
    },
});

const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: baseQueryWithErrorHandling,
    // baseQuery: baseQuery,
    tagTypes: [],
    endpoints: () => ({}),
});

export default apiSlice;