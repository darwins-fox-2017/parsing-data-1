"use strict"

const fs = require("fs")
// var csv = require("fast-csv");
//
// csv
//  .fromPath("people.csv")
//  .on("data", function(data){
//      console.log(data);
//  })
//  .on("end", function(){
//      console.log("done");
//  });


class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(id,first_name,last_name,email,phone) {
    this.id = id
    this.first_name = first_name
    this.last_name = last_name
    this.email = email
    this.phone = phone
    this.created_at = new Date()
  }


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

  save() {
    for (let i = 0; i < this._people.length; i++) {
      this._people[i] = `${this._people[i].id},${this._people[i].first_name},${this._people[i].last_name},${this._people[i].email},${this._people[i].phone},${this._people[i].created_at}`
    }
    this._people.unshift()

    this._people = this._people.join('\n')

    fs.writeFile(this._file,this._people,'utf-8', function(err) {
      err ? console.log(err) : console.log('data saved');
      // if(err) {
      //   console.log(err);
      // } else {
      //   console.log('data saved');
      // }
    })
  }

}

let parser = new PersonParser('people.csv')

parser.people
// parser.addPerson('Endy', 'Susanto', 'endy@email.com', 08123456789)
// parser.addPerson('Wahyu', 'Hidayat', 'wahyu@email.com', 08111222333)
parser.addPerson('Irsan', 'Sebastian', 'irsan@email.com', 08123321123)
// console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)
parser.save()
