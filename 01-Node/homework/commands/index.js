const fs = require('fs');
const request = require('request');

const done = () => {
    process.stdout.write('\n! ');
}

const print = (data) => {
    process.stdout.write(data);
    done();
}

const pwd = () => {
    print(require.main.path);
}

const date = () => {
    print(Date());
}

const ls = () => {
    fs.readdir('.', (err, files) => {
        if (err) throw err;
        let text = ""
        files.forEach((file) => {
            text = text + file.toString() + "\t"

        });
        print(text);
    });
}

const echo = (data) => {
    data.shift(); // elimino la palabra echo
    print(data.join(" "));
}

const cat = (data) => {
    fs.readFile(data[1], 'utf-8', (err, text) => {
        if (err) {
            print(err.toString());
            return;
        }
        print(text);

    });
}

const head = (data) => {
    fs.readFile(data[1], 'utf-8', (err, text) => {
        if (err) {
            print(err.toString());
            return;
        }
        const linesToRead = Math.abs(data[2]) || 10
        text = text.split(/\r\n|\r|\n/, -1).splice(0, linesToRead); // como el text viene en un string, lo separamos en un array por cada salto de linea. Despues, cortamos el array desde 0 hasta las lineas que haya que leer
        let textToRead = text.reduce((t, line) => t + line + "\n"); // guardamos todas las lineas de texto en un string
        print(textToRead);
    });

}

const tail = (data) => {
    fs.readFile(data[1], 'utf-8', (err, text) => {
        if (err) {
            print(err.toString());

            return;
        }
        
        const linesToRead = Math.abs(data[2]) || 10
        text = text.split(/\r\n|\r|\n/, -1).splice(-linesToRead); // como el text viene en un string, lo separamos en un array por cada salto de linea. Despues, cortamos el array desde 0 hasta las lineas que haya que leer
        let textToRead = text.reduce((t, line) => t + line + "\n"); // guardamos todas las lineas de texto en un string
        print(textToRead);
    });
}

const curl = (info) => {
    if (info.length <= 1) {
        print('Error: Write an URI');

        return;
    }
    request(info[1], (err, data) => {
        if (err) {
            print(err.toString());

            return;
        }
        print(data.body)

    });
}


module.exports = {
    pwd,
    date,
    ls,
    echo,
    cat,
    tail,
    head,
    curl
}