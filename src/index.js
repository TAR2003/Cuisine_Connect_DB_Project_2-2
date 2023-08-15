const getDataButton = document.getElementById('getData');
const getDataButton2 = document.getElementById('g1');
const outputDiv = document.getElementById('output');
const outputDiv2 = document.getElementById('output2');
const insertbutton = document.getElementById('insert')

let b1 = true;
let b2 = true;
let a1 = 1;

// let s = {
//   name: 'user',
//   id: 101
// };

insertbutton.addEventListener('click', async () => {

  try {
    const response = await fetch(`http://localhost:3001/api/insert`);
    const data = await response.json();
    outputDiv.textContent = data + "   lll";
    console.log(data[0][4]);
  } catch (error) {
    console.error('Error:', error);
  }

});


getDataButton.addEventListener('click', async () => {

  try {

    let s1 = {
      name: 'hello use,,,, s ',
      id: 109,
    }
    const response = await fetch('http://localhost:3001/api/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(s1),
    });
    const data = await response.json();
    outputDiv.textContent = data + "   lll";
    console.log(data[0][4]);
  } catch (error) {
    console.error('Error:', error);
  }



});

getDataButton2.addEventListener('click', async () => {
  try {
    let s = {
      name: 'first name',
      id: 109
    };
    const response = await fetch('http://localhost:3001/api/data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(s),
    });
    const data = await response.json();
    outputDiv2.textContent = data;
    console.log(data);
  } catch (error) {
    console.error('Error:', error);
  }
});



