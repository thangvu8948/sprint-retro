import React from "react";
import { Button, Card, Image } from "react-bootstrap";
import { IBoard } from "../../../interfaces/IBoard";
import NewBoardPopup from "../../Popups/NewBoardPopups";
import BoardCard from "./BoardCard";
import "./item.css";

export interface IAddBoard {
  func: Function;
}

export function NewBoardCard(func: IAddBoard) {
  const a = () => {
    func.func(true);
  };
  return (
    //   <Card bg="primary" className="customCard new-board-button" onClick={a}>
    // <div className="col-lg-2 col-md-4 col-sm-6 col-6 mx-0">
    <Card bg="primary" className="customCard new-board-button  " onClick={a}>
      <Image src="/icons/plus.png" className="mx-auto my-auto"></Image>
    </Card>
    // </div>

  );
}

export default NewBoardCard;
