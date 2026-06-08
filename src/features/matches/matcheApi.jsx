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
    }),
});

export const {useMatchesListQuery} = matchesApi;
