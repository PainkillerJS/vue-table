function validator(payload) {
  let error = false;

  Object.keys(payload).forEach((key) => {
    if (!payload[key] && key !== "_id") {
      error = true;
      return null;
    }
  });

  return error;
}

export default validator;
