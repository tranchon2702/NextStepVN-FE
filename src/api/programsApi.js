import apiClient from "./config";

const programsApi = {
  getBySlug: async (slug) => {
    const res = await apiClient.get(`/api/programs/slug/${slug}`);
    return res.data?.data;
  },
  list: async () => {
    const res = await apiClient.get(`/api/programs`);
    return res.data?.data || [];
  }
};

export default programsApi;


