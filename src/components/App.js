import React, { useState, useEffect } from "react";
import "../styles/main.scss";
import Alert from "./Alert";
import Heading from "./Heading";
import List from "./List";

const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return JSON.parse(localStorage.getItem("list"));
  } else {
    return [];
  }
};

const App = () => {
  const [name, setName] = useState("");
  const [alert, setAlert] = useState({
    show: false,
    type: "",
    msg: "",
  });
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);
  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };
  const updateList = (currentItem) => {
    const newList = list.slice();
    newList[currentItem].title = name;
    setList(newList);
    setName("");
    console.log(list);
    setIsEditing(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      showAlert(true, "danger", "Please Type A Value");
    } else if (isEditing && name) {
      updateList(currentItem);
      showAlert(true, "success", "Value Changed");
    } else {
      const newValue = { id: new Date().getTime().toString(), title: name };
      setList([...list, newValue]);
      setName("");
      showAlert(true, "success", "Item added to the list");
    }
  };

  return (
    <section className="container">
      {alert.show && <Alert {...alert} removeAlert={showAlert} />}
      <Heading text="grocery bud" />
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="form__input"
          placeholder="e.g eggs"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <button type="submit" className="form__btn">
          {isEditing ? "edit" : "submit"}
        </button>
      </form>
      {list.length > 0 && (
        <div className="grocery-container">
          <List
            list={list}
            setIsEditing={setIsEditing}
            setName={setName}
            setCurrentItem={setCurrentItem}
            setList={setList}
            showAlert={showAlert}
          />
          <button
            className="clear"
            onClick={() => {
              showAlert(true, "danger", "Empty List");
              setList([]);
            }}
          >
            Clear Item
          </button>
        </div>
      )}
    </section>
  );
};

export default App;
