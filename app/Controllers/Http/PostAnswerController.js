'use strict'

const { validateAll } = use('Validator')
const Post = use('App/Models/Post')

class PostAnswerController {
  async destroy ({ params, auth, response }) {
    let post = await Post.query()
      .where('slug', '=', params.slug)
      .ownedByUser(auth.user)
      .firstOrFail()

    post.answer_id = null
    await post.save()

    return response.redirect('back')
  }

  async store ({ request, response, auth, params }) {
    const { answer_id } = request.all()

    let post = await Post.query()
      .where('slug', '=', params.slug)
      .ownedByUser(auth.user)
      .whereHas('replies', (builder) => {
        builder.where('id', '=', answer_id)
      })
      .firstOrFail()

    const rules = {
      answer_id: 'required|exists:posts,id'
    }

    const validation = await validateAll(request.all(), rules)

    if (validation.fails()) {
      return response.redirect('back')
    }

    post.answer_id = answer_id
    await post.save()

    return response.redirect('back')
  }
}

module.exports = PostAnswerController
