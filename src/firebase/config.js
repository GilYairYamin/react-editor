// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore, collection } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
	apiKey: 'AIzaSyBlNMxvNm1YgRcbENQ8KY5ay7XqjYykDzE',
	authDomain: 'react-editor-32907.firebaseapp.com',
	projectId: 'react-editor-32907',
	storageBucket: 'react-editor-32907.appspot.com',
	messagingSenderId: '876245118503',
	appId: '1:876245118503:web:09f053cb8bcceaf30b6802',
	measurementId: 'G-11WXGC144H',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore()
const dcoumentsCollection = collection(db, 'documents')

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app)

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app)

export { db, dcoumentsCollection, storage, auth }
