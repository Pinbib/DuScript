module.exports = (body, mainpath, door, variable, comment, declare, modul, global, tool) => {
    const { Variable, Formation } = require(tool);
    var data = body.split(" ");

    var val = Formation.var(variable, data.splice(4).join(" ")).split("");
    var end = [];

    for (var i = 0; i < val.length; i++) {
        var e = val[i];

        switch (e) {
            case "0":
                end.push("00,4")
                break;
            case "1":
                end.push("00,2")
                break;
            case "2":
                end.push("00,6")
                break;
            case "3":
                end.push("00,5")
                break;
            case "4":
                end.push("00,8")
                break;
            case "5":
                end.push("00,3")
                break;
            case "6":
                end.push("00,1")
                break;
            case "7":
                end.push("00,9")
                break;
            case "8":
                end.push("00,0")
                break;
            case "9":
                end.push("00,7")
                break;
            case " ":
                end.push("00.0")
                break;
            case ".":
                end.push("00.01")
                break;
            case ",":
                end.push("00.2")
                break;
            case "-":
                end.push("00.3")
                break;
            case 'q':
                end.push('01.1');
                break;
            case 'w':
                end.push('01.2');
                break;
            case 'e':
                end.push('01.3');
                break;
            case 'a':
                end.push('01.4');
                break;
            case 's':
                end.push('01.5');
                break;
            case 'd':
                end.push('01.6');
                break;
            case 'z':
                end.push('01.7');
                break;
            case 'x':
                end.push('01.8');
                break;
            case 'c':
                end.push('01.9');
                break;
            case 'r':
                end.push('01.00');
                break;
            case 't':
                end.push('01.10');
                break;
            case 'y':
                end.push('01.11');
                break;
            case 'f':
                end.push('01.12');
                break;
            case 'g':
                end.push('01.13');
                break;
            case 'h':
                end.push('01.14');
                break;
            case 'v':
                end.push('01.15');
                break;
            case 'b':
                end.push('01.16');
                break;
            case 'n':
                end.push('01.17');
                break;
            case 'm':
                end.push('01.18');
                break;
            case 'j':
                end.push('01.19');
                break;
            case 'k':
                end.push('01.200');
                break;
            case 'l':
                end.push('01.20');
                break;
            case 'u':
                end.push('01.21');
                break;
            case 'i':
                end.push('01.22');
                break;
            case 'o':
                end.push('01.23');
                break;
            case 'p':
                end.push('01.24');
                break;
            case 'Q':
                end.push('11.1');
                break;
            case 'W':
                end.push('11.2');
                break;
            case 'E':
                end.push('11.3');
                break;
            case 'A':
                end.push('11.4');
                break;
            case 'S':
                end.push('11.5');
                break;
            case 'D':
                end.push('11.6');
                break;
            case 'Z':
                end.push('11.7');
                break;
            case 'X':
                end.push('11.8');
                break;
            case 'C':
                end.push('11.9');
                break;
            case 'R':
                end.push('11.00');
                break;
            case 'T':
                end.push('11.10');
                break;
            case 'Y':
                end.push('11.11');
                break;
            case 'F':
                end.push('11.12');
                break;
            case 'G':
                end.push('11.13');
                break;
            case 'H':
                end.push('11.14');
                break;
            case 'V':
                end.push('11.15');
                break;
            case 'B':
                end.push('11.16');
                break;
            case 'N':
                end.push('11.17');
                break;
            case 'M':
                end.push('11.18');
                break;
            case 'J':
                end.push('11.19');
                break;
            case 'K':
                end.push('11.200');
                break;
            case 'L':
                end.push('11.20');
                break;
            case 'U':
                end.push('11.21');
                break;
            case 'I':
                end.push('11.22');
                break;
            case 'O':
                end.push('11.23');
                break;
            case 'P':
                end.push('11.24');
                break;
            default:
                end.push(e);
                break;
        }
    }
    return end.join(" ");
}