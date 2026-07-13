import Api from "../Utils/Api";

export const contactService = {
  getInquiries: async () => {
    try {
      const response = await Api.get("/contact");
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || "Failed to fetch contact inquiries",
      };
    }
  },
};
