"use strict"
const fs = require('fs')
class Person {
  constructor(id, first_name, last_name, email, phone) {
    this.id = id
    this.first_name = first_name
    this.last_name = last_name
    this.email = email
    this.phone = phone
    this.created_at = new Date()
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
    if (this._people){
      return this._people
    }
    console.log('executed');
    let data = fs.readFileSync(this._file, 'utf-8').split('\n')
    this._people = []
    for (let i = 1; i < data.length; i++) {
      let dataSplit = data[i].split(',')
      this._people.push(new Person(dataSplit[0],dataSplit[1],dataSplit[2],dataSplit[3],dataSplit[4] ))
    }
    return this._people


    // We've never called people before, now parse the CSV file
    // and return an Array of Person objects here
    // Save the Array in the people instance variable.

  }

  addPerson(first_name,last_name,email,phone, created_at) {
    this._people.push(new Person (this._people.length+1,first_name,last_name,email,phone ))
  }

  submit() {
    for (let i = 0; i < this._people.length; i++) {
      this._people[i] = `${this._people[i].id},${this._people[i].first_name},${this._people[i].last_name},${this._people[i].email},${this._people[i].phone},${this._people[i].created_at}`
    }
    
    let dataCSV = "id,first_name,last_name,email,phone,created_at\n"
    dataCSV += this._people.join('\n')

    fs.writeFile(this._file,dataCSV,'utf-8', function(err) {
    
      if(err) {
        console.log(err);
      } else {
        console.log('Data berhasil disimpan !');
      }
    })
  }

}

let parser = new PersonParser('people.csv')

parser.people
parser.addPerson('daniel', 'agus', 'agus@gmail.com', 087765245272)
parser.addPerson('wahyu', 'yulia', 'wahyu@gmail.com', 087765245272)
parser.addPerson('Michael', 'sam', 'todo@gmail.com', 08297528292)
parser.submit()