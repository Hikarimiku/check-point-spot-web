//main configuration
export const titleWebApp = "Check Point Spot";
export const copyRight = "Hikarimiku";
export const drawerWidth = 230;
export const primaryTheme = "#9F2B68";
export const secondaryTheme = "#FFFFFF";
export const tertiaryTheme = "#FF7F50";
export const labelTextColor = "gray";
export const labelColor = "black";

//validation configuration
export const minLengthPassword = 4;
export const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
export const phoneNumRegex = /^\+?[0-9]\d{9,14}$/;
export const errRequired = "Please fill in your ";
export const errPasswordLength = "The min password length is ";
export const errPasswordNotSame = "Passwords not match";
export const errEmailInvalid = "Email is invalid";
export const errPhoneInvalid = "Phone number is invalid";

//function configuration
export const timeoutDebouncer = 500;
export const timeoutSnackBar = 2000;

//service configuration
export const networkErrorMsg =
  "Connection problem. Please check your connection";
export const noRecordMsg = "No records found";
export const hostTask = "http://localhost:7788/";
export const headers = { "Content-Type": "application/json" };

//ui configuration
export const roundedPaper = {
  p: 2,
  mr: 3,
  borderRadius: "10px",
};
