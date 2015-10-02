# eslint-plugin-ubervu

ESLint rules applicable to the uberVU org

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-ubervu`:

```
$ npm install eslint-plugin-ubervu --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-ubervu` globally.

## Usage

Add `ubervu` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "ubervu"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "ubervu/rule-name": 2
    }
}
```

## Supported Rules

* Fill in provided rules here





