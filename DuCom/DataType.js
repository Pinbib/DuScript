var DataType = /** @class */ (function () {
    function DataType(Door) {
        var _a;
        this.DataType = {};
        this.DataType = (_a = Door.DataType) !== null && _a !== void 0 ? _a : {};
    }
    DataType.prototype.add = function (name, line, request) {
        if (!this.DataType[name]) {
            if (typeof line == "function") {
                if (request) {
                    if (request == true) {
                        this.DataType[name] = {
                            line: line,
                            request: true
                        };
                    }
                    else if (request == false) {
                        this.DataType[name] = {
                            line: line,
                            request: false
                        };
                    }
                }
                else {
                    this.DataType[name] = {
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
    DataType.prototype.get = function (name) {
        var dat = {
            line: NaN,
            request: NaN
        };
        if (this.DataType[name]) {
            dat = this.DataType[name];
        }
        ;
        return dat;
    };
    ;
    DataType.prototype.delete = function (name) {
        if (this.DataType[name])
            delete this.DataType[name];
    };
    ;
    return DataType;
}());
;
module.exports = DataType;
