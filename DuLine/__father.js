const Console = require("../Tool/Console");
const DuCom = require("../DuCom/DuCom");

module.exports = (text = [""], Com, Door, line = 0) => {
    let work = true;
    if (text[0] == "father") {
        if (text[1]) {
            const name = text[1];
            if (text[2]) {
                if (text[2] == "true") {
                    Door.module[name].request = true;
                } else if (text[2] == "false") {
                    Door.module[name].request = false;
                } else if (text[2] == "delete") {
                    delete Door.module[name];
                } else {
                    Console.gerror("Unknown command.", ["From: DuScript interpreter.", "Worker: __father", "?: " + text[2], "Line: " + line]);
                    work = false;
                };
            } else {
                if (Door.module[name]) {
                    Door.module[name].request = !Door.module[name].request;
                } else {
                    Console.gerror("The module was not found.", ["From: DuScript interpreter.", "Worker: __father", "?: " + name, "Line: " + line]);
                    work = false;
                }
            }
        } else {
            Console.gerror("No module name was specified.", ["From: DuScript interpreter.", "Worker: __father", "Line: " + line]);
            work = false;
        }
    } else {
        Console.gerror("A command was executed that was not invoked in the line.", ["From: DuScript interpreter.", "Worker: __father", "?: " + text.join(" "), "Line: " + line]);
        work = false;
    };

    return work;
};