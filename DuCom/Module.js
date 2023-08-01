class Module {
    constructor(Door) {
        this.module = Door.module;
    };

    add(name = "", line = (line, src, Com, Door) => { return true || false }, request = true) {
        try {
            if (!this.module[name]) {
                if (typeof line == "function") {
                    if (request == undefined) {
                        this.module[name] = { line: line, request: true };
                    } else {
                        if (request) this.module[name] = { line: line, request: true }; else if (!request) this.module[name] = { line: line, request: false }; else throw new Error().msg = "Unknown error.";
                    }
                } else throw new Error().msg = "Argument \"line\" must be a function.";
            } else throw new Error().msg = "The module is already there.";
        } catch (err) {
            if (err) { console.error("Error!\n     From: class Module\n    ?: " + err.msg); return false; } else return true;
        };
    };

    del(name = "") {
        if (this.module[name]) delete this.module[name];
    };

    get(name = "") {
        return this.module[name];
    }
};

module.exports = Module;