import apiSlice from "../api/apiSlice";

export const constantData = apiSlice.injectEndpoints({

    endpoints: (builder) => ({
        createCandidateData: builder.mutation({
            query: (data) => ({
                url: "/candidates",
                headers: {
                    "Content-Type": "application/formdata"
                },
                method: "POST",
                body: data,
                credentials: "include",
            }),
            invalidatesTags: ["candidates"],
        }),
        getMyCandidateData: builder.query({
            query: () => ({
                url: `/candidates/my_basic_profile`,
                method: "GET",
                credentials: "include",
            }),
        }),
    }),
});

export const { useCreateCandidateDataMutation, useGetMyCandidateDataQuery } = constantData;
