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
        console.log("clicked");
        func.func(true);
    };
  return( 
  <Card bg="primary" className="customCard new-board-button" onClick={a}>
      <Image src="/icons/plus.png" ></Image>
  </Card>)
}

export default NewBoardCard;
