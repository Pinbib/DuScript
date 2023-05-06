const fs = require("fs");
const path = require("path");
const prompt = require('async-prompt');
const { log, Console } = require("console");
const Elog = require("console").error;
const arg = process.argv;

const mainpath = path.join(arg[2]);

if (!/\\$/gm.test(mainpath)) {
    if (/\.du$/gm.test(mainpath)) {
        const file = fs.readFileSync(mainpath, { encoding: "utf-8" });
        let variable = {};
        let declare = {};
        let comment = [];
        /*


            IFER


        */
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
                                Elog(`str: ${i + 1}\n` + `The data type was not specified or was incorrectly specified`);
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
                                    Elog(`str: ${i + 1}\n` + `Input type was not specified correctly`);
                                }
                            } else {
                                Elog(`str: ${i + 1}\n` + `Call type was not specified correctly`);
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
                    case "":
                        break;
                    default:
                        Elog(line[0] + `: Not registered command`);
                        break;
                }
            }
            for (var i = 0; i < varlist.length; i++) {
                delete variable[varlist[i]];
            }
        }
        /*


        WHILER


        */
        function whiler(lines) {
            let varlist = [];
            function createVar(id, value) {
                variable[id] = value;
            }

            let linelist = lines.split("&^");

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
                                Elog(`str: ${i + 1}\n` + `The data type was not specified or was incorrectly specified`);
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
                                    Elog(`str: ${i + 1}\n` + `Input type was not specified correctly`);
                                }
                            } else {
                                Elog(`str: ${i + 1}\n` + `Call type was not specified correctly`);
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
                    case "":
                        break;
                    default:
                        Elog(line[0] + `: Not registered command`);
                        break;
                }
            }
            for (var i = 0; i < varlist.length; i++) {
                delete variable[varlist[i]];
            }
        }
        /*


        CALLFUNC


        */
        function callFunc(id) {
            let lines = declare[id].body;
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
                                    Elog(`str: ${i + 1}\n` + `The data type was not specified or was incorrectly specified`);
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
                                        Elog(`str: ${i + 1}\n` + `Input type was not specified correctly`);
                                    }
                                } else {
                                    Elog(`str: ${i + 1}\n` + `Call type was not specified correctly`);
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
                        case "":
                            break;
                        default:
                            Elog(line[0] + `: Not registered command`);
                            break;
                    }
                }
                for (var i = 0; i < varlist.length; i++) {
                    delete variable[varlist[i]];
                }
            }
            /*
    
    
            WHILER
    
    
            */
            function whiler(lines) {
                let varlist = [];
                function createVar(id, value) {
                    variable[id] = value;
                }

                let linelist = lines.split("&^");

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
                                    Elog(`str: ${i + 1}\n` + `The data type was not specified or was incorrectly specified`);
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
                                        Elog(`str: ${i + 1}\n` + `Input type was not specified correctly`);
                                    }
                                } else {
                                    Elog(`str: ${i + 1}\n` + `Call type was not specified correctly`);
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
                        case "":
                            break;
                        default:
                            Elog(line[0] + `: Not registered command`);
                            break;
                    }
                }
                for (var i = 0; i < varlist.length; i++) {
                    delete variable[varlist[i]];
                }
            }
            /*
    
    
            MAIN
    
    
            */
            function createVar(id, value) {
                variable[id] = value;
            }

            let linelist = lines.split("*^");

            for (var i = 0; i < linelist.length; i++) {
                let line = linelist[i].replace(/^\s*/gm, "").split(" ");
                const command = line[0];
                let varlist = [];
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
                                createVar(name, eval(a.replace(/console.\S+|for.\S+|while.\S+/gm, "").replace(/\@/gm, "variable.")));
                            } else if (type == "ViewCondition") {
                                createVar(name, Boolean(eval(line[4].replace(/^\(|\)$/gm, "").replace(/\@/gm, "variable.").replace(/console.\S+|for.+/gm))))
                            } else if (type == "!") {
                                createVar(name, comment[Number(line[4])]);
                            } else {
                                Elog(`str: ${i + 1}\n` + `The data type was not specified or was incorrectly specified`);
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
                                    Elog(`str: ${i + 1}\n` + `Input type was not specified correctly`);
                                }
                            } else {
                                Elog(`str: ${i + 1}\n` + `Call type was not specified correctly`);
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
                        if (1 == 1) {
                            var data = line[1].replace(/^\(|\)$/gm, "").replace(/\@/gm, "variable.");
                            if (Boolean(eval(data))) {
                                ifer(line.slice(2).join(" ").replace(/^\{|\}$/gm, ""))
                            }
                        }
                        break;
                    case "while":
                        if (1 == 1) {
                            var data = line[1].replace(/^\(|\)$/gm, "").replace(/\@/gm, "variable.");
                            while (Boolean(eval(data))) {
                                whiler(line.slice(2).join(" ").replace(/^\{|\}$/gm, ""));
                            }
                        }
                        break;
                    case "//":
                        comment.push(line.slice(1).join(" "));
                        break;
                    case "":
                        break;
                    default:
                        Elog(line[0] + `: Not registered command`);
                        break;
                }
                for (var i = 0; i < varlist.length; i++) {
                    delete variable[varlist[i]];
                }
            }
        }
        /*


        MAIN


        */
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
                            Elog(`str: ${i + 1}\n` + `The data type was not specified or was incorrectly specified`);
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
                                Elog(`str: ${i + 1}\n` + `Input type was not specified correctly`);
                            }
                        } else if ("function") {
                            callFunc(line[2]);
                        } else {
                            Elog(`str: ${i + 1}\n` + `Call type was not specified correctly`);
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
                    if (1 == 1) {
                        var data = line[1].replace(/^\(|\)$/gm, "").replace(/\@/gm, "variable.");
                        if (Boolean(eval(data))) {
                            ifer(line.slice(2).join(" ").replace(/^\{|\}$/gm, ""))
                        }
                    }
                    break;
                case "while":
                    if (1 == 1) {
                        var data = line[1].replace(/^\(|\)$/gm, "").replace(/\@/gm, "variable.");
                        while (Boolean(eval(data))) {
                            whiler(line.slice(2).join(" ").replace(/^\{|\}$/gm, ""));
                        }
                    }
                    break;
                case "declare":
                    if (1 == 1) {
                        if (line[1] == "function") {
                            var name = line[2];
                            let body = line.slice(4).join(" ").replace(/^\{|\}$/gm, "");
                            declare[name] = {
                                body: body
                            };
                        }
                    }
                    break;
                case "//":
                    comment.push(line.slice(1).join(" "));
                    break;
                case "":
                    break;
                default:
                    Elog(line[0] + `: Not registered command`);
                    break;
            }
        }

    } else {
        Elog(`The executable must have a .du permission`);
    }
} else {
    /*


    DOOR.JSON


    */
    const filelist = fs.readdirSync(mainpath);
    var hasDoor = filelist.filter((value) => {
        if (value == "Door.json") {
            return true;
        } else {
            return false;
        }
    });

    if (hasDoor[0] != undefined) {
        const door = require(path.join(mainpath, "/Door.json"));
        let variable = {};
        let declare = {};
        let comment = [];
        let module = {};
        let brother = {};
        let sister = {};
        let family = {};
        let m_declare = {};
        let data_type = {};
        let global = {};

        if (typeof door.module !== "undefined") {
            for (var v = 0; v < door.module.length; v++) {
                if (/^#/gm.test(door.module[v].from)) {
                    let a = path.join(__dirname, "module", door.module[v].from.replace(/^#/gm, "") + ".js");
                    module[door.module[v].name] = { main: require(a), request: false };
                } else {
                    module[door.module[v].name] = { main: require(path.join(mainpath, door.module[v].from)), request: false };
                }
            };
        };
        if (typeof door.dataType !== "undefined") {
            for (var v = 0; v < door.dataType.length; v++) {
                if (/^#/gm.test(door.dataType[v].from)) {
                    let a = path.join(__dirname, "module", "dataType", door.dataType[v].from.replace(/^#/gm, "") + ".js");
                    data_type[door.dataType[v].name] = { main: require(a), request: false };
                } else {
                    data_type[door.dataType[v].name] = { main: require(path.join(mainpath, door.dataType[v].from)), request: false };
                }
            }
            global.data_type = data_type;
        };
        if (typeof door.brother !== "undefined") {
            for (var v = 0; v < door.brother.length; v++) {
                let bro = door.brother[v];

                if (typeof bro.name !== "undefined") {
                    if (typeof bro.member !== "undefined") {
                        if (bro.member.length > 0) {
                            let members = [];

                            for (var r = 0; r < bro.member.length; r++) {
                                if (typeof module[bro.member[r]] !== "undefined") {
                                    members.push(bro.member[r]);
                                } else {
                                    Elog(`Brother ${v}: module "${bro.member[r]}" was not found in module object.`)
                                }
                            }
                            brother[bro.name] = members;
                        } else {
                            Elog(`Brother ${v}: a brother cannot have no element in an object.`)
                        }
                    } else {
                        Elog(`Brother ${v}: the brother object must have a member field.`);
                    }
                } else {
                    Elog(`Brother ${v}: must have a name field.`);
                }
            }
            global.brother = brother;
        };
        if (typeof door.sister !== "undefined") {
            for (var v = 0; v < door.sister.length; v++) {
                let sis = door.sister[v];

                if (typeof sis.name !== "undefined") {
                    if (typeof sis.member !== "undefined") {
                        if (sis.member.length > 0) {
                            let members = [];

                            for (var r = 0; r < sis.member.length; r++) {
                                if (typeof data_type[sis.member[r]] !== "undefined") {
                                    members.push(sis.member[r]);
                                } else {
                                    Elog(`Sister ${v}: module "${sis.member[r]}" was not found in dataType object.`)
                                }
                            }
                            sister[sis.name] = members;
                        } else {
                            Elog(`Sister ${v}: a sister cannot have no element in an object.`)
                        }
                    } else {
                        Elog(`Sister ${v}: the sister object must have a member field.`);
                    }
                } else {
                    Elog(`Sister ${v}: must have a name field.`);
                }
            }
            global.sister = sister;
        }
        if (typeof door.family !== "undefined") {
            for (var v = 0; v < door.family.length; v++) {
                let fam = door.family[v];
                if (typeof fam.name !== "undefined") {
                    if (typeof fam.member !== "undefined") {
                        let member = [];
                        for (var r = 0; r < fam.member.length; r++) {
                            let mem = fam.member[r];

                            if (typeof mem.type !== "undefined" && typeof mem.name !== "undefined") {

                                if (mem.type == "module" || mem.type == "data") {
                                    if (mem.type == "module") {
                                        if (typeof module[mem.name] !== "undefined") {
                                            member.push(mem);
                                        } else {
                                            Elog(`Family ${v}: Member ${r}: module "${mem.name}" was not found in module.`)
                                        }
                                    } else {
                                        if (typeof data_type[mem.name] !== "undefined") {
                                            member.push(mem);
                                        } else {
                                            Elog(`Family ${v}: Member ${r}: datatype "${mem.name}" was not found in datatype.`)
                                        }
                                    }
                                } else {
                                    Elog(`Family ${v}: Member ${r}: unknown type.`)
                                }
                            } else {
                                Elog(`Family ${v}: Member ${r}: must have a name and a type.`)
                            }
                        }
                        family[fam.name] = member;
                    } else {
                        Elog(`Family ${v}: must have members.`)
                    }
                } else {
                    Elog(`Family ${v}: must have a name.`);
                }
            }
        }
        if (typeof door.variable !== "undefined") {
            let data = door.variable;
            global.variable = {};
            for (var v = 0; v < data.length; v++) {
                let dat = data[v];
                if (typeof dat.name !== "undefined" && typeof dat.value !== "undefined") {
                    global.variable[dat.name] = dat.value;
                } else {
                    Elog(`Variable: ${v}: must have a name and a value.`)
                }
            }
        }

        for (var cl = 0; cl < door.call.length; cl++) {
            if (/\.du$/gm.test(door.call[cl])) {
                if (fs.existsSync(path.join(mainpath + door.call[cl]))) {
                    const file = fs.readFileSync(path.join(mainpath + door.call[cl]), { encoding: "utf-8" });
                    /*
        
        
                    IFER
        
        
                    */
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
                                            if (typeof data_type[type] !== "undefined") {
                                                let th = data_type[type];
                                                if (th.request) {
                                                    createVar(name, th.main(line.join(" ").replace(/^\{|\}$/gm, ""), mainpath, door, variable, comment, declare, module, global, path.join(__dirname, "tools.js")));
                                                } else {
                                                    Elog(type + `: Modular type has not been confirmed`)
                                                }
                                            } else {
                                                Elog(`str: ${i + 1} \n` + `The data type was not specified or was incorrectly specified`);
                                            }
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
                                                console.log(eval(`variable${newo.join("")} `))
                                            } else if (type == "@") {
                                                console.log(variable);
                                            } else if (type == "!") {
                                                console.log(comment);
                                            } else {
                                                Elog(`str: ${i + 1} \n` + `Input type was not specified correctly`);
                                            }
                                        } else {
                                            Elog(`str: ${i + 1} \n` + `Call type was not specified correctly`);
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
                                case "father":
                                    if (typeof module[line[1]] !== undefined) {
                                        if (line[2] == "true") {
                                            module[line[1]].request = Boolean(line[2]);
                                        } else {
                                            module[line[1]].request = false;
                                        }

                                    } else {
                                        Elog(line[1]`: Module not found`);
                                    }
                                    break;
                                case "mother":
                                    if (typeof data_type[line[1]] !== "undefined") {
                                        if (line[2] == "true") {
                                            data_type[line[1]].request = true;
                                        } else if (line[2] == "false") {
                                            data_type[line[1]].request = false;
                                        } else {
                                            Elog(line[2] + `: must be true or false`);
                                        }

                                    } else {
                                        Elog(line[1]`: Modular type was not found`);
                                    }
                                    break;
                                case "brother":
                                    if (typeof brother[line[1]] !== "undefined") {
                                        var bro = brother[line[1]];

                                        for (var fr = 0; fr < bro.length; fr++) {
                                            if (line[2] == "true") {
                                                module[bro[fr]].request = true;
                                            } else if (line[2] == "false") {
                                                module[bro[fr]].request = false;
                                            } else {
                                                Elog(line[2] + `: must be true or false`);
                                            };
                                        }
                                    } else {
                                        Elog(line[1] + `: brother not found`);
                                    }
                                    break;
                                case "sister":
                                    if (typeof sister[line[1]] !== "undefined") {
                                        var sis = sister[line[1]];

                                        for (var fr = 0; fr < sis.length; fr++) {
                                            if (line[2] == "true") {
                                                data_type[sis[fr]].request = true;
                                            } else if (line[2] == "false") {
                                                data_type[sis[fr]].request = false;
                                            } else {
                                                Elog(line[2] + `: must be true or false`);
                                            };
                                        }
                                    } else {
                                        Elog(line[1] + `: sister not found`);
                                    }
                                    break;
                                case "family":
                                    if (typeof family[line[1]] !== "undefined") {
                                        var fam = family[line[1]];
                                        for (var fr = 0; fr < fam.length; fr++) {
                                            var mem = fam[fr];
                                            if (mem.type == "module") {
                                                if (typeof module[mem.name] !== "undefined") {
                                                    if (line[2] == "true") {
                                                        module[mem.name].request = true;
                                                    } else if (line[2] == "false") {
                                                        module[mem.name].request = false;
                                                    }
                                                } else {
                                                    Elog(line[1] + `: module "${mem.name}" was not found in module`);
                                                }
                                            } else {
                                                if (typeof data_type[mem.name] !== "undefined") {
                                                    if (line[2] == "true") {
                                                        data_type[mem.name].request = true;
                                                    } else if (line[2] == "false") {
                                                        data_type[mem.name].request = false;
                                                    }
                                                } else {
                                                    Elog(line[1] + `: datatype "${mem.name}" was not found in datatype`);
                                                }
                                            }
                                        }
                                    } else {
                                        Elog(line[1] + `: sister not found`);
                                    }
                                    break;
                                case "":
                                    break;
                                default:
                                    if (typeof module[line[0]] !== "undefined") {
                                        let th = module[line[0]];
                                        if (th.request) {
                                            th.main(line.join(" ").replace(/^\{|\}$/gm, ""), mainpath, door, variable, comment, declare, module, global, path.join(__dirname, "tools.js"));
                                        } else {
                                            Elog(line[0] + `: The module has not been validated`)
                                        }
                                    } else {
                                        Elog(line[0] + `: Not registered command`);
                                    }
                                    break;
                            }
                        }
                        for (var i = 0; i < varlist.length; i++) {
                            delete variable[varlist[i]];
                        }
                    }
                    /*
        
        
                    WHILER
        
        
                    */
                    function whiler(lines) {
                        let varlist = [];
                        function createVar(id, value) {
                            variable[id] = value;
                        }

                        let linelist = lines.split("&^");

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
                                            if (typeof data_type[type] !== "undefined") {
                                                let th = data_type[type];
                                                if (th.request) {
                                                    createVar(name, th.main(line.join(" ").replace(/^\{|\}$/gm, ""), mainpath, door, variable, comment, declare, module, global, path.join(__dirname, "tools.js")));
                                                } else {
                                                    Elog(type + `: Modular type has not been confirmed`)
                                                }
                                            } else {
                                                Elog(`str: ${i + 1} \n` + `The data type was not specified or was incorrectly specified`);
                                            }
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
                                                console.log(eval(`variable${newo.join("")} `))
                                            } else if (type == "@") {
                                                console.log(variable);
                                            } else if (type == "!") {
                                                console.log(comment);
                                            } else {
                                                Elog(`str: ${i + 1} \n` + `Input type was not specified correctly`);
                                            }
                                        } else {
                                            Elog(`str: ${i + 1} \n` + `Call type was not specified correctly`);
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
                                case "father":
                                    if (typeof module[line[1]] !== undefined) {
                                        if (line[2] == "true") {
                                            module[line[1]].request = Boolean(line[2]);
                                        } else {
                                            module[line[1]].request = false;
                                        }

                                    } else {
                                        Elog(line[1]`: Module not found`);
                                    }
                                    break;
                                case "mother":
                                    if (typeof data_type[line[1]] !== "undefined") {
                                        if (line[2] == "true") {
                                            data_type[line[1]].request = true;
                                        } else if (line[2] == "false") {
                                            data_type[line[1]].request = false;
                                        } else {
                                            Elog(line[2] + `: must be true or false`);
                                        }

                                    } else {
                                        Elog(line[1]`: Modular type was not found`);
                                    }
                                    break;
                                case "brother":
                                    if (typeof brother[line[1]] !== "undefined") {
                                        var bro = brother[line[1]];

                                        for (var fr = 0; fr < bro.length; fr++) {
                                            if (line[2] == "true") {
                                                module[bro[fr]].request = true;
                                            } else if (line[2] == "false") {
                                                module[bro[fr]].request = false;
                                            } else {
                                                Elog(line[2] + `: must be true or false`);
                                            };
                                        }
                                    } else {
                                        Elog(line[1] + `: brother not found`);
                                    }
                                    break;
                                case "sister":
                                    if (typeof sister[line[1]] !== "undefined") {
                                        var sis = sister[line[1]];

                                        for (var fr = 0; fr < sis.length; fr++) {
                                            if (line[2] == "true") {
                                                data_type[sis[fr]].request = true;
                                            } else if (line[2] == "false") {
                                                data_type[sis[fr]].request = false;
                                            } else {
                                                Elog(line[2] + `: must be true or false`);
                                            };
                                        }
                                    } else {
                                        Elog(line[1] + `: sister not found`);
                                    }
                                    break;
                                case "family":
                                    if (typeof family[line[1]] !== "undefined") {
                                        var fam = family[line[1]];
                                        for (var fr = 0; fr < fam.length; fr++) {
                                            var mem = fam[fr];
                                            if (mem.type == "module") {
                                                if (typeof module[mem.name] !== "undefined") {
                                                    if (line[2] == "true") {
                                                        module[mem.name].request = true;
                                                    } else if (line[2] == "false") {
                                                        module[mem.name].request = false;
                                                    }
                                                } else {
                                                    Elog(line[1] + `: module "${mem.name}" was not found in module`);
                                                }
                                            } else {
                                                if (typeof data_type[mem.name] !== "undefined") {
                                                    if (line[2] == "true") {
                                                        data_type[mem.name].request = true;
                                                    } else if (line[2] == "false") {
                                                        data_type[mem.name].request = false;
                                                    }
                                                } else {
                                                    Elog(line[1] + `: datatype "${mem.name}" was not found in datatype`);
                                                }
                                            }
                                        }
                                    } else {
                                        Elog(line[1] + `: sister not found`);
                                    }
                                    break;
                                case "":
                                    break;
                                default:
                                    if (typeof module[line[0]] !== undefined) {
                                        let th = module[line[0]];
                                        if (th.request) {
                                            th.main(line.join(" ").replace(/^\{|\}$/gm, ""), mainpath, door, variable, comment, declare, module, global, path.join(__dirname, "tools.js"));
                                        } else {
                                            Elog(line[0] + `: The module has not been validated`)
                                        }
                                    } else {
                                        Elog(line[0] + `: Not registered command`);
                                    }
                                    break;
                            }
                        }
                        for (var i = 0; i < varlist.length; i++) {
                            delete variable[varlist[i]];
                        }
                    }
                    /*
        
        
                    CALLFUNC
        
        
                    */
                    function callFunc(id) {
                        let lines = declare[id].body;
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
                                                if (typeof data_type[type] !== "undefined") {
                                                    let th = data_type[type];
                                                    if (th.request) {
                                                        createVar(name, th.main(line.join(" ").replace(/^\{|\}$/gm, ""), mainpath, door, variable, comment, declare, module, global, path.join(__dirname, "tools.js")));
                                                    } else {
                                                        Elog(type + `: Modular type has not been confirmed`)
                                                    }
                                                } else {
                                                    Elog(`str: ${i + 1} \n` + `The data type was not specified or was incorrectly specified`);
                                                }
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
                                                    console.log(eval(`variable${newo.join("")} `))
                                                } else if (type == "@") {
                                                    console.log(variable);
                                                } else if (type == "!") {
                                                    console.log(comment);
                                                } else {
                                                    Elog(`str: ${i + 1} \n` + `Input type was not specified correctly`);
                                                }
                                            } else {
                                                Elog(`str: ${i + 1} \n` + `Call type was not specified correctly`);
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
                                    case "father":
                                        if (typeof module[line[1]] !== "undefined") {
                                            if (line[2] == "true") {
                                                module[line[1]].request = true;
                                            } else if (line[2] == "false") {
                                                module[line[1]].request = false;
                                            } else {
                                                Elog(line[2] + `: must be true or false`);
                                            };
                                        } else {
                                            Elog(line[1] + `: Module not found`);
                                        }
                                        break;
                                    case "mother":
                                        if (typeof data_type[line[1]] !== undefined) {
                                            if (line[2] == "true") {
                                                data_type[line[1]].request = true;
                                            } else if (line[2] == "false") {
                                                data_type[line[1]].request = false;
                                            } else {
                                                Elog(line[2] + `: must be true or false`);
                                            }

                                        } else {
                                            Elog(line[1]`: Modular type was not found`);
                                        }
                                        break;
                                    case "brother":
                                        if (typeof brother[line[1]] !== "undefined") {
                                            var bro = brother[line[1]];

                                            for (var fr = 0; fr < bro.length; fr++) {
                                                if (line[2] == "true") {
                                                    module[bro[fr]].request = true;
                                                } else if (line[2] == "false") {
                                                    module[bro[fr]].request = false;
                                                } else {
                                                    Elog(line[2] + `: must be true or false`);
                                                };
                                            }
                                        } else {
                                            Elog(line[1] + `: brother not found`);
                                        }
                                        break;
                                    case "sister":
                                        if (typeof sister[line[1]] !== "undefined") {
                                            var sis = sister[line[1]];

                                            for (var fr = 0; fr < sis.length; fr++) {
                                                if (line[2] == "true") {
                                                    data_type[sis[fr]].request = true;
                                                } else if (line[2] == "false") {
                                                    data_type[sis[fr]].request = false;
                                                } else {
                                                    Elog(line[2] + `: must be true or false`);
                                                };
                                            }
                                        } else {
                                            Elog(line[1] + `: sister not found`);
                                        }
                                        break;
                                    case "family":
                                        if (typeof family[line[1]] !== "undefined") {
                                            var fam = family[line[1]];
                                            for (var fr = 0; fr < fam.length; fr++) {
                                                var mem = fam[fr];
                                                if (mem.type == "module") {
                                                    if (typeof module[mem.name] !== "undefined") {
                                                        if (line[2] == "true") {
                                                            module[mem.name].request = true;
                                                        } else if (line[2] == "false") {
                                                            module[mem.name].request = false;
                                                        }
                                                    } else {
                                                        Elog(line[1] + `: module "${mem.name}" was not found in module`);
                                                    }
                                                } else {
                                                    if (typeof data_type[mem.name] !== "undefined") {
                                                        if (line[2] == "true") {
                                                            data_type[mem.name].request = true;
                                                        } else if (line[2] == "false") {
                                                            data_type[mem.name].request = false;
                                                        }
                                                    } else {
                                                        Elog(line[1] + `: datatype "${mem.name}" was not found in datatype`);
                                                    }
                                                }
                                            }
                                        } else {
                                            Elog(line[1] + `: sister not found`);
                                        }
                                        break;
                                    case "":
                                        break;
                                    default:
                                        if (typeof module[line[0]] !== undefined) {
                                            let th = module[line[0]];
                                            if (th.request) {
                                                th.main(line.join(" ").replace(/^\{|\}$/gm, ""), mainpath, door, variable, comment, declare, module, global, path.join(__dirname, "tools.js"));
                                            } else {
                                                Elog(line[0] + `: The module has not been validated`)
                                            }
                                        } else {
                                            Elog(line[0] + `: Not registered command`);
                                        }
                                        break;
                                }
                            }
                            for (var i = 0; i < varlist.length; i++) {
                                delete variable[varlist[i]];
                            }
                        }
                        /*
                
                
                        WHILER
                
                
                        */
                        function whiler(lines) {
                            let varlist = [];
                            function createVar(id, value) {
                                variable[id] = value;
                            }

                            let linelist = lines.split("&^");

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
                                                if (typeof data_type[type] !== "undefined") {
                                                    let th = data_type[type];
                                                    if (th.request) {
                                                        createVar(name, th.main(line.join(" ").replace(/^\{|\}$/gm, ""), mainpath, door, variable, comment, declare, module, global, path.join(__dirname, "tools.js")));
                                                    } else {
                                                        Elog(type + `: Modular type has not been confirmed`)
                                                    }
                                                } else {
                                                    Elog(`str: ${i + 1} \n` + `The data type was not specified or was incorrectly specified`);
                                                }
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
                                                    console.log(eval(`variable${newo.join("")} `))
                                                } else if (type == "@") {
                                                    console.log(variable);
                                                } else if (type == "!") {
                                                    console.log(comment);
                                                } else {
                                                    Elog(`str: ${i + 1} \n` + `Input type was not specified correctly`);
                                                }
                                            } else {
                                                Elog(`str: ${i + 1} \n` + `Call type was not specified correctly`);
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
                                    case "father":
                                        if (typeof module[line[1]] !== "undefined") {
                                            if (line[2] == "true") {
                                                module[line[1]].request = true;
                                            } else if (line[2] == "false") {
                                                module[line[1]].request = false;
                                            } else {
                                                Elog(line[2] + `: must be true or false`);
                                            };
                                        } else {
                                            Elog(line[1] + `: Module not found`);
                                        }
                                        break;
                                    case "mother":
                                        if (typeof data_type[line[1]] !== "undefined") {
                                            if (line[2] == "true") {
                                                data_type[line[1]].request = true;
                                            } else if (line[2] == "false") {
                                                data_type[line[1]].request = false;
                                            } else {
                                                Elog(line[2] + `: must be true or false`);
                                            }

                                        } else {
                                            Elog(line[1]`: Modular type was not found`);
                                        }
                                        break;
                                    case "brother":
                                        if (typeof brother[line[1]] !== "undefined") {
                                            var bro = brother[line[1]];

                                            for (var fr = 0; fr < bro.length; fr++) {
                                                if (line[2] == "true") {
                                                    module[bro[fr]].request = true;
                                                } else if (line[2] == "false") {
                                                    module[bro[fr]].request = false;
                                                } else {
                                                    Elog(line[2] + `: must be true or false`);
                                                };
                                            }
                                        } else {
                                            Elog(line[1] + `: brother not found`);
                                        }
                                        break;
                                    case "sister":
                                        if (typeof sister[line[1]] !== "undefined") {
                                            var sis = sister[line[1]];

                                            for (var fr = 0; fr < sis.length; fr++) {
                                                if (line[2] == "true") {
                                                    data_type[sis[fr]].request = true;
                                                } else if (line[2] == "false") {
                                                    data_type[sis[fr]].request = false;
                                                } else {
                                                    Elog(line[2] + `: must be true or false`);
                                                };
                                            }
                                        } else {
                                            Elog(line[1] + `: sister not found`);
                                        }
                                        break;
                                    case "family":
                                        if (typeof family[line[1]] !== "undefined") {
                                            var fam = family[line[1]];
                                            for (var fr = 0; fr < fam.length; fr++) {
                                                var mem = fam[fr];
                                                if (mem.type == "module") {
                                                    if (typeof module[mem.name] !== "undefined") {
                                                        if (line[2] == "true") {
                                                            module[mem.name].request = true;
                                                        } else if (line[2] == "false") {
                                                            module[mem.name].request = false;
                                                        }
                                                    } else {
                                                        Elog(line[1] + `: module "${mem.name}" was not found in module`);
                                                    }
                                                } else {
                                                    if (typeof data_type[mem.name] !== "undefined") {
                                                        if (line[2] == "true") {
                                                            data_type[mem.name].request = true;
                                                        } else if (line[2] == "false") {
                                                            data_type[mem.name].request = false;
                                                        }
                                                    } else {
                                                        Elog(line[1] + `: datatype "${mem.name}" was not found in datatype`);
                                                    }
                                                }
                                            }
                                        } else {
                                            Elog(line[1] + `: sister not found`);
                                        }
                                        break;
                                    case "":
                                        break;
                                    default:
                                        if (typeof module[line[0]] !== undefined) {
                                            let th = module[line[0]];
                                            if (th.request) {
                                                th.main(line.join(" ").replace(/^\{|\}$/gm, ""), mainpath, door, variable, comment, declare, module, global, path.join(__dirname, "tools.js"));
                                            } else {
                                                Elog(line[0] + `: The module has not been validated`)
                                            }
                                        } else {
                                            Elog(line[0] + `: Not registered command`);
                                        }
                                        break;
                                }
                            }
                            for (var i = 0; i < varlist.length; i++) {
                                delete variable[varlist[i]];
                            }
                        }
                        /*
                
                
                        MAIN
                
                
                        */
                        function createVar(id, value) {
                            variable[id] = value;
                        }

                        let linelist = lines.split("*^");

                        for (var i = 0; i < linelist.length; i++) {
                            let line = linelist[i].replace(/^\s*/gm, "").split(" ");
                            const command = line[0];
                            let varlist = [];
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
                                            createVar(name, eval(a.replace(/console.\S+|for.\S+|while.\S+/gm, "").replace(/\@/gm, "variable.")));
                                        } else if (type == "ViewCondition") {
                                            createVar(name, Boolean(eval(line[4].replace(/^\(|\)$/gm, "").replace(/\@/gm, "variable.").replace(/console.\S+|for.+/gm))))
                                        } else if (type == "!") {
                                            createVar(name, comment[Number(line[4])]);
                                        } else {
                                            if (typeof data_type[type] !== "undefined") {
                                                let th = data_type[type];
                                                if (th.request) {
                                                    createVar(name, th.main(line.join(" ").replace(/^\{|\}$/gm, ""), mainpath, door, variable, comment, declare, module, global, path.join(__dirname, "tools.js")));
                                                } else {
                                                    Elog(type + `: Modular type has not been confirmed`)
                                                }
                                            } else {
                                                Elog(`str: ${i + 1} \n` + `The data type was not specified or was incorrectly specified`);
                                            }
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
                                                console.log(eval(`variable${newo.join("")} `))
                                            } else if (type == "@") {
                                                console.log(variable);
                                            } else if (type == "!") {
                                                console.log(comment);
                                            } else {
                                                Elog(`str: ${i + 1} \n` + `Input type was not specified correctly`);
                                            }
                                        } else {
                                            Elog(`str: ${i + 1} \n` + `Call type was not specified correctly`);
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
                                    if (1 == 1) {
                                        var data = line[1].replace(/^\(|\)$/gm, "").replace(/\@/gm, "variable.");
                                        if (Boolean(eval(data))) {
                                            ifer(line.slice(2).join(" ").replace(/^\{|\}$/gm, ""))
                                        }
                                    }
                                    break;
                                case "while":
                                    if (1 == 1) {
                                        var data = line[1].replace(/^\(|\)$/gm, "").replace(/\@/gm, "variable.");
                                        while (Boolean(eval(data))) {
                                            whiler(line.slice(2).join(" ").replace(/^\{|\}$/gm, ""));
                                        }
                                    }
                                    break;
                                case "//":
                                    comment.push(line.slice(1).join(" "));
                                    break;
                                case "father":
                                    if (typeof module[line[1]] !== "undefined") {
                                        if (line[2] == "true") {
                                            module[line[1]].request = true;
                                        } else if (line[2] == "false") {
                                            module[line[1]].request = false;
                                        } else {
                                            Elog(line[2] + `: must be true or false`);
                                        };
                                    } else {
                                        Elog(line[1] + `: Module not found`);
                                    }
                                    break;
                                case "mother":
                                    if (typeof data_type[line[1]] !== "undefined") {
                                        if (line[2] == "true") {
                                            data_type[line[1]].request = true;
                                        } else if (line[2] == "false") {
                                            data_type[line[1]].request = false;
                                        } else {
                                            Elog(line[2] + `: must be true or false`);
                                        }

                                    } else {
                                        Elog(line[1]`: Modular type was not found`);
                                    }
                                    break;
                                case "brother":
                                    if (typeof brother[line[1]] !== "undefined") {
                                        var bro = brother[line[1]];

                                        for (var fr = 0; fr < bro.length; fr++) {
                                            if (line[2] == "true") {
                                                module[bro[fr]].request = true;
                                            } else if (line[2] == "false") {
                                                module[bro[fr]].request = false;
                                            } else {
                                                Elog(line[2] + `: must be true or false`);
                                            };
                                        }
                                    } else {
                                        Elog(line[1] + `: brother not found`);
                                    }
                                    break;
                                case "sister":
                                    if (typeof sister[line[1]] !== "undefined") {
                                        var sis = sister[line[1]];

                                        for (var fr = 0; fr < sis.length; fr++) {
                                            if (line[2] == "true") {
                                                data_type[sis[fr]].request = true;
                                            } else if (line[2] == "false") {
                                                data_type[sis[fr]].request = false;
                                            } else {
                                                Elog(line[2] + `: must be true or false`);
                                            };
                                        }
                                    } else {
                                        Elog(line[1] + `: sister not found`);
                                    }
                                    break;
                                case "family":
                                    if (typeof family[line[1]] !== "undefined") {
                                        var fam = family[line[1]];
                                        for (var fr = 0; fr < fam.length; fr++) {
                                            var mem = fam[fr];
                                            if (mem.type == "module") {
                                                if (typeof module[mem.name] !== "undefined") {
                                                    if (line[2] == "true") {
                                                        module[mem.name].request = true;
                                                    } else if (line[2] == "false") {
                                                        module[mem.name].request = false;
                                                    }
                                                } else {
                                                    Elog(line[1] + `: module "${mem.name}" was not found in module`);
                                                }
                                            } else {
                                                if (typeof data_type[mem.name] !== "undefined") {
                                                    if (line[2] == "true") {
                                                        data_type[mem.name].request = true;
                                                    } else if (line[2] == "false") {
                                                        data_type[mem.name].request = false;
                                                    }
                                                } else {
                                                    Elog(line[1] + `: datatype "${mem.name}" was not found in datatype`);
                                                }
                                            }
                                        }
                                    } else {
                                        Elog(line[1] + `: sister not found`);
                                    }
                                    break;
                                case "":
                                    break;
                                default:
                                    if (typeof module[line[0]] !== undefined) {
                                        let th = module[line[0]];
                                        if (th && th.request) {
                                            th.main(line.join(" ").replace(/^\{|\}$/gm, ""), mainpath, door, variable, comment, declare, module, global, path.join(__dirname, "tools.js"));
                                        } else {
                                            Elog(line[0] + `: The module has not been validated`)
                                        }
                                    } else {
                                        Elog(line[0] + `: Not registered command`);
                                    }
                                    break;
                            }
                            for (var i = 0; i < varlist.length; i++) {
                                delete variable[varlist[i]];
                            }
                        }
                    }
                    /*
        
        
                    MAIN
        
        
                    */
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
                                        if (typeof data_type[type] !== "undefined") {
                                            let th = data_type[type];
                                            if (th.request) {
                                                createVar(name, th.main(line.join(" ").replace(/^\{|\}$/gm, ""), mainpath, door, variable, comment, declare, module, global, path.join(__dirname, "tools.js")));
                                            } else {
                                                Elog(type + `: Modular type has not been confirmed`)
                                            }
                                        } else {
                                            Elog(`str: ${i + 1} \n` + `The data type was not specified or was incorrectly specified`);
                                        }
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
                                            console.log(eval(`variable${newo.join("")} `))
                                        } else if (type == "@") {
                                            console.log(variable);
                                        } else if (type == "!") {
                                            console.log(comment);
                                        } else {
                                            Elog(`str: ${i + 1} \n` + `Input type was not specified correctly`);
                                        }
                                    } else if ("function") {
                                        callFunc(line[2]);
                                    } else {
                                        Elog(`str: ${i + 1} \n` + `Call type was not specified correctly`);
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
                            case "while":
                                var data = line[1].replace(/^\(|\)$/gm, "").replace(/\@/gm, "variable.");
                                while (Boolean(eval(data))) {
                                    whiler(line.slice(2).join(" ").replace(/^\{|\}$/gm, ""));
                                }
                                break;
                            case "//":
                                comment.push(line.slice(1).join(" "));
                                break;
                            case "declare":
                                if (1 == 1) {
                                    if (line[1] == "function") {
                                        var name = line[2];
                                        let body = line.slice(4).join(" ").replace(/^\{|\}$/gm, "");
                                        declare[name] = {
                                            body: body
                                        };
                                    } else if (line[1] == "module") {
                                        if (line[2] == "function") {
                                            var name = line[3];
                                            let body = line.slice(5).join(" ").replace(/^\{|\}$/gm, "");
                                            m_declare[name] = body;
                                        } else {
                                            Elog(line[2] + " :Unknown type of declared module")
                                        }
                                    } else {
                                        Elog(line[1] + " :Unknown declared type")
                                    }
                                }
                                break;
                            case "father":
                                if (typeof module[line[1]] !== "undefined") {
                                    if (line[2] == "true") {
                                        module[line[1]].request = true;
                                    } else if (line[2] == "false") {
                                        module[line[1]].request = false;
                                    } else {
                                        Elog(line[2] + `: must be true or false`);
                                    };
                                } else {
                                    Elog(line[1] + `: Module not found`);
                                }
                                break;
                            case "mother":
                                if (typeof data_type[line[1]] !== "undefined") {
                                    if (line[2] == "true") {
                                        data_type[line[1]].request = true;
                                    } else if (line[2] == "false") {
                                        data_type[line[1]].request = false;
                                    } else {
                                        Elog(line[2] + `: must be true or false`);
                                    }

                                } else {
                                    Elog(line[1] + `: Modular type was not found`);
                                }
                                break;
                            case "brother":
                                if (typeof brother[line[1]] !== "undefined") {
                                    var bro = brother[line[1]];

                                    for (var fr = 0; fr < bro.length; fr++) {
                                        if (line[2] == "true") {
                                            module[bro[fr]].request = true;
                                        } else if (line[2] == "false") {
                                            module[bro[fr]].request = false;
                                        } else {
                                            Elog(line[2] + `: must be true or false`);
                                        };
                                    }
                                } else {
                                    Elog(line[1] + `: brother not found`);
                                }
                                break;
                            case "sister":
                                if (typeof sister[line[1]] !== "undefined") {
                                    var sis = sister[line[1]];

                                    for (var fr = 0; fr < sis.length; fr++) {
                                        if (line[2] == "true") {
                                            data_type[sis[fr]].request = true;
                                        } else if (line[2] == "false") {
                                            data_type[sis[fr]].request = false;
                                        } else {
                                            Elog(line[2] + `: must be true or false`);
                                        };
                                    }
                                } else {
                                    Elog(line[1] + `: sister not found`);
                                }
                                break;
                            case "family":
                                if (typeof family[line[1]] !== "undefined") {
                                    var fam = family[line[1]];
                                    for (var fr = 0; fr < fam.length; fr++) {
                                        var mem = fam[fr];
                                        if (mem.type == "module") {
                                            if (typeof module[mem.name] !== "undefined") {
                                                if (line[2] == "true") {
                                                    module[mem.name].request = true;
                                                } else if (line[2] == "false") {
                                                    module[mem.name].request = false;
                                                }
                                            } else {
                                                Elog(line[1] + `: module "${mem.name}" was not found in module`);
                                            }
                                        } else {
                                            if (typeof data_type[mem.name] !== "undefined") {
                                                if (line[2] == "true") {
                                                    data_type[mem.name].request = true;
                                                } else if (line[2] == "false") {
                                                    data_type[mem.name].request = false;
                                                }
                                            } else {
                                                Elog(line[1] + `: datatype "${mem.name}" was not found in datatype`);
                                            }
                                        }
                                    }
                                } else {
                                    Elog(line[1] + `: sister not found`);
                                }
                                break;
                            case "":
                                break;
                            default:
                                if (typeof module[line[0]] !== "undefined") {
                                    let th = module[line[0]];
                                    if (th.request) {
                                        th.main(line.join(" ").replace(/^\{|\}$/gm, ""), mainpath, door, variable, comment, declare, module, global, path.join(__dirname, "tools.js"));
                                    } else {
                                        Elog(line[0] + `: The module has not been validated`)
                                    }
                                } else {
                                    Elog(line[0] + `: Not registered command`);
                                }
                                break;
                        }
                    }
                    // du
                } else {
                    Elog(`File ${door.call[cl]} does not exist.`)
                }
            } else if (door.call[cl] == "clear") {
                variable = "";
                variable = {};
                comment = "";
                comment = [];
            } else {
                Elog(`${door[cl]}: The executable must have a.du permission`);
            }
        }
    } else {
        Elog(`In the directory "${mainpath}" there should be a file "Door.json"`);
    }


};
/*


    ENDING


*/
// async function ending() {
//     log(await prompt("Press enter to finish..."))
// };
// ending()

// :)