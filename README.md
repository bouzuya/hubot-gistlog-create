# hubot-gistlog-create

A Hubot script that creates a gistlog entry

## Installation

    $ npm install git://github.com/bouzuya/hubot-gistlog-create.git

or

    $ # TAG is the package version you need.
    $ npm install 'git://github.com/bouzuya/hubot-gistlog-create.git#TAG'

## Example

    bouzuya> hubot help gistlog create
      hubot> hubot gistlog create <yyyy-mm-dd> <title> - create a gistlog entry

    bouzuya> hubot gistlog create 2014-09-28 title
      hubot> description : 2014-09-28 title
             content ?
    bouzuya> hoge fuga piyo
      hubot> description : 2014-09-28 title
             content :

             hoge fuga piyo

             OK ? (ok/cancel)
    bouzuya> ok
      hubot> OK. please wait ...
      hubot> Created. https://gist.github.com/bb386fb3342511e59bf6

## Configuration

See [`src/scripts/gistlog-create.coffee`](src/scripts/gistlog-create.coffee).

## Development

`npm run`

## License

[MIT](LICENSE)

## Author

[bouzuya][user] &lt;[m@bouzuya.net][mail]&gt; ([http://bouzuya.net][url])

## Badges

[![Build Status][travis-badge]][travis]
[![Dependencies status][david-dm-badge]][david-dm]
[![Coverage Status][coveralls-badge]][coveralls]

[travis]: https://travis-ci.org/bouzuya/hubot-gistlog-create
[travis-badge]: https://travis-ci.org/bouzuya/hubot-gistlog-create.svg?branch=master
[david-dm]: https://david-dm.org/bouzuya/hubot-gistlog-create
[david-dm-badge]: https://david-dm.org/bouzuya/hubot-gistlog-create.png
[coveralls]: https://coveralls.io/r/bouzuya/hubot-gistlog-create
[coveralls-badge]: https://img.shields.io/coveralls/bouzuya/hubot-gistlog-create.svg
[user]: https://github.com/bouzuya
[mail]: mailto:m@bouzuya.net
[url]: http://bouzuya.net
