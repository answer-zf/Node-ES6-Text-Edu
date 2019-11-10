import express from 'express'
import Advert from '../models/advert'

export function addAdvert(req, res, next) {
  const body = req.body
  const advertOne = new Advert({
    image: body.image,
    link: body.link,
    start_time: body.start_time,
    end_time: body.end_time,
    title: body.title
  })
  advertOne.save((err, result) => {
    if (err) {
      return next(err)
    }
    res.json({
      err_code: 0
    })
  })
}

export function listAdvert(req, res, next) {
  Advert.find((err, docs) => {
    if (err) {
      return next(err)
    }
    res.json({
      err_code: 0,
      result: docs
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
