import Cookies from "js-cookie";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    credentials: "include",
    prepareHeaders: (headers) => {
        const token = Cookies.get("accessToken");
        if (token) {
            headers.set("Authorization", `Bearer ${token}`);
        }
        return headers;
    },
});

const apiSlice = createApi({
    reducerPath: "api",
    // baseQuery: baseQueryWithErrorHandling,
    baseQuery: baseQuery,
    tagTypes: ["candidates"],
    endpoints: () => ({}),
});

export default apiSlice;