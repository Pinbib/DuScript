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
            console.error(`Variable "${id}" does not exist`)
        }
    }
}

module.exports = { Variable };