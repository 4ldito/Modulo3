function* getId() {
    let id = 0;
    for (let i = 0; i < Infinity; i++) {
        id++;
        yield id
        if (id === 14) return id;
    }
}

const usersId = getId();

console.log(usersId.next());
console.log(usersId.next());
console.log(usersId.next());
console.log(usersId.next());
console.log(usersId.next());
console.log(usersId.next());
console.log(usersId.next());
console.log(usersId.next());
console.log(usersId.next());
console.log(usersId.next());
console.log(usersId.next());
console.log(usersId.next());
console.log(usersId.next());
console.log(usersId.next());
console.log(usersId.next()); 
console.log(usersId.next()); 
console.log(usersId.next()); 
console.log(usersId.next()); 
console.log(usersId.next()); 
console.log(usersId.next()); 

function* getIdAsync() {
    let id = 0;
    for (let i = 0; i < Infinity; i++) {
        id++;
        yield id
        if (id === 14) return id;
    }
}


for (let i = 0; i < Infinity; i++) {
    const element = array[i];
    
}