import React, { EventHandler, useCallback, useState } from "react";
import { Button, Col, Form, Modal, Row, Spinner } from "react-bootstrap";
import { useHistory } from "react-router";
import { API_URL } from "../../app.const";
import authServcice from "../../Services/auth.servcice";

export const NewBoardPopup = (par: { func: Function }) => {
  const [text, setText] = useState("");
  const [isHandling, setIsHandling] = useState(false);
  const history = useHistory();
  const handleSubmit = (event: React.FormEvent<EventTarget>) => {
    if (isHandling === false) {
      setIsHandling(true);
      event.preventDefault();
      if (text.trim() !== "") {
        console.log(text);
        add(text.trim());
      }
    }
  };

  const user = authServcice.getCurrentUser();

  const add = useCallback(async (nameBoard: string) => {
    await fetch(`${API_URL}/boards`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: user.token,
      },
      body: JSON.stringify({ name: nameBoard }),
    }).then((response) => {
      response.json().then((res)=> {
        console.log(res);
        history.push(`/boards/${res.insertId}`);
      })
      par.func(false);
      setIsHandling(false);
      // history.push(`/boards/${response.}`)
    });
  }, []);
  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title id="example-custom-modal-styling-title">
          Create new board
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Control
            size="lg"
            value={text}
            onChange={(e) => setText(e.target.value)}
            type="text"
            placeholder="Large text"
          />
            <Button variant="primary mt-3" >
              Save Changes
              {isHandling && (
                <Spinner className=" ml-2 mb-1" animation="border" size="sm" />
              )}
            </Button>
        </Form>
      </Modal.Body>
    </>
  );
};

export default NewBoardPopup;
