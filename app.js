const chalk = require('chalk')
const { describe, argv, conflicts } = require('yargs')
const yargs = require('yargs')
const notes = require('./notes.js')

yargs.version('1.0.1')

// create add command
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.addNote(argv.title, argv.body)
    }
})

// create remove command
yargs.command({
    command: 'remove',
    describe: 'remove a note',
    builder: {
        title: {
            describe: 'note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler() {
        notes.removeNote(argv.title)
    }
})

// create list command
yargs.command({
    command: 'list',
    describe: 'list notes',
    handler() {
        notes.listNotes(argv.title)
    }
})
// create read command
yargs.command({
    command: 'read',
    describe: 'read a note',
    handler() {
        console.log('reading a note')    }
})

yargs.parse()
// console.log(yargs.argv)