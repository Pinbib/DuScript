# DuScript

<img src="duScript.ico" width="500px">

This language was created as an experiment, it is made of shit and sticks, and it is also interpreted in JavaScript.

[GitHub](https://github.com/Pinbib/DuScript)

[npm](https://www.npmjs.com/package/duscript)

# Install 

```npm install duscript```

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