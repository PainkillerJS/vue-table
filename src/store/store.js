import Vue from "vue";
import Vuex from "vuex";

import studentModules from "./studentModules";

Vue.use(Vuex);

export default new Vuex.Store({ modules: { studentModules } });
