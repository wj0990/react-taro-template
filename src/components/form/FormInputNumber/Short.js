import { useState, useEffect, useMemo } from 'react';
import FormInputNumber from '.';
import "./short.scss"

// ShortInput
export default (props) => {

  return (
    <FormInputNumber
      {...props}
      className={['form-input-number', props.error ? 'form-input-number-error-border' : '', props.className].join()}
      style={{ width: 90, ...props.style }}
      label=""
      required={false}
      error={props.error}
    // placeholder={'　'}
    // slotButton
    />
  );
}
