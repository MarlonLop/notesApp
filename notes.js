const fs = require('fs')
const chalk = require('chalk')

const getNotes = function(){
    return 'Your notes...'
}

const addNote = function (title, body){
    const notes = loadNotes()
    const duplicateNotes = notes.filter(function (note) {
        return note.title === title
    })
    
    if(duplicateNotes.length === 0){
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log('new note added')
    } else {
        console.log('note title already in use')
    }
    
}

const saveNotes = function (notes){
    fs.writeFileSync('notes.json', JSON.stringify(notes))
}

const removeNote = function (title){
    const notes = loadNotes()
    const newNotesArr = notes.filter(function(removeNote){
        return removeNote.title !== title
    })

    if(notes.length === newNotesArr.length){
        console.log('the note ' +  chalk.blue(title) + ' ' +chalk.bgRed('does not exist'))
    } else {
        saveNotes(newNotesArr)
        console.log('the note ' +chalk.blue(title) + ' ' + chalk.bgGreen('has been removed'))
    }
}

const loadNotes = function(){
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
    removeNote: removeNote
}