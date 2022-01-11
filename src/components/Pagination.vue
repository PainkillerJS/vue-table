<template>
  <div class="text-center pt-2">
    <v-pagination
      v-model="page"
      :length="pageCount"
      circle
      class="no-outline"
    />
  </div>
</template>

<script>
export default {
  name: "Pagination",

  props: {
    page: {
      type: Number,
      require: true,
    },
    pageCount: {
      type: Number,
      require: true,
    },
  },
};
</script>

<style>
.no-outline button:focus {
  outline: 0;
}
</style>
