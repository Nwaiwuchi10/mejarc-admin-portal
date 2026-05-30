import Api from "../Utils/Api";

export const settingService = {
  getProfile: async () => {
    try {
      const response = await Api.get("/admin/settings/profile");
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || "Failed to fetch profile",
      };
    }
  },

  updateProfile: async (data: any) => {
    try {
      const response = await Api.patch("/admin/settings/profile", data);
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || "Failed to update profile",
      };
    }
  },

  changePassword: async (data: any) => {
    try {
      const response = await Api.post("/admin/settings/change-password", data);
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || "Failed to change password",
      };
    }
  },

  getSystemSettings: async () => {
    try {
      const response = await Api.get("/admin/settings/system");
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || "Failed to fetch system settings",
      };
    }
  },

  updateSystemSettings: async (data: any) => {
    try {
      const response = await Api.patch("/admin/settings/system", data);
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || "Failed to update system settings",
      };
    }
  },

  getActivityLogs: async (params: any = {}) => {
    try {
      const response = await Api.get("/admin/settings/activity-logs", { params });
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || "Failed to fetch activity logs",
      };
    }
  },
};
