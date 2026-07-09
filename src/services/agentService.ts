import Api from "../Utils/Api";

export const agentService = {
  getAgents: async (params: any = {}) => {
    try {
      const response = await Api.get("/admin/agents", { params });
      return response.data;
    } catch (error: any) {
      return { success: false, message: error.response?.data?.message || "Failed to fetch agents" };
    }
  },

  getAgentById: async (agentId: string) => {
    try {
      const response = await Api.get(`/admin/agents/${agentId}`);
      return response.data;
    } catch (error: any) {
      return { success: false, message: error.response?.data?.message || "Failed to fetch agent details" };
    }
  },

  approveAgent: async (agentId: string) => {
    try {
      const response = await Api.post("/admin/approve-agent", { agentId });
      return response.data;
    } catch (error: any) {
      return { success: false, message: error.response?.data?.message || "Failed to approve agent" };
    }
  },

  rejectAgent: async (agentId: string, reason: string) => {
    try {
      const response = await Api.post("/admin/reject-agent", { agentId, reason });
      return response.data;
    } catch (error: any) {
      return { success: false, message: error.response?.data?.message || "Failed to reject agent" };
    }
  },

  getApplications: async (params: any = {}) => {
    try {
      const response = await Api.get("/admin/agents/applications", { params });
      return response.data;
    } catch (error: any) {
      return { success: false, message: error.response?.data?.message || "Failed to fetch agent applications" };
    }
  },
};
