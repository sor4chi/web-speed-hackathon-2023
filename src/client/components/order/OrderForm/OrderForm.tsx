import { useFormik } from 'formik';
import type { ChangeEventHandler, FC } from 'react';

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

export const OrderForm: FC<Props> = ({ onSubmit }) => {
  const formik = useFormik<OrderFormValue>({
    initialValues: {
      city: '',
      prefecture: '',
      streetAddress: '',
      zipCode: '',
    },
    onSubmit,
  });

  const fetchAddressByZipcode = async (zipCode: string) => {
    const response = await fetch(`https://zipcloud.ibsnet.co.jp/api/search?zipcode=${zipCode}`);
    const data = await response.json();
    return data as IBSNetZipCodeResponse;
  };

  const handleZipcodeChange: ChangeEventHandler<HTMLInputElement> = async (event) => {
    formik.handleChange(event);

    const zipCode = event.target.value;
    if (zipCode.length !== 7) return;

    const data = await fetchAddressByZipcode(zipCode);
    if (data.status !== 200) return;

    formik.setFieldValue('prefecture', data.results[0].address1);
    formik.setFieldValue('city', `${data.results[0].address2} ${data.results[0].address3}`);
  };

  return (
    <div className={styles.container()}>
      <form className={styles.form()} data-testid="order-form" onSubmit={formik.handleSubmit}>
        <div className={styles.inputList()}>
          <TextInput
            required
            id="zipCode"
            label="郵便番号"
            onChange={handleZipcodeChange}
            placeholder="例: 1500042"
            value={formik.values.zipCode}
          />
          <TextInput
            required
            id="prefecture"
            label="都道府県"
            onChange={formik.handleChange}
            placeholder="例: 東京都"
            value={formik.values.prefecture}
          />
          <TextInput
            required
            id="city"
            label="市区町村"
            onChange={formik.handleChange}
            placeholder="例: 渋谷区宇田川町"
            value={formik.values.city}
          />
          <TextInput
            required
            id="streetAddress"
            label="番地・建物名など"
            onChange={formik.handleChange}
            placeholder="例: 40番1号 Abema Towers"
            value={formik.values.streetAddress}
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
