/* const person = {
    name:'aaron',
    age: 21,
    location: {
    city: 'Burlington',
    temp: 55
    }
};

const {name, age} = person;

console.log(`${name} is ${age}`);

const { temp , city } = person.location
if (temp && city) {
    console.log(`its ${temp} in ${city}. `);
} */

const address = ['4033 NewStreet' ,  'Burlington' , 'Ontario' , 'l2l 4b1'];

const [ , city, province ] = address;


const item = ['Coffee(hot)' , '2.00' , '2.50' , '3.00'];

const [type , ,price] = item;
console.log(`a medium ${type} costs ${price}`);

