import StudentsService from "@/service/StudentsService";

export default {
  state: {
    students: [],
  },
  getters: {
    getAllStudents(state) {
      return state.students;
    },
  },
  mutations: {
    setStudents(state, payload) {
      state.students = payload;
    },
  },
  actions: {
    getStudents(context) {
      StudentsService.getStudents().then((data) =>
        context.commit("setStudents", data)
      );
    },
  },
};
