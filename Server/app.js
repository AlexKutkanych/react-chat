const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const Chatkit = require('@pusher/chatkit-server');
require('dotenv').config()

const chatkit = new Chatkit.default({
  instanceLocator: process.env.CHATKIT_INSTANCE_LOCATOR,
  key: process.env.CHATKIT_KEY,
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.get('/', async (req, res) => res.sendStatus(200));

app.post('/user', async (req, res) => {
  try {
    const { name } = req.body;
  
    await chatkit.createUser({ name, id: name });
    return res.sendStatus(201);
  } catch(err) {
    if (err.error === 'services/chatkit/user_already_exists') {
      res.sendStatus(200);
    } else {
      res.status(404).json(err.error_description);
    }
  }
});

app.post('/authenticate', (req, res) => {
  const authData = chatkit.authenticate({
    userId: req.query.user_id
  });

  res.status(authData.status)
     .send(authData.body);
});

app.get('/user/:userId/rooms', async (req, res) => {
  try {
    const { userId } = req.params; 

      const rooms = await chatkit.getUserRooms({ userId });
      return res.status(200).send(rooms);
    } catch(err) {
      console.log(err);
    }
  });
 
app.listen(process.env.PORT);