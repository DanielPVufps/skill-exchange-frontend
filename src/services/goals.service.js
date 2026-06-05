import api from "@/lib/api";

export const goalsService = {

  getGoals: () => {

    return api.get("/goals/");

  },

  achieveGoal: (id) => {

    return api.post(`/goals/${id}/achieve/`);

  }

};