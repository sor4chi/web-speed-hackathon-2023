import type { FC } from 'react';
import { useReducer } from 'react';

import { PrimaryButton } from '../../foundation/PrimaryButton';
import { TextInput } from '../../foundation/TextInput';

import * as styles from './OrderForm.styles';

type OrderFormValue = {
  zipCode: string;
  prefecture: string;
  city: string;
  streetAddress: string;
};

type Props = {
  onSubmit: (orderFormValue: OrderFormValue) => void;
};

type IBSNetZipCodeResponse = {
  status: number;
  message: string;
  results: {
    address1: string;
    address2: string;
    address3: string;
    kana1: string;
    kana2: string;
    kana3: string;
    prefcode: string;
    zipcode: string;
  }[];
};

const fetchAddressByZipcode = async (zipCode: string) => {
  const response = await fetch(`https://zipcloud.ibsnet.co.jp/api/search?zipcode=${zipCode}`);
  const data = await response.json();
  return data as IBSNetZipCodeResponse;
};

const initialState = {
  city: '',
  prefecture: '',
  streetAddress: '',
  zipCode: '',
};

const reducer = (state: OrderFormValue, action: { type: string; payload: string; field: string }) => {
  switch (action.type) {
    case 'HANDLE_INPUT':
      return { ...state, [action.field]: action.payload };
    default:
      return state;
  }
};

export const OrderForm: FC<Props> = ({ onSubmit }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({
      city: state.city,
      prefecture: state.prefecture,
      streetAddress: state.streetAddress,
      zipCode: state.zipCode,
    });
  };

  const handleZipCodeInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const zipCode = e.target.value;
    dispatch({ field: 'zipCode', payload: zipCode, type: 'HANDLE_INPUT' });
    if (zipCode.length !== 7) return;
    const data = await fetchAddressByZipcode(zipCode);
    if (data.status !== 200) return;
    const { address1, address2, address3 } = data.results[0];
    dispatch({ field: 'prefecture', payload: address1, type: 'HANDLE_INPUT' });
    dispatch({ field: 'city', payload: `${address2} ${address3}`, type: 'HANDLE_INPUT' });
  };

  return (
    <div className={styles.container()}>
      <form className={styles.form()} data-testid="order-form" onSubmit={handleSubmit}>
        <div className={styles.inputList()}>
          <TextInput
            required
            id="zipCode"
            label="郵便番号"
            onChange={handleZipCodeInput}
            placeholder="例: 1500042"
            value={state.zipCode}
          />
          <TextInput
            required
            id="prefecture"
            label="都道府県"
            onChange={(e) => dispatch({ field: 'prefecture', payload: e.target.value, type: 'HANDLE_INPUT' })}
            placeholder="例: 東京都"
            value={state.prefecture}
          />
          <TextInput
            required
            id="city"
            label="市区町村"
            onChange={(e) => dispatch({ field: 'city', payload: e.target.value, type: 'HANDLE_INPUT' })}
            placeholder="例: 渋谷区宇田川町"
            value={state.city}
          />
          <TextInput
            required
            id="streetAddress"
            label="番地・建物名など"
            onChange={(e) => dispatch({ field: 'streetAddress', payload: e.target.value, type: 'HANDLE_INPUT' })}
            placeholder="例: 40番1号 Abema Towers"
            value={state.streetAddress}
          />
        </div>
        <div className={styles.purchaseButton()}>
          <PrimaryButton size="lg" type="submit">
            購入
          </PrimaryButton>
        </div>
      </form>
    </div>
  );
};
