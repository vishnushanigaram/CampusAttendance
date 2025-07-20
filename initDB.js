// initDB.js
const Database = require('better-sqlite3');
const db = new Database('./campus.db', { verbose: console.log });

// Create the "students" table if it doesn't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS students (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    studentId TEXT UNIQUE,
    name TEXT,
    class TEXT,
    gateEntry BOOLEAN,
    attendance BOOLEAN
  );
`);

// Insert sample data for 3 classes (ClassA, ClassB, ClassC)
const insert = db.prepare(`
  INSERT OR IGNORE INTO students (studentId, name, class, gateEntry, attendance) 
  VALUES (?, ?, ?, ?, ?)
`);

const sampleStudents = [
  // Class A students
  ['B001', 'Ramu', 'ClassA', 1, 0],
  ['B002', 'pavi', 'ClassA', 0, 0],
  ['B003', 'Nani', 'ClassA', 1, 0],
  // Class B students
  ['B004', 'Nari', 'ClassB', 1, 0],
  ['B005', 'Avi', 'ClassB', 0, 0],
  ['B006', 'Prani', 'ClassB', 1, 0],
  // Class C students
  ['B007', 'Bunny', 'ClassC', 0, 0],
  ['B008', 'Chinni', 'ClassC', 1, 0],
  ['B009', 'Ricky', 'ClassC', 1, 0],
];

sampleStudents.forEach(student => {
  insert.run(...student);
});

console.log('Database initialized.');
db.close();
