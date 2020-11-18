import React, { useState } from "react";
import { Button, Card } from "react-bootstrap";
import { Link, Route, Switch, useHistory, useRouteMatch } from "react-router-dom";
import { API_URL } from "../../../app.const";
import { IBoard } from "../../../interfaces/IBoard";
import { HistoryProps } from "../../Login/Login";
import Story from "../../Story";
import "./item.css";
import { BsFillTrashFill, BsPencil } from "react-icons/bs";
import { FunctionBindKey } from "lodash";
export function BoardCard(props :{board: IBoard, triggerDelete: Function, triggerRename: Function}) {
  // const [url, setUrl] = useState<string>(`${API_URL}/boards/${board.BoardId}`);
  const history = useHistory();
  let { path, url } = useRouteMatch();
  const handleClick = () => {
    history.push({pathname: `/boards/${props.board.BoardId}`, state: {board: props.board}});
    //window.location.reload();
  };

  const handleDelete = () => {
    props.triggerDelete(true);
  };

  const handleRename = () => {
    props.triggerRename(true);
  }

  return (
   
    // <div className=" col-lg-2 col-md-4 col-sm-6 col-6 mx-0">
 <Card
        bg="primary"
        className=" new-board-button  customCard"
        onClick={handleClick} 
      >
        {/* <Link to={`/boards/:${board.BoardId}`}></Link> */}
        <Card.Title  style={{ color: "white" }}>{props.board.Name}</Card.Title>
      
      <Button  title="Rename board" className="rename-btn" onClick={(evt) => {evt.stopPropagation(); handleRename()}}><BsPencil/></Button>

        <Button title="Delete board" className="delete-btn" onClick={(evt) => {evt.stopPropagation(); handleDelete()}}><BsFillTrashFill/></Button>
      
   
      </Card>
    // </div>
 
  );
}

export default BoardCard;
