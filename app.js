// const { showMenu, pause } = require("./helpers/messages");
const { writeData, fetchData } = require("./helpers/data");
const {
  confirmTaskDeletion,
  handleToCompleteList,
  handleDeleteList,
  handleInput,
  mainMenu,
  pause,
} = require("./helpers/menu");
const Task = require("./models/task");
const TasksCollection = require("./models/tasksCollection");

const main = async () => {
  let opt = "";
  const tareas = new TasksCollection();
  const initialData = fetchData();

  if (initialData) {
    tareas.setTasksCollectionFromArray(initialData);
  }

  do {
    console.clear();
    opt = await mainMenu();
    // console.log({ opt });

    switch (opt) {
      case "1":
        const description = await handleInput("Descripción:");
        tareas.addTask(description);
        break;
      case "2":
        tareas.listAllTasks();
        break;
      case "3":
        tareas.listTasksByCompletedStatus();
        break;
      case "4":
        tareas.listTasksByCompletedStatus(false);
        break;
      case "5":
        const ids = await handleToCompleteList(tareas.collectionArray);

        if (ids) {
          tareas.collectionArray.forEach((task) => {
            isCompleted = ids.includes(task.id);
            tareas.setTaskCompletedStatus(task.id, isCompleted);
          });
          console.log("Tareas actualizadas correctamente.".green);
        }

        break;
      case "6":
        const id = await handleDeleteList(tareas.collectionArray);

        if (id !== "0") {
          const deleteTask = await confirmTaskDeletion(
            tareas.collectionObj[id]
          );

          if (deleteTask) {
            tareas.deleteTask(id);
            console.log("Tarea borrada correctamente.".green);
          }
        }
        break;
    }

    writeData(tareas.collectionArray);

    if (opt !== "0") await pause();
  } while (opt !== "0");

  console.clear();
};

main();
