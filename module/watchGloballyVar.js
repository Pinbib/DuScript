module.exports = (body, mainpath, door, variable, comment, declare, modul, global, tool) => {
    const { Variable, Formation } = require(tool);
    const Elog = require("console").error;
    var data = body.split(" ");

    if (data[1] == "get") {
        if (data[2] == "all") {
            var varKeys = Object.keys(global.variable);

            for (var i = 0; i < varKeys.length; i++) {
                Variable.set(variable, varKeys[i], global.variable[varKeys[i]]);
            }
        } else {
            Variable.set(variable, data[2], global.variable[data[2]]);
        }
    } else {
        console.error("unknown command");
    }
}
// watchGloballyVar