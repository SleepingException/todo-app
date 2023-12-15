import React, { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';

const AddTaskModal = ({
  show,
  handleClose,
  setResponse,
  selectedTask,
  isEdit,
}) => {
  const [body, setBody] = useState({
    name: '',
    description: '',
    deadline: '',
    status: undefined,
  });
  const [validated, setValidated] = useState(false);

  const handleSubmit = event => {
    event.preventDefault();

    !isEdit
      ? fetch('http://localhost:8080/app/tasks', {
          method: 'POST',
          body: JSON.stringify({
            ...body,
            deadline: dayjs(body.deadline).add(3, 'hour'),
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        }).then(() => {
          fetch('http://localhost:8080/app/users/current/tasks')
            .then(data => data.json())
            .then(tasks => {
              setResponse(prevState => ({
                ...prevState,
                tasks,
              }));
              toast.success('Задача добавлена');
            });
        })
      : fetch(`http://localhost:8080/app/tasks/${selectedTask.id}`, {
          method: 'PATCH',
          body: JSON.stringify({
            ...body,
            deadline: dayjs(body.deadline).add(3, 'hour'),
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        }).then(() => {
          setResponse(prevState => ({
            ...prevState,
            tasks: prevState.tasks.map(elem => {
              if (elem.id === selectedTask.id) {
                return { id: selectedTask.id, ...body };
              }

              return elem;
            }),
          }));
          toast.success('Редактирование успешно');
        });
  };

  useEffect(() => {
    setValidated(false);

    if (!body.deadline || !body.name || !body.description) {
      return;
    }

    setValidated(true);
  }, [body]);

  useEffect(() => {
    selectedTask && setBody({ ...selectedTask });
  }, [selectedTask]);

  return (
    <Modal show={show} onHide={handleClose}>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>{isEdit ? 'Изменить' : 'Добавить'} таску</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Название</Form.Label>
            <Form.Control
              type="text"
              value={body.name}
              onChange={e =>
                setBody(prevState => ({ ...prevState, name: e.target.value }))
              }
              placeholder="Введите название"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Описание</Form.Label>
            <Form.Control
              type="text"
              value={body.description}
              onChange={e =>
                setBody(prevState => ({
                  ...prevState,
                  description: e.target.value,
                }))
              }
              placeholder="Введите описание"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="deadline">
            <Form.Label>Дедлайн</Form.Label>
            <DateTimePicker
              className="form-control"
              value={dayjs(body.deadline)}
              minDate={dayjs()}
              onChange={value =>
                setBody(prevState => ({ ...prevState, deadline: value }))
              }
            />
          </Form.Group>
          {isEdit && (
            <Form.Group className="mb-3" controlId="status">
              <Form.Label>Статус</Form.Label>
              <Form.Select
                onChange={event =>
                  setBody(prevState => ({
                    ...prevState,
                    status: event.target.value,
                  }))
                }
              >
                <option value="TO_DO">Сделать</option>
                <option value="IN_PROGRESS">В работе</option>
                <option value="DONE">Готово</option>
              </Form.Select>
            </Form.Group>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Закрыть
          </Button>
          <Button
            disabled={!validated}
            type="submit"
            variant="primary"
            onClick={handleClose}
          >
            Сохранить
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default AddTaskModal;
