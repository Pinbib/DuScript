module.exports = (body, mainpath, door, variable, comment, declare, modul, global, tool) => {
    const { Variable, Formation } = require(tool);
    var data = body.split(" ");

    let name = data[1];
    let newdata = data.slice(4).join(" ");
    const pattern = /@(\w+)/g;
    const result = newdata.replace(pattern, (_, variableName) => variable[variableName]);

    let re = {};

    if (/^\[|\]$/gm.test(result)) {
        var end = JSON.parse(result);
        for (var i = 0; i < end.length; i++) {
            Variable.set(variable, name + i, end[i]);
            re[name + i] = end[i];
        }
    } else {
        console.error(`${name}: When creating a variable of type List, the value must be wrapped in [].\n       Sample: [${result}]`)
    }

    return re;
}