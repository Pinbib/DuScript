module.exports = (body, mainpath, door, variable, comment, declare, modul, global, tool) => {
    const { Variable, Formation } = require(tool);
    var data = body.split(" ");

    if (typeof global.Sample == "undefined") {
        global.Sample = {
            new: (data) => {
                let body = data.replace(/\,/gm, "").split(" ");
                let sample = global.Sample[body[0]];
                let end = {};
                for (var i = 0; i < sample.length; i++) {
                    end[sample[i]] = body[i + 1];
                }
                return end;

            }
        };
    }

    let name = data[1];
    let bod = data.slice(2).join(" ").replace(/^\(|\)$/gm, "").replace(/\,/gm, " ").split(" ");
    global.Sample[name] = bod;
}