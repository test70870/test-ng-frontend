export const constant = {
  loggedInUser: {},
  isLogin: false,
  errorMessage: {
    required: `Please enter the missing information`,
    pattern: `Please make sure you have entered this information correctly`,
  },
  function: {
    numberOnly: (event: any) => {
      const charCode = (event.which) ? event.which : event.keyCode;
      if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
      }
      return true;
    },
    alphabetOnly: (event: any) => {
      const charCode = (event.which) ? event.which : event.keyCode; // 32 is ASCII code of space bar
      if (charCode > 31 && charCode > 32 && (charCode < 65 || charCode > 90) && (charCode < 97 || charCode > 122)) {
        return false;
      }
      return true;
    },
    alphaNumericOnly: (event: any) => {
      const charCode = (event.which) ? event.which : event.keyCode; // 32 is ASCII code of space bar
      if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode > 32 && (charCode < 65 || charCode > 90) && (charCode < 97 || charCode > 122)) {
        return false;
      }
      return true;
    },
  },
  regEx: {
    alphabetOnlyRegEx: /^[A-Za-z -]+$/,
    numberOnlyRegEx: /[^0-9]*/,
    alphaNumericRegEx: /^[A-Za-z0-9]+$/,
    emailRegEx: /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i,
    // passwordRegEx: '(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,}',
    // passwordRegEx: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/,
    passwordRegEx: /^.{7,}$/,
    usPhoneRegEx: /^.{10,}$/,
    // usPhoneRegEx: /^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$/i,
    zipRegEx: '^[0-9]{5}([- /]?[0-9]{4})?$',
    ssnRegEx: /^\d{3}-?\d{2}-?\d{4}$/,
    einRegEx: /^\d{2}-?\d{7}$/,
    routingNumberRegEx: /^.{9,}$/,
    mobileOtpRegEx: /^.{4,}$/,
    youTubeLinkRegEx: /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/
},
};
