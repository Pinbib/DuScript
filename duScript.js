const fs = require("fs");
const path = require("path");
const { log } = require("console");
const arg = process.argv;

const mainpath = path.join(__dirname, arg[2]);

if (!/\\$/gm.test(mainpath)) {
    if (/\.du$/gm.test(mainpath)) {
        const file = fs.readFileSync(mainpath, { encoding: "utf-8" });
        let variable = {};
        let comment = [];
        function ifer(lines) {
            let varlist = [];
            function createVar(id, value) {
                variable[id] = value;
            }

            let linelist = lines.split("^");

            for (var i = 0; i < linelist.length; i++) {
                let line = linelist[i].replace(/^\s*/gm, "").split(" ");
                const command = line[0];

                switch (command) {
                    case "approve":
                        if (1 == 1) {
                            const name = line[1];
                            const type = line[3] || line[2];
                            varlist.push(name);
                            if (type == undefined) {
                                createVar(name, type)
                            } else if (type == "Int") {
                                createVar(name, eval(line.slice(4).join(" ").replace(/\D+/g, "")));
                            } else if (type == "String") {
                                createVar(name, line.slice(4).join(" ").replace(/['"]/gm, ""));
                            } else if (type == "Boolean") {
                                if (line[4] == "true") {
                                    createVar(name, true);
                                } else {
                                    createVar(name, false);
                                }
                            } else if (type == "Array") {
                                createVar(name, line.slice(4).join(" ").replace(/[\[\]"']/gm, "").split(","));
                            } else if (type == "Object") {
                                createVar(name, JSON.parse(line.slice(4).join(" ")));
                            } else if (type == "Av") {
                                let a = line.slice(4).join(" ").replace(/\@/gm, "variable.");
                                createVar(name, eval(a.replace(/console.\S+|for.+/gm)));
                            } else if (type == "ViewCondition") {
                                createVar(name, Boolean(eval(line[4].replace(/^\(|\)$/gm, "").replace(/\@/gm, "variable.").replace(/console.\S+|for.+/gm))))
                            } else if (type == "!") {
                                createVar(name, comment[Number(line[4])]);
                            } else {
                                console.error(`str: ${i + 1}\n` + `The data type was not specified or was incorrectly specified`);
                            }
                        }
                        break;
                    case "call":
                        if (1 == 1) {
                            if (line[1] == "variable") {
                                let type = line[2];
                                if (type == "v") {
                                    console.log(variable[line[3]])
                                } else if (type == "Array") {
                                    if (line[4] == undefined) {
                                        console.log(variable[line[3]]);
                                    } else {
                                        console.log(variable[line[3]][line[4]]);
                                    }
                                } else if (type == "Object") {
                                    var o = line[3].split(".");
                                    var newo = [];
                                    for (var c = 0; c < o.length; c++) {
                                        newo.push(`["${o[c]}"]`);
                                    }
                                    console.log(eval(`variable${newo.join("")}`))
                                } else if (type == "@") {
                                    console.log(variable);
                                } else if (type == "!") {
                                    console.log(comment);
                                } else {
                                    console.error(`str: ${i + 1}\n` + `Input type was not specified correctly`);
                                }
                            } else {
                                console.error(`str: ${i + 1}\n` + `Call type was not specified correctly`);
                            }

                        }
                        break;
                    case "printl":
                        if (1 == 1) {
                            let data = line.slice(1).join(" ").replace(/^\(|\)$/gm, "").split(" ");
                            let newdata = [];
                            for (var c = 0; c < data.length; c++) {
                                if (/\@/gm.test(data[c])) {
                                    newdata.push(variable[data[c].replace(/\@/gm, "")])
                                } else if (data[c] == "call") {
                                    newdata.push(data[c]);
                                } else {
                                    newdata.push(data[c]);
                                }
                            }
                            log(newdata.join(" "));
                        }
                        break;
                    case "//":
                        comment.push(line.slice(1).join(" "));
                        break;
                }
            }
            for (var i = 0; i < varlist.length; i++) {
                delete variable[varlist[i]];
            }
        }
        function createVar(id, value) {
            variable[id] = value;
        }

        let linelist = file.split(";");

        for (var i = 0; i < linelist.length; i++) {
            let line = linelist[i].replace(/^\s*/gm, "").split(" ");
            const command = line[0];

            switch (command) {
                case "approve":
                    if (1 == 1) {
                        const name = line[1];
                        const type = line[3] || line[2];
                        if (type == undefined) {
                            createVar(name, type)
                        } else if (type == "Int") {
                            createVar(name, eval(line.slice(4).join(" ").replace(/\D+/g, "")));
                        } else if (type == "String") {
                            createVar(name, line.slice(4).join(" ").replace(/['"]/gm, ""));
                        } else if (type == "Boolean") {
                            if (line[4] == "true") {
                                createVar(name, true);
                            } else {
                                createVar(name, false);
                            }
                        } else if (type == "Array") {
                            createVar(name, line.slice(4).join(" ").replace(/[\[\]"']/gm, "").split(","));
                        } else if (type == "Object") {
                            createVar(name, JSON.parse(line.slice(4).join(" ")));
                        } else if (type == "Av") {
                            let a = line.slice(4).join(" ").replace(/\@/gm, "variable.");
                            createVar(name, eval(a.replace(/console.\S+|for.\S+|while.\S+/gm, "").replace(/\@/gm, "variable.")));
                        } else if (type == "ViewCondition") {
                            createVar(name, Boolean(eval(line[4].replace(/^\(|\)$/gm, "").replace(/\@/gm, "variable.").replace(/console.\S+|for.+/gm))))
                        } else if (type == "!") {
                            createVar(name, comment[Number(line[4])]);
                        } else {
                            console.error(`str: ${i + 1}\n` + `The data type was not specified or was incorrectly specified`);
                        }
                    }
                    break;
                case "call":
                    if (1 == 1) {
                        if (line[1] == "variable") {
                            let type = line[2];
                            if (type == "v") {
                                console.log(variable[line[3]])
                            } else if (type == "Array") {
                                if (line[4] == undefined) {
                                    console.log(variable[line[3]]);
                                } else {
                                    console.log(variable[line[3]][line[4]]);
                                }
                            } else if (type == "Object") {
                                var o = line[3].split(".");
                                var newo = [];
                                for (var c = 0; c < o.length; c++) {
                                    newo.push(`["${o[c]}"]`);
                                }
                                console.log(eval(`variable${newo.join("")}`))
                            } else if (type == "@") {
                                console.log(variable);
                            } else if (type == "!") {
                                console.log(comment);
                            } else {
                                console.error(`str: ${i + 1}\n` + `Input type was not specified correctly`);
                            }
                        } else {
                            console.error(`str: ${i + 1}\n` + `Call type was not specified correctly`);
                        }

                    }
                    break;
                case "printl":
                    if (1 == 1) {
                        let data = line.slice(1).join(" ").replace(/^\(|\)$/gm, "").split(" ");
                        let newdata = [];
                        for (var c = 0; c < data.length; c++) {
                            if (/\@/gm.test(data[c])) {
                                newdata.push(variable[data[c].replace(/\@/gm, "")])
                            } else if (data[c] == "call") {
                                newdata.push(data[c]);
                            } else {
                                newdata.push(data[c]);
                            }
                        }
                        log(newdata.join(" "));
                    }
                    break;
                case "if":
                    var data = line[1].replace(/^\(|\)$/gm, "").replace(/\@/gm, "variable.");
                    if (Boolean(eval(data))) {
                        ifer(line.slice(2).join(" ").replace(/^\{|\}$/gm, ""))
                    }
                    break;
                case "//":
                    comment.push(line.slice(1).join(" "));
                    break;
            }
        }
    } else {
        console.error(`The executable must have a .du permission`);
    }
} else {
    const filelist = fs.readdirSync(mainpath);
};