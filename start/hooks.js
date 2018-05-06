const { hooks } = require('@adonisjs/ignitor')
const pluralize = require('pluralize')

hooks.after.providersBooted(() => {
  const View = use('View')
  const Tag = use('App/Models/Tag')

  Tag.all().then((tags) => {
    View.global('tags', tags)
  }).catch(() => {
    //
  })

  View.global('pluralize', (singular, length) => {
    return pluralize(singular, length)
  })

  View.global('parseInt', (number) => {
    return parseInt(number)
  })

  View.global('paginationArray', (total) => {
    return Array.from(new Array(total), (value, index) => {
      return index + 1
    })
  })

  const Validator = use('Validator')
  const Database = use('Database')

  const exists = async (data, field, message, args, get) => {
    const value = get(data, field)

    if (!value) {
      return
    }

    const [table, column] = args

    const found = await Database.table(table).where(column, value).first()

    if (!found) {
      throw message
    }
  }

  Validator.extend('exists', exists)
})
