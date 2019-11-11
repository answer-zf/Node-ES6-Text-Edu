import Advert from '../models/advert'
import config from '../config'
import formidable from 'formidable'
import { basename } from 'path'

export function showAdvert(req, res, next) {
  Advert.find((err, adverts) => {
    if (err) {
      return next(err)
    }
    res.render('advert_list.html', { adverts })
  })
}
export function showAddAdvert(req, res, next) {
  res.render('advert_add.html')
}
export function addAdvert(req, res, next) {
  const form = formidable.IncomingForm()

  form.uploadDir = config.uploads_path
  form.keepExtensions = true

  form.parse(req, (err, fields, files) => {
    if (err) {
      return next(err)
    }
    const body = fields
    body.image = basename(files.image.path)
    const advertOne = new Advert({
      title: body.title,
      image: body.image,
      link: body.link,
      start_time: body.start_time,
      end_time: body.end_time
    })
    advertOne.save((err, result) => {
      if (err) {
        return next(err)
      }
      res.json({
        err_code: 0
      })
    })
  })
}

export function showEditAdvert(req, res, next) {
  Advert.findById(req.params.advertId, (err, doc) => {
    if (err) {
      return next(err)
    }
    res.json({
      err_code: 0,
      result: doc
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
    advert.image = body.image
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
}

export function removeAdvert(req, res, next) {
  Advert.remove({ _id: req.params.advertId }, (err) => {
    if (err) {
      return next(err)
    }
    res.json({
      err_code: 0
    })
  })
}
