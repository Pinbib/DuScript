# DuScript

<img src="duScript.ico" width="500px">

This language was created as an experiment, it is made of shit and sticks, and it is also interpreted in JavaScript.

[GitHub](https://github.com/Pinbib/DuScript)

[npm](https://www.npmjs.com/package/duscript)

# Install 

I recommend installing the package globally using the command:

```npm install -g duscript```

Next, to find out where the package was installed, use the command:

```npm list -g duscript --depth=0 -p```

Next, we can create a shortcut to the start.bat file, which is located in the folder obtained above by the command.
Now we can run just by clicking on the shortcut.

# Start

After switching to the CLI format, now to run the code you need to run the file start.bat and enter the path to the executable file with the permission .du

## approve

The "approve" command is used to create variables.

Sample:

    approve [name] = [type] [value];

    The name parameter specifies the name of the variable, the data type, the value, the value of the variable.

### Data type
There are eight types of data in total:

- Int
- String
- Boolean
- Array
- Object
- Av
- ViewCondition
- !

Let's analyze each of them:

### Int

Int - used to create variables with numbers and manipulate them.

Sample:

    approve [name] = Int [value];

### String

String - used to create variables with text.

Sample:

    approve [name] = String [value];

### Boolean

Boolean - used to create variables with a boolean expression.

Sample:

    approve [name] = Boolean [true||false];

### Array

Array - used to create arraysю

Sample:

    approve [name] = Boolean [1,2,3];

### Object

Object - used to create json objects.

Sample:

    approve [name] = Object {
        "[name]": 1
    };

### Av

Av - used to create variables with text, mathematical operations and the ability to insert variables.

Sample:

    approve a = Int 2;
    approve b = Int 2;
    approve [name] = Av @a+@b;

Will: 4

Variables are accessed through the symbol "@" which is a global object of variables, all text except for accessing variables must be in single or double quotes, to connect something with something, the + symbol is used.

Sample:

    approve a = Int 2;
    approve b = Int 2;
    approve [name] = Av "a+b: "+@a+@b;

Will: a+b: 4

### ViewCondition

ViewCondition - a boolean expression is placed in a variable with this type, a boolean expression in this type is not specified, it is assigned when the specified condition is met.

Sample:

    approve a = Int 2;
    approve [name] = ViewCondition @a==2;

Will: true

### !

! - reference to a comment, each comment has its own index starting from zero.

Sample:

    // :)
    approve [name] = ! 0;

Will: :)

## call

call - calls a variable or function

Sample:

    call [call-type] [type] [name];

The call-type parameter indicates what is being called, there are two types of call:
- variable
- function

The type parameter is only needed if the call-type is "variable" , there are five types in total:
- v

v - used when displaying text and numbers

Sample:

    approve msg = String string;
    call variable v msg;
    approve msg1 = Int 12;
    call variable v msg1;

Will: string
Will: 12

- Array

Array - for outputting arrays

Sample:

    approve msg = Array [1,2,3];
    call variable Array msg 1;

Will: 2

- Object

Object - to display an object

Sample:

    approve msg = Object {
        "a": 1
    };
    call variable Object msg.a;

Will: 1

- @

@ - reference to the global variable object

Sample:

    approve msg = Int 1;
    call variable @;

Will: { msg: 1 }

- !

! - access to the global object comment

Sample: 

    // :)
    call variable !;

Will: :)

If the call-type is specified as "function" then the type parameter is not needed

## printl

print - prints anything specified in () everything works as in variables with type "As"

Sample:

    approve msg = Int 1;
    printl ("msg: "+@msg);

Will: msg: 1

Space before () is required
## if

if - from the name it is clear

Splitting lines inside the "if" block is carried out through the symbol "^"

Space before () is required

Sample:

    approve msg = Int 1;
    if (@msg==1) {
        call variable v msg^
    };

Will: 1

## while

while - a loop that checks the condition before each execution, and line breaking occurs through "&^" in the if block there cannot be a cycle, but in the while loop, the if block can be and if there is an if block in the while, line breaking occurs as usual through " ^".

Sample:

    while (1==1) {
        printl (1)&^
        if (2==1) {
            printl (2)^
        }&^
    };

Will: 11111111111111111111111111111111111++

## //

// - used to create comments after the command requires a space

# Manifest
To run several files and connect between them, when specifying the src, you do not need to specify the path to the desired file, but you need to specify the path to the folder with the files and at the end you must add "/" and the specified folder should contain the file Door.json.

Sample file Door.json:
```
{
    "call": [
        "1.du",
        "2.du"
    ]
}
```

An array of executable files is placed in the call

1.du:

    approve msg = Int 1;

2.du:

    printl (@msg);

Will: 1

You can also close access to variables and comments from other files with the "clear" command, here is an example:

Door.json:
```
{
    "call": [
        "1.du",
        "clear",
        "2.du"
    ]
}
```

An array of executable files is placed in the call

1.du:

    approve msg = Int 1;

2.du:

    printl (@msg);

Will:  

The "clear" command completely clears the global objects variable , comment.