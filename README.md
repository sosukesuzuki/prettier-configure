# prettier-configure

Run my setting up for [Prettiero](https://github.com/prettier/prettier) and [Husky](https://github.com/typicode/husky) automatically.

## Usage

```sh
npm -g install prettier-configure
prettier-configure
```

## `.prettierrc.yaml`

| rule            | value  |
| --------------- | ------ |
| `trailingComma` | `all`  |
| `tabWidth`      | `4`    |
| `singleQuote`   | `true` |

## `.prettierignore`

```
/node_modules
package.json
```
