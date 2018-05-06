'use strict'

const Schema = use('Schema')

class AddRepliesToPostsSchema extends Schema {
  up () {
    this.table('posts', (table) => {
      table.integer('parent_id').unsigned().index()
    })
  }

  down () {
    this.table('posts', (table) => {
      table.dropColumn('parent_id')
    })
  }
}

module.exports = AddRepliesToPostsSchema
