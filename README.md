# Bindup

`npm i -g bindup`

A CLI for rendering markdown directories into epub files. This readme will be fleshed out further in time.

Read the full docs at 
- https://benjaminaugust.github.io/BindUp/

## Configure your book

To properly configure your book for Bindup:

- Keep your book in a `manuscript` folder
- Order your folders and files by prepending a number, then the `~` symbol to the front of their titles
- Create a json configuration file

### Organize your book in a manuscript folder

An example of how your manuscript directory might look is:

- `manuscript`
  - `1~ Dedication.md`
  - `2~ Chapter 1.md`
  - `3~ Chapter 2.md`

The number and `~` will be removed when the book is rendered to an epub.

It works the same for nested folders:

- `manuscript`
  - `1~ Dedication.md`
  - `2~ Chapter 1` (Folder)
    - `1~ Section A.md`
    - `2~ Section B.md`
  - `3~ Chapter 2` (Folder)
    - `1~ Part 1.md`
    - `2~ Part 2.md`

### Create a json config file

You must customize settings for your book by creating a JSON file with valid properties. 

Example `book-config.json`:

```json
{
  "author": "Benjamin August",
      "title": "Book 1: Welcome to the Multiverse",
      "manuscript": "./myBookDirectory",
    "formats": [
        "epub"
    ]
}
```

[Check the spec for a full list of valid properties](https://benjaminaugust.github.io/BindUp/book).

Required properties:

- `"title"` - `string` The title of the book
- `"author"` - `string | string[]` Author(s) of the book. Can be a single string or array of strings if multiple
- `"formats"` - `string[]` The formats to export your book to. Only `"epub"` is a valid value for now. More formats potentially coming in the future
- `"manuscript"` - `string` The relative path to the `manuscript` directory, where your book should be stored

Examples of optional properties include:

- `"description"` - `string` The description of the book
- `"date"` - `string` The publication date
- `"lang"` - `string` The book's language as an ISO language code

## Render epubs

Use `bindup render book_config_path_here`

That will render an epub to the directory the command is being run from.

For example:

`bindup render my-book-config.json`