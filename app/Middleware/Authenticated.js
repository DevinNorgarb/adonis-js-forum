'use strict'

class Authenticated {
  async handle ({ request, response, auth, session }, next) {
    try {
      await auth.check()
    } catch (error) {
      session.put('_intended', request.url())

      return response.route('auth.login')
    }

    await next()
  }
}

module.exports = Authenticated
