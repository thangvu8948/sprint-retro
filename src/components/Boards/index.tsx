import { METHODS } from "http";
import { cpuUsage } from "process";
import React, { useEffect, useState } from "react";
import { Form, FormControl, Spinner } from "react-bootstrap";
import { Button, CardDeck, Col, Container, Modal, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import { API_URL } from "../../app.const";
import { IBoard } from "../../interfaces/IBoard";
import authServcice from "../../Services/auth.servcice";
import DeleteBoardPopup from "../Popups/DeleteBoardPopup";
import NewBoardPopup from "../Popups/NewBoardPopups";
import RenameBoardPopup from "../Popups/RenameBoardPopup";
import BoardCard from "./BoardItems/BoardCard";
import NewBoardCard from "./BoardItems/NewBoardCard";

export const Board = () => {
  const [boards, setBoards] = useState<IBoard[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showRename, setShowRename] = useState(false);
  const [boardWantHandle, setBoardWantHandle] = useState<IBoard>(null);
  const user = authServcice.getCurrentUser();
  function AddBoardHandler(isShow: boolean) {
    setShowAdd(isShow);
    if (isShow == false) {
      fetchBoards();
    }
  }

  function DeleteHandler(deleted: boolean) {
    setShowDelete(false);
    if (deleted) {
      fetchBoards();
    }
  }

  function RenameHandler(renamed: boolean) {
    setShowRename(false);
    if (renamed) {
      fetchBoards();
    }
  }

  async function fetchBoards() {
    setIsLoading(true);
    console.log("fetching " + `${API_URL}/boards`);
    const res = await fetch(`${API_URL}/boards`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: user.token,
      },
    });
    console.log(res);
    res
      .json()
      .then((res) => {
        setBoards(res);
        setIsLoading(false);
        console.log(`boards: ${boards}`);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
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
        <NewBoardPopup {...{ func: AddBoardHandler }} />
      </Modal>

      <Modal show={showDelete} >
        <DeleteBoardPopup
          {...{ board: boardWantHandle, func: DeleteHandler }}
        />
      </Modal>

      <Modal show={showRename} aria-labelledby="example-modal-sizes-title-sm">
        <RenameBoardPopup
          {...{ board: boardWantHandle, func: RenameHandler }}
        />
      </Modal>

      {isLoading ? (
        <div
          style={{
            margin: "5%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Spinner animation="border" role="status" />
        </div>
      ) : (
        <Container className="">
          <div className="board-type h2">Your Boards</div>
          <Row className="my-auto mx-2">
            <div className=" col-lg-3 col-md-4 col-sm-6 col-6 mx-0 my-2">
              <NewBoardCard {...{ func: AddBoardHandler }} />
            </div>
            {boards.map((board, index) => (
              <div className=" col-lg-3 col-md-4 col-sm-6 col-6 mx-0 my-2">
                <BoardCard
                  {...{
                    board: board,
                    triggerDelete: () => {
                      setShowDelete(true);
                      setBoardWantHandle(board);
                    },
                    triggerRename: () => {
                      setShowRename(true);
                      setBoardWantHandle(board);
                    }
                  }}
                />
              </div>
            ))}
          </Row>
          {/* <div className="board-type">Join Boards</div>
          <Row className="my-auto">
            {boards.map((board, index) => (
              <BoardCard {...board} />
            ))}
          </Row> */}
        </Container>
      )}
    </>
  );
};

export default Board;
