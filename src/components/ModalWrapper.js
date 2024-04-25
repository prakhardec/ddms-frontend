import { Modal } from "react-bootstrap";
const ModalWrapper = ({ modalConfig, height, setModalConfig, children }) => {
  return (
    <div>
      <Modal
        show={modalConfig?.show}
        size="lg"
        backdrop="static"
        centered
        keyboard={false}
      >
        <Modal.Body
          style={{
            overflowY: "auto",
            overflowX: "hidden",
            maxHeight: "90vh",
            minHeight: height * 0.8,
          }}
        >
          <div className="d-flex align-items-end justify-content-end">
            <i
              onClick={() => setModalConfig(null)}
              class="bi pointer fs-20 bi-x ms-auto"
            ></i>
          </div>

          {children}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export { ModalWrapper };
