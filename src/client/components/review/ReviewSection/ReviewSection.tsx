import type { FC } from 'react';
import { memo, useReducer } from 'react';

import type { ReviewFragmentResponse } from '../../../graphql/fragments';
import { isEqual } from '../../../utils/object';
import { PrimaryButton } from '../../foundation/PrimaryButton';
import { TextArea } from '../../foundation/TextArea';
import { ReviewList } from '../ReviewList';

import * as styles from './ReviewSection.styles';

const LESS_THAN_64_LENGTH_REGEX = /^([\s\S\n]{0,8}){0,8}$/u;

type Props = {
  reviews: ReviewFragmentResponse[] | undefined;
  hasSignedIn: boolean;
  onSubmitReview: (reviewForm: ReviewForm) => void;
};

type ReviewForm = {
  comment: string;
};

type ReviewFormError = {
  comment: string;
};

type FormState = ReviewForm & {
  errors: ReviewFormError;
};

const initialState = {
  comment: '',
  errors: {
    comment: '',
  },
};

const reducer = (state: FormState, action: { type: string; payload: string; field: string }) => {
  switch (action.type) {
    case 'HANDLE_INPUT':
      return { ...state, [action.field]: action.payload };
    case 'RESET_FORM':
      return initialState;
    case 'HANDLE_ERROR':
      return { ...state, errors: { ...state.errors, [action.field]: action.payload } };
    default:
      return state;
  }
};

export const ReviewSection: FC<Props> = memo(({ hasSignedIn, onSubmitReview, reviews }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const checkErrors = () => {
    return Object.values(state.errors).some((error) => error !== '');
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (checkErrors()) return;
    onSubmitReview({
      comment: state.comment,
    });
    dispatch({ field: '', payload: '', type: 'RESET_FORM' });
  };

  const handleComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch({ field: 'comment', payload: e.target.value, type: 'HANDLE_INPUT' });
    if (e.target.value != '' && !LESS_THAN_64_LENGTH_REGEX.test(e.target.value)) {
      dispatch({ field: 'comment', payload: '64 文字以内でコメントしてください', type: 'HANDLE_ERROR' });
    } else {
      dispatch({ field: 'comment', payload: '', type: 'HANDLE_ERROR' });
    }
  };

  return (
    <div>
      {reviews != null ? <ReviewList reviews={reviews} /> : null}
      {hasSignedIn && (
        <form className={styles.form()} data-testid="form-review" onSubmit={onSubmit}>
          <div className={styles.commentTextAreaWrapper()}>
            <TextArea
              required
              id="comment"
              label="レビューを送信する"
              onChange={handleComment}
              placeholder="こちらの野菜はいかがでしたか？"
              rows={6}
              value={state.comment}
            />
            <p className={styles.error()}>{state.errors.comment}</p>
          </div>
          <div className={styles.submitButton()}>
            <PrimaryButton size="base" type="submit">
              送信
            </PrimaryButton>
          </div>
        </form>
      )}
    </div>
  );
}, isEqual);

ReviewSection.displayName = 'ReviewSection';
