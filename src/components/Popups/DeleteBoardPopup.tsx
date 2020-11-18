import React, { EventHandler, useCallback, useState } from "react";
import { Button, Col, Form, Modal, Row, Spinner } from "react-bootstrap";
import { useHistory } from "react-router";
import { API_URL } from "../../app.const";
import { IBoard } from "../../interfaces/IBoard";
import authServcice from "../../Services/auth.servcice";

export const DeleteBoardPopup = (par: {board: IBoard, func: Function }) => {
  const [isHandling, setIsHandling] = useState(false);

  const user = authServcice.getCurrentUser();

  const handleNo = () => {
    if (!isHandling) {
      par.func(false);
    }
  }

  const handleYes  = async () => {
    if (isHandling) return;
    setIsHandling(true);
    await fetch(`${API_URL}/boards/delete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: user.token,
      },
      body: JSON.stringify({ id: par.board.BoardId }),
    }).then((response) => {
      par.func(true);
      setIsHandling(false);
      // history.push(`/boards/${response.}`)
    });
  };
  return (
    <>
        <Modal.Body >
          <p>Sure you want to remove "{par.board.Name}" board ??? </p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleNo}>No</Button>
          <Button variant="secondary" onClick={handleYes} style={{display:"flex"}}>Yes  {isHandling && <Spinner className="my-auto ml-1" animation="grow" size="sm" />} </Button>
        </Modal.Footer>
    
    </>
  );
};

export default DeleteBoardPopup;
