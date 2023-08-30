module.exports = (line, Com, Door) => {
    let value = {
        type: "undefined",
        value: "void"
    };

    if (line[4]) {
        value = Com.Approve.Get(line[4]);
    };

    return value;
};