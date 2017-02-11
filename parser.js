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

  parseFile(){
    let data = fs.readFileSync(this._file, "utf-8").split('\n').slice(1)
    this._people = []
    for(let i=0; i<data.length; i++){
      let dataRow = data[i].split(",")
      let temp = {
        'id' : dataRow[0],
        'first_name' : dataRow[1],
        'last_name' : dataRow[2],
        'email' : dataRow[3],
        'phone' : dataRow[4],
        'created_at' : dataRow[5]
      }
      this._people.push(new Person(temp))
    }
    return this._people
  }

  get people() {
    if(this._people){
      this.parseFile()
      for(let i=0; i<this._people.length; i++){
        this._people[i].created_at = new Date(this._people[i].created_at).toUTCString()
      }
      return this._people
    }else{
      console.log("Data does not exists");
    }


  }

  addPerson(data) {
    data['id'] = this._people.length + 1
    this._people.push(new Person(data))
  }

  save(){
    let temp = this._people

    for (var i = 0; i < temp.length; i++) {
      temp[i].created_at = new Date(`${temp[i].created_at}`).toISOString()
      this._people[i] = `${temp[i].id},${temp[i].first_name},${temp[i].last_name},${temp[i].email},${temp[i].phone},${temp[i].created_at}`

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
  'id' : 202,
  'first_name' : 'Joko',
  'last_name' : 'Priyono',
  'email' : 'jokopriyono@gmail.com',
  'phone' : '081263301159',
  'created_at' : new Date()
}

parser.parseFile()
parser.addPerson(person)
parser.save()

console.log(parser.people);
