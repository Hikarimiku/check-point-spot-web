import { hostTask, headers } from "../variables/constant.js";

const path = "task";

const search = async (obj) => {
  const res = await fetch(hostTask + path + "/search", {
    body: JSON.stringify(obj),
    method: "POST",
    headers: headers,
  });
  return res.json();
};

const getAll = async () => {
  const res = await fetch(hostTask + path, {
    method: "GET",
    headers: headers,
  });
  return res.json();
};

const add = async (obj) => {
  const res = await fetch(hostTask + path, {
    body: JSON.stringify(obj),
    method: "POST",
    headers: headers,
  });
  return res.json();
};

const update = async (obj) => {
  const res = await fetch(hostTask + path, {
    body: JSON.stringify(obj),
    method: "PUT",
    headers: headers,
  });
  return res.json();
};

const taskSvc = { search, add, update, getAll };
export default taskSvc;
