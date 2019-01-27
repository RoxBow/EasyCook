const express = require('express');
const eventRouter = express.Router({ mergeParams: true });
const User = require('../../models/User');
const Event = require('../../models/Event');
const Image = require('../../models/Image');
const multer  = require('multer');
const upload = multer({ dest: './uploads/' }); //setting the default folder for multer

class EventRouterClass {
  routes() {
    eventRouter.get('/', (req, res) => {
      Event.find({}).populate('creator').exec( (err, events) => {
        res.status(200).send({ events });
      });
    });

    eventRouter.post('/add', upload.single('fileData'), (req, res) => {
      const { name, date, address, description, image } = req.body;

      const eventAdded = new Event({
        name,
        date,
        address,
        description,
        creator: req.user._id
      });

      eventAdded.save(err => {
        if (err) {
          console.log('err', err);
          return res.status(400).send({ status: 'FAILURE', errorMessage: err });
        }

        console.log('OKKK')
        res.status(200).send({ status: 'SUCCESS', event: eventAdded });
      });
    });
  }

  init() {
    this.routes();
    return eventRouter;
  }
}

module.exports = EventRouterClass;
