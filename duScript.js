const fs = require("fs");
const path = require("path");
const Console = require("./Tool/Console");

const argv = process.argv;

if (!fs.existsSync("./Approve")) {
    fs.mkdirSync("./Approve");
    Console.gconfirm("The variable storage location was initialized.", [path.join(argv[1], "Approve")]);
};

if (!fs.existsSync("./Declare")) {
    fs.mkdirSync("./Declare");
    Console.gconfirm("The function storage location was initialized.", [path.join(argv[1], "Declare")]);
};

if (argv.length > 2) {
    switch (argv[2]) {
        case "run":
            if (true) {
                const src = argv.slice(3).join(" ");

                if (fs.existsSync(src)) {
                    if (/.du$/gm.test(src)) {
                        require("./interpreter").main(fs.readFileSync(src, { encoding: "utf-8" }), src, ";");
                    } else if (/\/$/gm.test(src)) {
                        require("./interpreter").door(src);
                    } else {
                        Console.gerror("Unclear execution path.", ["From: DuScript launcher.", "?: " + src]);
                        Console.ginfo("If you need to run: ", ["File: must have the extension .du", "Folder: must end with /", "Example for file: /du/for/test.du", "Example for folder: /du/for/test/"])
                    }
                } else {
                    Console.gerror("The file or directory does not exist.", ["From: DuScript launcher.", "?: " + src]);
                };
            }
            break;
        case "version":
            Console.gconfirm(`DuScript version: ${require("./package.json").version}.`, []);
            break;
        case "-v":
            Console.gconfirm(`DuScript version: ${require("./package.json").version}.`, []);
            break;
        case "-src":
            Console.gconfirm(argv[1], [])
            break;
        case "-gen":
            fs.writeFileSync(`./du.bat`, `@echo off\nnode ${argv[1]} %*`)
            break;
        default:
            Console.gerror("Unknown executable command.", ["From: DuScript launcher.", "?: " + argv[2]]);
            break;
    };
} else {
    Console.gerror("You did not specify an executable command.", ["From: DuScript launcher."])
};

if (fs.existsSync("./Approve")) {
    fs.readdir("./Approve", (err, dir) => {
        if (!err) {
            for (var i = 0; i < dir.length; i++) {
                fs.unlinkSync(path.join("./Approve", dir[i]));
            };
        };
    });
};

if (fs.existsSync("./Declare")) {
    fs.readdir("./Declare", (err, dir) => {
        if (!err) {
            for (var i = 0; i < dir.length; i++) {
                fs.unlinkSync(path.join("./Declare", dir[i]));
            };
        };
    });
};