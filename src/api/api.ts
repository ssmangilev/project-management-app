import axios, { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import i18n from '../n18i';
import { AppDispatch } from '../redux/store';
import { logoutUser } from '../redux/user/actions';
import { errorHandler } from '../redux/utils';

type BoardPayload = {
  title: string;
  description: string;
};

type ColumnPayload = {
  title: string;
  order: number;
};

type TaskPayload = {
  title: string;
  description: string;
  order: number;
  userId?: string;
};

export type Payload = BoardPayload | ColumnPayload | TaskPayload;

export const getHttp = async (
  dispatch: AppDispatch,
  url: string,
  query: Record<string, unknown>,
  params?: Record<string, unknown>
): Promise<void> => {
  const urlWithQuery: string =
    url +
    Object.keys(query)
      .map((key) => `${key}=${query[key]}`)
      .join('&');
  try {
    await axios.get(urlWithQuery, params);
  } catch (e) {
    if ((e as AxiosError)?.response?.status === 401) {
      dispatch(logoutUser());
    }
    if (errorHandler(e as Record<string, AxiosResponse>)) {
      const error = i18n.t(errorHandler(e as Record<string, AxiosResponse>) as string, {
        type: i18n.t('_TYPE_BOARD_'),
      });
      toast.error(error);
    }
  }
};

export const postHttp = async (
  dispatch: AppDispatch,
  url: string,
  payload: Payload
): Promise<AxiosResponse<unknown> | void> => {
  const body = { ...payload };
  try {
    const config = { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } };
    const res = await axios.post<Payload, AxiosResponse<unknown, AxiosError>>(url, body, config);
    return res;
  } catch (e) {
    if ((e as AxiosError)?.response?.status === 401) {
      dispatch(logoutUser());
      const errorText = i18n.t('_ERR_SERVER_CODE_401_');
      toast.error(errorText);
      return {} as AxiosResponse;
    }
    if (errorHandler(e as Record<string, AxiosResponse>)) {
      const error = i18n.t(errorHandler(e as Record<string, AxiosResponse>) as string, {
        type: i18n.t('_TYPE_BOARD_'),
      });
      toast.error(error);
    }
  }
};

export const putHttp = async (
  dispatch: AppDispatch,
  url: string,
  payload: Record<string, unknown>
): Promise<AxiosResponse<string, unknown> | void | string> => {
  const body = {
    ...payload,
  };
  try {
    const config = { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } };
    const res = await axios.put(url, body, config);
    return res;
  } catch (e) {
    if ((e as AxiosError)?.response?.status === 401) {
      dispatch(logoutUser());
    }
    if (errorHandler(e as Record<string, AxiosResponse>)) {
      const error = i18n.t(errorHandler(e as Record<string, AxiosResponse>) as string, {
        type: i18n.t('_TYPE_BOARD_'),
      });
      toast.error(error);
    }
  }
};

export const deleteHttp = async (
  dispatch: AppDispatch,
  url: string
): Promise<AxiosResponse<string, unknown> | void | string> => {
  try {
    const config = { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } };
    const res = await axios.delete(url, config);
    return res;
  } catch (e) {
    if ((e as AxiosError)?.response?.status === 401) {
      dispatch(logoutUser());
    }
    if (errorHandler(e as Record<string, AxiosResponse>)) {
      const error = i18n.t(errorHandler(e as Record<string, AxiosResponse>) as string);
      toast.error(error);
    }
  }
};
