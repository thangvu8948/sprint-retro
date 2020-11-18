import React, { EventHandler, useCallback, useState } from "react";
import { Button, Col, Form, Modal, Row, Spinner } from "react-bootstrap";
import { useHistory } from "react-router";
import { API_URL } from "../../app.const";
import { IBoard } from "../../interfaces/IBoard";
import authServcice from "../../Services/auth.servcice";

export const RenameBoardPopup = (par: { board: IBoard; func: Function }) => {
  const [isHandling, setIsHandling] = useState(false);
  const [text, setText] = useState("");
  const [isWarning, setIsWarning] = useState(false);
  const user = authServcice.getCurrentUser();

  const handleNo = () => {
    if (!isHandling) {
        setIsWarning(false);
      par.func(false);
    }
  };


  const handleYes = async () => {
    if (isHandling) return;
    setIsWarning(false);
    setText(text.trim());
    if (text === "") {
        setIsWarning(true)
        return;
    }
    setIsHandling(true);
    await fetch(`${API_URL}/boards/rename`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: user.token,
      },
      body: JSON.stringify({ boardId: par.board.BoardId, Name: text }),
    }).then((response) => {
      par.func(true);
      setIsHandling(false);
      // history.push(`/boards/${response.}`)
    });
  };

  return (
    <>
      <Modal.Body>
        <Form>
          <Form.Control
            size="lg"
            value={text}
            onChange={(e) => setText(e.target.value)}
            type="text"
            placeholder="Enter new name"
          />
        </Form>

        {isWarning && <div className="text-danger pl-2">Please enter new board name</div>}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleNo}>
          Cancel
        </Button>
        <Button
          variant="secondary"
          onClick={handleYes}
          style={{ display: "flex" }}
        >
          Rename{" "}
          {isHandling && (
            <Spinner className="my-auto ml-1" animation="grow" size="sm" />
          )}{" "}
        </Button>
      </Modal.Footer>
    </>
  );
};

export default RenameBoardPopup;
