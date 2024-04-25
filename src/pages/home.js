import { useState } from "react";
import FileManager from "../FileManager";
import { useEffect } from "react";
import Sidebar from "../components/sidebar";
import { AddFolder } from "../components/AddFolder";
import { AddFile } from "../components/AddFile";

function Home() {
  const [data, setData] = useState(null);
  const [loader, setLoader] = useState(false);
  const [path, setPath] = useState([
    {
      name: "root",
      parent: null,
      index: 1,
    },
  ]);
  const [folderModalConfig, setFolderModalConfig] = useState(null);
  const [fileModalConfig, setFileModalConfig] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState(null);

  const handlePathChange = (id, index) => {
    if (typeof index === "number") {
      const newArr = [...path];
      newArr.length = index + 1;
      setPath(newArr);
      setSearchQuery('')
    }

    if (!id) {
      return fetchRootData();
    }
    setLoader(true);
    fetch("http://localhost:3001/admin/parentbase", {
      headers: {
        accept: "application/json, text/plain, */*",
        "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
        "content-type": "application/json",
        "sec-ch-ua":
          '"Not A(Brand";v="99", "Google Chrome";v="121", "Chromium";v="121"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Windows"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site",
      },
      referrer: "http://localhost:4200/",
      referrerPolicy: "strict-origin-when-cross-origin",
      body: `{\n  "parent": "${id}"\n}`,
      method: "POST",
      mode: "cors",
      credentials: "omit",
    })
      .then((res) => res?.json())
      .then((res) => {
        const files = res?.filter((o) => o?.isFolder === "false");
        const folders = res?.filter((o) => o?.isFolder === "true");
        console.log(files, folders);
        setData({
          files,
          folders,
        });
        setFilteredData({
          files,
          folders,
        });
      })
      .finally(() => {
        setLoader(false);
      });
  };

  useEffect(() => {
    const filterResults = setTimeout(() => {
      console.log(data);
      const query = searchQuery?.toLowerCase()?.trim();
      setFilteredData({
        ...data,
        files: data?.files?.filter((file) =>
          file?.Uploaded_image?.toLowerCase()?.includes(query)
        ),
        folders: data?.folders?.filter((file) =>
          file?.Uploaded_filename?.toLowerCase()?.includes(query)
        ),
      });
    }, 500);

    return () => clearTimeout(filterResults);
  }, [searchQuery]);

  const fetchRootData = (silentlySync) => {
    if (!silentlySync) {
      setLoader(true);
    }
    setLoader(true);
    fetch("http://localhost:3001/admin/superadmincall", {
      headers: {
        accept: "application/json, text/plain, */*",
        "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
        "content-type": "application/json",
        "sec-ch-ua":
          '"Not A(Brand";v="99", "Google Chrome";v="121", "Chromium";v="121"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Windows"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site",
      },
      referrer: "http://localhost:4200/",
      referrerPolicy: "strict-origin-when-cross-origin",
      body: '{\n  "parent": "root",\n  "email": "admin@ddms.com"\n}',
      method: "POST",
      mode: "cors",
      credentials: "omit",
    })
      .then((res) => res?.json())
      .then((res) => {
        const files = res?.filter((o) => o?.isFolder === "false");
        const folders = res?.filter((o) => o?.isFolder === "true");
        console.log(files, folders);
        setData({
          files,
          folders,
        });
        setFilteredData({
          files,
          folders,
        });
      })
      .finally(() => {
        setLoader(false);
      });
  };

  useEffect(() => {
    fetchRootData();
  }, []);
  return (
    <div className="App container">
      {/* Path */}
      {data && <Sidebar data={data} />}
      <AddFolder
        modalConfig={folderModalConfig}
        setModalConfig={setFolderModalConfig}
        fetchRootData={fetchRootData}
      />

      <AddFile
        modalConfig={fileModalConfig}
        setModalConfig={setFileModalConfig}
        fetchRootData={fetchRootData}
      />
      <div className="d-flex align-items-start p-0 bg-gray p-2 my-4">
        {path?.map((p, index) => (
          <button
            disabled={path.length === index + 1}
            onClick={() => handlePathChange(p?.parent, index)}
            className="btn shadow-none fw-500 ff-inter fs-16 p-0 fc-wmg fw-600"
          >
            {p?.name}
            {"/ "}
          </button>
        ))}
      </div>
      <div className="d-flex align-items-center justify-content-end w-100 mb-5">
        <div className="mr-auto d-flex align-items-center">
          <i class="bi bi-search text-muted mr-2"></i>
          <input
            className="shadow-none form-control fs-14"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e?.target?.value)}
            placeholder="Search file, folders"
          />
        </div>
        <button onClick={() => fetchRootData(false)} className="btn border">
          <i class="bi bi-arrow-clockwise"></i>
        </button>

        <button
          onClick={() => {
            setFolderModalConfig({
              show: true,
              height: 40,
            });
          }}
          className="btn border ml-3 d-flex align-items-center"
        >
          <i class="bi bi-folder-fill mr-2"></i>
          <p className="m-0">New folder</p>
        </button>

        <button
          onClick={() => {
            setFileModalConfig({
              show: true,
              height: 40,
            });
          }}
          className="btn border ml-3 d-flex align-items-center"
        >
          <i class="bi bi-plus-circle mr-2"></i>
          <p className="m-0">Upload</p>
        </button>
      </div>
      <FileManager
        setPath={setPath}
        data={filteredData}
        loader={loader}
        path={path}
        handlePathChange={handlePathChange}
        fetchRootData={fetchRootData}
      />
    </div>
  );
}

export default Home;
