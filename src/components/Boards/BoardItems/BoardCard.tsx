import React from 'react';
import { Card } from 'react-bootstrap';
import { IBoard } from '../../../interfaces/IBoard';
import './item.css';
export 
 function BoardCard(board: IBoard) {
    return (
        <Card bg="primary" className="customCard"> 
          <Card.Title style={{color:"white"}}>{board.Name}</Card.Title>
        </Card>
    )
}

export default BoardCard;