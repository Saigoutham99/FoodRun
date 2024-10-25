import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyBND_gmpwxI2OXUsJ-SniLS_GbWvk4I13w',
  authDomain: 'foodrun-bc9de.firebaseapp.com',
  projectId: 'foodrun-bc9de',
  storageBucket: 'foodrun-bc9de.appspot.com',
  messagingSenderId: '620274483838',
  appId: '1:620274483838:web:abc123def456',
  databaseURL: 'https://foodrun-bc9de-default-rtdb.firebaseio.com/',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

export { auth, database };
