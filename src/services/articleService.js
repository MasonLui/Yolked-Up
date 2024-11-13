// articleService.js

import { db } from "../firebaseConfig";
import { collection, addDoc, deleteDoc, updateDoc, getDocs, query, orderBy, limit, Timestamp } from "firebase/firestore";

// Function to create a new article
export async function createArticle({ title, body, user }) {
  if (!user || !user.uid || !user.displayName) {
    throw new Error("User authentication information is missing");
  }

  const data = { 
    title, 
    body, 
    date: Timestamp.now(), 
    author: {
      id: user.uid, 
      name: user.displayName
    }
  };

  const docRef = await addDoc(collection(db, "blog_posts"), data);
  return { id: docRef.id, ...data };
}

// Function to delete an article
export async function deleteArticle(article) {
  if (!article || !article.id) {
    throw new Error("Article ID is missing");
  }

  const docRef = doc(db, "blog_posts", article.id);
  await deleteDoc(docRef);
  return docRef.id;
}

// Function to update an existing article
export async function updateArticle({ id, title, body, user }) {
  if (!id) {
    throw new Error("Article ID is missing");
  }
  if (!user || !user.uid || !user.displayName) {
    throw new Error("User authentication information is missing");
  }

  const data = { 
    title, 
    body, 
    date: Timestamp.now(), 
    author: {
      id: user.uid, 
      name: user.displayName
    }
  };

  const docRef = doc(db, "blog_posts", id);
  await updateDoc(docRef, data);
  return { id: docRef.id, ...data };
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
