import firebase from 'firebase'
import '@firebase/firestore'

const app = firebase.initializeApp({
    apiKey: "AIzaSyCrlUb0kd5ubUT4oIW8oPlMMGuh9xlgnKQ",
    authDomain: "mercado-libre-da15a.firebaseapp.com",
    projectId: "mercado-libre-da15a",
    storageBucket: "mercado-libre-da15a.appspot.com",
    messagingSenderId: "166629738524",
    appId: "1:166629738524:web:3b666e121be9cc3ef677d9"
  });

  export function getFireBase(){
      return app;
  };

  export function getFireStore(){
    return firebase.firestore(app)
  }

  export const conecctionDb = async () => {
    const db = getFireStore();

    const elements = db.collection('usuarios')
    return await elements.get()
  }

  export const deleteFieldFromDb = async (id) => {
    const db = getFireStore().collection('usuarios').doc(id)
    db.update({
      fav: firebase.firestore.FieldValue.delete()
    });
  }
