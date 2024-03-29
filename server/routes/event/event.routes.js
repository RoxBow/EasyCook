const express = require('express');
const eventRouter = express.Router({ mergeParams: true });
const Event = require('../../models/Event');
const Image = require('../../models/Image');
const multer = require('multer');
const { getExtFromMime, randomId } = require('../../helpers.js');

const storage = multer.diskStorage({
  destination: './assets/avatars/events/',
  filename: (req, file, cb) => {
    const extension = getExtFromMime(file.mimetype);
    const id = randomId();

    cb(null, id + '.' + extension);
  }
});

const upload = multer({
  storage
});

class EventRouterClass {
  routes() {
    const populateFields = [
      { path: 'participants', populate: { path: 'avatar' } },
      { path: 'creator', populate: { path: 'avatar' } },
      { path: 'interested', populate: { path: 'avatar' } },
      'image'
    ];

    eventRouter.get('/', (req, res) => {
      Event.find({})
        .populate(populateFields)
        .exec((err, events) => {
          res.status(200).send({ events });
        });
    });

    eventRouter.put('/add', upload.single('file'), (req, res) => {
      const { name, date, address, description, price } = req.body;

      const avatar = new Image({
        uri: (req.file && req.file.path) || 'assets/avatars/events/event_default.jpg'
      });

      avatar.save();

      const eventAdded = new Event({
        name,
        date,
        address,
        description,
        price,
        creator: req.user._id,
        image: avatar
      });

      eventAdded.save((err, event) => {
        if (err) {
          console.log('err', err);
          return res.status(400).send({ status: 'FAILURE', errorMessage: err });
        }

        event.populate(['creator', 'image'], (err, eventAdded) => {
          if (err) {
            console.log(err);
            return res.status(400).send({ status: 'FAILURE', errorMessage: err });
          }
          res.status(200).send({ status: 'SUCCESS', event: eventAdded });
        });
      });
    }); // put /add

    eventRouter.put('/toggleParticipate', (req, res) => {
      const { idEvent } = req.body;

      Event.findById(idEvent, (err, event) => {
        if (err) console.log(err);

        const indexUserParticipate = event.participants.findIndex(
          ({ _id }) => _id.toString() === req.user._id.toString()
        );

        if (indexUserParticipate > -1) {
          event.participants.splice(indexUserParticipate, 1);
        } else {
          event.participants.push(req.user._id);
        }

        event.save((err, event) => {
          if (err) {
            console.log('err', err);
            return res.status(400).send({ status: 'FAILURE', errorMessage: err });
          }

          event.populate(populateFields, (err, event) => {
            if (err) {
              console.log(err);
              return res.status(400).send({ status: 'FAILURE', errorMessage: err });
            }
            res.status(200).send({ status: 'SUCCESS', event });
          });
        });
      });
    });

    eventRouter.put('/toggleInterested', (req, res) => {
      const { idEvent } = req.body;

      Event.findById(idEvent, (err, event) => {
        if (err) console.log(err);

        const indexUserInterested = event.interested.findIndex(
          ({ _id }) => _id.toString() === req.user._id.toString()
        );

        if (indexUserInterested > -1) {
          event.interested.splice(indexUserInterested, 1);
        } else {
          event.interested.push(req.user._id);
        }

        event.save((err, event) => {
          if (err) {
            console.log('err', err);
            return res.status(400).send({ status: 'FAILURE', errorMessage: err });
          }

          event.populate(populateFields, (err, event) => {
            if (err) {
              console.log(err);
              return res.status(400).send({ status: 'FAILURE', errorMessage: err });
            }
            res.status(200).send({ status: 'SUCCESS', event });
          });
        });
      });
    });
  } // end routes()

  init() {
    this.routes();
    return eventRouter;
  }
}

module.exports = EventRouterClass;
