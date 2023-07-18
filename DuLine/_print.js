const Console = require("../Tool/Console");
const DuCom = require("../DuCom/DuCom");

module.exports = (text = [""], Com, line = 0) => {
    let work = true;

    if (text[0] == "print") {
        if (text[1]) {
            let txt = Com.Approve.Transform(text.slice(1).join(" "));
            if (/\\\-red/gm.test(txt)) {
                txt = txt.replace(/\\\-red/gm, "");
                Console.error(txt);
            } else if (/\\\-yellow/gm.test(txt)) {
                txt = txt.replace(/\\\-yellow/gm, "");
                Console.info(txt);
            } else if (/\\\-green/gm.test(txt)) {
                txt = txt.replace(/\\\-green/gm, "");
                Console.confirm(txt);
            } else if (/\\\-norm/gm.test(txt)) {
                txt = txt.replace(/\\\-norm/gm, "");
                Console.log(txt);
            } else {
                console.log(txt);
            };
        };
    } else {
        Console.gerror("A command was executed that was not invoked in the line.", ["From: DuScript interpreter.", "Worker: _print", "?: " + text.join(" "), "Line: " + line]);
        work = false;
    };

    return work;
};