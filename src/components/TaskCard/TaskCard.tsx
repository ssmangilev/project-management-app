import card_delete from '../../assets/images/card_delete.svg';
import user_image from '../../assets/images/user_image.svg';
import Modal from '../Modal/Modal';
import { useState } from 'react';
import ConfirmDeleteModalWindow from '../ConfirmDeleteModalWindow/ConfirmDeleteModalWindow';
import CreateUpdateTaskForm from '../CreateUpdateTaskForm/CreateUpdateTaskForm';
import { TaskInterface } from '../../types';

function TaskCard(props: TaskInterface): JSX.Element {
  const [isDeleteModalOpened, setIsDeleteModalOpened] = useState<boolean>(false);

  const [isAddTaskModalOpened, setIsAddTaskModalOpened] = useState<boolean>(false);

  const handleDeleteModalOnClose = (): void => {
    setIsDeleteModalOpened(false);
  };
  const handleAddTaskModalOnClose = (): void => {
    setIsAddTaskModalOpened(false);
  };

  return (
    <>
      <div key={props.id} className="w-[360px] bg-white rounded-3xl p-6 h-[275px]">
        <h3 className="overflow-hidden text-ellipsis whitespace-nowrap mb-10">{props.title}</h3>
        <h5 className="overflow-hidden text-ellipsis whitespace-nowrap mb-10">
          {props.description}
        </h5>
        <div className="mb-10">
          <img src={user_image}></img>
          <span className="text-[#1ad993]">&nbsp;{props.userId}</span>
        </div>
        <div className="flex justify-end">
          <img src={card_delete}></img>
        </div>
      </div>
      <Modal isOpened={isDeleteModalOpened} onClose={handleDeleteModalOnClose}>
        <ConfirmDeleteModalWindow title={props.title} type="task" id={props.id ? props.id : ''} />
      </Modal>
      <Modal isOpened={isAddTaskModalOpened} onClose={handleAddTaskModalOnClose}>
        <CreateUpdateTaskForm
          onClose={handleAddTaskModalOnClose}
          columnId={props.columnId}
          boardId={props.boardId}
        />
      </Modal>
    </>
  );
}

export default TaskCard;
