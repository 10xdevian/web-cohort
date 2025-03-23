const fs = require("fs");
const { Command } = require("commander");
const program = new Command();

program
  .name("counter")
  .description("Cli to do file based on tasks ")
  .version("0.8.0");

program
  .command("count")
  .description("Find number of words in a file ")
  .argument("<file>", "file to count ")
  .action((file) => {
    fs.readFile(file, "utf8", (err, data) => {
      if (err) {
        console.log("Erorr is Here baby =>>>> ", err);
      } else {
        let words = 0;
        for (let i = 0; i < data.length; i++) {
          if (data[i] === " ") {
            words++;
          }
        }
        console.log(`There are ${words + 1} words in ${file}`);
      }
    });
  });

program.parse();
