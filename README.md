# prettier-configure

Setting up for [Prettier](https://github.com/prettier/prettier) and [Husky](https://github.com/typicode/husky) automatically.

## Usage

```sh
npx prettier-configure
```

### Options

**manager**

Choose a package manager (in `yarn` or `npm`) to use for dependent installations.(Default: `yarn`)

```sh
npx prettier-configure --manager=npm
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
