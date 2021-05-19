import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Student } from './student';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const students = [
      { id: 1, name: 'Rohit Agarwal', address: "Assam", school: "South Point", subject: "English", score: 56 },
      { id: 2, name: 'Swapnil Bhaumik', address: "Kolkata", school: "Garden High", subject: "Maths", score: 64 },
      { id: 3, name: 'Aman Jain', address: "Mumbai", school: "DPS", subject: "Physics", score: 76 },
      { id: 4, name: 'Souvik Mondal', address: "Chennai", school: "Calcutta International", subject: "Chemistry", score: 24 },
      { id: 5, name: 'Mayukh Roy', address: "Goa", school: "Loretto", subject: "Bengali", score: 89 },
    ];
    return { students };
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(students: Student[]): number {
    return students.length > 0 ? Math.max(...students.map(student => student.id)) + 1 : 11;
  }
}