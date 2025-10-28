import apiClient from "@/api/config";

const programsAdminService = {
  getPrograms: async () => {
    const res = await apiClient.get("/api/programs");
    return res.data?.data || [];
  },
  getProgramById: async (id) => {
    const res = await apiClient.get(`/api/programs/${id}`);
    return res.data?.data;
  },
  createProgram: async (payload) => {
    const res = await apiClient.post("/api/programs", payload);
    return res.data;
  },
  updateProgram: async (id, payload) => {
    const res = await apiClient.put(`/api/programs/${id}`, payload);
    return res.data;
  },
  deleteProgram: async (id) => {
    const res = await apiClient.delete(`/api/programs/${id}`);
    return res.data;
  }
};

export default programsAdminService;


