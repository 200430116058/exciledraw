import React from 'react';

const jsonData = [
  { id: 1, name: '', age: 28, city: 'New York' },
  { id: 2, name: 'Jane Smith', age: 34, city: 'Los Angeles' },
  { id: 3, name: 'Bob Johnson', age: 45, city: 'Chicago' }
];



export default function Index() {

    const CheckEmpty = ()=>{
        const FilterdArray = ()=>{

        }
    }
  return (
    <div>

    <button>Trigger</button>
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>City</th>
          </tr>
        </thead>
        <tbody>
          {jsonData.map((person) => (
            <tr key={person.id}>
              <td>{person.id}</td>
              <td>{person.name}</td>
              <td>{person.age}</td>
              <td>{person.city}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
