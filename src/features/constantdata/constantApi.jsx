import apiSlice from "../api/apiSlice";

export const constantData = apiSlice.injectEndpoints({

    endpoints: (builder) => ({
        getAllConstantData: builder.query({
            query: () => ({
                url: `/candidates/constants`,
                method: "GET",
                credentials: "include",
            }),
        }),
    }),
});

export const { useGetAllConstantDataQuery } = constantData;