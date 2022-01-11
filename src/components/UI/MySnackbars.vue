<template>
  <div class="text-center">
    <v-snackbar v-model="isActive" :timeout="timeout" color="success" right top>
      {{ title }}
      <template v-slot:action="{ attrs }">
        <v-btn color="blue" text v-bind="attrs" @click="isActive = false">
          Закрыть
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  name: "MySnackbars",

  props: {
    isShow: Boolean,
    title: String,
  },

  data: () => ({
    timeout: 2500,
    isActive: false,
  }),

  created() {
    this.isActive = this.isShow;
  },

  watch: {
    isShow(newValue) {
      this.isActive = newValue;
    },
    isActive(newValue) {
      this.$emit("input", newValue);
    },
  },
};
</script>
