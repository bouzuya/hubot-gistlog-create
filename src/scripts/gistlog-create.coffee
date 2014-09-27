# Description
#   A Hubot script that creates a gistlog entry
#
# Configuration:
#   HUBOT_GISTLOG_CREATE_ACCESS_TOKEN
#
# Commands:
#   hubot gistlog create <yyyy-mm-dd> <title> - create a gistlog entry
#
# Author:
#   bouzuya <m@bouzuya.net>
#
module.exports = (robot) ->

  ACCESS_TOKEN = process.env.HUBOT_GISTLOG_CREATE_ACCESS_TOKEN

  user = null
  description = null
  content = null

  confirmation = (res) ->
    return unless user?.id is res.envelope.user.id and description and content
    okOrCancel = res.match[1]
    if okOrCancel.match(/ok/i)
      res.send 'OK. please wait ...'
      url = 'https://api.github.com/gists'
      params =
        description: description
        public: true
        files:
          "index.md":
            content: content
      res
        .http(url)
        .query(access_token: ACCESS_TOKEN)
        .post(JSON.stringify(params)) (err, _, body) ->
          return res.send(err) if err?
          res.send "Created. #{JSON.parse(body).html_url}"
    else
      res.send 'Canceled.'
    user = null
    description = null
    content = null

  setDescription = (res) ->
    return res.send('please wait...') if user
    user = res.envelope.user
    description = res.match[1]
    res.send """
      description : #{description}
      content ?
    """

  setContent = (res) ->
    return unless user?.id is res.envelope.user.id and !content
    content = res.match[0]
    res.send """
      description : #{description}
      content :

      #{content}

      OK ? (ok/cancel)
    """

  robot.hear /(ok|cancel)/i, confirmation

  robot.hear /.*/m, setContent

  robot.respond /gistlog create (\d{4}-\d{2}-\d{2} .*)$/i, setDescription
