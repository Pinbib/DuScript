const Console = require("../Tool/Console");
const fs = require("fs");
const path = require("path");

class Declare {
    constructor(src = "") {
        this.src = src;
    };
    Get(name = "", use) {
        if (fs.existsSync(this.src)) {
            if (fs.existsSync(path.join(this.src, name + ".dec"))) {
                let func = fs.readFileSync(path.join(this.src, name + ".dec"), { encoding: "utf-8" });
                if (use) {
                    require("../interpreter").main(func, path.join(this.src, name + ".dec"), "~");
                };
                return func;
            } else {
                Console.gerror(`The function ${name} was not declared.`, ["From: [Declare] module.", "Command: Declare.Get"]);
            };
        } else {
            Console.gerror("The function storage was not initialized.", ["From: [Declare] module.", "Command: Declare.Get"]);
        };
    };
    Set(declare = { name: "", value: "" }) {
        if (fs.existsSync(this.src)) {
            if (!fs.existsSync(path.join(this.src, declare.name + ".dec"))) {
                fs.writeFileSync(path.join(this.src, declare.name + ".dec"), declare.value);
            } else {
                Console.gerror("It is not possible to declare a function that has already been declared.", ["From: [Declare] module.", "Command: Declare.Set"]);
            };
        } else {
            Console.gerror("The function storage was not initialized.", ["From: [Declare] module.", "Command: Declare.Set"]);
        };
    };
    Del(name = "") {
        if (fs.existsSync(this.src)) {
            if (fs.existsSync(path.join(this.src, name + ".dec"))) {
                fs.unlinkSync(path.join(this.src, name + ".dec"));
            };
        } else {
            Console.gerror("The function storage was not initialized.", ["From: [Declare] module.", "Command: Declare.Del"]);
        };
    };
};

module.exports = Declare;