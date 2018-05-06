'use strict'

const Post = use('App/Models/Post')

class TagPostController {
  async index ({ view, params, request }) {
    let posts = await Post.query()
      .forIndex()
      .whereHas('tag', (builder) => {
        builder.where('slug', params.slug)
      })
      .paginate(request.input('page', 1), 2)

    return view.render('index', {
      posts
    })
  }
}

module.exports = TagPostController
