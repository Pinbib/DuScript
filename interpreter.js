const Console = require("./Tool/Console");
const DuLine = require("./DuLine/DuLine");
const DuCom = require("./DuCom/DuCom");
const path = require("path");
const fs = require("fs");



function main(text = "", src, separator = "") {
    const Com = {
        Approve: new DuCom.Approve("./Approve"),
        Declare: new DuCom.Declare("./Declare"),
        Console: Console,
        duScript: main
    };

    let lines = text.split(new RegExp(`\\${separator}\\r?\\n?`)).filter(val => val.trim() !== "");

    for (var i = 0; i < lines.length; i++) {
        function stop() {
            i = lines.length * 2;
        };

        let line = lines[i].replace(/\s+/gm, " ").trim().split(" ");

        switch (line[0]) {
            case "approve":
                if (!DuLine._approve(line, Com, i + 1)) {
                    stop();
                };
                break;
            case "print":
                if (!DuLine._print(line, Com, i + 1)) {
                    stop();
                };
                break;
            case "declare":
                if (!DuLine._declare(line, Com, i + 1)) {
                    stop();
                };
                break;
            case "call":
                if (!DuLine._call(line, Com, i + 1)) {
                    stop();
                };
                break;
            case "if":
                if (!DuLine._if(line, Com, i + 1)) {
                    stop();
                };
                break;
            case "while":
                if (!DuLine._while(line, Com, i + 1)) {
                    stop();
                };
                break;
            case "delete":
                if (!DuLine._delete(line, Com, i + 1)) {
                    stop();
                };
                break;
            case "//":
                break;
            case "|>>|":
                break;
            default:
                Console.gerror("Unknown command.", ["From: DuScript interpreter.", "Command: " + line[0], "Line: " + (i + 1)]);
                stop();
                break;
        };
    };
};

function door(text, src, Door, separator = "") {

    const Com = {
        Approve: new DuCom.Approve("./Approve"),
        Declare: new DuCom._Declare("./Declare"),
        Console: Console,
        duScript: door,
        Module: new DuCom.Module(Door),
        dataType: new DuCom.DataType(Door)
    };

    let lines = text.split(new RegExp(`\\${separator}\\r?\\n?`)).filter(val => val.trim() !== "");

    for (var i = 0; i < lines.length; i++) {
        function stop() {
            i = lines.length * 2;
        };

        let line = lines[i].replace(/\s+/gm, " ").trim().split(" ");

        let comm = NaN;

        if (Door.section) Console.info("[Door]Executed: " + line.join(" "));

        switch (line[0]) {
            case "approve":
                comm = "approve";

                if (!DuLine.__approve(line, Com, Door, i + 1)) {
                    if (Door.section) Console.info(`Work was stopped by command ${comm}.`);
                    stop();
                };
                break;
            case "print":
                comm = "print";

                if (!DuLine._print(line, Com, i + 1)) {
                    if (Door.section) Console.info(`Work was stopped by command ${comm}.`);
                    stop();
                };
                break;
            case "declare":
                comm = "declare";
                if (!DuLine._declare(line, Com, i + 1)) {
                    if (Door.section) Console.info(`Work was stopped by command ${comm}.`);
                    stop();
                };
                break;
            case "call":
                comm = "call";
                if (!DuLine.__call(line, Com, Door, i + 1)) {
                    if (Door.section) Console.info(`Work was stopped by command ${comm}.`);
                    stop();
                };
                break;
            case "if":
                comm = "if";
                if (!DuLine.__if(line, Com, Door, i + 1)) {
                    if (Door.section) Console.info(`Work was stopped by command ${comm}.`);
                    stop();
                };
                break;
            case "while":
                comm = "while";
                if (!DuLine.__while(line, Com, Door, i + 1)) {
                    if (Door.section) Console.info(`Work was stopped by command ${comm}.`);
                    stop();
                };
                break;
            case "delete":
                comm = "delete";
                if (!DuLine._delete(line, Com, i + 1)) {
                    if (Door.section) Console.info(`Work was stopped by command ${comm}.`);
                    stop();
                };
                break;
            case "father":
                comm = "father";
                if (!DuLine.__father(line, Com, Door, i + 1)) {
                    if (Door.section) Console.info(`Work was stopped by command ${comm}.`);
                    stop();
                };
                break;
            case "mother":
                comm = "mother";
                if (!DuLine.__mother(line, Com, Door, i + 1)) {
                    if (Door.section) Console.info(`Work was stopped by command ${comm}.`);
                    stop();
                };
                break;
            case "//":
                break;
            case "|>>|":
                break;
            default:
                if (Door.module[line[0]]) {
                    if (Door.module[line[0]].request) {
                        comm = line[0];

                        if (typeof Door.module[line[0]].line == "function") {
                            if (!Door.module[line[0]].line(line, src, Com, Door)) {
                                if (Door.section) Console.info(`Work was stopped by command ${comm}.`);
                                stop();
                            };
                        } else if (typeof Door.module[line[0]].line == "object") {

                            function objectModule(obj, line) {
                                let result = obj;

                                for (const key of line) {
                                    if (result && result.hasOwnProperty(key)) {
                                        result = result[key];
                                    } else {
                                        return result;
                                    }
                                }

                                return result;
                            };

                            let mod = objectModule(Door.module[line[0]].line, line.slice(1));

                            if (typeof mod == "function") {
                                if (!mod(line, src, Com, Door)) {
                                    if (Door.section) Console.info(`Work was stopped by command ${comm}.`);
                                    stop();
                                };
                            } else console.log(mod);
                        };
                    } else {
                        Console.ginfo("The module was not requested.", ["From: DuScript interpreter.", "Module: " + line[0], "Line: " + (i + 1)]);
                        stop();
                    };
                } else {
                    Console.gerror("Unknown command.", ["From: DuScript interpreter.", "Command: " + line[0], "Line: " + (i + 1)]);
                    stop();
                };
                break;
        };

        if (Door.section) Console.info(`[Door]Execution \"${line.join(" ")}\" is finished.`);
    };
};

function edu(text, src, Door, separator = "") {

    let variable = [];
    let func = [];

    const Com = {
        Approve: new DuCom.Approve("./Approve"),
        Declare: new DuCom._Declare("./Declare"),
        Console: Console,
        duScript: door,
        Module: new DuCom.Module(Door),
        dataType: new DuCom.DataType(Door)
    };

    let lines = text.split(new RegExp(`\\${separator}\\r?\\n?`)).filter(val => val.trim() !== "");

    for (var i = 0; i < lines.length; i++) {
        function stop() {
            i = lines.length * 2;
        };

        let line = lines[i].replace(/\s+/gm, " ").trim().split(" ");

        let comm = NaN;

        if (Door.section) Console.info("[Edu]Executed: " + line.join(" "));

        switch (line[0]) {
            case "approve":
                comm = "approve";
                if (!DuLine.__approve(line, Com, Door, i + 1)) {
                    if (Door.section) Console.info(`Work was stopped by command ${comm}.`);
                    stop();
                } else variable.push(line[1]);
                break;
            case "print":
                comm = "print";
                if (!DuLine._print(line, Com, i + 1)) {
                    if (Door.section) Console.info(`Work was stopped by command ${comm}.`);
                    stop();
                };
                break;
            case "declare":
                comm = "declare";
                if (!DuLine._declare(line, Com, i + 1)) {
                    if (Door.section) Console.info(`Work was stopped by command ${comm}.`);
                    stop();
                } else func.push(line[2]);
                break;
            case "call":
                comm = "call";
                if (!DuLine.__call(line, Com, Door, i + 1)) {
                    if (Door.section) Console.info(`Work was stopped by command ${comm}.`);
                    stop();
                };
                break;
            case "if":
                comm = "if";
                if (!DuLine.__if(line, Com, Door, i + 1)) {
                    if (Door.section) Console.info(`Work was stopped by command ${comm}.`);
                    stop();
                };
                break;
            case "while":
                comm = "while";
                if (!DuLine.__while(line, Com, Door, i + 1)) {
                    if (Door.section) Console.info(`Work was stopped by command ${comm}.`);
                    stop();
                };
                break;
            case "delete":
                comm = "delete";
                if (!DuLine._delete(line, Com, i + 1)) {
                    if (Door.section) Console.info(`Work was stopped by command ${comm}.`);
                    stop();
                };
                break;
            case "father":
                comm = "father";
                if (!DuLine.__father(line, Com, Door, i + 1)) {
                    if (Door.section) Console.info(`Work was stopped by command ${comm}.`);
                    stop();
                };
                break;
            case "mother":
                comm = "mother";
                if (!DuLine.__mother(line, Com, Door, i + 1)) {
                    if (Door.section) Console.info(`Work was stopped by command ${comm}.`);
                    stop();
                };
                break;
            case "export":
                if (variable.indexOf(line[1]) != -1) {
                    variable.splice(variable.indexOf(line[1]), 1);
                };
                if (func.indexOf[line[1]] != -1) {
                    func.splice(func.indexOf(line[1]), 1);
                };
                break;
            case "//":
                break;
            case "|>>|":
                break;
            default:
                if (Door.module[line[0]]) {
                    if (Door.module[line[0]].request) {
                        comm = line[0];

                        if (typeof Door.module[line[0]].line == "function") {
                            if (!Door.module[line[0]].line(line, src, Com, Door)) {
                                if (Door.section) Console.info(`Work was stopped by command ${comm}.`);
                                stop();
                            };
                        } else if (typeof Door.module[line[0]].line == "object") {

                            function objectModule(obj, line) {
                                let result = obj;

                                for (const key of line) {
                                    if (result && result.hasOwnProperty(key)) {
                                        result = result[key];
                                    } else {
                                        return result;
                                    }
                                }

                                return result;
                            };

                            let mod = objectModule(Door.module[line[0]].line, line.slice(1));

                            if (typeof mod == "function") {
                                if (!mod(line, src, Com, Door)) {
                                    if (Door.section) Console.info(`Work was stopped by command ${comm}.`);
                                    stop();
                                };
                            } else console.log(mod);
                        };
                    } else {
                        Console.ginfo("The module was not requested.", ["From: DuScript interpreter.", "Module: " + line[0], "Line: " + (i + 1)]);
                        stop();
                    };
                } else {
                    Console.gerror("Unknown command.", ["From: DuScript interpreter.", "Command: " + line[0], "Line: " + (i + 1)]);
                    stop();
                };
                break;
        };

        if (Door.section) Console.info(`[Door]Execution \"${line.join(" ")}\" is finished.`);
    };

    variable.forEach((val) => {
        if (fs.existsSync(path.join("./", "Approve", val + ".var"))) fs.unlinkSync(path.join("./", "Approve", val + ".var"));
    });
    func.forEach((val) => {
        if (fs.existsSync(path.join("./", "Declare", val + ".dec"))) fs.unlinkSync(path.join("./", "Declare", val + ".dec"));
    });
};

module.exports = { main, door, edu };