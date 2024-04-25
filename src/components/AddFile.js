import { useState } from "react";
import { ModalWrapper } from "./ModalWrapper";
import { USER_MEGS } from "../utils/appUtils";
import ReactSelect from "react-select";

export const AddFile = ({ setModalConfig, modalConfig, fetchRootData }) => {
  const [loading, setLoading] = useState(false);
  const [userMsg, setUserMsg] = useState(null);
  const [cats, setCats] = useState([]);
  const [selectedCat, setSelectedCat] = useState(null);

  const handleSubmit = async (e) => {
    e?.preventDefault();
    var formData = new FormData(e.target);
    debugger;
    const file = formData.get("file");

    const categories_id = formData.get("categories_id");
    const fileSize = file.size / 1024 / 1024;
    formData.append("adddocument", file);
    formData.append("Uploaded_image", file?.name);
    formData.append("user_name", "Admin");
    formData.append("file_path", "Path :/Root/");
    formData.append("login_id", "62c845901b0933370428b065");
    formData.append("document_notes", "");
    formData.append("file_size", fileSize.toFixed(2));
    formData.append("selectdeparament", null);
    formData.append("approve_level", "pending");
    formData.append("isFolder", "false");
    formData.append("parent", "root");
    formData.append("categories_id", categories_id);
    formData.append("document_version", "1");
    formData.append("email", "admin@ddms.com");

    setLoading(true);

    try {
      const res = await fetch("http://localhost:3001/addnewdocument", {
        headers: {
          accept: "application/json, text/plain, */*",
          "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
          "content-type":
            "multipart/form-data; boundary=----WebKitFormBoundary3ASjjRAcn7MXOzFp",
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
        body: '------WebKitFormBoundary3ASjjRAcn7MXOzFp\r\nContent-Disposition: form-data; name="adddocument"; filename="file_example_XLS_10.xls"\r\nContent-Type: application/vnd.ms-excel\r\n\r\n\r\n------WebKitFormBoundary3ASjjRAcn7MXOzFp\r\nContent-Disposition: form-data; name="Uploaded_image"\r\n\r\nfile_example_XLS_10.xls\r\n------WebKitFormBoundary3ASjjRAcn7MXOzFp\r\nContent-Disposition: form-data; name="user_name"\r\n\r\nAdmin\r\n------WebKitFormBoundary3ASjjRAcn7MXOzFp\r\nContent-Disposition: form-data; name="file_path"\r\n\r\nPath :/Root/\r\n------WebKitFormBoundary3ASjjRAcn7MXOzFp\r\nContent-Disposition: form-data; name="login_id"\r\n\r\n62c845901b0933370428b065\r\n------WebKitFormBoundary3ASjjRAcn7MXOzFp\r\nContent-Disposition: form-data; name="document_notes"\r\n\r\n\r\n------WebKitFormBoundary3ASjjRAcn7MXOzFp\r\nContent-Disposition: form-data; name="file_size"\r\n\r\n0.01\r\n------WebKitFormBoundary3ASjjRAcn7MXOzFp\r\nContent-Disposition: form-data; name="selectdeparament"\r\n\r\nundefined\r\n------WebKitFormBoundary3ASjjRAcn7MXOzFp\r\nContent-Disposition: form-data; name="approve_level"\r\n\r\npending\r\n------WebKitFormBoundary3ASjjRAcn7MXOzFp\r\nContent-Disposition: form-data; name="isFolder"\r\n\r\nfalse\r\n------WebKitFormBoundary3ASjjRAcn7MXOzFp\r\nContent-Disposition: form-data; name="parent"\r\n\r\nroot\r\n------WebKitFormBoundary3ASjjRAcn7MXOzFp\r\nContent-Disposition: form-data; name="categories_id"\r\n\r\n62d663bd7afde58cedd7a79d\r\n------WebKitFormBoundary3ASjjRAcn7MXOzFp\r\nContent-Disposition: form-data; name="document_version"\r\n\r\n1\r\n------WebKitFormBoundary3ASjjRAcn7MXOzFp\r\nContent-Disposition: form-data; name="email"\r\n\r\nadmin@ddms.com\r\n------WebKitFormBoundary3ASjjRAcn7MXOzFp--\r\n',
        method: "POST",
        mode: "cors",
        credentials: "omit",
      });

      const jsonRes = await res.json();
      if (jsonRes?.Uploaded_image) {
        setUserMsg(USER_MEGS.SUCCESS);
        fetchRootData(true);
        setTimeout(() => {
          setModalConfig((prev) => ({
            ...prev,
            show: false,
          }));
          setUserMsg(null);
        }, 500);
      } else {
        setUserMsg(USER_MEGS.SOMETHING_WENT_WRONG);
      }
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalWrapper
      modalConfig={modalConfig}
      setModalConfig={setModalConfig}
      height={modalConfig?.height}
    >
      <form
        onSubmit={handleSubmit}
        className="d-flex flex-column align-items-end"
      >
        <div className="mb-4 w-100">
          <label className="form-label">Select file</label>
          <input
            disabled={loading}
            required
            type="file"
            name="file"
            className="form-control shadow-none"
            readOnly={loading}
          />
        </div>

        <div className="w-100">
          <label className="form-label">Select file category</label>

          <ReactSelect
            name="categories_id"
            options={[
              {
                _id: "62cbb8083ed5b92be2034e39",
                folder_name: "IT",
                created_at: "2022-07-11T05:41:28.871Z",
                __v: 0,
              },
              {
                _id: "62d663bd7afde58cedd7a79d",
                folder_name: "test",
                created_at: "2022-07-19T07:56:45.063Z",
                __v: 0,
              },
              {
                _id: "62e7816d7afde58cedd7ac56",
                folder_name: "test",
                created_at: "2022-08-01T07:31:57.276Z",
                __v: 0,
              },
              {
                _id: "63086f347afde58cedd7ba57",
                folder_name: "test2",
                created_at: "2022-08-26T06:59:00.248Z",
                __v: 0,
              },
              {
                _id: "631f12f4c27780b11069bcb5",
                folder_name: "TEST_1209",
                created_at: "2022-09-12T11:07:32.934Z",
                __v: 0,
              },
              {
                _id: "63387b43c27780b1106a0757",
                folder_name: "Rakesh",
                created_at: "2022-10-01T17:39:15.364Z",
                __v: 0,
              },
            ]?.map((cat) => ({
              ...cat,
              label: cat?.folder_name,
              value: cat?._id,
            }))}
            required
            isOptionDisabled={(option) => option.disabled}
            isDisabled={false}
          />
        </div>
        <p
          style={{
            visibility: userMsg ? "visible" : "hidden",
          }}
          className={`m-0 text-${userMsg?.success ? "success" : "danger"} mb-2`}
        >
          {userMsg ? userMsg?.msg : "Hello"}
        </p>

        <button
          disabled={loading}
          type="submit"
          className="btn w-25 btn-outline-primary shadow-none"
        >
          {loading ? (
            <>
              <span
                class="spinner-border spinner-border-sm me-2"
                role="status"
                aria-hidden="true"
              ></span>
              <span class="sr-only">Loading...</span>
            </>
          ) : (
            "Save"
          )}
        </button>
      </form>
    </ModalWrapper>
  );
};
