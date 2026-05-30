import Api from "../Utils/Api";

export const communicationService = {
  getStats: async () => {
    try {
      const response = await Api.get("/admin/communication/stats");
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || "Failed to fetch communication stats",
      };
    }
  },

  getConversations: async (params: any = {}) => {
    try {
      const response = await Api.get("/admin/communication/conversations", { params });
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || "Failed to fetch conversations",
      };
    }
  },

  getConversationById: async (conversationId: string) => {
    try {
      const response = await Api.get(`/admin/communication/conversations/${conversationId}`);
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || "Failed to fetch conversation details",
      };
    }
  },

  escalateConversation: async (conversationId: string, reason: string) => {
    try {
      const response = await Api.post(`/admin/communication/conversations/${conversationId}/escalate`, { reason });
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || "Failed to escalate conversation",
      };
    }
  },
};
