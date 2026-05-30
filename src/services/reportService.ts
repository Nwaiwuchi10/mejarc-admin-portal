import Api from "../Utils/Api";

export const reportService = {
  getSummary: async () => {
    try {
      const response = await Api.get("/admin/reports/summary");
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || "Failed to fetch report summary",
      };
    }
  },

  getPerformance: async () => {
    try {
      const response = await Api.get("/admin/reports/performance");
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || "Failed to fetch performance data",
      };
    }
  },

  getRevenueChart: async () => {
    try {
      const response = await Api.get("/admin/reports/revenue-chart");
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || "Failed to fetch revenue chart data",
      };
    }
  },

  getTopAgents: async () => {
    try {
      const response = await Api.get("/admin/reports/top-agents");
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || "Failed to fetch top agents",
      };
    }
  },

  getCustomerActivity: async () => {
    try {
      const response = await Api.get("/admin/reports/customer-activity");
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || "Failed to fetch customer activity",
      };
    }
  },

  getSystemHealth: async () => {
    try {
      const response = await Api.get("/admin/system-health");
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || "Failed to fetch system health",
      };
    }
  },
};
