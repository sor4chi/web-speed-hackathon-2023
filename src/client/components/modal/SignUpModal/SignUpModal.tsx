import type { FC } from 'react';
import { useReducer, useState } from 'react';

import { useSignUp } from '../../../hooks/useSignUp';
import { useSignInModal } from '../../../store/signinModal';
import { useSignUpModal } from '../../../store/signupModal';
import { Modal } from '../../foundation/Modal';
import { PrimaryButton } from '../../foundation/PrimaryButton';
import { TextInput } from '../../foundation/TextInput';

import * as styles from './SignUpModal.styles';

const NOT_INCLUDED_AT_CHAR_REGEX = /^(?:[^@]*){6,}$/;
const NOT_INCLUDED_SYMBOL_CHARS_REGEX = /^(?:(?:[a-zA-Z0-9]*){2,})+$/;

export type SignUpForm = {
  email: string;
  name: string;
  password: string;
};

type SignUpFormErrors = {
  email: string;
  name: string;
  password: string;
};

type FormState = SignUpForm & {
  errors: SignUpFormErrors;
};

const initailFormState: FormState = {
  email: '',
  errors: {
    email: '',
    name: '',
    password: '',
  },
  name: '',
  password: '',
};

const reducer = (state: FormState, action: { type: string; payload: string; field: string }) => {
  switch (action.type) {
    case 'HANDLE_INPUT':
      return {
        ...state,
        [action.field]: action.payload,
      };
    case 'HANDLE_ERROR':
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.field]: action.payload,
        },
      };
    case 'RESET_FORM':
      return initailFormState;
    default:
      return state;
  }
};

export const SignUpModal: FC = () => {
  const { isSignUpModalOpen, setIsSignUpModalOpen } = useSignUpModal();
  const { setIsSignInModalOpen } = useSignInModal();
  const { signUp } = useSignUp();

  const handleSignInModalOpen = () => {
    setIsSignUpModalOpen(false);
    setIsSignInModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsSignUpModalOpen(false);
  };

  const [formState, dispatch] = useReducer(reducer, initailFormState);
  const [submitError, setSubmitError] = useState<Error | null>(null);

  const checkErrors = () => {
    return Object.values(formState.errors).some((error) => error !== '');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (checkErrors()) return;
    try {
      await signUp({
        variables: {
          email: formState.email,
          name: formState.name,
          password: formState.password,
        },
      });
      dispatch({ field: '', payload: '', type: 'RESET_FORM' });
      setSubmitError(null);
      handleCloseModal();
    } catch (err) {
      setSubmitError(err as Error);
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ field: 'email', payload: e.target.value, type: 'HANDLE_INPUT' });
    if (e.target.value != '' && NOT_INCLUDED_AT_CHAR_REGEX.test(e.target.value)) {
      dispatch({ field: 'email', payload: 'メールアドレスの形式が間違っています', type: 'HANDLE_ERROR' });
    } else {
      dispatch({ field: 'email', payload: '', type: 'HANDLE_ERROR' });
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ field: 'password', payload: e.target.value, type: 'HANDLE_INPUT' });
    if (e.target.value != '' && NOT_INCLUDED_SYMBOL_CHARS_REGEX.test(e.target.value)) {
      dispatch({
        field: 'password',
        payload: '英数字以外の文字を含めてください',
        type: 'HANDLE_ERROR',
      });
    } else {
      dispatch({ field: 'password', payload: '', type: 'HANDLE_ERROR' });
    }
  };

  return (
    <Modal onHide={handleCloseModal} show={isSignUpModalOpen}>
      <div className={styles.inner()}>
        <header className={styles.header()}>
          <h2 className={styles.heading()}>会員登録</h2>
          <button
            className={styles.switchToSignInButton()}
            data-testid="modal-switch-to-signin"
            onClick={() => handleSignInModalOpen()}
          >
            ログイン
          </button>
        </header>
        <form className={styles.form()} onSubmit={handleSubmit}>
          <div className={styles.inputList()}>
            <TextInput
              required
              id="email"
              label="メールアドレス"
              onChange={handleEmailChange}
              placeholder="メールアドレスを入力"
              type="email"
              value={formState.email}
            />
            <p className={styles.error()}>{formState.errors.email}</p>

            <TextInput
              required
              id="name"
              label="名前"
              onChange={(e) => dispatch({ field: 'name', payload: e.target.value, type: 'HANDLE_INPUT' })}
              placeholder="名前を入力"
              type="text"
              value={formState.name}
            />
            <p className={styles.error()}>{formState.errors.name}</p>

            <TextInput
              required
              id="password"
              label="パスワード"
              onChange={handlePasswordChange}
              placeholder="パスワードを入力"
              type="password"
              value={formState.password}
            />
            <p className={styles.error()}>{formState.errors.password}</p>
          </div>
          <div className={styles.submitButton()}>
            <PrimaryButton size="base" type="submit">
              登録する
            </PrimaryButton>
          </div>
          {submitError ? <p className={styles.error()}>会員登録に失敗しました</p> : null}
        </form>
      </div>
    </Modal>
  );
};
