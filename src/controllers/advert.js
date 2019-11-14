import Advert from '../models/advert'
import config from '../config'
import formidable from 'formidable'
import { basename } from 'path'

export function showAdvert(req, res, next) {
  const page = Number.parseInt(req.query.page, 10)
  const pageSize = 5
  Advert.find()
    .skip((page - 1) * pageSize)
    .limit(pageSize)
    .exec()
    .then(adverts => {
      return proCount(adverts)
    })
    .then(result => {
      const [adverts, totalPage] = result
      res.render('advert_list.html', {
        adverts,
        totalPage,
        page
      })
    })
    .catch(err => {
      next(err)
    })
  function proCount(adverts) {
    return new Promise((resolve, reject) => {
      Advert.count((err, count) => {
        if (err) {
          reject(err)
        }
        const totalPage = Math.ceil(count / pageSize)
        resolve([adverts, totalPage])
      })
    })
  }
}
export function showAddAdvert(req, res) {
  res.render('advert_add.html')
}
export function addAdvert(req, res, next) {
  // promise 封装
  proFormidable(req)
    .then(result => {
      const [fields, files] = result
      const body = fields
      body.image = basename(files.image.path)
      const advertOne = new Advert({
        title: body.title,
        image: body.image,
        link: body.link,
        start_time: body.start_time,
        end_time: body.end_time
      })
      return advertOne.save()
    })
    .then(result => {
      res.json({
        err_code: 0
      })
    })
    .catch(err => {
      next(err)
    })

  function proFormidable(req) {
    return new Promise((resolve, reject) => {
      const form = formidable.IncomingForm()

      form.uploadDir = config.uploads_path
      form.keepExtensions = true

      form.parse(req, (err, fields, files) => {
        if (err) {
          reject(err)
        }
        resolve([fields, files])
      })
    })
  }
}

export function showEditAdvert(req, res, next) {
  Advert.findById(req.params.advertId, (err, doc) => {
    if (err) {
      return next(err)
    }
    res.render('advert_add.html', {
      edit: doc
    })
  })
}

export function editAdvert(req, res, next) {
  const body = req.body
  Advert.findById(req.body.id, (err, advert) => {
    if (err) {
      return next(err)
    }
    advert.title = body.title
    advert.link = body.link
    advert.start_time = body.start_time
    advert.end_time = body.end_time
    advert.last_modified = Date.now()
    advert.save((err, result) => {
      if (err) {
        return next(err)
      }
      res.json({
        err_code: 0
      })
    })
  })
  // Advert.findById(req.body.id)
  //   .then(advert => {
  //     advert.title = body.title
  //     advert.image = body.image
  //     advert.link = body.link
  //     advert.start_time = body.start_time
  //     advert.end_time = body.end_time
  //     advert.last_modified = Date.now()
  //     return advert.save()
  //   })
  //   .then(result => {
  //     res.render('/advert')
  //   })
}

export function removeAdvert(req, res, next) {
  Advert.remove({ _id: req.params.advertId }, err => {
    if (err) {
      return next(err)
    }
    res.redirect('/advert')
  })
}
