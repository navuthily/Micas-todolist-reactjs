import {
  API_URL
} from '../constants/config'
import callApi from "../utils/api-caller";
export const apiGetTodo = function () {

  return callApi('todos', "get", null)

}
export const apiDeleteCompleted = function (data) {
  callApi("todos", "delete", data)
}

export const apiChangeStateOneItem = function (item) {
  var _id = item._id;
  var url = `todos/select/${_id}`;
  return callApi(url, "patch")
}
export const apiFinishAll = function () {
  return callApi(`${API_URL}/todos`, "put")
}
export const apiAdd = function (data) {
  return callApi("todos", "post", data)
}
export const apiDeleteOneItem = function (item) {
  var _id = item._id;
  var url = `todos/${_id}`;
  return callApi(url, "delete")
}
export const apiEditContent = function (data, _id) {
  var url = `todos/${_id}`;
  return callApi(url, "patch", data);
}