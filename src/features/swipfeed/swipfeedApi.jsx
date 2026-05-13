import apiSlice from "../api/apiSlice";

export const swipfeedApi = apiSlice.injectEndpoints({

    endpoints: (builder) => ({
        getSwipFeedData: builder.query({
            query: (id) => ({
                url: `/swipes/feed?candidateId=${id}`,
                method: "GET",
                credentials: "include",
            }),
        }),
    }),
});

export const { useGetSwipFeedDataQuery } = swipfeedApi;
