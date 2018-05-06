'use strict'

const { validateAll } = use('Validator')
const Post = use('App/Models/Post')
const moment = require('moment')

class PostController {
  async show ({ view, params }) {
    let post = await Post.query()
      .with('user')
      .with('tag')
      .with('replies')
      .with('replies.user')
      .with('answer')
      .with('answer.user')
      .where('slug', '=', params.slug)
      .firstOrFail()

    return view.render('posts.show', {
      post: post.toJSON()
    })
  }

  create ({ view }) {
    return view.render('posts.create')
  }

  async store ({ request, session, response, auth }) {
    const { title, tag, body } = request.all()

    const rules = {
      title: 'required',
      tag: 'required|exists:tags,id',
      body: 'required'
    }

    const validation = await validateAll(request.all(), rules)

    if (validation.fails()) {
      session.withErrors(validation.messages())
        .flashAll()

      return response.redirect('back')
    }

    const post = new Post()

    post.fill({
      title,
      body,
      tag_id: tag,
      user_id: auth.user.id,
      last_reply_at: moment()
    })

    await post.save()

    return response.route('home') // @todo update
  }
}

module.exports = PostController
