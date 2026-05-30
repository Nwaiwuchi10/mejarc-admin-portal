import Api from "../Utils/Api";

export const marketplaceService = {
  getStats: async () => {
    try {
      const response = await Api.get("/admin/marketplace/stats");
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || "Failed to fetch marketplace stats",
      };
    }
  },

  getListings: async (params: any = {}) => {
    try {
      const response = await Api.get("/admin/marketplace/listings", { params });
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || "Failed to fetch listings",
      };
    }
  },

  getListingById: async (listingId: string) => {
    try {
      const response = await Api.get(`/admin/marketplace/listings/${listingId}`);
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || "Failed to fetch listing details",
      };
    }
  },

  approveListing: async (listingId: string) => {
    try {
      const response = await Api.patch(`/admin/marketplace/listings/${listingId}/approve`);
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || "Failed to approve listing",
      };
    }
  },

  rejectListing: async (listingId: string, reason: string) => {
    try {
      const response = await Api.patch(`/admin/marketplace/listings/${listingId}/reject`, { reason });
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || "Failed to reject listing",
      };
    }
  },

  requestChange: async (listingId: string, feedback: string) => {
    try {
      const response = await Api.patch(`/admin/marketplace/listings/${listingId}/request-change`, { feedback });
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || "Failed to request change",
      };
    }
  },
};
