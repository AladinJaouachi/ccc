import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import "../components/CSS/Tools.css";

const Tools = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const deleteall = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/lkol", {
        method: "DELETE",
      });
      if (response.status === 200) {
        window.parent.location = window.parent.location.href;
        console.log("tfas5ou");
      } else {
        console.log("error restart");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const [titre, setadd] = useState("");

  const handlesubmit = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: await JSON.stringify({ titre }),
      });
      if (response.status === 200) {
        alert("added successfully");
        window.parent.location = window.parent.location.href;
      } else {
        console.log("failed add ");
        alert("me sarech ");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="tools">
      <button className="add" onClick={handleShow}>
        Add ToDo +
      </button>
      <button className="restart" onClick={() => deleteall()}>
        Restart ToDos 0
      </button>
      <div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>ADD Todo</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>text</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setadd(e.target.value)}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                handleClose();
                handlesubmit();
              }}
            >
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default Tools;
