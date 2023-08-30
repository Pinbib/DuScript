class Module {
    module: object = {};
    constructor(Door) {
        this.module = Door.module ?? {};
    }

    add(name: string, line: (line, src, Com, Door) => Boolean): void;
    add(name: string, line: (line, src, Com, Door) => Boolean, request: Boolean): void;

    add(name: string, line: (line, src, Com, Door) => true | false, request?: Boolean): void {
        if (!this.module[name]) {
            if (typeof line == "function") {
                if (request) {
                    if (request == true) {
                        this.module[name] = {
                            line: line,
                            request: true
                        };
                    } else if (request == false) {
                        this.module[name] = {
                            line: line,
                            request: false
                        };
                    }
                } else {
                    this.module[name] = {
                        line: line,
                        request: true
                    };
                };
            };
        };
    };

    get(name: string): object {
        let mod = {
            line: NaN,
            request: NaN
        };

        if (this.module[name]) {
            mod = this.module[name];
        };

        return mod;
    };

    delete(name): void {
        if (this.module[name]) delete this.module[name];
    };
};

module.exports = Module;