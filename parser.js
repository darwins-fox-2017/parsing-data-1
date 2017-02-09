"use strict"

const fs    = require('fs')
// const csv   = require("fast-csv")

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(id, first_name, last_name, email, phone) {
    this.id         = id
    this.first_name = first_name
    this.last_name  = last_name
    this.email      = email
    this.phone      = phone
    this.created_at = new Date()
  }
}

class PersonParser {
  constructor (file) {
    this.file       = file
    this._people    = null
  }

  get people() {
    if (this._people) {
      return this._people
    }

    var data = fs.readFileSync(this.file, "utf-8").split('\n')
    this._people = []

    for (let i = 1; i < data.length; i++) {
      let param = data[i].split(',')
      this._people.push(new Person(param[0],param[1],param[2],param[3],param[4]))
    }
    return this._people
   }

    add (id, first_name, last_name, email, phone) {
      let personal = new Person(this._people.length+1, first_name, last_name, email, phone);
      // console.log(personal);
      this._people.push(personal)
      this.save()
    }

    save() {
      for (let i = 0; i < this._people.length; i++) {
        this._people[i] = `${this._people[i].id},${this._people[i].first_name},${this._people[i].last_name},${this._people[i].email},${this._people[i].phone},${this._people[i].created_at}`
      }
      this._people.unshift(`id,first_name,last_name,email,phone,created_at`)
      this._people = this._people.join('\n')

      fs.writeFileSync(this.file, this._people, "utf-8", function (err) {
        err ? console.log(err) : console.log('Berhasil disimpan');
      })
    }
}

let testParser = new PersonParser('people.csv')
testParser.people
// console.log(testParser.people);
// testParser.add('', 'Aiko', 'Diandra', 'diandraiko@gmail.com', 08159070289)
testParser.add('', 'Isumi', 'Karina', 'isumi.karina@gmail.com', 08159070289)
