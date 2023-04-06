const request = require("sync-request");

module.exports = (body, mainpath, door, variable, comment, declare, tool) => {
    const { Variable } = require(tool);
    var data = body.split(" ");

    switch (data[1]) {
        case "GET":
            Variable.set(variable, data[2], request("GET", data.slice(3).join(" ")).getBody("utf8"));
        default:
            console.error(`Command "${data[1]}" from module request was not found`)
    }
}