import { Modal } from "react-bootstrap";
import Loader from "./loader";
import { useEffect, useState } from "react";
import Moment from "react-moment";
import { modalTypes } from "../FileManager";

export const Comments = ({ clickedFile, setClickedFile }) => {
  const [comments, setComments] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchComments = async () => {
    setLoading(true);
    const commentsRes = await fetch(
      `http://localhost:3001/documentcomment/addcommentD/62c845901b0933370428b065/${clickedFile?._id}`,
      {
        headers: {
          accept: "application/json, text/plain, */*",
        },

        body: null,
        method: "GET",
        mode: "cors",
        credentials: "omit",
      }
    );

    const comments = await commentsRes.json();

    setComments(comments);
    setLoading(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const commentText = formData.get("commentText");
    setLoading(true);

    const res = await fetch(
      "http://localhost:3001/documentcomment/addcomment",
      {
        headers: {
          accept: "application/json, text/plain, */*",
          "content-type": "application/json",
        },
        body: JSON.stringify({
          add_comment: commentText,
          user_id: "62c845901b0933370428b065",
          document_id: clickedFile?._id,
        }),
        method: "POST",
        mode: "cors",
        credentials: "omit",
      }
    );

    const res_ = await res.json();
    console.log(res_, "sadasdd");
    if (res_.status === 200) {
      setLoading(false);
      fetchComments();
      e?.target?.reset();
    }
  };

  const deleteComment = async (commentId) => {
    setLoading(true);

    const res = await fetch(
      `http://localhost:3001/documentcomment/addcomment/${commentId}`,
      {
        headers: {
          accept: "application/json, text/plain, */*",
          "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
          "sec-ch-ua":
            '"Chromium";v="122", "Not(A:Brand";v="24", "Google Chrome";v="122"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"Windows"',
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-site",
        },
        referrer: "http://localhost:4200/",
        referrerPolicy: "strict-origin-when-cross-origin",
        body: null,
        method: "DELETE",
        mode: "cors",
        credentials: "omit",
      }
    );

    const res_ = await res.json();
    fetchComments();
    setLoading(false);
  };

  useEffect(() => {
    if (clickedFile) fetchComments();
  }, [clickedFile]);

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
        {comments?.length > 0 ? (
          <table className="table">
            <thead className="p-2">
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Comment</th>
                <th scope="col">Date</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {comments?.map((comment) => (
                <tr key={comment?._id}>
                  <td>{comment?.user_id?.name}</td>
                  <th>{comment?.add_comment}</th>
                  <td>
                    <Moment fromNow>{comment?.created_at}</Moment>
                  </td>
                  <td>
                    <i
                      onClick={() => {
                        deleteComment(comment?._id);
                      }}
                      className="bi bi-trash text-danger mx-auto pointer"
                    ></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-muted m-0 mb-4">No comments found</p>
        )}

        <form onSubmit={handleSubmit}>
          <div className="flex flex-wrap mb-2">
            <div className="w-100">
              <label className="block uppercase tracking-wide fs-14">
                Add a new comment
              </label>
              <textarea
                disabled={loading}
                className="w-100 rounded form-control shadow-none fs-14"
                name="commentText"
                type="text"
                placeholder="Comment text"
                required
              ></textarea>
            </div>
          </div>

          <button
            className="rounded btn btn-primary ms-auto fs-14"
            type="submit"
          >
            Save
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
