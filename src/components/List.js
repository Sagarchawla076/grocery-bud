import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const List = ({
  list,
  setIsEditing,
  setName,
  setCurrentItem,
  setList,
  showAlert,
}) => {
  const renderList = list.map((item, i) => {
    const { id, title } = item;
    const handleEdit = (i) => {
      setIsEditing(true);
      setName(title);
      setCurrentItem(i);
    };
    const handleDelete = (i) => {
      const newList = list.slice();
      newList.splice(i, 1);
      setList(newList);
      setIsEditing(false);
      showAlert(true, "danger", "item removed");
    };
    return (
      <div className="list__item" key={id}>
        <div className="list__item--title">{title}</div>
        <div className="list__item--icons">
          <FaEdit className="edit" onClick={() => handleEdit(i)}></FaEdit>
          <FaTrash className="delete" onClick={() => handleDelete(i)}></FaTrash>
        </div>
      </div>
    );
  });
  return <div className="list">{renderList}</div>;
};

export default List;
