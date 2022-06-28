const fs = require('fs');
const request = require('request');

const done = () => {
    print('\n! ');
}

const print = (data) => {
    process.stdout.write(data)
}

const pwd = () => {
    print(require.main.path);
    done();
}

const date = () => {
    print(Date());
    done();
}

const ls = () => {
    fs.readdir('.', (err, files) => {
        if (err) throw err;
        files.forEach((file) => {
            print(file.toString() + "\n");
        });
        done();
    });
}

const echo = (data) => {
    data.shift(); // elimino la palabra echo
    data.forEach(word => {
        print(word.toString() + ' ');
    });
    done();
}

const cat = (data) => {
    fs.readFile(data[1], 'utf-8', (err, text) => {
        if (err) {
            print(err.toString());
            done();
            return;
        }
        print(text);
        done();
    });
}

const head = (data) => {
    fs.readFile(data[1], 'utf-8', (err, text) => {
        if (err) {
            print(err.toString());
            done();
            return;
        }
        text = text.split(/\r\n|\r|\n/, -1);
        for (let i = 0; i <= 10; i++) {
            const line = text[i].toString();
            print(line + "\n");
        }
        done();
    });

}

const tail = (data) => {
    fs.readFile(data[1], 'utf-8', (err, text) => {
        if (err) {
            print(err.toString());
            done();
            return;
        }
        text = text.split(/\r\n|\r|\n/, -1);
        for (let i = text.length - 1; i >= text.length - 10; i--) {
            const line = text[i].toString();
            print(line + "\n");
        }
        done();
    });
}

const curl = (info) => {
    if (info.length <= 1) {
        print('Error: Write an URI');
        done();
        return;
    }
    request(info[1], (err, data) => {
        if (err) {
            print(err.toString());
            done();
            return;
        }
        print(data.body)
        done();
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