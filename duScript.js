const fs = require("fs");
const path = require("path");
const Console = require("./Tool/Console");
const date = require("./Tool/Date");
const { exec } = require("child_process");
const prompt = require("prompt-sync")();

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
                                                            door.module[i].from = path.join(__dirname, "Module", door.module[i].from.replace(/^\#/gm, "")) + ".js";
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

                                if (door.dataType) {
                                    if (door.dataType.length) {
                                        Door.dataType = {};

                                        for (var i = 0; i < door.dataType.length; i++) {
                                            if (typeof door.dataType[i] == "object") {
                                                if (door.dataType[i].name && typeof door.dataType[i].name == "string") {
                                                    if (door.dataType[i].from && typeof door.dataType[i].from == "string") {
                                                        if (/^\#/gm.test(door.module[i].from)) {
                                                            door.dataType[i].from = path.join(__dirname, "DataType", door.dataType[i].from.replace(/^\#/gm, "")) + ".js";
                                                        }

                                                        if (fs.existsSync(path.resolve(path.join(door.dataType[i].from)))) {
                                                            let imp = false;
                                                            try {
                                                                require(path.resolve(path.join(door.dataType[i].from)));
                                                                imp = true;
                                                            } catch (err) {
                                                                if (err) {
                                                                    Console.gerror("An error occurred while importing.", ["From: DuScript[Door] launcher.", "?: " + path.resolve(path.join(door.dataType[i].from))]);
                                                                    throw new Error();
                                                                };
                                                            };

                                                            if (imp) {
                                                                Door.dataType[door.dataType[i].name] = {
                                                                    line: require(path.resolve(path.join(door.dataType[i].from))),
                                                                    request: false
                                                                };
                                                            };
                                                        } else {
                                                            Console.gerror("File not found.", ["From: DuScript[Door] launcher.", "?: " + path.join(src, "Door.json") + "[dataType][" + i + "][from] = " + path.resolve(path.join(door.dataType[i].from))]);
                                                            throw new Error();
                                                        }
                                                    } else {
                                                        Console.gerror("Each dataType must have a 'from' field and it must be a string.", ["From: DuScript[Door] launcher.", "?: " + path.join(src, "Door.json") + "[dataType][" + i + "][from]"]);
                                                        throw new Error();
                                                    };
                                                } else {
                                                    Console.gerror("Each dataType must have a 'name' field and it must be a string.", ["From: DuScript[Door] launcher.", "?: " + path.join(src, "Door.json") + "[dataType][" + i + "][name]"]);
                                                    throw new Error();
                                                };
                                            } else {
                                                Console.gerror("Each 'dataType' element must be an object.", ["From: DuScript[Door] launcher.", "?: " + path.join(src, "Door.json") + "[dataType][" + i + "]"]);
                                                throw new Error();
                                            };
                                        };
                                    } else {
                                        Console.gerror("The 'dataType' field must be an array.", ["From: DuScript[Door] launcher.", "?: " + path.join(src, "Door.json") + "[dataType]"]);
                                        throw new Error();
                                    };
                                };

                                for (var i = 0; i < Door.call.length; i++) {
                                    let file = fs.readFileSync(Door.call[i], { encoding: "utf-8" });
                                    require("./interpreter").door(file, Door.call[i], Door, ";");
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
        case "init":
            if (true) {
                try {
                    let end = false;
                    let call = [];

                    Console.log("Enter the name of the file in the \"call\" field, after entering, press enter (to finish entering, enter --end):");

                    while (!end) {
                        let cal = prompt().replace(/\s+/gm, "");

                        if (cal == "") { } else if (cal == "--end") {
                            end = !end;
                        } else {
                            call.push(cal);
                        };
                    };

                    if (end) end = !end

                    Console.log("Add modules?(yes/no)");

                    let addModules;
                    let modules = [];

                    if (prompt().replace(/\s+/gm, "") == "yes") {
                        addModules = true;

                        Console.log("The first word will be the name of the module, and then the path from where the module will be imported.(to finish entering, enter --end) \nExample: name ./path/to/import/module");

                        while (!end) {
                            let mo = prompt().trim();

                            if (mo == "") { } else if (mo == "--end") { end = !end; } else {
                                let m = mo.split(" ");

                                if (mo.length > 1) {
                                    modules.push({
                                        name: m[0],
                                        from: m.slice(1).join(" ")
                                    });
                                } else throw new Error();
                            };
                        };
                    } else {
                        addModules = false;
                    };

                    if (end) end = !end;

                    Console.log("Add dataType?(yes/no)");

                    let addDataType;
                    let dataType = [];

                    if (prompt().replace(/\s+/gm, "") == "yes") {
                        addDataType = true;

                        Console.log("The first word will be the name of the dataType, and then the path from where the dataType will be imported.(to finish entering, enter --end) \nExample: name ./path/to/import/dataType");

                        while (!end) {
                            let dt = prompt().trim();

                            if (dt == "") { } else if (dt == "--end") { end = !end; } else {
                                let d = dt.split(" ");

                                if (dt.length > 1) {
                                    dataType.push({
                                        name: d[0],
                                        from: d.slice(1).join(" ")
                                    });
                                } else throw new Error();
                            };
                        };
                    } else {
                        addDataType = false;
                    };

                    if (call.length > 0) {
                        let door = {
                            call: call
                        };

                        if (addModules) {
                            door.module = modules
                        };
                        if (addDataType) {
                            door.dataType = dataType;
                        };

                        fs.writeFileSync("./Door.json", JSON.stringify(door));
                    } else throw new Error();
                } catch (err) { if (err) Console.error("An error occurred while initializing the \"Door.json\" file.") };
            };
            break;

        case "-y-init":
            fs.writeFileSync("./Door.json", `{\n    "call": [\n     "./main.du"\n   ],\n    "module": [\n       {\n         "from": "./Module/Hello.js",\n          "name": "hello"\n       }\n     ],\n    "dataType": [\n         {\n             "from": "./dataType/World.js",\n            "name": "world"\n       }\n     ]\n}`);

            if (fs.existsSync("./Module") && fs.existsSync("./dataType")) {
                fs.writeFileSync("./Module/Hello.js", "module.exports = (line, src, Com, Door) => { Com.Console.log(\"Hello, \" + Com.Approve.Transform(line.slice(1).join(\" \"))); return true; }");
                fs.writeFileSync("./dataType/World.js", "module.exports = (line, Com, Door) => { return \"World!\"; };");
                fs.writeFileSync("./main.du", "father hello;\nmother world;\napprove World = world;\nhello @World;\n// :)");
            } else {
                fs.mkdirSync("./Module");
                fs.mkdirSync("./dataType");
                fs.writeFileSync("./Module/Hello.js", "module.exports = (line, src, Com, Door) => { Com.Console.log(\"Hello, \" + Com.Approve.Transform(line.slice(1).join(\" \"))); return true; }");
                fs.writeFileSync("./dataType/World.js", "module.exports = (line, Com, Door) => { return \"World!\"; };");
                fs.writeFileSync("./main.du", "father hello;\nmother world;\napprove World = world;\nhello @World;\n// :)");
            };
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