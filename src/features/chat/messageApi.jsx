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
        sendMessage: builder.mutation({
            query: (data) => ({
                url: "/messages",
                method: "POST",
                body: data,
                credentials: "include",
            }),
        }),
        conversationMessage: builder.query({
            query: ({ conversationId, candidateId }) => ({
                url: `/conversations/${conversationId}/messages?candidateId=${candidateId}&limit=50`,
                method: "GET",
                credentials: "include",
            }),
        }),
        conversationMedia: builder.mutation({
            query: ({ data, conversationId }) => ({
                url: `/messages/${conversationId}/media`,
                headers: {
                    "Content-Type": "application/formdata"
                },
                method: "POST",
                body: data,
                credentials: "include",
            }),
        }),
    }),
});

export const {
    useConversationListQuery,
    useSendMessageMutation,
    useConversationMessageQuery,
    useConversationMediaMutation
} = messageApi;

// 
