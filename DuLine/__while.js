const Console = require("../Tool/Console");
const DuCom = require("../DuCom/DuCom");
const exprEval = require('expr-eval');

module.exports = (text = [""], Com, Door, line = 0) => {
    let work = true;

    if (text[0] == "while") {
        if (text[1]) {
            let end = text.indexOf("::");
            if (end > -1) {
                let exp = text.slice(1, end).join(" ");
                try {
                    while (exprEval.Parser.evaluate(Com.Approve.Transform(exp))) {
                        try {
                            require("../interpreter").door(text.slice(end + 1).join(" "), "Worker: __if", Door, "&");
                        } catch (err) {
                            if (err) {
                                work = false;
                                throw new Error(err);
                            };
                        };
                    };
                } catch (err) {
                    if (err) {
                        Console.gerror("An unknown error in a logical expression.", ["From: DuScript interpreter.", "Worker: __while", "Line: " + line]);
                        work = false;
                    };
                };
            } else {
                Console.gerror("The logical expression must end with the \"::\" command.", ["From: DuScript interpreter.", "Worker: __while", "Line: " + line]);
                work = false;
            };
        } else {
            Console.gerror("A logical expression cannot be empty.", ["From: DuScript interpreter.", "Worker: __while", "Line: " + line]);
            work = false;
        };
    } else {
        Console.gerror("A command was executed that was not invoked in the line.", ["From: DuScript interpreter.", "Worker: __while", "?: " + text.join(" "), "Line: " + line]);
        work = false;
    };

    return work;
};