// Description
//   A Hubot script that creates a gistlog entry
//
// Configuration:
//   HUBOT_GISTLOG_CREATE_ACCESS_TOKEN
//
// Commands:
//   hubot gistlog create <yyyy-mm-dd> <title> - create a gistlog entry
//
// Author:
//   bouzuya <m@bouzuya.net>
//
module.exports = function(robot) {
  var ACCESS_TOKEN, confirmation, content, description, setContent, setDescription, user;
  ACCESS_TOKEN = process.env.HUBOT_GISTLOG_CREATE_ACCESS_TOKEN;
  user = null;
  description = null;
  content = null;
  confirmation = function(res) {
    var okOrCancel, params, url;
    if (!((user != null ? user.id : void 0) === res.envelope.user.id && description && content)) {
      return;
    }
    okOrCancel = res.match[1];
    if (okOrCancel.match(/ok/i)) {
      res.send('OK. please wait ...');
      url = 'https://api.github.com/gists';
      params = {
        description: description,
        "public": true,
        files: {
          "index.md": {
            content: content
          }
        }
      };
      res.http(url).query({
        access_token: ACCESS_TOKEN
      }).post(JSON.stringify(params))(function(err, _, body) {
        if (err != null) {
          return res.send(err);
        }
        return res.send("Created. " + (JSON.parse(body).html_url));
      });
    } else {
      res.send('Canceled.');
    }
    user = null;
    description = null;
    return content = null;
  };
  setDescription = function(res) {
    if (user) {
      return res.send('please wait...');
    }
    user = res.envelope.user;
    description = res.match[1];
    return res.send("description : " + description + "\ncontent ?");
  };
  setContent = function(res) {
    if (!((user != null ? user.id : void 0) === res.envelope.user.id && !content)) {
      return;
    }
    content = res.match[0];
    return res.send("description : " + description + "\ncontent :\n\n" + content + "\n\nOK ? (ok/cancel)");
  };
  robot.hear(/(ok|cancel)/i, confirmation);
  robot.hear(/.*/m, setContent);
  return robot.respond(/gistlog create (\d{4}-\d{2}-\d{2} .*)$/i, setDescription);
};
