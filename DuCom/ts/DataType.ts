class DataType {
    DataType: object = {};
    constructor(Door) {
        this.DataType = Door.DataType ?? {};
    }

    add(name: string, line: (line, Com, Door) => Boolean): void;
    add(name: string, line: (line, Com, Door) => Boolean, request: Boolean): void;

    add(name: string, line: (line, Com, Door) => true | false, request?: Boolean): void {
        if (!this.DataType[name]) {
            if (typeof line == "function") {
                if (request) {
                    if (request == true) {
                        this.DataType[name] = {
                            line: line,
                            request: true
                        };
                    } else if (request == false) {
                        this.DataType[name] = {
                            line: line,
                            request: false
                        };
                    }
                } else {
                    this.DataType[name] = {
                        line: line,
                        request: true
                    };
                };
            };
        };
    };

    get(name: string): object {
        let dat = {
            line: NaN,
            request: NaN
        };

        if (this.DataType[name]) {
            dat = this.DataType[name];
        };

        return dat;
    };

    delete(name): void {
        if (this.DataType[name]) delete this.DataType[name];
    };
};

module.exports = DataType;