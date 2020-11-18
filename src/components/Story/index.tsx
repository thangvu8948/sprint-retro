import React, { useCallback, useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useLocation, useParams } from "react-router";
import { API_URL } from "../../app.const";
import authServcice from "../../Services/auth.servcice";
import "./index.css";
import _ from "lodash";
import axios from "axios";
import { BsX } from "react-icons/bs";
import { IBoard } from "../../interfaces/IBoard";

export interface IStory {
  Name: string;
  BoardId: number;
  ListId: number;
  ListName: string;
  isDelete: boolean;
  items: IItem[];
}

export interface IItem {
  ItemId?: number;
  Content?: string;
  ListId?: number;
  isDelete?: boolean;
}

export default function Story() {
  const location = useLocation<IBoard>();
  let { id } = useParams<{ id: string }>();
  const [editable, setEditable] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [stories, setStories] = useState<IStory[]>([]);
  const [oldValue, setOldValue] = useState("");
  const handleDoubleClick = (evt: React.MouseEvent<HTMLSpanElement>) => {
    setOldValue(evt.currentTarget.textContent || "");
    setEditable(true);
  };

  const user = authServcice.getCurrentUser();
  const handleFocusOut = () => {
    setEditable(false);
    setOldValue("");
  };

  const handleOnFocus = () => {};

  const loadAll = useCallback(async () => {
    await fetchStories().then((res: IStory[]) => fetchItems(res));
  }, []);
  useEffect(() => {
    loadAll();
  }, []);

  //  useEffect(() => {
  //    fetchItems();
  // },[stories])

  async function addItem(listId: number, content: string) {
    return axios
      .post(
        `${API_URL}/boards/${id}/${listId}`,
        JSON.stringify({
          content: content,
        }),
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: user.token,
          },
        }
      )
  }

  async function updateItem(itemId: number, content: string) {
    return axios
      .post(
        `${API_URL}/items/update`,
        JSON.stringify({
          content: content,
          itemId: itemId
        }),
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: user.token,
          },
        }
      )
  }


  async function fetchItems(strs: IStory[]) {
    console.log(strs);
    return new Promise(async (resolve, reject) => {
      let temp: IStory[] = [...strs];
      let tempItem: Array<Array<IItem>> = new Array();
      for (let i = 0; i < strs.length; i++) {
        const res = await fetch(`${API_URL}/boards/${id}/${strs[i].ListId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: user.token,
          },
        });
        res.json().then((res) => {
          temp[i].items = res;
          tempItem[i] = res;
          if(tempItem.length == strs.length) {
            setStories(temp);
          }
          //console.log(tempItem)
        });
      }
    });
  }

  async function fetchStories() {
    return new Promise<IStory[]>(async (resolve, reject) => {
      setIsLoading(true);
      console.log("fetching " + `${API_URL}/boards/${id}`);
      const res = await fetch(`${API_URL}/boards/${id}`, {
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
        .then((res: IStory[]) => {
          res.forEach((element) => {
            element.items = [];
          });
          setIsLoading(false);
          setStories(res);
          resolve(res);
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
    });
  }

  const handleSubmitNewItem = (
    e: React.KeyboardEvent<HTMLSpanElement>,
    id: number
  ) => {
    if (e.keyCode == 13) {
      setEditable(false);
      const temp = [...stories];
      const f = _.find(temp, (value) => value.ListId === id)?.items;
      let value: string = e.currentTarget.textContent || "";
      value = value.trim();
      if (value === "") {
          e.currentTarget.textContent = "";
          return;
      }
      f?.push({ Content: value });
      setStories(temp);
      e.currentTarget.textContent = "";
      addItem(id, value );
    }

    if (e.keyCode == 27) {
      setEditable(false);
      e.currentTarget.textContent = "";
    }
  };

  const handleEditItem = (
    e: React.KeyboardEvent<HTMLSpanElement>,
    id: number
  ) => {
    if (e.keyCode == 13) {
      setEditable(false);
      let value: string = e.currentTarget.textContent || "";
      value = value.trim();
      if (value === "") {
          e.currentTarget.textContent = oldValue;
          return;
      }
      e.currentTarget.textContent = value;
      if (id > 0) {
        updateItem(id, value);
      }
    }

    if (e.keyCode == 27) {
      setEditable(false);
      e.currentTarget.textContent = oldValue;
    }
  };

  const handleDeleteItem = async (itemId: number | undefined, listId: number) => {
    if (!itemId) { return;}
    const temp = [...stories];
    console.log(itemId + " " + listId);
    let f = _.find(temp, (value) => value.ListId === listId);
    const fi = _.filter(f?.items, (value)=> value.ItemId !== itemId);
    f.items = fi;
    console.log(f);
    console.log(temp);
    setStories(temp);
    deleteItem(itemId);
    
    
  }
  const deleteItem = (itemId: number | undefined) => {
    if (!id) { return;}
    return axios
    .post(
      `${API_URL}/items/delete`,
      JSON.stringify({
        itemId: itemId
      }),
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: user.token,
        },
      }
    )
  }

  return (
    <>
    <div className="pt-10 pl-2  horizontal-scrollable w-100 ">
    <h2 style={{textAlign: "left", margin:"10px"}}>{stories && stories[0] && stories[0].Name}</h2>

      <Row className="flex-row flex-nowrap mx-0">
        {stories &&
          stories.map((e, i) => (
            <div>
              <Card style={{ width: "18rem" }} className="mx-1">
                <Card.Title
                  className=" pl-4 pt-3"
                  style={{ textAlign: "left" }}
                >
                  {e.ListName}
                </Card.Title>

                <Card.Body className="card-body-custom">
                  {e.items &&
                    e.items.map((value, i) => (

                      <Card
                        style={{ textAlign: "left" }}
                        className="item"
                        onDoubleClick={handleDoubleClick}
                        onBlur={handleFocusOut}
                      >
                        <span
                          className="textarea"
                          role="textbox"
                          contentEditable={editable}
                          onKeyDown={(evt) => {
                            handleEditItem(evt, value.ItemId || -1);
                          }}
                        >
                          {value.Content}
                        </span>
                       <BsX className="item-delete" onClick = {() => {handleDeleteItem(value.ItemId, e.ListId)}}/>

                      </Card>

                    ))}
                  <Card
                    style={{ textAlign: "left" }}
                    className="item"
                    onBlur={handleFocusOut}
                    onFocus={() => {
                      handleOnFocus();
                    }}
                  >
                    <span
                      id={`${i}`}
                      placeholder="Enter new item..."
                      className="textarea"
                      role="textbox"
                      onDoubleClick={(evt) => handleDoubleClick(evt)}
                      contentEditable={editable}
                      onKeyDown={(evt) => {
                        handleSubmitNewItem(evt, e.ListId);
                      }}
                    ></span>
                    
                  </Card>
                </Card.Body>
              </Card>
            </div>
          ))}
      </Row>
    </div>
    </>
  );
}
