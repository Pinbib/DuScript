const prompt = require("prompt-sync")();

module.exports = (line, Com, Door) => {
    return { type: "String", value: prompt() };
};