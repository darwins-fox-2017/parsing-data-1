"use strict"

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(component){
    this.id = component['id'];
    this.first_name = component['first_name'];
    this.last_name = component['last_name'];
    this.email = component['email'];
    this.phone  = component['phone'];
    this.created_at = component['created_at'];
  }
}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = null
  }

  readFile(){
    if(!this._people){
      let data = fs.readFileSync(this._file, "utf-8").split('\n').slice(1)
      this._people = []
      for(let i=0; i<data.length; i++){
        let dataPerLine = data[i].split(",")
        let dataTemp = {
          'id' : dataPerLine[0],
          'first_name' : dataPerLine[1],
          'last_name' : dataPerLine[2],
          'email' : dataPerLine[3],
          'phone' : dataPerLine[4],
          'created_at' : dataPerLine[5]
        }
        this._people.push(new Person(dataTemp))
      }
    }else{
      console.log("Data already exists");
    }

    return this._people
  }

  get people() {
    if (this._people)
      return this._people
  }

  addPerson(data) {
    data['id'] = this._people.length + 1
    this._people.push(new Person(data))
  }

  save(){
    let tempData = this._people

    for (var i = 0; i < tempData.length; i++) {
      tempData[i].created_at = new Date(`${tempData[i].created_at}`).toUTCString()
      this._people[i] = `${tempData[i].id},${tempData[i].first_name},${tempData[i].last_name},${tempData[i].email},${tempData[i].phone},${tempData[i].created_at}`

    }
    this._people.unshift('id,first_name,last_name,email,phone,created_at')
    this._people = this._people.join('\n')
    fs.writeFileSync('people.csv', this._people)
    console.log("Data has been saved");
  }

}

let fs = require('fs')
let parser = new PersonParser('people.csv')
let person = {
  'id' : 201,
  'first_name' : 'John',
  'last_name' : 'Doe',
  'email' : 'john@doe.com',
  'phone' : '1-615-814-8763',
  'created_at' : new Date()//'2009-08-10T03:53:40-07:00'
}

parser.readFile()
console.log(`There are ${parser._people.length} people in the file '${parser._file}'.`)

parser.addPerson(person)
parser.save()
