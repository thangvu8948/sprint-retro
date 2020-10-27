import { METHODS } from "http";
import { cpuUsage } from "process";
import React, { useEffect, useState } from "react";
import { Form, FormControl } from "react-bootstrap";
import { Button, CardDeck, Col, Container, Modal, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import { IBoard } from "../../interfaces/IBoard";
import NewBoardPopup from "../Popups/NewBoardPopups";
import BoardCard from "./BoardItems/BoardCard";
import NewBoardCard from "./BoardItems/NewBoardCard";

export const Board = () => {
  const [boards, setBoards] = useState<IBoard[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);

  function AddBoardHandler(isShow: boolean) {
    setShowAdd(isShow);
    fetchBoards();
  }

  async function fetchBoards() {
    setIsLoading(true);
    const res = await fetch("http://localhost:3000/boards");
    console.log(res);
    res
      .json()
      .then((res) => {
        setBoards(res);
        setIsLoading(false);
        console.log(boards);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    fetchBoards();
  }, []);
  return (
    <>
      <Modal
        show={showAdd}
        onHide={() => setShowAdd(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <NewBoardPopup {...{func: AddBoardHandler}} />
      </Modal>

      {boards.length === 0 ? (
        <div>Loading</div>
      ) : (
        <Container>
          <div className="board-type">Your Boards</div>
          <Row className="my-auto">
            <NewBoardCard {...{ func: AddBoardHandler }} />
            {boards.map((board, index) => (
              <BoardCard {...board} />
            ))}
          </Row>
          <div className="board-type">Join Boards</div>
          <Row className="my-auto">
            {boards.map((board, index) => (
              <BoardCard {...board} />
            ))}
          </Row>
        </Container>
      )}
    </>
  );
};

export default Board;
