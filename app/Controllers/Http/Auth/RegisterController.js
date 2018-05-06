'use strict'

const { validateAll } = use('Validator')
const User = use('App/Models/User')

class RegisterController {
  index ({ view }) {
    return view.render('auth/register')
  }

  async register ({ request, response, session, auth }) {
    const { email, username, password } = request.all()

    const rules = {
      email: 'required|email|unique:users,email',
      username: 'required|unique:users,username',
      password: 'required'
    }

    const validation = await validateAll(request.all(), rules)

    if (validation.fails()) {
      session.withErrors(validation.messages())
        .flashAll()

      return response.redirect('back')
    }

    const user = new User()

    user.fill({
      email,
      username,
      password
    })

    await user.save()

    await auth.attempt(email, password)

    return response.route('home')
  }
}

module.exports = RegisterController
