module.exports = (body, mainpath, door, variable, comment, declare, modul, global, tool) => {
    const request = require("sync-request");
    const Elog = require("console").error;
    const { Variable } = require(tool);
    var data = body.split(" ");

    switch (data[1]) {
        case "GET":
            Variable.set(variable, data[2], request("GET", data.slice(3).join(" ")).getBody("utf8"));
        default:
            Elog(`Command "${data[1]}" from module request was not found`)
    }
}
// request 