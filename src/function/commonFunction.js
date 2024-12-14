const stringAvatar = (userProfile) => {
  return {
    children:
      (userProfile.firstName !== "" ? userProfile.firstName[0] : "") +
      (userProfile.lastName !== "" ? userProfile.lastName[0] : ""),
  };
};

const commonFunction = {
  stringAvatar,
};

export default commonFunction;
