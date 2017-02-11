"use strict"
const fs = require("fs")
class Person {
  constructor(id, firstName, lastName, email, phone) {
    this.id = id
    this.firstName = firstName
    this.lastName = lastName
    this.email = email
    this.phone = phone
    this.create_at = new Date()
  }
  // Look at the above CSV file
  // What attributes should a Person object have?

}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = null
  }

  get people() {
    // If we've already parsed the CSV file, don't parse it again
    // Remember: people is null by default
    if (this._people) {
      return this._people
    }

    // We've never called people before, now parse the CSV file
    // and return an Array of Person objects here
    // Save the Array in the people instance variable.
    let data = fs.readFileSync(this._file, 'utf-8').split('\n')
    this._people = []
    for(let i = 1; i < data.length; i++) {
      let dataparse = data[i].split(',')
      this.people.push(new Person(dataparse[0], dataparse[1], dataparse[2], dataparse[3], dataparse[4]))
    }
    return this._people
  }

  addPerson(firstName, lastName, email, phone, create_at) {
    this._people.push(new Person (this._people.length+1, firstName, lastName, email, phone))
  }

  submit() {
    for(let i = 0; i < this._people.length; i++) {
      this._people[i] = `${this._people[i].id}, ${this._people[i].firstName}, ${this._people[i].lastName},
      ${this._people[i].email}, ${this._people[i].phone}, ${this._people[i].create_at}`
    }
    this._people.unshift()
    this._people = this._people.join('\n')

    fs.writeFile(this._file, this._people, 'utf-8', function(err) {
      err ? console.log(err) : console.log(`Data disimpan`)
    })
  }

}

let parser = new PersonParser('people.csv')
parser.people
parser.addPerson('Samuel', 'sinaga', 'samuel@gmail.co.id', 0822766775542)
parser.addPerson('Daniel', 'agus', 'samuel@gmail.co.id', 0822766775542)
//console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)
parser.submit()