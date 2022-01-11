import { initializeApp } from "firebase/app";
import { doc, getDoc, getFirestore, updateDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBOTzhjxJ4mX6RHtU7XCdJamyI5lKuzlIk",
  authDomain: "studentsdata-21b90.firebaseapp.com",
  projectId: "studentsdata-21b90",
  storageBucket: "studentsdata-21b90.appspot.com",
  messagingSenderId: "317549465746",
  appId: "1:317549465746:web:4f2ff15626d71f4817164b",
};

class StudentsService {
  constructor() {
    initializeApp(firebaseConfig);
    this.collections = doc(getFirestore(), "russia", "xrGzCWLKc79NmluxYVhT");
  }

  async getStudents() {
    this.students = await getDoc(this.collections).then(
      (doc) => doc.data().students || []
    );

    return this.students;
  }

  async removeStudent(_id) {
    await updateDoc(this.collections, {
      students: this.students.filter((student) => student._id !== _id),
    });
  }

  async addStudent(payload) {
    await updateDoc(this.collections, {
      students: [...this.students, payload],
    });
  }

  async changeDataStudent(payload) {
    await updateDoc(this.collections, {
      students: this.students.map((student) =>
        payload._id === student._id ? payload : student
      ),
    });
  }
}

export default new StudentsService();
