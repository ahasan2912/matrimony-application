import apiSlice from "../api/apiSlice";

export const messageApi = apiSlice.injectEndpoints({

    endpoints: (builder) => ({
        conversationList: builder.query({
            query: (candidateId) => ({
                url: `/conversations?candidateId=${candidateId}&status=OPEN`,
                method: "GET",
                credentials: "include",
            }),
        }),
        getMessages: builder.query({
            query: (conversationId) => ({
                url: `/messages?conversationId=${conversationId}`,
                method: "GET",
                credentials: "include",
            }),
        }),
        sendMessage: builder.mutation({
            query: (data) => ({
                url: "/messages",
                method: "POST",
                body: data,
                credentials: "include",
            }),
        }),
    }),
});

export const {
    useConversationListQuery,
    useGetMessagesQuery,
    useSendMessageMutation,
} = messageApi;
