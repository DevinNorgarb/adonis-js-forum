'use strict'

const { isEmpty } = require('lodash')
const slugify = require('slugify')

class Slugify {
  register (Model) {
    Model.addHook('afterCreate', (modelInstance) => {
      if (isEmpty(modelInstance.title)) {
        return
      }

      let slugTitle = slugify(modelInstance.title, {
        lower: true
      })

      modelInstance.slug = `${slugTitle}-${modelInstance.id}`
      modelInstance.save()
    })
  }
}

module.exports = Slugify
