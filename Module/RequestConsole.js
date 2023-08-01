const prompt = require("prompt-sync")();

module.exports = (line, src, Com, Door) => {
    let work = true;
    try {
        if (line[1]) {
            Com.Approve.Set({ name: line[1], type: "String", value: prompt() });
        } else {
            Com.Console.gerror("It was not specified where the value will be written.", ["From:  Module RequestConsole", "?: " + line.join(" ")]);
            throw new Error();
        };

    } catch (err) { if (err) work = !work; };

    return work;
};