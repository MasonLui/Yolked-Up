// articleService.js

import { db } from "../firebaseConfig"
import {
  collection,
  query,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  orderBy,
  limit,
  Timestamp,
} from "firebase/firestore"

export async function createArticle({ title, body, user }) {
  const data = { title, body, date: Timestamp.now(), author: {id: user.uid, name: user.displayName}}
  const docRef = await addDoc(collection(db, "blog_posts"), data)
  return { id: docRef.id, ...data }
}

export async function deleteArticle({ article }) {
  const docRef = doc(db, "blog_posts", article.id)
  await deleteDoc(docRef)
  return docRef.id
}

export async function updateArticle({id, title, body, user }) {
  const data = { title, body, date: Timestamp.now(), author: {id: user.uid, name: user.displayName}}
  const docRef = doc(db, "blog_posts", id)
  await updateDoc(docRef, data)
  return { id: docRef.id, ...data }
}

// Function to fetch articles
export async function fetchArticles() {
  const snapshot = await getDocs(
    query(collection(db, "blog_posts"), orderBy("date", "desc"), limit(20))
  );

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}
