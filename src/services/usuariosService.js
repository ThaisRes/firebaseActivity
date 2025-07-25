import { getFirestore } from "firebase-admin/firestore";
import app from "../firebase/app.js";

const db = getFirestore(app);

async function findAll() {
  const documents = await db.collection("usuarios").get();
  const usuarios = documents.docs.map(doc => ({id: doc.id, ...doc.data()}));
  return usuarios;
};

async function findById(id) {
  const doc =  await db.collection("usuarios").doc(id).get();
  if(doc.exists) {
    const usuario = { id: doc.id, ...doc.data() }
    return usuario;
  } else {
    return null;
  }
};

async function save(usuario) { 
  await db.collection("usuarios").add(usuario);  
};

async function update(id, usuario) {
  const docRef = db.collection("usuarios").doc(id);
  const doc = await docRef.get();
  if(doc.exists) {
    await docRef.update(usuario);
    return true;
  } else { 
    return false 
  }
};

async function remove(id) {
  const docRef = db.collection("usuarios").doc(id);
  const doc = await docRef.get();
  if(doc.exists) {
    await docRef.delete();
    return true;
  } else {
    return false;
  }
};

/*
async function remove(id) {
  const docRef = db.collection("usuarios").doc(id);
  const exists = (await docRef.get()).exists;
  if (!exists) return false;
  await docRef.delete();
  return true;
}
*/

export {
  findAll,
  findById,
  save,
  update,
  remove
};
