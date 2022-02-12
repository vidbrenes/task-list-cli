const inquirer = require("inquirer");
require("colors");

const menuOpts = [
  {
    type: "list",
    name: "option",
    message: "¿Qué desea hacer?",
    choices: [
      {
        value: "1",
        name: `${"1.".green} Crear tarea`,
      },
      {
        value: "2",
        name: `${"2.".green} Listar tareas`,
      },
      {
        value: "3",
        name: `${"3.".green} Listar tareas completadas`,
      },
      {
        value: "4",
        name: `${"4.".green} Listar tareas pendientes`,
      },
      {
        value: "5",
        name: `${"5.".green} Completar tarea(s)`,
      },
      {
        value: "6",
        name: `${"6.".green} Borrar tarea(s)`,
      },
      {
        value: "0",
        name: `${"0.".green} Salir`,
      },
    ],
  },
];

const mainMenu = async () => {
  console.log("=====================================".green);
  console.log("        Seleccione una opción".green);
  console.log("=====================================\n".green);

  const { option } = await inquirer.prompt(menuOpts);

  return option;
};

const pause = async () => {
  const pauseOpt = [
    {
      type: "input",
      name: "enter",
      message: `Presione ${"ENTER".green} para continuar\n`,
    },
  ];
  return await inquirer.prompt(pauseOpt);
};

const handleInput = async (message) => {
  const promptValue = [
    {
      type: "input",
      name: "description",
      message,
      validate(value) {
        if (value.length === 0) {
          return "Por favor, ingrese un valor";
        }
        return true;
      },
    },
  ];
  const { description } = await inquirer.prompt(promptValue);

  return description;
};

const handleToCompleteList = async (tasks = []) => {
  const choices = tasks.map((task, index) => {
    return {
      value: task.id,
      name: `${(index + 1 + ".").green} ${task.description}`,
      checked: !!task.completedBy ? true : false,
    };
  });

  const toCompleteOpts = [
    {
      type: "checkbox",
      name: "ids",
      message: `Seleccione las tareas ${"completadas".green}`,
      choices,
    },
  ];

  const { ids } = await inquirer.prompt(toCompleteOpts);

  return ids;
};

const handleDeleteList = async (tasks = []) => {
  const choices = tasks.map((task, i) => ({
    value: task.id,
    name: `${(i + 1 + ".").green} ${task.description}`,
  }));

  choices.unshift({
    value: "0",
    name: `${"0.".green} Cancelar`,
  });

  const deleteOpts = [
    {
      type: "list",
      name: "id",
      message: "¿Cuál tarea desea borrar?",
      choices,
    },
  ];

  const { id } = await inquirer.prompt(deleteOpts);

  return id;
};

const confirmTaskDeletion = async ({ id, description }) => {
  const message = `
    TAREA: ${description.yellow}
    Estás seguro de ${"borrar".red} la tarea?
  `;

  const { deleteTask } = await inquirer.prompt([
    {
      type: "confirm",
      name: "deleteTask",
      message,
      default: false,
    },
  ]);

  return deleteTask;
};

module.exports = {
  confirmTaskDeletion,
  handleToCompleteList,
  handleDeleteList,
  handleInput,
  mainMenu,
  pause,
};
