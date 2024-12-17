import { openDB } from "idb";

const DB_NAME = "image_folder_app";
const FOLDERS_STORE = "folders";
const IMAGES_STORE = "images";

export async function initDB() {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(FOLDERS_STORE)) {
        db.createObjectStore(FOLDERS_STORE, {
          keyPath: "id",
          autoIncrement: true,
        });
      }
      if (!db.objectStoreNames.contains(IMAGES_STORE)) {
        const imageStore = db.createObjectStore(IMAGES_STORE, {
          keyPath: "id",
          autoIncrement: true,
        });
        imageStore.createIndex("folderId", "folderId", { unique: false });
      }
    },
  });
}

export async function getFolders() {
  const db = await initDB();
  return db.getAll(FOLDERS_STORE);
}

export async function addFolder(name) {
  const db = await initDB();
  return db.add(FOLDERS_STORE, { name });
}

export async function getImages(folderId) {
  const db = await initDB();
  return db.getAllFromIndex(IMAGES_STORE, "folderId", folderId);
}

export async function deleteFolder(folderId) {
  const db = await initDB();
  // Delete all images in the folder
  const images = await db.getAllFromIndex(IMAGES_STORE, "folderId", folderId);
  for (const image of images) {
    await db.delete(IMAGES_STORE, image.id);
  }
  // Delete the folder
  return db.delete(FOLDERS_STORE, folderId);
}

export async function addImage(folderId, imageData) {
  const db = await initDB();
  return db.add(IMAGES_STORE, { folderId, imageData });
}
