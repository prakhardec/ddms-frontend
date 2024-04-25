import { Modal } from "react-bootstrap";
import Loader from "./loader";
import { useEffect, useState } from "react";
import Moment from "react-moment";
import { modalTypes } from "../FileManager";

export const RenameFile = ({ clickedFile, setClickedFile ,fetchRootData}) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const filename = formData.get("filename");
    setLoading(true);

    const res = await fetch("http://localhost:3001/admin/filename", {
      headers: {
        accept: "application/json, text/plain, */*",
        "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        _id: clickedFile?._id,
        Uploaded_image: filename,
      }),
      method: "POST",
      mode: "cors",
      credentials: "omit",
    });

    const res_ = await res.json();
    console.log(res_, "sadasdd");
    if (res_.status === 200) {
      setLoading(false);
      setClickedFile(null);
      fetchRootData()
      e?.target?.reset();
    }
  };

  const handleClose = () => {
    setClickedFile(null);
  };

  return (
    <Modal
      fullscreen
      show={clickedFile}
      onHide={handleClose}
      className=""
      style={{
        background: "#00000030",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          minHeight: 600,
          maxHeight: 800,
          overflow: "auto",
        }}
        className="rounded border p-3"
      >
        <form onSubmit={handleSubmit}>
          <div className="flex flex-wrap mb-2">
            <div className="w-100">
              <label className="block uppercase tracking-wide fs-14">
                Edit file name
              </label>
              <textarea
                disabled={loading}
                className="w-100 rounded form-control shadow-none fs-14"
                name="filename"
                type="text"
                placeholder="filename"
                defaultValue={clickedFile?.Uploaded_image}
                required
              ></textarea>
            </div>
          </div>

          <button
            className="rounded btn btn-primary ms-auto fs-14"
            type="submit"
          >
            Update
          </button>
        </form>
        {loading && (
          <div>
            <Loader />
          </div>
        )}
      </div>
    </Modal>
  );
};
