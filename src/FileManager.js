import React, { useEffect, useState } from "react";
import Loader from "./components/loader";
import { Comments } from "./components/Comments";
import {
  ContextMenuTrigger,
  ContextMenu,
  ContextMenuItem,
} from "rctx-contextmenu";
import { RenameFile } from "./components/RenameFile";
export const modalTypes = {
  COMMENTS: "COMMENTS",
  RENAME: "RENAME",
};
const fileSvgs = (type) => {
  switch (type) {
    case "pdf":
      return {
        icon: "bi-filetype-pdf",
        color: "yellow",
      };

    case "xlsx":
      return {
        icon: "bi-filetype-xlsx",
        color: "green",
      };

    case "docx":
      return {
        icon: "bi-filetype-docx",
        color: "blue",
      };

    case "pptx":
      return {
        icon: "bi-filetype-pptx",
        color: "blue",
      };

    default:
      return {
        icon: "bi-file-earmark",
        color: "black",
      };
  }
};

const FileUi = ({ file, setClickedFile, setRenameFile }) => {
  const fileTypeConfig = fileSvgs(file?.extension);
  const handleRenameClick = () => {
    console.log("file", file._id);
    setRenameFile(file);
  };
  return (
    <div
      className="col-md-4 col-sm-6 p-2 d-flex align-items-center justify-content-between pointer p-2"
      key={file._id}
      style={{ marginBottom: "10px", height: 140 }}
    >
      <ContextMenuTrigger
        className="d-flex align-items-center justify-content-center flex-column w-100 h-100 border rounded"
        id={file._id}
      >
        <i
          className={`bi ${fileTypeConfig?.icon} me-2`}
          style={{
            color: fileTypeConfig?.color,
            fontSize: 42,
          }}
        ></i>
        <p className="m-0 fw-600">{file.Uploaded_image}</p>
      </ContextMenuTrigger>
      <ContextMenu
        key={file._id}
        hideOnLeave
        className="bg-muted border shadow-none"
        id={file._id}
      >
        <ContextMenuItem>Preview</ContextMenuItem>
        <ContextMenuItem>Document Edit</ContextMenuItem>
        <ContextMenuItem onClick={handleRenameClick}>Rename</ContextMenuItem>

        <ContextMenuItem>Get Link</ContextMenuItem>

        <ContextMenuItem preventClose onClick={() => setClickedFile(file)}>
          Comments
        </ContextMenuItem>
        <ContextMenuItem>Manage Access</ContextMenuItem>

        <ContextMenuItem>Download</ContextMenuItem>
        <ContextMenuItem>Delete</ContextMenuItem>
      </ContextMenu>
    </div>
  );
};

const FolderUi = ({ folder, setPath, path, handlePathChange }) => {
  return (
    <button
      onClick={() => {
        setPath([
          ...path,
          {
            index: path.length + 1,
            name: folder.Uploaded_filename,
            parent: folder._id,
          },
        ]);
        handlePathChange(folder._id);
      }}
      className="btn border-none col-md-4 col-sm-6 p-2 d-flex align-items-center justify-content-between pointer p-2"
      key={folder._id}
      style={{ marginBottom: "10px", minHeight: 30 }}
    >
      <div className="d-flex w-100 h-100 justify-content-between pointer p-2 rounded border">
        <div className="d-flex align-items-center w-75">
          <i
            className="bi bi-folder-fill fs-16 me-2"
            style={{
              color: "#F6BE00",
            }}
          ></i>
          <p className="m-0 pl-2">{folder.Uploaded_filename}</p>
        </div>
        <div className="d-flex align-items-center w-25 justify-content-around">
          <i
            className="bi bi-file-earmark-fill fs-16 me-2"
            style={{
              color: "blue",
            }}
          ></i>
          <p className="m-0 fw-600">{folder?.fileCount}</p>
        </div>
      </div>
    </button>
  );
};

const FileManager = ({
  data,
  loader,
  setPath,
  path,
  handlePathChange,
  fetchRootData,
}) => {
  const [clickedFile, setClickedFile] = useState(null);
  const [renameFile, setRenameFile] = useState(null);

  useEffect(() => {
    console.log(renameFile);
  }, [renameFile]);

  if (loader) return <Loader />;
  if (!data) return;
  return (
    <div className="container p-0">
      <h2 className="text-left mt-2 p-0 mb-4">Folders</h2>
      <div className="row m-0 gap-2">
        {data.folders.length > 0 ? (
          data.folders.map((folder) => (
            <FolderUi
              folder={folder}
              setPath={setPath}
              path={path}
              handlePathChange={handlePathChange}
            />
          ))
        ) : (
          <div>
            <p className="m-0 text-muted  mb-2">No folders found</p>
          </div>
        )}
      </div>
      <div
        className="bg-gray w-100"
        style={{
          height: 1,
        }}
      />
      <h2 className="text-left mt-4 mb-4">Files</h2>
      <Comments clickedFile={clickedFile} setClickedFile={setClickedFile} />
      <RenameFile
        clickedFile={renameFile}
        setClickedFile={setRenameFile}
        fetchRootData={fetchRootData}
      />

      <div className="row m-0 gap-2">
        {data.files.length > 0 ? (
          data.files.map((file) => (
            <FileUi
              setRenameFile={setRenameFile}
              setClickedFile={setClickedFile}
              file={file}
            />
          ))
        ) : (
          <div>
            <p className="m-0 text-muted">no files found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileManager;
