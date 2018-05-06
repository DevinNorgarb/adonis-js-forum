'use strict'

const { validateAll } = use('Validator')
const Post = use('App/Models/Post')
const moment = require('moment')

class PostReplyController {
  async store ({ request, response, session, auth, params }) {
    let post = await Post.query()
      .where('slug', '=', params.slug)
      .firstOrFail()

    const { body } = request.all()

    const rules = {
      body: 'required'
    }

    const validation = await validateAll(request.all(), rules)

    if (validation.fails()) {
      session
        .withErrors(validation.messages())
        .flashAll()

      return response.redirect('back')
    }

    const reply = new Post()

    reply.fill({
      body,
      parent_id: post.id,
      user_id: auth.user.id
    })

    post.last_reply_at = moment()

    await reply.save()
    await post.save()

    return response.redirect('back')
  }
}

module.exports = PostReplyController
