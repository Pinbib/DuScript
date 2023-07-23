const fs = require("fs");
const path = require("path");
const Console = require("./Tool/Console");
const date = require("./Tool/Date");
const { exec } = require("child_process");

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
                        try {
                            if (fs.existsSync(path.join(src, "Door.json"))) {
                                let work = true;

                                let door = require(path.resolve(path.join(src, "Door.json")));

                                let Door = {};

                                if (door.call) {
                                    if (door.call.length) {
                                        Door.call = [];
                                        for (var i = 0; i < door.call.length; i++) {
                                            if (typeof door.call[i] == "string") {
                                                if (fs.existsSync(path.resolve(door.call[i]))) {
                                                    Door.call.push(path.resolve(door.call[i]));
                                                } else {
                                                    Console.gerror("File not found.", ["From: DuScript[Door] launcher.", "?: " + path.resolve(door.call[i])]);
                                                    throw new Error();
                                                };
                                            } else {
                                                Console.gerror("Unexplained error.", ["From: DuScript[Door] launcher.", "?: " + path.join(src, "Door.json") + "[call][" + i + "]"]);
                                                throw new Error();
                                            };
                                        };
                                    } else {
                                        Console.gerror("The 'call' field must be an array.", ["From: DuScript[Door] launcher.", "?: " + path.join(src, "Door.json") + "[call]"]);
                                        throw new Error();
                                    };
                                } else {
                                    Console.gerror("File Door.json should have a 'call' field.", ["From: DuScript[Door] launcher.", "?: " + path.join(src, "Door.json") + "[call]"]);
                                    throw new Error();
                                };

                                if (door.module) {
                                    if (door.module.length) {
                                        Door.module = {};

                                        for (var i = 0; i < door.module.length; i++) {
                                            if (typeof door.module[i] == "object") {
                                                if (door.module[i].name && typeof door.module[i].name == "string") {
                                                    if (door.module[i].from && typeof door.module[i].from == "string") {
                                                        if (/^\#/gm.test(door.module[i].from)) {
                                                            door.module[i].from.replace(/^\#/gm, path.join(path.dirname(argv[1]), "Module"));
                                                        }

                                                        if (fs.existsSync(path.resolve(path.join(door.module[i].from)))) {
                                                            let imp = false;
                                                            try {
                                                                require(path.resolve(path.join(door.module[i].from)));
                                                                imp = true;
                                                            } catch (err) {
                                                                if (err) {
                                                                    Console.gerror("An error occurred while importing.", ["From: DuScript[Door] launcher.", "?: " + path.resolve(path.join(door.module[i].from))]);
                                                                    throw new Error();
                                                                };
                                                            };

                                                            if (imp) {
                                                                Door.module[door.module[i].name] = {
                                                                    line: require(path.resolve(path.join(door.module[i].from))),
                                                                    request: false
                                                                };
                                                            };
                                                        } else {
                                                            Console.gerror("File not found.", ["From: DuScript[Door] launcher.", "?: " + path.join(src, "Door.json") + "[module][" + i + "][from] = " + path.resolve(path.join(door.module[i].from))]);
                                                            throw new Error();
                                                        }
                                                    } else {
                                                        Console.gerror("Each module must have a 'from' field and it must be a string.", ["From: DuScript[Door] launcher.", "?: " + path.join(src, "Door.json") + "[module][" + i + "][from]"]);
                                                        throw new Error();
                                                    };
                                                } else {
                                                    Console.gerror("Each module must have a 'name' field and it must be a string.", ["From: DuScript[Door] launcher.", "?: " + path.join(src, "Door.json") + "[module][" + i + "][name]"]);
                                                    throw new Error();
                                                };
                                            } else {
                                                Console.gerror("Each 'module' element must be an object.", ["From: DuScript[Door] launcher.", "?: " + path.join(src, "Door.json") + "[module][" + i + "]"]);
                                                throw new Error();
                                            };
                                        };
                                    } else {
                                        Console.gerror("The 'module' field must be an array.", ["From: DuScript[Door] launcher.", "?: " + path.join(src, "Door.json") + "[module]"]);
                                        throw new Error();
                                    };
                                };

                                for (var i = 0; i < Door.call.length; i++) {
                                    let file = fs.readFileSync(Door.call[i], { encoding: "utf-8" });

                                    if (!Door.module) {
                                        require("./interpreter").main(file, Door.call[i], ";");
                                    } else {
                                        require("./interpreter").door(file, Door.call[i], Door, ";");
                                    };
                                };
                            } else {
                                Console.gerror("File not found in directory Door.json", ["From: DuScript[Door] launcher.", "?: " + path.join(src, "Door.json")]);
                            };
                        } catch (err) { };
                    } else {
                        Console.gerror("Unclear execution path.", ["From: DuScript launcher.", "?: " + src]);
                        Console.ginfo("If you need to run: ", ["File: must have the extension .du", "Folder: must end with /", "Example for file: /du/for/test.du", "Example for folder: /du/for/test/"]);
                    };
                } else {
                    Console.gerror("The file or directory does not exist.", ["From: DuScript launcher.", "?: " + src]);
                };
            };
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
        case "update":
            exec("npm update -g duscript", (err, stdout, stderr) => {
                if (err) {
                    console.log(err);
                };
                if (stdout) {
                    console.log(stdout);
                };
                if (stderr) {
                    console.log(stderr);
                };
            });
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