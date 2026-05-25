import apiSlice from "../api/apiSlice";

export const conversationRequestApi = apiSlice.injectEndpoints({

    endpoints: (builder) => ({
        messageRequest: builder.mutation({
            query: (data) => ({
                url: "/conversations/message_requests",
                method: "POST",
                body: data,
                credentials: "include",
            }),
        }),
    }),
});

export const { useMessageRequestMutation } = conversationRequestApi;
