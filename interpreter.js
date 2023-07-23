const Console = require("./Tool/Console");
const DuLine = require("./DuLine/DuLine");
const DuCom = require("./DuCom/DuCom");
const path = require("path");
const fs = require("fs");

const Com = {
    Approve: new DuCom.Approve("./Approve"),
    Declare: new DuCom.Declare("./Declare"),
    Console: Console
}

function main(text = "", src, separator = "") {
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
                if (Door.module[line[0]]) {
                    if (!Door.module[line[0]].line(line, src, Com, Door)) {
                        stop();
                    };
                } else {
                    Console.gerror("Unknown command.", ["From: DuScript interpreter.", "Command: " + line[0], "Line: " + (i + 1)]);
                    stop();
                };
                break;
        };
    };
};

module.exports = { main, door };