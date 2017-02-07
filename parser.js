"use strict"
var fs = require('fs')
var csv = require("fast-csv")
var Baby = require('babyparse')
var moment = require('moment');
// pass in the contents of a csv file


class Person {
  constructor(personProperties){
    this.id = personProperties.id
    this.firstName = personProperties.firstName
    this.lastName = personProperties.lastName
    this.email = personProperties.email
    this.phone = personProperties.phone
    this.createdAt = personProperties.createdAt
  }
  // Look at the above CSV file
  // What attributes should a Person object have?
}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = []
  }

  parseCSV(){
    let parsed = Baby.parseFiles(this._file);

    for (var i = 0; i < parsed.data.length; i++) {
      let person = {
        id: parsed.data[i][0],
        firstName: parsed.data[i][1],
        lastName:  parsed.data[i][2],
        email: parsed.data[i][3],
        phone: parsed.data[i][4],
        createdAt: parsed.data[i][5]
      }
      this._people.push(new Person(person))
    }
    return this._people
  }

  get people() {
    // If we've already parsed the CSV file, don't parse it again
    // Remember: people is null by default
    if (this._people){
      // console.log(this.changeDateFormat(this.toArray(this._people)));
      return this.changeDateFormat(this.toArray(this._people))
    } else {
      return `There are no data yet ): - Just add once`
    }
    // We've never called people before, now parse the CSV file
    // and return an Array of Person objects here
    // Save the Array in the people instance variable.
  }

  addPerson(personProperties) {
    this._people.push(new Person(personProperties))
  }

  save(){
    var ws = fs.createWriteStream(this._file);
    csv.write(this.toArray(this._people),
              {headers: true}).pipe(ws);
  }

  toArray(peoples){
    let result = []
    for (var i = 0; i < peoples.length; i++) {
      result.push([peoples[i].id,
                   peoples[i].firstName,
                   peoples[i].lastName,
                   peoples[i].email,
                   peoples[i].phone,
                   peoples[i].createdAt
                 ])
    }
    return result
  }

  changeDateFormat(peoples){
    for (var i = 0; i < peoples.length; i++) {
      peoples[i][5] = moment(peoples[i][5]).format('D MMM YYYY');

    }
    console.log(peoples);
    return peoples
  }

}
// Lets play!!
let parser = new PersonParser('people.csv')
parser.parseCSV()
let person = {
  id: 201,
  firstName: 'Diky',
  lastName:  'Arga',
  email: 'hello@dikyarga.co',
  phone: '085173263173',
  createdAt: new Date().toISOString()
}
parser.addPerson(person)
parser.save()
// console.log(parser.people);
parser.people

// console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)

// -------- If you want to use Async ---------
// parser.parseCSV(function(peoples){
//   parser._people = peoples
//   console.log('dada');
  // let person = {
  //   id: 201,
  //   firstName: 'Diky',
  //   lastName:  'Arga',
  //   email: 'hello@dikyarga.co',
  //   phone: '085173263173',
  //   createdAt: new Date()
  // }
//   parser.addPerson(person)
// })
