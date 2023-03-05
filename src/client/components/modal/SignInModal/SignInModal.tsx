import type { FC } from 'react';
import { useReducer, useState } from 'react';

import { useSignIn } from '../../../hooks/useSignIn';
import { useSignInModal } from '../../../store/signinModal';
import { useSignUpModal } from '../../../store/signupModal';
import { Modal } from '../../foundation/Modal';
import { PrimaryButton } from '../../foundation/PrimaryButton';
import { TextInput } from '../../foundation/TextInput';

import * as styles from './SignInModal.styles';

const NOT_INCLUDED_AT_CHAR_REGEX = /^(?:[^@]*){6,}$/;
const NOT_INCLUDED_SYMBOL_CHARS_REGEX = /^(?:(?:[a-zA-Z0-9]*){2,})+$/;

export type SignInForm = {
  email: string;
  password: string;
};

type SignInFormErrors = {
  email: string;
  password: string;
};

type FormState = SignInForm & {
  errors: SignInFormErrors;
};

const initialFormState: FormState = {
  email: '',
  errors: {
    email: '',
    password: '',
  },
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
      return initialFormState;
    default:
      return state;
  }
};

export const SignInModal: FC = () => {
  const { isSignInModalOpen, setIsSignInModalOpen } = useSignInModal();
  const { setIsSignUpModalOpen } = useSignUpModal();
  const { signIn } = useSignIn();

  const handleSubscribeModalOpen = () => {
    setIsSignUpModalOpen(true);
    setIsSignInModalOpen(false);
  };
  const handleCloseModal = () => {
    setIsSignInModalOpen(false);
  };

  const [formState, dispatch] = useReducer(reducer, initialFormState);
  const [submitError, setSubmitError] = useState<Error | null>(null);

  const checkErrors = () => {
    return Object.values(formState.errors).some((error) => error !== '');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (checkErrors()) return;
    try {
      await signIn({
        variables: {
          email: formState.email,
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
    if (NOT_INCLUDED_AT_CHAR_REGEX.test(e.target.value)) {
      dispatch({ field: 'email', payload: 'メールアドレスの形式が間違っています', type: 'HANDLE_ERROR' });
    } else {
      dispatch({ field: 'email', payload: '', type: 'HANDLE_ERROR' });
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ field: 'password', payload: e.target.value, type: 'HANDLE_INPUT' });
    if (NOT_INCLUDED_SYMBOL_CHARS_REGEX.test(e.target.value)) {
      dispatch({ field: 'password', payload: '英数字以外の文字を含めてください', type: 'HANDLE_ERROR' });
    } else {
      dispatch({ field: 'password', payload: '', type: 'HANDLE_ERROR' });
    }
  };

  return (
    <Modal onHide={handleCloseModal} show={isSignInModalOpen}>
      <div className={styles.inner()}>
        <header className={styles.header()}>
          <h2 className={styles.heading()}>ログイン</h2>
          <button
            className={styles.switchToSignUpButton()}
            data-testid="modal-switch-to-signup"
            onClick={() => handleSubscribeModalOpen()}
          >
            会員登録
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
              ログイン
            </PrimaryButton>
          </div>
          {submitError != null ? <p className={styles.error()}>ログインに失敗しました</p> : null}
        </form>
      </div>
    </Modal>
  );
};
