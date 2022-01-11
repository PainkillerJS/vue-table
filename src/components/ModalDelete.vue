<template>
  <v-dialog v-model="dialogDelete" max-width="500px">
    <v-card>
      <v-card-title class="text-h6"
        >Вы точно хотите удалить этого студента?</v-card-title
      >
      <v-card-actions>
        <v-spacer />
        <v-btn color="blue darken-1" text @click="closeModalDelete"
          >Отмена</v-btn
        >
        <v-btn color="blue darken-1" text @click="deleteItemConfirm">Да</v-btn>
        <v-spacer />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "ModalDelete",
  props: {
    value: {
      type: Boolean,
      require: true,
    },
  },

  data: () => ({
    dialogDelete: false,
  }),

  created() {
    this.dialogDelete = this.value;
  },

  watch: {
    value(newValue) {
      this.dialogDelete = newValue;
    },
    dialogDelete(newValue) {
      this.$emit("input", newValue);
    },
  },

  methods: {
    closeModalDelete() {
      this.$emit("closeModalDelete");
    },
    deleteItemConfirm() {
      this.$emit("deleteItemConfirm");
    },
  },
};
</script>
