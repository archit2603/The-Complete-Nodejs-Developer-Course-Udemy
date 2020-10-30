const fs = require('fs')
const chalk = require('chalk')

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => note.title === title)

    if(!duplicateNote){
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse('New note added!'))
    }
    else{
        console.log(chalk.red.inverse('Note title taken!'))
    }
}

const listNotes = () => {
    const notes = loadNotes()
    if (notes.length !== 0){
        console.log(chalk.gray.inverse('Your notes'))
        notes.forEach((note) => console.log(note.title))
    }
    else{
        console.log(chalk.red.inverse('No notes!'))
    }
}

const loadNotes = () => {
    try{
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    }
    catch(e){
        return []
    }
}

const readNote = (title) => {
    const notes = loadNotes()
    const note = notes.find((note) => note.title === title)
    if (note) {
        console.log(chalk.gray.inverse(note.title))
        console.log(note.body)
    }
    else{
        console.log(chalk.red.inverse('Note not found!'))
    }
}

const removeNote = (title) => {
    const notes = loadNotes()
    const keepNotes = notes.filter((note) => note.title !== title)
    if (keepNotes.length === notes.length){
        console.log(chalk.red.inverse('No note found!'))
    }
    else{
        console.log(chalk.green.inverse('Note removed!'))
        saveNotes(keepNotes)
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}