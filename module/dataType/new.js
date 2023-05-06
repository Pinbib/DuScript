module.exports = (body, mainpath, door, variable, comment, declare, modul, global, tool) => {
    const { Variable, Formation } = require(tool);
    const Elog = require("console").error;
    var data = body.split(" ");

    let newname = data[4];

    if (typeof global[newname] !== "undefined") {
        if (typeof global[newname].new !== "undefined") {
            if (typeof global[newname].new == "function") {
                return global[newname].new(data.slice(5).join(" "))
            } else {
                Elog(`${newname}.new: is not a function`)
            }
        } else {
            Elog(newname + `: not intended for modular type "new"`)
        }
    } else {
        Elog(newname + `: unregistered global name`)
    }
}
// new