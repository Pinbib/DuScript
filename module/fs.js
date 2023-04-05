const fs = require("fs");
const path = require("path")
module.exports = (body, mainpath, door, variable, comment, declare, tool) => {
    const { Variable } = require(tool);
    var data = body.split(" ");

    switch (data[1]) {
        case "writeFile":
            var p = path.join(mainpath, data[2]).split("\\");
            p.pop();
            p = p.join("\\");
            if (fs.existsSync(p)) {
                fs.writeFileSync(path.join(mainpath, data[2]), data.slice(3).join(" "));
            } else {
                console.error(`You cannot create a file in a non-existent directory`);
            }

    }
};