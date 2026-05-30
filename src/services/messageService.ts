import Api from "../Utils/Api";

export const messageService = {
  getConversations: async (params: any = {}) => {
    try {
      const response = await Api.get("/admin/messages", { params });
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || "Failed to fetch messages",
      };
    }
  },

  getMessagesByConversationId: async (conversationId: string) => {
    try {
      const response = await Api.get(`/admin/messages/${conversationId}`);
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || "Failed to fetch messages",
      };
    }
  },

  replyToConversation: async (conversationId: string, text: string, attachments: any[] = []) => {
    try {
      const response = await Api.post(`/admin/messages/${conversationId}/reply`, { text, attachments });
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || "Failed to send message",
      };
    }
  },
};
