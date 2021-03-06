import { NavLink } from 'react-router-dom';
import card_delete from '../../assets/images/card_delete.svg';
import card_edit from '../../assets/images/card_edit.svg';
import AddBoardForm from '../AddBoardForm/AddBoardForm';
import Modal from '../Modal/Modal';
import BoardCardProps from './types';
import { SyntheticEvent } from 'react';
import { useState } from 'react';
import ConfirmDeleteModalWindow from '../ConfirmDeleteModalWindow/ConfirmDeleteModalWindow';
import { useTranslation } from 'react-i18next';

function BoardCard(props: BoardCardProps): JSX.Element {
  const { t } = useTranslation();

  const [isUpdateModalOpened, setIsUpdateModalOpened] = useState<boolean>(false);
  const [isDeleteModalOpened, setIsDeleteModalOpened] = useState<boolean>(false);

  const handleUpdateModalOnClose = (): void => {
    setIsUpdateModalOpened(false);
  };

  const handleDeleteModalOnClose = (): void => {
    setIsDeleteModalOpened(false);
  };

  const handleOnClick = (event: SyntheticEvent): void => {
    if ((event.target as Node).nodeName === 'IMG') {
      event.preventDefault();
      event.stopPropagation();
    }
  };

  return (
    <li className="board__item hover:shadow-md">
      <NavLink to={`/board/${props.id}`} onClick={handleOnClick} className="board__link">
        <div className="flex flex-col gap-4">
          <h3 className="board__title" title={props.title}>
            {props.title}
          </h3>
          <p className="board__description" title={props.description}>
            {props.description}
          </p>
          <div className="flex gap-2 -ml-2">
            <button
              onClick={() => {
                setIsUpdateModalOpened(true);
              }}
              className="flex items-center justify-center w-8 h-8 hover:bg-white hover:rounded-full"
            >
              <img src={card_edit} alt="" />
              <span className="sr-only">Edit the board</span>
            </button>
            <button
              onClick={() => {
                setIsDeleteModalOpened(true);
              }}
              className="flex items-center justify-center w-8 h-8 hover:bg-white hover:rounded-full"
            >
              <img src={card_delete} alt="" />
              <span className="sr-only">Delete the board</span>{' '}
            </button>
          </div>
          <p className="caption">{`${props.columnsCount} ${t('_LBL_COLUMN_', {
            count: props.columnsCount,
          })}`}</p>
          <p className="caption">{`${props.tasksCount} ${t('_LBL_TASK_', {
            count: props.tasksCount,
          })}`}</p>
        </div>
      </NavLink>
      {isUpdateModalOpened && (
        <Modal onClose={handleUpdateModalOnClose}>
          <AddBoardForm
            onClose={handleUpdateModalOnClose}
            title={props.title}
            id={props.id}
            description={props.description}
          />
        </Modal>
      )}
      {isDeleteModalOpened && (
        <Modal onClose={handleDeleteModalOnClose}>
          <ConfirmDeleteModalWindow
            title={props.title}
            type="board"
            id={props.id}
            onClose={handleDeleteModalOnClose}
          />
        </Modal>
      )}
    </li>
  );
}

export default BoardCard;
