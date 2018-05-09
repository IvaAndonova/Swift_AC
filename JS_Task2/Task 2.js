var names = ['Iva', 'Nikoleta', 'Krasi', 'Gancho', 'Ivan', 'Harry Potter', 'John', 'Gosho', 'Niki', 'Ivo'];
var oddNames = [];
var evenNames = [];

for (let index = 0; index < names.length; index++) {
    const name = names[index];

    if (index % 2 == 0) {
        oddNames.push(name);
    }
    else{
        evenNames.push(name);
    }
}

console.log('The names on even positions are: ' + evenNames);
console.log('The names on odd positions are: ' + oddNames);



