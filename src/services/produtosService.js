import { getFirestore } from "firebase-admin/firestore";
import app from "../firebase/app.js";

const db = getFirestore(app);

async function findAll() {
  const documents = await db.collection("produtos").get(); //consultar a coleção produtos
  /* para procurar na ordem tem que criar uma coluna com hora e data e buscar por data
  db.collection("nomeDaColecao").orderBy("campo", "asc")
  asc de ascendente ou pode usar descendente com desc*/
    const produtos = [];  
    documents.forEach(doc => {
      const produto = { ...doc.data(), id: doc.id };      
      produtos.push(produto);
    });
  return produtos;
};

async function findById(id) {
  const doc = await db.collection("produtos").doc(id).get();
  if (doc.exists) {
    const produto = { id: doc.id, ...doc.data() };
    return produto;
  } else {
    return null;
  }
};

async function save(produto) {
  await db.collection("produtos").add(produto);
};

async function update(id, produto) {
  const docRef = db.collection("produtos").doc(id);
  const doc = await docRef.get();
  if(doc.exists) {
    await docRef.update(produto);
    return true;
  } else {
    return false;
  }
};

async function remove(id) {
  const docRef = db.collection("produtos").doc(id);
  const doc = await docRef.get();
  if(doc.exists) {
    await docRef.delete();
    return true;
  } else {
    return false;
  }
};

export { findAll, findById, save, update, remove };