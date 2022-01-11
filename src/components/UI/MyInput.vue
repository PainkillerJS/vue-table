<template>
  <v-col cols="12" sm="6" md="4">
    <v-text-field v-model="inputValue" :label="label" :type="type" />
  </v-col>
</template>

<script>
export default {
  name: "MyInput",

  props: {
    value: {
      type: String,
      require: true,
    },
    label: String,
    type: String,
  },

  created() {
    this.inputValue = this.value;
  },

  data: () => ({
    inputValue: "",
  }),

  watch: {
    value(newValue) {
      this.inputValue = newValue;
    },
    inputValue(newValue) {
      this.$emit("input", newValue);
    },
  },
};
</script>
