import React, { EventHandler, useCallback, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";

export const NewBoardPopup = (par: {func: Function}) => {
  const [text, setText] = useState("");

  const handleSubmit = (event: React.FormEvent<EventTarget>) => {
    event.preventDefault();
    console.log(text);
    add(text);
  };

  const add = useCallback(async (nameBoard: string) => {
    await fetch("http://localhost:3000/boards", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({ "name": nameBoard }),
    }).then(response => par.func(false));
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
          <Form.Control
            color="primary"
            style={{ margin: "1%" }}
            type="submit"
            value="Create"
          />
        </Form>
      </Modal.Body>
    </>
  );
};

export default NewBoardPopup;
