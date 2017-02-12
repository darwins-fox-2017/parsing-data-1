"use strict"
import * as fs from 'fs'

class Person {
  constructor(id,first_name,last_name,email,phone, created_at) {
    this.id         = id
    this.first_name = first_name
    this.last_name  = last_name
    this.email      = email
    this.phone      = phone
    this.created_at = created_at || new Date()
  }
}

class PersonParser {

  constructor(file) {
    this._file   = file
    this._people = null
  }

  get people() {
    if (this._people)
      return this._people

    this.readPeople()
    return this._people
  }

  add (first_name, last_name, email, phone) {
    let newPerson = new Person(this._people.length+1, first_name, last_name, email, phone)
    this._people.push(newPerson)
    this.save()
  }

  save() {
    let people = []
    this._people.map((person) => {
      people.push(`${person.id},${person.first_name},${person.last_name},${person.email},${person.phone},${new Date(person.created_at).toISOString()}`)
    })
    
    people.unshift(`id,first_name,last_name,email,phone,created_at`)
    this._people = people.join('\n')

    fs.writeFileSync(this._file, this._people, "utf-8", (err) => {
      err ? console.log(err) : console.log('Berhasil disimpan');
    })
  }

  readPeople() {
    this._people = []
    this.readData((row, col) => {
      this._people.push(new Person(col(1), col(2), col(3), col(4), col(5), new Date(col(6)).toUTCString()))
    })
  }

  getCsv() {
    return fs.readFileSync(this._file, 'utf-8')
  }

  getRows() {
    return this.getCsv().split('\n')
  }

  getRowData(row) {
    return this.getRows()[row]
  }

  getColumnData(row, col) {
    return (col) => {
      return this.getRowData(row).split(',')[col-1]
    }
  }

  readData(callback) {
    for (let i = 1; i < this.getRows().length; i++) {
      let getCol = this.getColumnData(i)
      callback(this.getRowData(i), getCol, i)
    }
  }

}

let parser = new PersonParser('people.csv')

parser.readPeople()
parser.add('Danang', 'Aji Tamtomo', 'imsuretamtomo@gmail.com', '085846020358')
console.log(parser.people)
