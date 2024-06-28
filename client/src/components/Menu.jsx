import React from "react";
import "../components/CSS/Menu.css";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

const Menu = ({ filtred }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    setafaire("");
    setupdate("");
  };
  const handleShow = () => setShow(true);

  const [afaire, setafaire] = useState("");
  const [update, setupdate] = useState("");

  const hendleupdate = async () => {
    try {
      const response = await fetch(
        "http://localhost:3001/api/modif/" + afaire,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: await JSON.stringify({ titre: update }),
        }
      );
      const data = await response.json();
      console.log(data);
      console.log(response);
      if (response.status === 200) {
        window.parent.location = window.parent.location.href;
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="menu">
      {filtred &&
        filtred.map((item) => {
          return (
            <div
              key={item._id}
              onDoubleClick={() => {
                handleShow();
                setafaire(item._id);
              }}
            >
              <>
                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Edit todo</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label>Text</Form.Label>
                        <Form.Control
                          type="text"
                          name="titre"
                          onChange={(e) => {
                            setupdate(e.target.value);
                          }}
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
                        if (update === "") {
                          handleClose();
                        } else {
                          handleClose();
                          hendleupdate();
                        }
                      }}
                    >
                      Save Changes
                    </Button>
                  </Modal.Footer>
                </Modal>
              </>
              <p>{item.titre}</p>

              <div className="buttons">
                {item.etat === true ? (
                  <button
                    className="true"
                    onClick={async () => {
                      try {
                        const response = await fetch(
                          "http://localhost:3001/api/modif/" + item._id,
                          {
                            method: "PUT",
                            headers: {
                              "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                              etat: false,
                            }),
                          }
                        );
                        console.log(response);
                        if (response.status === 200) {
                          console.log("modif success");
                          window.parent.location = window.parent.location.href;
                        } else {
                          console.log("me tbedelch");
                        }
                      } catch (error) {
                        console.log(error);
                      }
                    }}
                  >
                    Done
                  </button>
                ) : (
                  <button
                    className="false"
                    onClick={async () => {
                      try {
                        const response = await fetch(
                          "http://localhost:3001/api/modif/" + item._id,
                          {
                            method: "PUT",
                            headers: {
                              "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                              etat: true,
                            }),
                          }
                        );
                        console.log(response);
                        if (response.status === 200) {
                          console.log("modif success");
                          window.parent.location = window.parent.location.href;
                        } else {
                          console.log("me tbedelch");
                        }
                      } catch (error) {
                        console.log(error);
                      }
                    }}
                  >
                    Not done
                  </button>
                )}
                <button
                  className="delete"
                  onClick={async () => {
                    try {
                      const response = await fetch(
                        "http://localhost:3001/api/delete/" + item._id,
                        {
                          method: "DELETE",
                        }
                      );
                      await response.json();
                      if (response.status === 200) {
                        window.parent.location = window.parent.location.href;
                      } else {
                        console.log("failed delete");
                      }
                    } catch (error) {
                      console.log(error);
                    }
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Menu;
