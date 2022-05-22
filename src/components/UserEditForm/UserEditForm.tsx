import React, { useContext } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { ToastContext } from '../../contexts/ToastContext';
import EditFormElement from '../FormElements/EditFormElement';
import { deleteUser, getUserData, updateUser } from './UserEditAction';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { useNavigate } from 'react-router';
import { logoutUser } from '../../redux/user/actions';

const UserEditForm: React.FC = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    mode: 'onSubmit',
  });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const token = useAppSelector((state) => state.globalStateReducer.token);
  const userId = useAppSelector((state) => state.userReducer.user?.id);

  const { dispatch: toastDispatch } = useContext(ToastContext);

  const formSubmitHandler: SubmitHandler<FieldValues> = async (values) => {
    const userData = await getUserData(token, userId);
    console.log(userId);
    const userName = values.userName === '' ? userData.login : values.userName;
    const name = values.name === '' ? userData.name : values.name;
    const password = values.password;
    const userUpdateData = {
      login: userName,
      name,
      password,
    };
    const resStatus = await updateUser(userId, userUpdateData, token);
    console.log(resStatus);

    switch (resStatus) {
      case 200:
        toastDispatch({ type: 'SUCCESS', payload: 'User successfully updated' });
        break;
      case 404:
        toastDispatch({ type: 'ERROR', payload: `User wasn't founded!, update` });
        break;
      default:
        return;
    }
    reset();
  };

  const handleDeleteBtn = async () => {
    const res = await deleteUser(token, userId);
    if (res === 204) {
      toastDispatch({ type: 'SUCCESS', payload: 'User has been deleted successfully' });
      navigate('login');
      dispatch(logoutUser());
    } else {
      toastDispatch({ type: 'ERROR', payload: 'User was not found, delete fail' });
    }
  };

  return (
    <form className="grid grid-cols-2 gap-2" onSubmit={handleSubmit(formSubmitHandler)}>
      <EditFormElement
        type="text"
        label="New username"
        placeholder="Min. 8 characters"
        errorText="The length of password should be more than eight characters!"
        hasError={errors?.userName}
        inputData={register('userName', {
          minLength: 8,
        })}
      />
      <EditFormElement
        type="text"
        label="New name"
        placeholder="Min. 5 characters"
        errorText="The length of password should be more than five characters!"
        hasError={errors?.name}
        inputData={register('name', {
          minLength: 5,
        })}
      />
      <EditFormElement
        type="password"
        label="password"
        placeholder="Min. 8 characters"
        errorText={'The length of password should be more than eight characters!'}
        hasError={errors?.password}
        inputData={register('password', {
          minLength: 8,
          required: true,
        })}
      />
      <button
        className="px-[172px] py-[12px] bg-[#096CFE] text-white text-xl rounded-3xl rounded-tr-none font-semibold mb-[24px]"
        type="submit"
      >
        Update
      </button>

      <button
        className="px-[172px] py-[12px] bg-[red] text-white text-xl rounded-3xl rounded-tr-none font-semibold mb-[24px]"
        type="submit"
        onClick={handleDeleteBtn}
      >
        Delete
      </button>
    </form>
  );
};

export default UserEditForm;
