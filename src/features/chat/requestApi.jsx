import apiSlice from "../api/apiSlice";

export const requestApi = apiSlice.injectEndpoints({

    endpoints: (builder) => ({
        requestList: builder.query({
            query: (candidateId) => ({
                url: `/conversations/message_requests?candidateId=${candidateId}&type=incoming&status=PENDING`,
                method: "GET",
                credentials: "include",
            }),
        }),
        requestAccept: builder.mutation({
            query: ({ data, requestId }) => ({
                url: `/conversations/message-requests/${requestId}/accept`,
                method: "PATCH",
                body: data,
                credentials: "include",
            }),
        }),
        requestDecline: builder.mutation({
            query: ({ data, requestId }) => ({
                url: `/conversations/message-requests/${requestId}/reject`,
                method: "PATCH",
                body: data,
                credentials: "include",
            }),
        }),
    }),
});

export const { useRequestListQuery, useRequestAcceptMutation, useRequestDeclineMutation } = requestApi;
