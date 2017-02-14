"use strict"
const fs = require('fs');

class Person {
  constructor(id,first_name,last_name,email,phone) {
    this.id = id
    this.firstName = first_name
    this.lastName = last_name
    this.email = email
    this.phone = phone
    this.createdAt = new Date()
  }
}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = null
  }

  get people() {
    if (this._people) {
      return this._people
    }

    var data = fs.readFileSync(this._file,'utf-8').split('\n')
    this._people = []
    for(let i = 1; i < data.length; i++) {
      let item = data[i].split(',')
      this._people.push( new Person(item[0],item[1],item[2],item[3],item[4]))
    }
    return this._people

  }

  addPerson(first_name,last_name,email,phone,created_at) {
    //var data = fs.readFileSync(this._file,'utf-8')
    this._people.push( new Person(this._people.length+1,first_name,last_name,email,phone) )
  }

  last() {
    console.log(this._people[this._people.length - 1]);
  }

  save() {
    //let temp_file = JSON.stringify(this._people)
    //this._people = this._people.join(,)
    for(let i = 0; i < this._people.length; i++) {
      this._people[i] = `${this._people[i].id},${this._people[i].firstName},${this._people[i].lastName},${this._people[i].email},${this._people[i].phone},${this._people[i].createdAt}`
    }
    // this._people.unshift(`id,first_name,last_name,email,phone,created_at`)
    // console.log(`There are ${this._people.length} people in the file '${parser._file}'.`)
    let csv = "id,first_name,last_name,email,phone,created_at\n"
    csv += this._people.join('\n')
    fs.writeFile(this._file, csv , 'utf-8', function (err) {
    if (err) return console.log(err);
      console.log('oke sudah disimpan');
    });
  }
  //
  // size() {
  //   return
  // }

}

let parser = new PersonParser('people.csv')
parser.people
// console.log(parser.people);
parser.addPerson('irwin','pratajaya','7ofpentacles@gmail.com',081310338777)
//parser.last()
parser.save()
