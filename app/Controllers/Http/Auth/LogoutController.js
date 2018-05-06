'use strict'

class LogoutController {
  async logout ({ response, auth }) {
    await auth.logout()

    return response.route('home')
  }
}

module.exports = LogoutController
