import React from 'react';
import { translate } from 'react-i18next';
import { reduxForm, Field, FormSection } from 'redux-form';
import { Button, Intent } from '@blueprintjs/core';

import { twoFactorCode } from '../../../utils/validators';

import RenderInput from '../../_forms/RenderInput';

import s from './styles.css';

const VerifyResetPasswordForm = (props) => {
  const {
    t,
    handleSubmit,
    invalid,
    fetching,
    method
  } = props;

  const renderTip = () => {
    if (!method) return null;
    if (method === 'google') {
      return (
        <div className={s.tip}>
          To verify signing in - enter PIN code from Google Authenticator
        </div>
      );
    }

    return (
      <div className={s.tip}>
        To verify signing in - enter PIN code from email
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit}>

      {renderTip()}

      <FormSection name="verification">
        <Field
          component={RenderInput}
          placeholder={t('auth:resetPassword.form.verificationCode')}
          name="code"
          type="text"
          large
          fill
          validate={twoFactorCode}/>
      </FormSection>

      <div>
        <Button
          type="submit"
          className="pt-large pt-fill"
          intent={Intent.PRIMARY}
          text={t('auth:resetPassword.form.verifyResetPassword')}
          disabled={invalid}
          loading={fetching}/>
      </div>
    </form>
  );
};

const FormComponent = reduxForm({
  form: 'verifyResetPassword',
  initialValues: {
    email: '',
    verification: {
      code: '',
      verificationId: ''
    }
  }
})(VerifyResetPasswordForm);
const TranslatedComponent = translate(['auth'])(FormComponent);
export default TranslatedComponent;
