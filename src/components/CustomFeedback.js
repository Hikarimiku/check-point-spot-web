import { Alert, AlertTitle } from "@mui/material";

const CustomFeedback = ({ severity, title, displayMsg }) => {
  return (
    <Alert severity={severity}>
      {title !== "" ? <AlertTitle>{title}</AlertTitle> : null}
      <strong>{displayMsg}</strong>
    </Alert>
  );
};

export default CustomFeedback;
