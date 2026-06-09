import apiSlice from "../api/apiSlice";

export const matchesApi = apiSlice.injectEndpoints({

    endpoints: (builder) => ({
        matchesList: builder.query({
            query: (candidateId) => ({
                url: `/matches?candidateId=${candidateId}&hasStartedChat=false`,
                method: "GET",
                credentials: "include",
            }),
        }),
        sendHIMessage: builder.mutation({
            query: (data) => ({
                url: "/messages",
                method: "POST",
                body: data,
                credentials: "include",
            }),
        }),
    }),
});

export const { useMatchesListQuery, useSendHIMessageMutation } = matchesApi;
