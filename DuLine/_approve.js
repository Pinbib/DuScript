const Console = require("../Tool/Console");
const DuCom = require("../DuCom/DuCom");
const math = require("mathjs");

module.exports = (text = [""], Com, line = 0) => {
    let work = true;
    if (text[0] == "approve") {
        if (text[1]) {
            let name = text[1];
            if (text[2]) {
                if (text[2] == "=") {
                    if (text[3]) {
                        if (text[3] == "String") {
                            if (text[4]) {
                                Com.Approve.Set({ name: name, type: "String", value: Com.Approve.Transform(text.slice(4).join(" ")) });
                            } else {
                                Com.Approve.Set({ name: name, type: "String", value: "null" });
                            };
                        } else if (text[3] == "Int") {
                            if (text[4]) {
                                try {
                                    Com.Approve.Set({ name: name, type: "Int", value: math.evaluate(Com.Approve.Transform(text.slice(4).join(" "))) });
                                } catch (err) {
                                    if (err) {
                                        Console.gerror("Unknown error while creating a variable of type Int.", ["From: DuScript interpreter.", "Worker: _approve", "Line: " + line]);
                                        work = false;
                                    };
                                };
                            } else {
                                Com.Approve.Set({ name: name, type: "Int", value: "null" });
                            };
                        } else if (text[3] == "Bool") {
                            if (text[4]) {
                                if (text[4] == "true") {
                                    Com.Approve.Set({ name: name, type: "Bool", value: "true" });
                                } else if (text[4] == "false") {
                                    Com.Approve.Set({ name: name, type: "Bool", value: "false" });
                                } else {
                                    Console.gerror("The value of a variable with type Bool is not allowed.", ["From: DuScript interpreter.", "Worker: _approve", "?: " + text[4], "Line: " + line]);
                                };
                            } else {
                                Com.Approve.Set({ name: name, type: "Bool", value: "null" });
                            };
                        } else if (text[3] == "Array") {
                            if (text[4]) {
                                try {
                                    let arr = JSON.parse(Com.Approve.Transform(text.slice(4).join(" ")));

                                    if (Array.isArray(arr)) {
                                        Com.Approve.Set({ name: name, type: "Array", value: Com.Approve.Transform(text.slice(4).join(" ")) });
                                    } else {
                                        throw new Error();
                                    };
                                } catch (err) {
                                    Console.gerror("Unknown error while creating a variable of type Array.", ["From: DuScript interpreter.", "Worker: _approve", "Line: " + line]);
                                    work = false;
                                };
                            } else {
                                Com.Approve.Set({ name: name, type: "Array", value: "null" });
                            };
                        } else if (text[3] == "Object") {
                            if (text[4]) {
                                try {
                                    let obj = JSON.parse(Com.Approve.Transform(text.slice(4).join(" ")));
                                    Com.Approve.Set({ name: name, type: "Object", value: JSON.stringify(obj) });
                                } catch (err) {
                                    Console.gerror("Unknown error while creating a variable of type Object.", ["From: DuScript interpreter.", "Worker: _approve", "Line: " + line]);
                                    work = false;
                                };
                            } else {
                                Com.Approve.Set({ name: name, type: "Object", value: "null" });
                            };
                        } else {
                            Console.gerror("The type of the variable is not known.", ["From: DuScript interpreter.", "Worker: _approve", "?: " + text[3], "Line: " + line]);
                            work = false;
                        };
                    } else {
                        Console.gerror("The variable type was not set.", ["From: DuScript interpreter.", "Worker: _approve", "Line: " + line]);
                        work = false;
                    };
                } else {
                    Console.gerror("The sign of setting the value of the variable is not known.", ["From: DuScript interpreter.", "Worker: _approve", "?: " + text[2], "Line: " + line]);
                    work = false;
                };
            } else {
                Com.Approve.Set({ name: name, type: "undefined", value: "null" });
            };
        } else {
            Console.gerror("No variable name was specified.", ["From: DuScript interpreter.", "Worker: _approve", "Line: " + line]);
            work = false;
        };
    } else {
        Console.gerror("A command was executed that was not invoked in the line.", ["From: DuScript interpreter.", "Worker: _approve", "?: " + text.join(" "), "Line: " + line]);
        work = false;
    };

    return work;
};