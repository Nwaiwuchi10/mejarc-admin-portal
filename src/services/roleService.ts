import Api from "../Utils/Api";

export const roleService = {
  getStats: async () => {
    try {
      const response = await Api.get("/admin/roles/stats");
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || "Failed to fetch role stats",
      };
    }
  },

  getRoles: async () => {
    try {
      const response = await Api.get("/admin/roles");
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || "Failed to fetch roles",
      };
    }
  },

  createRole: async (data: any) => {
    try {
      const response = await Api.post("/admin/roles", data);
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || "Failed to create role",
      };
    }
  },

  updateRole: async (roleId: string, data: any) => {
    try {
      const response = await Api.patch(`/admin/roles/${roleId}`, data);
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || "Failed to update role",
      };
    }
  },

  deleteRole: async (roleId: string) => {
    try {
      const response = await Api.delete(`/admin/roles/${roleId}`);
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || "Failed to delete role",
      };
    }
  },

  getStaff: async () => {
    try {
      const response = await Api.get("/admin/roles/staff");
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || "Failed to fetch staff list",
      };
    }
  },

  assignRole: async (userId: string, roleId: string) => {
    try {
      const response = await Api.patch(`/admin/roles/staff/${userId}/assign`, { roleId });
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || "Failed to assign role",
      };
    }
  },

  getPermissionMatrix: async () => {
    try {
      const response = await Api.get("/admin/roles/permissions");
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || "Failed to fetch permission matrix",
      };
    }
  },
};
