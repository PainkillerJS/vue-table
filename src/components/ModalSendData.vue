<template>
  <v-dialog v-model="dialog" max-width="500px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
        Добавить студента
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="text-h5">{{ formTitle }}</span>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-row>
            <MyInput
              v-for="inputData in dataStudent"
              :key="inputData.label"
              v-model="inputData.value"
              :label="inputData.label"
              :type="inputData.type"
            />
          </v-row>
          <v-alert type="error" v-show="error">Заполнены не все поля</v-alert>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn color="blue darken-1" text @click="closeModalSend">
          Отмена
        </v-btn>
        <v-btn color="blue darken-1" text @click="sendData"> Отправить </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import MyInput from "@/components/UI/MyInput";

export default {
  name: "ModalSendData",
  components: {
    MyInput,
  },

  props: {
    value: Boolean,
    editedIndex: Number,
    editedItem: Object,
    error: Boolean,
  },

  data: () => ({
    dialog: false,
  }),

  created() {
    this.dialog = this.value;
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Новый студент" : "Изменить данные";
    },
    dataStudent() {
      return Object.keys(this.editedItem).reduce((obj, key) => {
        if (key !== "_id") {
          obj[key] = this.editedItem[key];
        }
        return obj;
      }, {});
    },
  },

  methods: {
    closeModalSend() {
      this.$emit("closeModalSend");
    },
    sendData() {
      this.$emit("sendData");
    },
  },

  watch: {
    value(newValue) {
      this.dialog = newValue;
    },
    dialog(newValue) {
      this.$emit("input", newValue);
    },
  },
};
</script>