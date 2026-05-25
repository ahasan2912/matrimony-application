import apiSlice from "../api/apiSlice";

export const visitorApi = apiSlice.injectEndpoints({

    endpoints: (builder) => ({
        peopleLikedMe: builder.query({
            query: ({candidateId, page, limit}) => ({
                url: `/likes/sent?candidateId=${candidateId}&type=LIKE&page=${page}&limit=${limit}`,
                method: "GET",
                credentials: "include",
            }),
        }),
        receivedLikes: builder.query({ //premium
            query: ({candidateId, page, limit}) => ({
                url: `/likes/received?candidateId=${candidateId}&type=LIKE&page=${page}&limit=${limit}`,
                method: "GET",
                credentials: "include",
            }),
        }),
    }),
});

export const { usePeopleLikedMeQuery, useReceivedLikesQuery } = visitorApi;
