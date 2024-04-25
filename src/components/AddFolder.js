import {  useState } from "react";
import { ModalWrapper } from "./ModalWrapper";
import { USER_MEGS } from "../utils/appUtils";

export const AddFolder = ({ setModalConfig, modalConfig, fetchRootData }) => {
  const [loading, setLoading] = useState(false);
  const [userMsg, setUserMsg] = useState(null);

  const handleSubmit = async (e) => {
    e?.preventDefault();
    var formData = new FormData(e.target);
    const name = formData.get("name");

    setLoading(true);

    try {
      const res = await fetch("http://localhost:3001/admin/addnewfolder", {
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
        body: `{\n  "user_name": "Admin",\n  "Uploaded_filename": "${name}",\n  "isFolder": true,\n  "parent": "root",\n  "userPermission": {\n    "_id": "62c845901b0933370428b065",\n    "email": "admin@ddms.com",\n    "name": "Admin"\n  },\n  "owner_email": "admin@ddms.com"\n}`,
        method: "POST",
        mode: "cors",
        credentials: "omit",
      });

      const jsonRes = await res.json();
      console.log(jsonRes, "jsonRes");
      if (jsonRes?.Uploaded_filename) {
        setUserMsg(USER_MEGS.SUCCESS);
        fetchRootData(true)
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
          <label className="form-label">Folder name</label>
          <input
            disabled={loading}
            required
            type="text"
            name="name"
            className="form-control shadow-none"
            readOnly={loading}
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
