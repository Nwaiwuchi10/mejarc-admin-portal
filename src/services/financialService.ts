import Api from "../Utils/Api";

export const financialService = {
  getStats: async () => {
    try {
      const response = await Api.get("/admin/financials/stats");
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || "Failed to fetch financial stats",
      };
    }
  },

  getTransactions: async (params: any = {}) => {
    try {
      const response = await Api.get("/admin/financials/transactions", { params });
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || "Failed to fetch transactions",
      };
    }
  },

  getPayouts: async (params: any = {}) => {
    try {
      const response = await Api.get("/admin/financials/payouts", { params });
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || "Failed to fetch payouts",
      };
    }
  },

  getDisputes: async (params: any = {}) => {
    try {
      const response = await Api.get("/admin/financials/disputes", { params });
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || "Failed to fetch disputes",
      };
    }
  },

  getRefunds: async (params: any = {}) => {
    try {
      const response = await Api.get("/admin/financials/refunds", { params });
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || "Failed to fetch refunds",
      };
    }
  },

  releasePayout: async (payoutId: string, notes: string) => {
    try {
      const response = await Api.patch(`/admin/financials/payouts/${payoutId}/release`, { notes });
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || "Failed to release payout",
      };
    }
  },

  resolveDispute: async (disputeId: string, resolution: string, refundTo: string) => {
    try {
      const response = await Api.patch(`/admin/financials/disputes/${disputeId}/resolve`, { resolution, refundTo });
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || "Failed to resolve dispute",
      };
    }
  },

  approveRefund: async (refundId: string, notes: string) => {
    try {
      const response = await Api.patch(`/admin/financials/refunds/${refundId}/approve`, { notes });
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || "Failed to approve refund",
      };
    }
  },

  getVendorWithdrawals: async (params: any = {}) => {
    try {
      const response = await Api.get("/wallet/admin/financials/reports", { 
        params: {
          startDate: new Date(new Date().setDate(new Date().getDate() - 30)).toISOString(),
          endDate: new Date().toISOString(),
          ...params
        } 
      });
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || "Failed to fetch vendor withdrawals",
      };
    }
  },

  retryWithdrawal: async (id: string) => {
    try {
      const response = await Api.post(`/wallet/admin/withdrawals/retry/${id}`);
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || "Failed to retry withdrawal",
      };
    }
  }
};
