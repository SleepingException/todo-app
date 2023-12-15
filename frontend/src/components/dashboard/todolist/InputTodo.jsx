import React, { Fragment, useState } from "react";
import AddTaskModal from "../../AddTaskModal";

const InputTodo = ({ setResponse }) => {
  const [isShowModal, setIsShowModal] = useState(false)

  return (
      <>
        <AddTaskModal show={isShowModal} handleClose={() => setIsShowModal(false)} setResponse={setResponse}/>
    <div style={{textAlign: 'end'}}>
      <button className="btn btn-success mt-4 " onClick={() => setIsShowModal(true)}>Добавить</button>
    </div>
      </>

  );
};

export default InputTodo;
