'use strict'

const Schema = use('Schema')

class AddFulltextToPostsSchema extends Schema {
  up () {
    this.raw("ALTER TABLE posts ADD FULLTEXT (`title`, `body`)")
  }

  down () {

  }
}

module.exports = AddFulltextToPostsSchema
