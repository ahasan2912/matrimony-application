import apiSlice from "../api/apiSlice";

export const swipfeedApi = apiSlice.injectEndpoints({

    endpoints: (builder) => ({
        getSwipFeedData: builder.query({
            query: ({ candidateId, cursor, limit}) => {
                const params = new URLSearchParams();

                params.append("candidateId", candidateId);
                params.append("limit", limit);

                if (cursor) {
                    params.append("cursor", cursor);
                }

                return {
                    url: `/swipes/feed?${params.toString()}`,
                    method: "GET",
                    credentials: "include",
                };
            },
        }),
        handleClickCandidateReaction: builder.mutation({
            query: (data) => ({
                url: "/swipes/action",
                method: "POST",
                body: data,
                credentials: "include",
            }),
        }),
    }),
});

export const { useGetSwipFeedDataQuery, useHandleClickCandidateReactionMutation } = swipfeedApi;

