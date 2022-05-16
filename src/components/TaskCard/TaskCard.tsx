import card_delete from '../../assets/images/card_delete.svg';
import user_image from '../../assets/images/user_image.svg';
import Modal from '../Modal/Modal';
import { useState } from 'react';
import ConfirmDeleteModalWindow from '../ConfirmDeleteModalWindow/ConfirmDeleteModalWindow';
import CreateUpdateTaskForm from '../CreateUpdateTaskForm/CreateUpdateTaskForm';
import { TaskInterface, UserInterface } from '../../types';
import { useAppSelector } from '../../redux/hooks';
import { findIndex } from 'lodash';

function TaskCard(props: TaskInterface): JSX.Element {
  const { users } = useAppSelector((state) => state.boardReducer);
  const [isDeleteModalOpened, setIsDeleteModalOpened] = useState<boolean>(false);

  const [isAddTaskModalOpened, setIsAddTaskModalOpened] = useState<boolean>(false);

  const handleDeleteModalOnClose = (): void => {
    setIsDeleteModalOpened(false);
  };
  const handleAddTaskModalOnClose = (): void => {
    setIsAddTaskModalOpened(false);
  };

  const userName = (userId: string) => {
    if (userId) {
      const userIndex = findIndex(users, (user: UserInterface) => user.id === userId);
      return users[userIndex].login;
    }
  };

  return (
    <>
      <div key={props.id} className="bg-white rounded-3xl p-4 h-46">
        <h3 className="overflow-hidden text-ellipsis whitespace-nowrap mb-5">{props.title}</h3>
        <h5 className="overflow-hidden text-ellipsis whitespace-nowrap mb-5">
          {props.description}
        </h5>
        <div className="mb-5">
          <img className="inline-block" src={user_image}></img>
          <span className="text-[#1ad993]">&nbsp;{props.userId ? userName(props.userId) : ''}</span>
        </div>
        <div className="flex justify-end">
          <img src={card_delete} onClick={() => setIsDeleteModalOpened(true)}></img>
        </div>
      </div>
      <Modal isOpened={isDeleteModalOpened} onClose={handleDeleteModalOnClose}>
        <ConfirmDeleteModalWindow title={props.title} type="task" id={props.id ? props.id : ''} />
      </Modal>
      <Modal isOpened={isAddTaskModalOpened} onClose={handleAddTaskModalOnClose}>
        <CreateUpdateTaskForm
          onClose={handleAddTaskModalOnClose}
          columnId={props.columnId as string}
          boardId={props.boardId as string}
          editMode={false}
        />
      </Modal>
    </>
  );
}

export default TaskCard;
