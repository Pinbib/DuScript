const Console = require("../Tool/Console");
const DuCom = require("../DuCom/DuCom");
const { bellNumbers } = require("mathjs");

module.exports = (text = [""], Com, line = 0) => {
    let work = true;

    if (text[0] == "declare") {
        if (text[1]) {
            const type = text[1];
            if (text[2]) {
                const name = text[2];
                if (text[3]) {
                    const value = text.slice(3).join(" ");

                    switch (type) {
                        case "function":
                            Com.Declare.Set({ name: name, value: value });
                            break;
                        case "variable":
                            break;
                        default:
                            Console.gerror("Unknown declaration type.", ["From: DuScript interpreter.", "Worker: _declare", "?: " + type, "Line: " + line]);
                            work = false;
                            break;
                    };
                } else {
                    Console.gerror("You cannot declare void.", ["From: DuScript interpreter.", "Worker: _declare", "Line: " + line]);
                    work = false;
                };
            } else {
                Console.gerror("The name of the declaration was not set.", ["From: DuScript interpreter.", "Worker: _declare", "Line: " + line]);
                work = false;
            };
        } else {
            Console.gerror("The declaration type was not set.", ["From: DuScript interpreter.", "Worker: _declare", "Line: " + line]);
            work = false;
        };
    } else {
        Console.gerror("A command was executed that was not invoked in the line.", ["From: DuScript interpreter.", "Worker: _declare", "?: " + text.join(" "), "Line: " + line]);
        work = false;
    };

    return work;
};