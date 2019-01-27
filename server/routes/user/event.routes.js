const express = require('express');
const eventRouter = express.Router({ mergeParams: true });
const Event = require('../../models/Event');
const Image = require('../../models/Image');

class EventRouterClass {
  routes() {
    const populateFields = ['participants', 'creator', 'interested'];

    eventRouter.get('/', (req, res) => {
      Event.find({})
        .populate(populateFields)
        .exec((err, events) => {
          res.status(200).send({ events });
        });
    });

    eventRouter.put('/add', (req, res) => {
      const { name, date, address, description, image } = req.body;

      const eventAdded = new Event({
        name,
        date,
        address,
        description,
        creator: req.user._id
      });

      eventAdded.save((err, event) => {
        if (err) {
          console.log('err', err);
          return res.status(400).send({ status: 'FAILURE', errorMessage: err });
        }

        event.populate('creator', (err, eventAdded) => {
          if (err) {
            console.log(err);
            return res.status(400).send({ status: 'FAILURE', errorMessage: err });
          }
          res.status(200).send({ status: 'SUCCESS', event: eventAdded });
        });
      });
    }); // put /add

    eventRouter.put('/toggleRegister', (req, res) => {
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
