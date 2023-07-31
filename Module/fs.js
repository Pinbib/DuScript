const fs = require("fs");
const path = require("path");

module.exports = (line, src, Com, Door) => {
    let work = true;
    try {
        if (line[1]) {
            switch (line[1]) {
                case "writeFile":
                    if (line[2]) {
                        let endPath = line.indexOf("::");
                        if (endPath > -1) {
                            let src = Com.Approve.Transform(line.slice(2, endPath).join(" "));
                            let data = Com.Approve.Transform(line.slice(endPath + 1).join(" "));

                            if (!fs.existsSync(path.dirname(src))) fs.mkdirSync(path.dirname(src), { recursive: true });
                            fs.writeFileSync(src, data, { encoding: "utf-8" });
                        } else {
                            Com.Console.gerror("The end of the path was not specified.", ["From:  Module fs", "?: " + line.join(" ")]);
                            throw new Error();
                        };
                    } else {
                        Com.Console.gerror("No recording path was specified.", ["From:  Module fs", "?: " + line.join(" ")]);
                        throw new Error();
                    };
                    break;
                case "writeDir":
                    if (line[2]) {
                        let src = Com.Approve.Transform(line.slice(2).join(" "));
                        if (!fs.existsSync(src)) fs.mkdirSync(src, { recursive: true });
                    } else {
                        Com.Console.gerror("No recording path was specified.", ["From:  Module fs", "?: " + line.join(" ")]);
                        throw new Error();
                    };
                    break;
                case "readFile":
                    if (line[2]) {
                        let endPath = line.indexOf("::");
                        if (endPath > -1) {
                            let src = Com.Approve.Transform(line.slice(2, endPath).join(" "));
                            let data = Com.Approve.Transform(line.slice(endPath + 1).join(" "));

                            if (fs.existsSync(src)) {
                                Com.Approve.Set({ name: data, type: "String", value: fs.readFileSync(src, { encoding: "utf-8" }) });
                            } else {
                                Com.Console.gerror("The file does not exist.", ["From:  Module fs", "?: " + line.join(" ")]);
                            }
                        } else {
                            Com.Console.gerror("The end of the path was not specified.", ["From:  Module fs", "?: " + line.join(" ")]);
                            throw new Error();
                        };
                    } else {
                        Com.Console.gerror("No reading path was specified.", ["From:  Module fs", "?: " + line.join(" ")]);
                        throw new Error();
                    };
                    break;
                case "readDir":
                    if (line[2]) {
                        let endPath = line.indexOf("::");
                        if (endPath > -1) {
                            let src = Com.Approve.Transform(line.slice(2, endPath).join(" "));
                            let data = Com.Approve.Transform(line.slice(endPath + 1).join(" "));

                            if (fs.existsSync(src)) {
                                Com.Approve.Set({ name: data, type: "Array", value: "[" + fs.readdirSync(src, { encoding: "utf-8" }).toString() + "]" });
                            } else {
                                Com.Console.gerror("The dir does not exist.", ["From:  Module fs", "?: " + line.join(" ")]);
                            }
                        } else {
                            Com.Console.gerror("The end of the path was not specified.", ["From:  Module fs", "?: " + line.join(" ")]);
                            throw new Error();
                        };
                    } else {
                        Com.Console.gerror("No reading path was specified.", ["From:  Module fs", "?: " + line.join(" ")]);
                        throw new Error();
                    };
                    break;
                case "removeDir":
                    if (line[2]) {
                        let src = Com.Approve.Transform(line.slice(2).join(" "));

                        if (fs.existsSync(src)) {
                            fs.unlinkSync(src);
                        } else {
                            Com.Console.gerror("The dir does not exist.", ["From:  Module fs", "?: " + line.join(" ")]);
                        }
                    } else {
                        Com.Console.gerror("No delete path was specified.", ["From:  Module fs", "?: " + line.join(" ")]);
                        throw new Error();
                    };
                    break;
                case "removeFile":
                    if (line[2]) {
                        let src = Com.Approve.Transform(line.slice(2).join(" "));

                        if (fs.existsSync(src)) {
                            fs.unlinkSync(src);
                        } else {
                            Com.Console.gerror("The file does not exist.", ["From:  Module fs", "?: " + line.join(" ")]);
                            throw new Error();
                        }
                    } else {
                        Com.Console.gerror("No delete path was specified.", ["From:  Module fs", "?: " + line.join(" ")]);
                        throw new Error();
                    };
                    break;
                case "exist":
                    if (line[2]) {
                        let endPath = line.indexOf("::");
                        if (endPath > -1) {
                            let src = Com.Approve.Transform(line.slice(2, endPath).join(" "));
                            let data = Com.Approve.Transform(line.slice(endPath + 1).join(" "));

                            if (fs.existsSync(src)) {
                                Com.Approve.Set({ name: data, type: "Bool", value: true });
                            } else {
                                Com.Approve.Set({ name: data, type: "Bool", value: false });
                            }
                        } else {
                            Com.Console.gerror("The end of the path was not specified.", ["From:  Module fs", "?: " + line.join(" ")]);
                            throw new Error();
                        };
                    } else {
                        Com.Console.gerror("No reading path was specified.", ["From:  Module fs", "?: " + line.join(" ")]);
                        throw new Error();
                    };
                    break;
                default:
                    Com.Console.gerror("The executable command is not known.", ["From:  Module fs", "?: " + line.join(" ")]);
                    throw new Error();
            }
        } else {
            Com.Console.gerror("Execute command was not specified.", ["From:  Module fs"]);
            throw new Error();
        }
    } catch (err) { if (err) work = !work };
    return work;
};