const fs = require('fs')
const chalk = require('chalk')

const getNotes = () => {
    return 'Your notes...'
}

const addNote = (title, body) => {
    const notes = loadNotes()
    // const duplicateNotes = notes.filter((note) => note.title === title)
    const duplicateNote = notes.find((note) => note.title === title)
    
    if(!duplicateNote){
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.bgGreen('new note added'))
    } else {
        console.log(chalk.bgRed('note title already in use'))
    }
    
}

const saveNotes = (notes) => {
    fs.writeFileSync('notes.json', JSON.stringify(notes))
}

const removeNote = (title) => {
    const notes = loadNotes()
    const newNotesArr = notes.filter((removeNote) => removeNote.title !== title)

    if(notes.length === newNotesArr.length){
        console.log('the note ' +  chalk.blue(title) + ' ' +chalk.bgRed('does not exist'))
    } else {
        saveNotes(newNotesArr)
        console.log('the note ' +chalk.blue(title) + ' ' + chalk.bgGreen('has been removed'))
    }
}

const listNotes = () => {
    const notes = loadNotes()

    console.log(chalk.inverse('Notes:'))
    notes.forEach(note => console.log(chalk.green(note.title)))
}

const loadNotes = () => {
   try {
       const dataBuffer = fs.readFileSync('notes.json')
       return JSON.parse(dataBuffer.toString())
   } catch (e) {
       return []
   }
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes
}