var Module = /** @class */ (function () {
    function Module(Door) {
        var _a;
        this.module = {};
        this.module = (_a = Door.module) !== null && _a !== void 0 ? _a : {};
    }
    Module.prototype.add = function (name, line, request) {
        if (!this.module[name]) {
            if (typeof line == "function") {
                if (request) {
                    if (request == true) {
                        this.module[name] = {
                            line: line,
                            request: true
                        };
                    }
                    else if (request == false) {
                        this.module[name] = {
                            line: line,
                            request: false
                        };
                    }
                }
                else {
                    this.module[name] = {
                        line: line,
                        request: true
                    };
                }
                ;
            }
            ;
        }
        ;
    };
    ;
    Module.prototype.get = function (name) {
        var mod = {
            line: NaN,
            request: NaN
        };
        if (this.module[name]) {
            mod = this.module[name];
        }
        ;
        return mod;
    };
    ;
    Module.prototype.delete = function (name) {
        if (this.module[name])
            delete this.module[name];
    };
    ;
    return Module;
}());
;
module.exports = Module;
