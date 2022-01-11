<template>
  <v-container fluid>
    <v-app>
      <h5 class="text-center font-weight-light">Студенты</h5>
      <v-data-table
        :headers="headers"
        :items="this.$store.getters.getAllStudents"
        :page.sync="page"
        :items-per-page="itemsPerPage"
        class="elevation-1"
        @page-count="pageCount = $event"
        hide-default-footer
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-spacer />
            <ModalSendData
              v-model="dialog"
              :editedIndex="editedIndex"
              :editedItem="editedItem"
              :error="error"
              @closeModalSend="closeModalSend"
              @sendData="sendData"
            />

            <ModalDelete
              v-model="dialogDelete"
              @closeModalDelete="closeModalDelete"
              @deleteItemConfirm="deleteItemConfirm"
            />
          </v-toolbar>
        </template>

        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">
            mdi-pencil
          </v-icon>
          <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
        </template>

        <template v-slot:no-data>
          <v-btn color="primary" @click="getData"> Обновить </v-btn>
        </template>
      </v-data-table>
      <MySnackbars
        :isShow="isShowSnackbars"
        title="Новый студент успешно добавлен"
      />
      <Pagination :page="page" :page-count="pageCount" />
    </v-app>
  </v-container>
</template>

<script>
import Pagination from "@/components/Pagination";
import ModalDelete from "@/components/ModalDelete";
import ModalSendData from "@/components/ModalSendData";
import MySnackbars from "@/components/UI/MySnackbars";

import StudentsService from "@/service/StudentsService";

import validator from "@/helpers/validator";

export default {
  name: "App",
  components: {
    Pagination,
    ModalDelete,
    ModalSendData,
    MySnackbars,
  },

  data: () => ({
    dialog: false,
    dialogDelete: false,
    isShowSnackbars: false,
    error: false,
    page: 1,
    pageCount: 0,
    itemsPerPage: 5,
    headers: [
      {
        text: "Имя",
        value: "name",
        class: "headerTable",
        width: "20rem",
        align: "center",
        sortable: false,
      },
      {
        text: "Фамилия",
        class: "headerTable",
        align: "center",
        value: "surname",
      },
      { text: "Курс", class: "headerTable", align: "center", value: "course" },
      {
        text: "Дата Рождения",
        class: "headerTable",
        align: "center",
        value: "dateOfBirthday",
      },
      {
        text: "Средняя оценка",
        class: "headerTable",
        align: "center",
        value: "middleMark",
      },
      {
        text: "Опции",
        class: "headerTable",
        align: "center",
        value: "actions",
        sortable: false,
      },
    ],
    editedIndex: -1,
    editedItem: {
      name: {
        value: "",
        label: "Имя",
        type: "text",
      },
      surname: {
        value: "",
        label: "Фамилия",
        type: "text",
      },
      course: {
        value: "",
        label: "Курс",
        type: "number",
      },
      middleMark: {
        value: "",
        label: "Средняя оценка",
        type: "number",
      },
      dateOfBirthday: {
        value: "",
        label: "Дата Рождения",
        type: "date",
      },
    },
    defaultItem: {
      name: {
        value: "",
        label: "Имя",
        type: "text",
      },
      surname: {
        value: "",
        label: "Фамилия",
        type: "text",
      },
      course: {
        value: "",
        label: "Курс",
        type: "number",
      },
      middleMark: {
        value: "",
        label: "Средняя оценка",
        type: "number",
      },
      dateOfBirthday: {
        value: "",
        label: "Дата Рождения",
        type: "date",
      },
    },
  }),

  watch: {
    dialog(val) {
      val || this.closeModalSend();
    },
    dialogDelete(val) {
      val || this.closeModalDelete();
    },
  },

  mounted() {
    this.getData();
  },

  methods: {
    getData() {
      this.$store.dispatch("getStudents");
    },

    async deleteItemConfirm() {
      await StudentsService.removeStudent(this.editedItem._id.value);
      this.closeModalDelete();
      await this.getData();
    },

    async sendData() {
      const payload = Object.keys(this.editedItem).reduce((obj, key) => {
        obj[key] = this.editedItem[key].value;
        return obj;
      }, {});

      this.error = validator(payload);

      if (!this.error) {
        if (this.editedIndex > -1) {
          await StudentsService.changeDataStudent(payload);
        } else {
          await StudentsService.addStudent({
            ...payload,
            _id: this.$store.getters.getAllStudents.length,
          });
          this.activateSnackbars();
        }

        this.closeModalSend();
        await this.getData();
      }
    },

    updateEditedItems(item) {
      this.editedIndex = this.$store.getters.getAllStudents.indexOf(item);
      this.editedItem = Object.keys(item).reduce((obj, key) => {
        obj[key] = {
          value: item[key],
          label: this.defaultItem[key]?.label,
        };
        return obj;
      }, {});
    },

    activateSnackbars() {
      this.isShowSnackbars = true;
    },

    restoreEditedItems() {
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    editItem(item) {
      this.updateEditedItems(item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.updateEditedItems(item);
      this.dialogDelete = true;
    },

    closeModalSend() {
      this.dialog = false;
      this.restoreEditedItems();
    },

    closeModalDelete() {
      this.dialogDelete = false;
      this.restoreEditedItems();
    },
  },
};
</script>

<style>
h5 {
  font-size: 3rem;
}

.headerTable {
  font-size: 1.1rem !important;
  background-color: rgba(72, 199, 208, 0.9);
  color: rgba(54, 47, 47, 0.93) !important;
}
</style>
