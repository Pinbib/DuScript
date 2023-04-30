module.exports = (body, mainpath, door, variable, comment, declare, modul, global, tool) => {
    const fs = require("fs");
    const path = require("path")
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
                Elog(`You cannot create a file in a non-existent directory`);
            }
            break;
        case "readFile":
            var p = path.join(mainpath, data[2]).split("\\");
            p = p.join("\\");
            if (fs.existsSync(p)) {
                Variable.set(variable, data[3], fs.readFileSync(p));
            } else {
                Elog(`You cannot create a file in a non-existent directory`);
            }
            break;
        case "writeDir":
            fs.mkdirSync(path.join(mainpath, data[2]), { recursive: true })
            break;
        case "readDir":
            var p = path.join(mainpath, data[2]);
            if (fs.existsSync(p)) {
                var dir = fs.readdirSync(p);
                Variable.set(variable, data[3], dir);
            } else {
                Elog(`Directory does not exist`);
            }
            break;
        default:
            Elog(`Command "${data[1]}" from module fs was not found`)
    }
};