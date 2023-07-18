const chalk = require("chalk");

module.exports = class Console {
    constructor() { };

    static log(text = "") {
        console.log(chalk.bold.white(text));
    };
    static error(text = "") {
        console.log(chalk.bold.red(text));
    };
    static info(text = "") {
        console.log(chalk.bold.yellow(text));
    };
    static confirm(text = "") {
        console.log(chalk.bold.green(text));
    };

    static glog(title = "", text = [""]) {
        console.log(chalk.bold.white(title));

        if (arguments.length > 1) {
            for (var i = 0; i < text.length; i++) {
                console.log(chalk.italic.white("    " + text[i]));
            };
        };
    };
    static gerror(title = "", text = [""]) {
        console.log(chalk.bold.red(title));

        if (arguments.length > 1) {
            for (var i = 0; i < text.length; i++) {
                console.log(chalk.italic.red("    " + text[i]));
            };
        };
    };
    static ginfo(title = "", text = [""]) {
        console.log(chalk.bold.yellow(title));

        if (arguments.length > 1) {
            for (var i = 0; i < text.length; i++) {
                console.log(chalk.italic.yellow("    " + text[i]));
            };
        };
    };
    static gconfirm(title = "", text = [""]) {
        console.log(chalk.bold.green(title));

        if (arguments.length > 1) {
            for (var i = 0; i < text.length; i++) {
                console.log(chalk.italic.green("    " + text[i]));
            };
        };
    };
};