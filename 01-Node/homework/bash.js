const allCommands = require('./commands/index.js')

const print = (data) => {
    process.stdout.write(data)
}
print('! ');
// El evento stdin 'data' se dispara cuando el user escribe una línea
process.stdin.on('data', function (data) {
    
    let cmd = data.toString().toLowerCase().trim().split(' '); // remueve la nueva línea
    typeof allCommands[cmd[0]] === 'function' ? allCommands[cmd[0]](cmd) : print('Invalid command\n! ');

});
