export function ReturnTodoList(projectID, todoList) {

  let task = todoList?.filter((item) => {
    return item?.currentProjectID === `${projectID}`;
  });

  return task;
}
