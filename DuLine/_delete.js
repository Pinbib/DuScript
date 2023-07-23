const Console = require("../Tool/Console");
const DuCom = require("../DuCom/DuCom");
const exprEval = require('expr-eval');

module.exports = (text = [""], Com, line = 0) => {
    let work = true;

    if (text[0] == "delete") {
        if (text[1]) {
            if (text[2]) {
                if (text[1] == "func") {
                    Com.Declare.Del(text[3]);
                } else if (text[1] == "var") {
                    Com.Approve.Del(text[3]);
                } else {
                    Console.gerror("Not know type of removal.", ["From: DuScript interpreter.", "Worker: _delete", "?: " + text[1], "Line: " + line]);
                };
            } else {
                Console.gerror("You cannot set a blank value to remove.", ["From: DuScript interpreter.", "Worker: _delete", "Line: " + line]);
            }
        } else {
            Console.gerror("No deletion type was specified.", ["From: DuScript interpreter.", "Worker: _delete", "Line: " + line]);
            work = false;
        }
    } else {
        Console.gerror("A command was executed that was not invoked in the line.", ["From: DuScript interpreter.", "Worker: _delete", "?: " + text.join(" "), "Line: " + line]);
        work = false;
    };

    return work;
};