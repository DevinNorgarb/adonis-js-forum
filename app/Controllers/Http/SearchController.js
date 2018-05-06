'use strict'

const Post = use('App/Models/Post')

class SearchController {
  async index ({ view, request }) {
    let posts = await Post.query()
      .forIndex()
      .whereRaw('MATCH (title, body) AGAINST (? IN BOOLEAN MODE)', request.input('q'))
      .paginate(request.input('page', 1), 2)

    return view.render('index', {
      posts
    })
  }
}

module.exports = SearchController
