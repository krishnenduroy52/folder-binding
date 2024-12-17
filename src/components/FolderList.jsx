import React, { useState, useEffect } from "react";
import { getFolders, addFolder, deleteFolder } from "../utils/db";
import { Link } from "react-router-dom";

const FolderList = () => {
  const [folders, setFolders] = useState([]);
  const [newFolderName, setNewFolderName] = useState("");

  useEffect(() => {
    const fetchFolders = async () => {
      const folders = await getFolders();
      setFolders(folders);
    };
    fetchFolders();
  }, []);

  const createFolder = async () => {
    if (!newFolderName.trim()) return;
    await addFolder(newFolderName);
    setNewFolderName("");
    const folders = await getFolders();
    setFolders(folders);
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <ul>
        {folders.map((folder) => (
          <li key={folder.id}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                padding: "5px",
                cursor: "pointer",
                direction: "none",
                color: "white",
              }}
            >
              <Link to={`/folder/${folder.id}`}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    width: "100%",
                    padding: "5px",
                    cursor: "pointer",
                    direction: "none",
                    color: "white",
                  }}
                >
                  <img
                    src="/folder.png"
                    alt="folder"
                    style={{ width: "60px", height: "60px" }}
                  />
                  {folder.name}
                </div>
              </Link>
              <img
                src="/delete.png"
                alt="delete"
                style={{ width: "30px", height: "30px" }}
                onClick={() => {
                  deleteFolder(folder.id);
                  setFolders(folders.filter((f) => f.id !== folder.id));
                }}
              />
            </div>
          </li>
        ))}
      </ul>
      <div
        style={{
          // place the input and button in a row and bottom of the page
          display: "grid",
          gridTemplateColumns: "69% 29%",
          justifyContent: "space-between",
          position: "fixed",
          bottom: 0,
          width: "100%",
          padding: "10px",
          alignItems: "center",
        }}
      >
        <input
          type="text"
          value={newFolderName}
          onChange={(e) => setNewFolderName(e.target.value)}
          placeholder="New Folder Name"
          style={{
            padding: "10px",
            borderRadius: "5px",
            border: "none",
          }}
        />
        <button
          onClick={createFolder}
          style={{
            padding: "10px",
            borderRadius: "5px",
            border: "none",
            backgroundColor: "orange",
          }}
        >
          Create Folder
        </button>
      </div>
    </div>
  );
};

export default FolderList;
