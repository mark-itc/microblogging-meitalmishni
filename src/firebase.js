import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyAdZrs76epVjpjiiE9iP_4OPPUYhNhLAbg",
    authDomain: "microblogging-8a970.firebaseapp.com",
    databaseURL: "https://microblogging-8a970-default-rtdb.firebaseio.com",
    projectId: "microblogging-8a970",
    storageBucket: "microblogging-8a970.appspot.com",
    messagingSenderId: "538257001167",
    appId: "1:538257001167:web:890beb05ca937b253f85ba",
    measurementId: "G-VKL8L66KEJ"
};

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage(app)
export { auth, db, storage }