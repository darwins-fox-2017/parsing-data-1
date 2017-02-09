"use strict"
const fs = require('fs')

class Person {
  constructor(id,first_name,last_name,email,phone){
    this.id         = id
    this.first_name = first_name
    this.last_name  = last_name
    this.email      = email
    this.phone      = phone
    this.created_at = new Date()
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

    let readFile = fs.readFileSync(this._file,"utf-8").split('\n')
    this._people = []
    for (let i = 1; i < readFile.length; i++) {
      let data = readFile[i].split(',')
      this._people.push(new Person(data[0], data[1], data[2], data[3], data[4]))
    }
    return this._people
  }

  addPerson(id,first_name,last_name,email,phone) {
    this._people.push(new Person(this._people +1, first_name, last_name, email, phone))
  }

  save(){
    for (let i = 0; i < this._people.length; i++) {
      this._people[i] = `${this._people[i].id}, ${this._people[i].first_name},${this._people[i].last_name},${this._people[i].email},${this._people[i].phone},${this._people[i].created_at}`
    }
    this._people.unshift()
    this._people = this._people.join('\n')

    fs.writeFileSync(this._file, this._people, 'utf-8', function(err){
      err ? console.log(err):console.log('Data has been saved !!');;
    })
  }

}

let parser = new PersonParser('people.csv')
    parser.people

console.log(parser.people);
console.log(`There are ${parser._people.size} people in the file '${parser._file}'.`)

parser.addPerson('Eri', 'Irawan', 'email@email.com', 1234567890)
parser.save()
