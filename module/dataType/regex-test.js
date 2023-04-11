module.exports = (body, mainpath, door, variable, comment, declare, modul, global, tool) => {
    const { Variable, Formation } = require(tool);
    var data = body.split(" ");

    let regex = new RegExp(data[4], data[5])
    if (regex.test(
        Formation.var(
            variable, Formation.com(
                comment, Formation.var(
                    variable, data.slice(5).join(" ")
                )
            )
        )
    )
    ) {
        return true;
    } else {
        return false;
    }
}