var scripts;
var variable = {};
var coment = {
    "index": 0
};
function createComent(type, value) {
    coment['comment' + coment.index] = {};
    coment['comment' + coment.index].type = type;
    coment['comment' + coment.index].value = value;
    coment.index++;
}
function createVar(name, value) {
    variable[name] = value;
}
function editVar(name, value) {
    variable[name] = value;
}
function createArr(name, value) {
    variable[name] = {};
    variable[name].iValue = 'Arr';
    variable[name].eValue = value;
}
function createObject(name, value) {
    variable[name] = {};
    variable[name].iValue = 'Obj';
    variable[name].eValue = value;
}
for (var i = 0; i < document.querySelectorAll('script').length; i++) {
    var script = document.querySelectorAll('script');
    if (script[i].attributes.type.value == 'text/duScript') {
        scripts = script[i].innerHTML;
        i += script.length + 64;
    }
}

var lines = scripts.split(';');

for (var i = 0; i < lines.length; i++) {
    let line = lines[i].replace(/^\s+|\s+$/g, "").split(' ');

    if (line[0] == 'approve') {
        if (line.length == 2) {
            createVar(line[1], 'void');

        } else if (line[3].indexOf('\'') != -1) {
            createVar(line[1], line[3].replace(/['"]+/g, ''));

        } else if (line[3] == 'Array') {
            var arr = line.slice(4, line.length)
            createArr(line[1], arr);

        } else if (line[3] == 'JSON') {
            var get = line.slice(4).join('');
            var obj = JSON.parse(get);
            createObject(line[1], obj);

        } else if (line[3] == 'get') {
            if (line[4] == 'value') {
                if (variable[line[5]] && typeof variable[line[5]].iValue !== 'undefined') {
                    if (variable[line[5]].iValue == 'Arr') {
                        createVar(line[1], variable[line[5]].eValue[`${line[6]}`]);
                    } else if (variable[line[5]].iValue == 'Obj') {
                        createObject(line[1], variable[line[5]].eValue);
                    }
                } else {
                    createVar(line[1], variable[line[5]]);
                }
            }
        } else {
            createVar(line[1], line[3]);
        }

    } else if (line[0] == 'call') {
        if (line.length > 2) {
            for (let r = 1; r < line.length; r++) {
                if (variable[line[r]] && typeof variable[line[r]].iValue !== 'undefined') {
                    if (variable[line[r]].iValue == 'Arr') {
                        console.log(variable[line[r]].eValue[line[r + 1]]);
                    }
                    //JSON
                }
            }

        } else {
            console.log(variable[line[1]])
        }

    } else if (line[0] == 'Edit') {
        if (line[3] == 'Math') {
            var m = [];
            for (var r = 4; r < line.length; r++) {
                m.push(line[r]);
            }
            var rs = eval(m.join(''));
            editVar(line[1], rs)

        } else {
            editVar(line[1], line[3]);
        }

    } else if (line[0] == 'get') {
        if (line[1] == 'all') {
            console.log(variable[line[2]].eValue);
        }
    } else if (line[0].indexOf('(') != -1) {
        var newLine = line.join(' ').split(/[()]/gm);
        var data = {
            "command": newLine[0],
            "value": newLine.slice(1, newLine.length - 1)[0].split(' ')
        };
        if (data.command == 'printl') {
            var log = [];
            for (var r = 0; r < data.value.length; r++) {
                if (typeof variable[data.value[r]] !== 'undefined') {
                    log.push(variable[data.value[r]]);
                } else {
                    log.push(data.value[r]);
                }
            }
            console.log(log.join(' '));
        } else if (data.command == 'if') {
            var command = newLine[2];
            if (data.value) {
                var lines2 = command.replace(/[{}]/gm, '').split(/[:]$/gm);
                console.log(lines2[0].replace(/^\s+|\s+$/g, ""));
                for (var r = 0; r < lines2.length; r++) {
                    var line2 = lines2[r].replace(/^\s+/gm, '').split(' ');


                    if (line2[0] == 'approve') {
                        if (line2.length == 2) {
                            createVar(line2[1], 'void');

                        } else if (line2[3].indexOf('\'') != -1) {
                            createVar(line2[1], line2[3].replace(/['"]+/g, ''));

                        } else if (line2[3] == 'Array') {
                            var arr = line2.slice(4, line2.length)
                            createArr(line2[1], arr);

                        } else if (line2[3] == 'JSON') {
                            var get = line2.slice(4).join('');
                            var obj = JSON.parse(get);
                            createObject(line2[1], obj);

                        } else if (line2[3] == 'get') {
                            if (line2[4] == 'value') {
                                if (variable[line2[5]] && typeof variable[line2[5]].iValue !== 'undefined') {
                                    if (variable[line2[5]].iValue == 'Arr') {
                                        createVar(line2[1], variable[line2[5]].eValue[`${line2[6]}`]);
                                    } else if (variable[line2[5]].iValue == 'Obj') {
                                        createObject(line2[1], variable[line2[5]].eValue);
                                    }
                                } else {
                                    createVar(line2[1], variable[line2[5]]);
                                }
                            }
                        } else {
                            createVar(line2[1], line2[3]);
                        }

                    } else if (line2[0] == 'call') {
                        if (line2.length > 2) {
                            for (let g = 1; g < line2.length; g++) {
                                if (variable[line2[g]] && typeof variable[line2[g]].iValue !== 'undefined') {
                                    if (variable[line2[g]].iValue == 'Arr') {
                                        console.log(variable[line2[g]].eValue[line2[g + 1]]);
                                    }
                                    //JSON
                                }
                            }

                        } else {
                            console.log(variable[line2[1]])
                        }

                    } else if (line2[0] == 'Edit') {
                        if (line2[3] == 'Math') {
                            var m = [];
                            for (var g = 4; g < line2.length; g++) {
                                m.push(line2[g]);
                            }
                            var rs = eval(m.join(''));
                            editVar(line2[1], rs)

                        } else {
                            editVar(line2[1], line2[3]);
                        }

                    } else if (line2[0] == 'get') {
                        if (line2[1] == 'all') {
                            console.log(variable[line2[2]].eValue);
                        }
                    } else if (line2[0].indexOf('(') != -1) {
                        var newLine = line2.join(' ').split(/[()]/gm);
                        var data = {
                            "command": newLine[0],
                            "value": newLine.slice(1, newLine.length - 1)[0].split(' ')
                        };
                        if (data.command == 'printl') {
                            var log = [];
                            for (var g = 0; g < data.value.length; g++) {
                                if (typeof variable[data.value[g]] !== 'undefined') {
                                    log.push(variable[data.value[g]]);
                                } else {
                                    log.push(data.value[g]);
                                }
                            }
                            console.log(log.join(' '));
                        }
                    }
                }
            }
        }
    } else if (line[0] == '//' || 'rem:' || '::') {
        createComent(line[0], line.slice(1, line.length));
    }
}