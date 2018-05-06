'use strict'

const Post = use('App/Models/Post')

class HomeController {
  async index ({ view, request }) {
    let posts = await Post.query()
      .forIndex()
      .paginate(request.input('page', 1), 2)

    return view.render('index', {
      posts
    })
  }
}

module.exports = HomeController
