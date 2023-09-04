module.exports = (line, src, Com, Door) => {
    let status = true;

    if (line[1]) {
        try {
            let f = new Function(Com.Approve.Transform(line.slice(1).join(" ")));
            f();
        } catch (err) { if (err) status = !status; };
    } else status = !status;

    return status;
}