class Variable {
    static get(variable, id) {
        return variable[id];
    }
    static set(variable, id, value) {
        variable[id] = value;
    }
    static delete(variable, id) {
        if (typeof variable[id] !== undefined) {
            delete variable[id];
        } else {
            Elog(`Variable "${id}" does not exist`)
        }
    }
}

class Formation {
    static var(variable, text) {
        let newtext = text.split(" ");
        var end = [];
        for (var i = 0; i < newtext.length; i++) {
            if (/^\@/gm.test(newtext[i])) {
                end.push(variable[newtext[i].replace(/^\@/gm, "")]);
            } else if (newtext[i] == "") {

            } else {
                end.push(newtext[i]);
            };
        };
        return end.join(" ");
    };
    static com(comment, text) {
        let newtext = text.split(" ");
        var end = [];
        for (var i = 0; i < newtext.length; i++) {
            if (/^\!/gm.test(newtext[i])) {
                if (/^[0-9]/gm.test(newtext[i + 1])) {
                    end.push(comment[newtext[i + 1]]);
                    newtext[i + 1] = "";
                } else {
                    Elog(`After the sign "!" a number must go as this is a reference to the global comment which is an array.`);
                }
            } else if (newtext[i] == "") { } else {
                end.push(newtext[i]);
            };
        };
        return end.join(" ");
    };
};

class Module {
    constructor(name = "", main = (body, mainpath, door, variable, comment, declare, modul, global, tool) => { }, request) {
        this.name = name;
        this.main = main;
        this.request = request;
    }
    get Name() {
        return this.name;
    }
    set Name(value) {
        return value;
    }
    get Main() {
        return this.main;
    }
    set Main(value) {
        return value;
    }
    get Request() {
        return this.request;
    }
    set Request(value) {
        return value;
    }
    add(modul) {
        if (this.request !== undefined) {
            modul[this.name] = { main: this.Main, request: this.request }
        } else {
            modul[this.name] = { main: this.Main, request: true }
        }
    }
}

module.exports = { Variable, Formation, Module };