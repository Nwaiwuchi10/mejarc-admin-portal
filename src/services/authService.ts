import Api from "../Utils/Api";

export interface AuthResponse {
  success: boolean;
  message: string;
  adminToken?: string;
  admin?: any;
  email?: string;
  expiresIn?: string;
}

export const authService = {
  login: async (email: string, password: string): Promise<AuthResponse> => {
    try {
      const response = await Api.post("/admin/login", { email, password });
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || "Login failed",
      };
    }
  },

  verifyLogin: async (email: string, token: string): Promise<AuthResponse> => {
    try {
      const response = await Api.post("/admin/verify-login", { email, token });
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || "Verification failed",
      };
    }
  },

  makeAdmin: async (userId: string, role: string): Promise<any> => {
    try {
      const response = await Api.post("/admin/make-admin", { userId, role });
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || "Failed to promote user",
      };
    }
  },
};
