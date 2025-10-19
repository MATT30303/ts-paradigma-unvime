console.log("*************** Bienvenido ***************");
console.log("Esta es una calculadora");

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const MENU_MSG = `
********************* MENU *********************
Ingrese la operacion que desea hacer
 1 - sumar 
 2 - restar 
 3 - multiplicar 
 4 - dividir
 5 - salida
`;

function ask(question: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(question, (respuesta: string) => {
      resolve(respuesta.trim());
    });
  });
}

async function menu(): Promise<void> {
  const menu_option = await ask(MENU_MSG);

  switch (menu_option) {
    case "1":
      await add();
      break;
    case "2":
      await subtract();
      break;
    case "3":
      await multiply();
      break;
    case "4":
      await divide();
      break;
    case "5":
      rl.close();
      return;
    default:
      console.log("Opción incorrecta\n");
      break;
  }

  await menu();
}

async function add(): Promise<void> {
  const operation = await ask("Ingrese una suma --> ejemplo: 3 + 2 + 5 \n");
  const numbers = operation.split("+").map((n) => parseFloat(n));
  const total = numbers.reduce((acc, cur) => acc + cur, 0);
  console.log("Tu suma total es:", total, "\nGracias\n");
}

async function subtract(): Promise<void> {
  const operation = await ask("Ingrese una resta --> ejemplo: 10 - 3 - 2 \n");
  const numbers = operation
    .split("-")
    .map((n) => parseFloat(n))
    .filter((n) => !isNaN(n));

  if (numbers.length === 0) {
    console.log("Operación inválida\n");
    return;
  }

  const total = numbers.slice(1).reduce((acc, cur) => acc - cur, numbers[0]);
  console.log("\nTu resta total es:", total, "\nGracias\n");
}

async function multiply(): Promise<void> {
  const operation = await ask(
    "Ingrese una multiplicación --> ejemplo: 3 * 2 * 5 \n"
  );
  const numbers = operation
    .split("*")
    .map((n) => parseFloat(n))
    .filter((n) => !isNaN(n));

  const total = numbers.reduce((acc, cur) => acc * cur, 1);
  console.log("\nTu multiplicación total es:", total, "\nGracias\n");
}

async function divide(): Promise<void> {
  const operation = await ask(
    "Ingrese una división --> ejemplo: 10 / 2 / 5 \n"
  );
  const numbers = operation
    .split("/")
    .map((n) => parseFloat(n))
    .filter((n) => !isNaN(n));

  if (numbers.length === 0) {
    console.log("Operación inválida\n");
    return;
  }

  const total = numbers.slice(1).reduce((acc, cur) => acc / cur, numbers[0]);
  console.log("\nTu división total es:", total, "\nGracias\n");
}

async function main(): Promise<void> {
  await menu();
}

main();
