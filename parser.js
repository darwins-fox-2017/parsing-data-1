"use strict"
let fs = require('fs');
let baby = require('babyparse')
let csv = require('fast-csv')


class Person {
  constructor(data){
    this.id = data.id;
    this.firstName = data.first_name;
    this.lastName = data.last_name;
    this.email = data.email;
    this.phone = data.phone;
    this.createAt = data.created_at;
  }
}

class PersonParser {

  constructor(file) {
    let parsed = baby.parseFiles(file);
    let data = parsed.data;
    this._file = data;
    this._people = null;
  }

  parseCsv(){
    //console.log(this._file.length);
    this._people=this.ArrayToObject(this._file);
    //console.log(this._people);
  }

  get people() {
    // If we've already parsed the CSV file, don't parse it again
    // Remember: people is null by default
    if (this._people){
      return this._people;
    }else{'people data empety'}


    // We've never called people before, now parse the CSV file
    // and return an Array of Person objects here
    // Save the Array in the people instance variable.
  }

  ArrayToObject(dataArr){
    let outputArrObjk=[]
   for (var i = 1; i < dataArr.length-1; i++) {
     let objectLine = {
       'id' : dataArr[i][0],
       'first_name' : dataArr[i][1],
       'last_name' : dataArr[i][2],
       'email' : dataArr[i][3],
       'phone' : dataArr[i][4],
       'created_at' : dataArr[i][5],
     }
     //console.log(dataArr[i][0],objectLine.id);
     let object = new Person (objectLine);
     outputArrObjk.push(object);
   }
    return outputArrObjk;
  }

  addPerson(objekPerson) {
    for (var i = 0; i < objekPerson.length; i++) {
      objekPerson[i]['id']=''+(this._people.length+1);
      objekPerson[i]['createAt'] = new Date().toISOString();
      this._people.push(objekPerson[i])
    }
  }

  save(){
    var ws = fs.createWriteStream("people.csv");
    csv
    .write(parser._people, {headers: true})
    .pipe(ws);
  }

}

let parser = new PersonParser('people.csv');
parser.parseCsv();
console.log(`There are ${parser._people.length} people in the file '${parser._file.length-2}'.`)
//csv().from('people.csv').on('data', console.log);

let addPersonObject=[{
  'firstName':'ego',
  'lastName':'gola',
  'email':'blala',
  'phone':'08233333',
}];
parser.addPerson(addPersonObject);
parser.save();
