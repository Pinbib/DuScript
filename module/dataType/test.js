module.exports = (body, mainpath, door, variable, comment, declare, tool) => {
    const fs = require("fs");
    const path = require("path")
    const { Variable } = require(tool);
    var data = body.split(" ");

    console.log(data)

    return true;
}