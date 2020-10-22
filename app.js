const yargs = require("yargs");
const notes = require("./notes");

yargs.command({
  command: "add",
  describe: "add a new note",
  builder: {
    title: {
      describe: "note title",
      demandOption: true,
      type: "string",
    },
    body: {
      describe: "note body",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    notes.addNote(argv.title, argv.body);
  },
});
// Create Remove Command
yargs.command({
  command: "remove",
  describe: "remove a note",
  builder: {
    title: {
      describe: "note title",
      demandOption: true,
      type: string,
    },
  },
  handler(argv) {
    notes.removeNote(argv.title);
  },
});
// Create Read Command
yargs.command({
  command: "read",
  describe: "read a note",
  builder: {
    title: {
      describe: "note title",
      demandOption: true,
      type: string,
    },
  },
  handler(args) {
    notes.readNote(args.title);
  },
});
// Create List Command
yargs.command({
  command: "list",
  describe: "list all notes",
  handler() {
    notes.listNotes();
  },
});
yargs.parse();
// console.log(yargs.argv);
