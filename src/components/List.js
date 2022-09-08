import React from "react";
import "./List.css";
import { RiFileEditFill } from "react-icons/ri";
import { AiTwotoneDelete } from "react-icons/ai";

const List = ({ items, removeItem, editItem }) => {
  return (
    <div className="grocery_list">
      {items.map((item) => {
        const { id, title } = item;
        return (
          <article key={id} className="grocery_item">
            <p className="added_grocery">{title}</p>
            {/* <p>{id}</p> */}
            <div className="btn_container">
              <button
                type="button"
                className="edit_button"
                onClick={() => editItem(id)}
              >
                <RiFileEditFill />
              </button>
              <button
                type="button"
                className="delete_button"
                onClick={() => removeItem(id)}
              >
                <AiTwotoneDelete />
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default List;
