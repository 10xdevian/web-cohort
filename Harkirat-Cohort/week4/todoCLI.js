const fs = require("fs");
const { Command } = require("commander");
const path = require("path");
const program = new Command();

program.name("Todo Cli").description("CLI to create todo App").version("8.9.0");

program
  .command("create-todo")
  .description("Adding todo")
  .argument("<todo>", "Adding a todo")
  .argument("<file>", "file to add todo ")

  .action((file, todo) => {
    const filePath = path.resolve(file);
    fs.appendFile(filePath, `${todo}\n`, (err) => {
      if (err) {
        console.log("Error is Coming in Creating Todo", err);
      } else {
        console.log("✅ Todo is Created Sucessfylly 👍🏻");
      }
    });
  });

program
  .command("get-todo")
  .description("Getting all Todos that we are created")
  .argument("<file>", "File for getting the all todos ")
  .action((file) => {
    const filePath = path.resolve(file);
    fs.readFile(filePath, "utf-8", (err, data) => {
      if (err) {
        console.log("Error while geting all todos", err);
      } else {
        console.log(data);
      }
    });
  });

program
  .command("delete-todo")
  .description(
    "Delete a Spacific todo by lines => Which line you want to delete",
  )
  .argument("<file>", "file of deleteing the todo")
  .argument(
    "<lineNumber>",
    "Give the line number so that you can delete that line of todo",
  )
  .action((file, lineNumber) => {
    const filePath = path.resolve(file);
    fs.readFile(filePath, "utf-8", (err, data) => {
      if (err) {
        console.log(
          "you have have error in this file so we cant delete the content",
          err,
        );
        return;
      }

      // file content is stored in big String of file so now we split("\n") to convert into array
      let lines = data.split("\n"); // convert file content into array of lines
      lineNumber = parseInt(lineNumber, 10);

      lines.splice(lineNumber - 1, 1); // remove the spacified lines

      fs.writeFile(filePath, lines.join("\n"), "utf-8", (err) => {
        if (err) {
          console.log("Error in Writing file", err);
        } else {
          console.log(
            `Todo do at line number ${lineNumber} Deleted Sucessfully!!!!`,
          );
        }
      });
    });
  });

program.parse();
