"use strict"

class Person {
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
    if (this._people)
      return this._people

    // We've never called people before, now parse the CSV file
    // and return an Array of Person objects here
    // Save the Array in the people instance variable.
  }

  addPerson() {}

}

let parser = new PersonParser('people.csv')

console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)
