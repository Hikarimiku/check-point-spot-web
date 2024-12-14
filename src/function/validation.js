import {
  errRequired,
  minLengthPassword,
  errPasswordLength,
  errPasswordNotSame,
  emailRegex,
  errEmailInvalid,
  phoneNumRegex,
  errPhoneInvalid
} from "../variables/constant.js";

const nullCheck = (form, val) => {
  let newForm = {
    label: form.label,
    isErr: false,
    msg: "",
    value: form.value,
    required: form.required,
  };
  if (val === null || val === "") {
    newForm.isErr = true;
    newForm.msg = errRequired + newForm.label;
  }
  return newForm;
};

const passwordCheck = (form, val, valConfirmPassword = "") => {
  let newForm = {
    label: form.label,
    isErr: false,
    msg: "",
    value: form.value,
    required: form.required,
  };
  if (val.length < minLengthPassword) {
    newForm.isErr = true;
    newForm.msg = errPasswordLength + minLengthPassword;
  }

  if (
    !newForm.isErr &&
    valConfirmPassword !== "" &&
    val !== valConfirmPassword
  ) {
    newForm.isErr = true;
    newForm.msg = errPasswordNotSame;
  }
  return newForm;
};

const emailCheck = (form, val) => {
  let newForm = {
    label: form.label,
    isErr: false,
    msg: "",
    value: form.value,
    required: form.required,
  };

  if (!emailRegex.test(val)) {
    newForm.isErr = true;
    newForm.msg = errEmailInvalid;
  }
  return newForm;
};

const phoneCheck = (form, val) => {
  let newForm = {
    label: form.label,
    isErr: false,
    msg: "",
    value: form.value,
    required: form.required,
  };

  if (!phoneNumRegex.test(val)) {
    newForm.isErr = true;
    newForm.msg = errPhoneInvalid;
  }
  return newForm;
};


const validation = {
  nullCheck,
  passwordCheck,
  emailCheck,
  phoneCheck
};

export default validation;
