import React from "react";
// import FileUpload from "./components/FileUpload";
// import ImageGallery from "./components/ImageGallery";
import FolderList from "./components/FolderList";
import FolderView from "./components/FolderView";
import Header from "./components/Header";
// add react-router-dom
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <div
      style={{
        // center the content
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        width: "100vw",
        height: "100vh",
      }}
    >
      <Header curr="/" />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<FolderList />} />
          <Route path="/folder/:folderId" element={<FolderView />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
