import Api from "../Utils/Api";

export const userService = {
  getUsers: async (params: any = {}) => {
    try {
      const response = await Api.get("/admin/users", { params });
      return response.data;
    } catch (error: any) {
      return { success: false, message: error.response?.data?.message || "Failed to fetch users" };
    }
  },

  getUserById: async (userId: string) => {
    try {
      const response = await Api.get(`/admin/users/${userId}`);
      return response.data;
    } catch (error: any) {
      return { success: false, message: error.response?.data?.message || "Failed to fetch user details" };
    }
  },

  suspendUser: async (userId: string) => {
    try {
      const response = await Api.patch(`/admin/users/${userId}/suspend`);
      return response.data;
    } catch (error: any) {
      return { success: false, message: error.response?.data?.message || "Failed to suspend user" };
    }
  },

  activateUser: async (userId: string) => {
    try {
      const response = await Api.patch(`/admin/users/${userId}/activate`);
      return response.data;
    } catch (error: any) {
      return { success: false, message: error.response?.data?.message || "Failed to activate user" };
    }
  },

  makeAdmin: async (userId: string) => {
    try {
      const response = await Api.post("/admin/make-admin", { userId });
      return response.data;
    } catch (error: any) {
      return { success: false, message: error.response?.data?.message || "Failed to make user admin" };
    }
  },
};
