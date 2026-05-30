import Api from "../Utils/Api";

export const projectService = {
  getStats: async () => {
    try {
      const response = await Api.get("/admin/projects/stats");
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || "Failed to fetch project stats",
      };
    }
  },

  getCustomerProjects: async (params: any = {}) => {
    try {
      const response = await Api.get("/admin/projects/customers", { params });
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || "Failed to fetch customer projects",
      };
    }
  },

  getAgentPerformance: async (params: any = {}) => {
    try {
      const response = await Api.get("/admin/projects/agents", { params });
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || "Failed to fetch agent performance",
      };
    }
  },

  getCustomProjects: async (params: any = {}) => {
    try {
      const response = await Api.get("/admin/projects/custom", { params });
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || "Failed to fetch custom projects",
      };
    }
  },

  getProjectById: async (projectId: string) => {
    try {
      const response = await Api.get(`/admin/projects/customers/${projectId}`);
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || "Failed to fetch project details",
      };
    }
  },

  assignAgent: async (projectId: string, agentId: string) => {
    try {
      const response = await Api.patch(`/admin/projects/customers/${projectId}/assign-agent`, { agentId });
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || "Failed to assign agent",
      };
    }
  },

  approveCustomProject: async (submissionId: string) => {
    try {
      const response = await Api.patch(`/admin/projects/custom/${submissionId}/approve`);
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || "Failed to approve custom project",
      };
    }
  },

  rejectCustomProject: async (submissionId: string, reason: string) => {
    try {
      const response = await Api.patch(`/admin/projects/custom/${submissionId}/reject`, { reason });
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || "Failed to reject custom project",
      };
    }
  },
};
