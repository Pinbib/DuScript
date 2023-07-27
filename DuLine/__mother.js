const Console = require("../Tool/Console");
const DuCom = require("../DuCom/DuCom");

module.exports = (text = [""], Com, Door, line = 0) => {
    let work = true;
    if (text[0] == "mother") {
        if (text[1]) {
            const name = text[1];
            if (text[2]) {
                if (text[2] == "true") {
                    Door.dataType[name].request = true;
                } else if (text[2] == "false") {
                    Door.dataType[name].request = false;
                } else if (text[2] == "delete") {
                    delete Door.dataType[name];
                } else {
                    Console.gerror("Unknown command.", ["From: DuScript interpreter.", "Worker: __mother", "?: " + text[2], "Line: " + line]);
                    work = false;
                };
            } else {
                if (Door.dataType[name]) {
                    Door.dataType[name].request = !Door.dataType[name].request;
                } else {
                    Console.gerror("The mother was not found.", ["From: DuScript interpreter.", "Worker: __mother", "?: " + name, "Line: " + line]);
                    work = false;
                }
            }
        } else {
            Console.gerror("No dataType name was specified.", ["From: DuScript interpreter.", "Worker: __mother", "Line: " + line]);
            work = false;
        }
    } else {
        Console.gerror("A command was executed that was not invoked in the line.", ["From: DuScript interpreter.", "Worker: __mother", "?: " + text.join(" "), "Line: " + line]);
        work = false;
    };

    return work;
};