const Console = require("../Tool/Console");
const fs = require("fs");
const path = require("path");

class Approve {
    constructor(src = "") {
        this.src = src;
    };
    Get(name = "") {
        if (fs.existsSync(this.src)) {
            if (fs.existsSync(path.join(this.src, name + ".var"))) {
                let ap = fs.readFileSync(path.join(this.src, name + ".var"), { encoding: "utf-8" }).split(" ");
                return {
                    type: ap[0],
                    value: ap.slice(1).join(" ")
                };
            } else {
                Console.gerror(`The variable \"${name}\" has not yet been approved.`, ["From: [Approve] module.", "Command: Approve.Get"]);
                return undefined;
            };
        } else {
            Console.gerror("The variable storage was not initialized.", ["From: [Approve] module.", "Command: Approve.Get"]);
            return undefined;
        };
    };
    Set(variable = { name: "", type: "", value }) {
        if (fs.existsSync(this.src)) {
            if (!fs.existsSync(path.join(this.src, variable.name + ".var"))) {
                fs.writeFileSync(path.join(this.src, variable.name + ".var"), variable.type + " " + variable.value);
            } else {
                if (this.Get(variable.name).type === variable.type || this.Get(variable.name).type === "undefined") {
                    fs.writeFileSync(path.join(this.src, variable.name + ".var"), variable.type + " " + variable.value);
                } else {
                    Console.gerror(`You cannot change the type of variable \"${this.Get(variable.name).type}\" to \"${variable.type}\".`, ["From: [Approve] module.", "Command: Approve.Set"]);
                };
            };
        } else {
            Console.gerror("The variable storage was not initialized.", ["From: [Approve] module.", "Command: Approve.Set"]);
        };
    };
    Del(name = "") {
        if (fs.existsSync(this.src)) {
            if (fs.existsSync(path.join(this.src, name + ".var"))) {
                fs.unlinkSync(path.join(this.src, name + ".var"));
            };
        } else {
            Console.gerror("The variable storage was not initialized.", ["From: [Approve] module.", "Command: Approve.Del"]);
        };
    }
    tu(variable = { type: "", value: "" }) {
        switch (variable.type) {
            case "String":
                if (variable.value == "null") {
                    variable.value = null;
                };
                return variable;
            case "Int":
                if (variable.value == "null") {
                    variable.value = null;
                } else {
                    variable.value = Number(variable.value);
                };
                return variable;
            case "Bool":
                if (variable.value == "null") {
                    variable.value = null;
                } else if (variable.value == "true") {
                    variable.value = true;
                } else if (variable.value == "false") {
                    variable.value = false;
                };
                return variable;
            case "Array":
                if (variable.value == "null") {
                    variable.value = null;
                } else {
                    try {
                        const parsedValue = JSON.parse(variable.value);
                        variable.value = Array.isArray(parsedValue) ? parsedValue : null;
                    } catch (err) {
                        if (err) {
                            variable.value = null;
                        };
                    };
                };
                return variable;
            case "Object":
                if (variable.value == "null") {
                    variable.value == null;
                } else {
                    try {
                        variable.value = JSON.parse(variable.value);
                    } catch (err) {
                        if (err) {
                            variable.value = null;
                        };
                    };
                };
                return variable;
            default:
                return variable;
        };
    };
    Transform(text = "") {
        function getPropertyValue(object, propertyPath) {
            const properties = propertyPath.split('.');
            let value = object;

            for (const property of properties) {
                if (Array.isArray(value) && !isNaN(property)) {
                    const index = parseInt(property);
                    if (value[index] !== undefined) {
                        value = value[index];
                    } else {
                        return null;
                    };
                } else if (value && value.hasOwnProperty(property)) {
                    value = value[property];
                } else {
                    return null;
                };
            };

            return value;
        };

        return text.replace(/@(\S+)/gm, (match, word) => {
            const words = word.split(".");
            const variableName = words[0];
            const propertyPath = words.slice(1).join(".");
            const variableValue = this.tu(this.Get(variableName)).value;

            if (propertyPath) {
                const propertyValue = getPropertyValue(variableValue, propertyPath);
                return propertyValue ? propertyValue.toString() : match;
            };

            return variableValue ? variableValue.toString() : match;
        }).replace(/\\s+/gm, " ");
    };

};

module.exports = Approve;