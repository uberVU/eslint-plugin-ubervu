# Check for function args proper indentation. (indent-function-args)

## Rule Details

Check if function arguments are properly indented according to Google JS
style guide.

The following patterns are considered warnings:

```js

// Indent at 4 spaces.
foobar(arg1,
    arg2,
      arg3);

// Indent at parent parenthesis.
foobar(arg1,
       arg2,
    arg3);
```

The following patterns are not warnings:

```js
foo(arg1, arg2);

foobar(arg1,
    arg2);

foo(arg1,
    arg2);

foobar(arg1,
    arg2,
    arg3);

var foo = bar(arg1, arg2,
    arg3, arg4);
```
