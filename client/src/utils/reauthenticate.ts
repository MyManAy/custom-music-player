const reauthenticate = {
  redirect: {
    destination: "/?authTimedOut=true",
    permanent: true,
  },
};

export default reauthenticate;
