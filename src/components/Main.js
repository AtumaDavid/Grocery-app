import React, { useState, useEffect } from "react";
import Alert from "./Alert";
import List from "./List";
import "./Main.css";

const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return JSON.parse(localStorage.getItem("list"));
  } else {
    return [];
  }
};

const Main = () => {
  //adding item to list
  //   const [list, setList] = useState([]);
  const [list, setList] = useState(getLocalStorage());

  //adding edit id
  const [editID, setEditID] = useState(null);

  //submit/edit
  const [isEditing, setIsEditing] = useState(false);

  //input name
  const [name, setName] = useState("");

  //alert
  const [alert, setAlert] = useState({
    // show: true,
    // msg: "hello world",
    // type: "success",
    show: false,
    msg: "",
    type: "",
  });

  //handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("hello");
    if (!name) {
      //display alert if value is empty
      //   setAlert({ show: true, msg: "please enter value", type: "danger" });
      showAlert(true, "danger", "please enter value");
    } else if (name && isEditing) {
      //deal with edit when submitting
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, title: name };
          }
          return item;
        })
      );
      setName("");
      setEditID(null);
      setIsEditing(false);
      showAlert(true, "success", "edit successful");
    } else {
      // show alert
      showAlert(true, "success", "item added to the list");

      const newItem = { id: new Date().getTime().toString(), title: name };
      setList([...list, newItem]);
      setName("");
    }
  };

  //   show alert function
  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };

  //clear all function
  // const clearList = () => {
  //   showAlert(true, "danger", "list empty");
  //   setList([]);
  // };

  //   remove item
  const removeItem = (id) => {
    showAlert(true, "danger", "deleted");
    setList(list.filter((item) => item.id !== id));
    //if item.id matches to whatever id parsed in to remove item, dont return from filter function and  wont be displayed
  };

  // edit item
  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id); //if item matches id, return item
    setIsEditing(true);
    setEditID(id);
    setName(specificItem.title);
  };

  //local storage
  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  return (
    <section className="main_section">
      <form action="" className="grocery_form" onSubmit={handleSubmit}>
        {/* alert component */}
        {alert.show && <Alert {...alert} removeAlert={showAlert} />}
        {/* alert component end */}

        <h2>Add Groceries</h2>
        <div className="form">
          <input
            type="text"
            className="grocery_input"
            placeholder="e.g. eggs"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit" className="submit_btn">
            {isEditing ? "edit" : "submit"}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div className="grocery_container">
          <List items={list} removeItem={removeItem} editItem={editItem} />
          <button
            className="clear_btn"
            onClick={() => {
              showAlert(true, "danger", "list empty");
              setList([]);
            }}
          >
            clear items
          </button>
        </div>
      )}
    </section>
  );
};

export default Main;
