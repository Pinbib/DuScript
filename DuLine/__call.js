const Console = require("../Tool/Console");
const DuCom = require("../DuCom/DuCom");

module.exports = (text = [""], Com, Door, line = 0) => {
    let work = true;

    if (text[0] == "call") {
        if (text[1]) {
            const type = text[1];
            if (text[2]) {
                switch (type) {
                    case "func":
                        try {
                            Com.Approve.Set({ name: "!", type: "Object", value: Com.Approve.Transform(text.slice(3).join(" ")) });
                            Com.Declare.Get(text[2], true, Door);
                            Com.Approve.Del("!")
                        } catch (err) { }
                        break;
                    case "var":
                        console.log(Com.Approve.tu(Com.Approve.Get(text[2])).value);
                        break;
                    default:
                        Console.gerror("Unknown call type.", ["From: DuScript interpreter.", "Worker: __call", "?: " + type, "Line: " + line]);
                };
            } else {
                Console.gerror("You cannot leave the call value empty.", ["From: DuScript interpreter.", "Worker: __call", "Line: " + line]);
            };
        } else {
            Console.gerror("No call type was set.", ["From: DuScript interpreter.", "Worker: __call", "Line: " + line]);
            work = false;
        };
    } else {
        Console.gerror("A command was executed that was not invoked in the line.", ["From: DuScript interpreter.", "Worker: __call", "?: " + text.join(" "), "Line: " + line]);
        work = false;
    };

    return work;
};