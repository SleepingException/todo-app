import React, { Fragment, useState, useEffect } from 'react';
import AddTaskModal from '../../AddTaskModal';
import { toast } from 'react-toastify';
import { Alert, Button } from 'react-bootstrap';
import dayjs from 'dayjs';

const STATUS_MESSAGE = {
  TO_DO: 'Сделать',
  IN_PROGRESS: 'В работе',
  DONE: 'Готово',
};

const STATUS_COLOR = {
  TO_DO: '#659094',
  IN_PROGRESS: '#32b3bf',
  DONE: '#32bf57',
};

const ListTodos = ({ allTodos, setResponse }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState();
  const [isEdit, setIsEdit] = useState(true);
  async function deleteTodo(id) {
    try {
      await fetch(`http://localhost:8080/app/tasks/${id}`, {
        method: 'DELETE',
      }).then(() => toast.success('Удаление успешно'));

      setResponse(prevState => ({
        ...prevState,
        tasks: prevState.tasks.filter(todo => todo.id !== id),
      }));
    } catch (err) {
      console.error(err.message);
    }
  }

  return (
    <Fragment>
      <AddTaskModal
        show={isOpenModal}
        handleClose={() => setIsOpenModal(false)}
        setResponse={setResponse}
        selectedTask={selectedTask}
        isEdit={isEdit}
      />
      <table className="table mt-4">
        <thead>
          <tr>
            <th>Название</th>
            <th>Описание</th>
            <th>Дедлайн</th>
            <th>Статус</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {allTodos?.length ? (
            allTodos.map(todo => (
              <tr key={todo.id}>
                <td style={{ backgroundColor: STATUS_COLOR[todo.status] }}>
                  {todo.name}
                </td>
                <td style={{ backgroundColor: STATUS_COLOR[todo.status] }}>
                  {todo.description}
                </td>
                <td style={{ backgroundColor: STATUS_COLOR[todo.status] }}>
                  {dayjs(todo.deadline).format('YYYY-MM-DD HH:mm')}
                </td>
                <td style={{ backgroundColor: STATUS_COLOR[todo.status] }}>
                  {STATUS_MESSAGE[todo.status]}
                </td>
                <td style={{ backgroundColor: STATUS_COLOR[todo.status] }}>
                  <button
                    className="btn btn-warning"
                    onClick={() => {
                      setIsEdit(true);
                      setSelectedTask(todo);
                      setIsOpenModal(true);
                    }}
                  >
                    Редактировать
                  </button>
                </td>
                <td style={{ backgroundColor: STATUS_COLOR[todo.status] }}>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteTodo(todo.id)}
                  >
                    Удалить
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <Alert
              key={'danger'}
              variant={'danger'}
              className={'mt-md-4 text-center'}
              style={{
                position: 'absolute',
                top: '30%',
                left: '50%',
                transform: 'translateX(-50%)',
              }}
            >
              Список пуст{' '}
              <Button
                onClick={() => {
                  setIsEdit(false);
                  setIsOpenModal(true);
                }}
                variant="secondary"
                className={'ml-4'}
              >
                Добавить?
              </Button>{' '}
            </Alert>
          )}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ListTodos;
