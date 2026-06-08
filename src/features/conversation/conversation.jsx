import apiSlice from "../api/apiSlice";

export const conversationApi = apiSlice.injectEndpoints({

    endpoints: (builder) => ({
        conversationList: builder.query({
            query: (candidateId) => ({
                url: `/conversations?candidateId=${candidateId}&status=OPEN`,
                method: "GET",
                credentials: "include",
            }),
        }),
    }),
});

export const {useConversationListQuery} = conversationApi;
