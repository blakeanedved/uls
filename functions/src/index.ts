import * as functions from 'firebase-functions';
import express from 'express';
import cors from 'cors';
import * as admin from 'firebase-admin';

admin.initializeApp();
const db = admin.firestore();

const app = express();

let urls: { [name: string]: string };

db.collection('shortenedUrls').onSnapshot((snapshot) => {
  urls = snapshot.docs.reduce((acc: any, cur) => {
    acc[cur.id] = cur.data().url;
    return acc;
  }, {});
});

app.use(cors({ origin: true }));

app.get('/debug', (_, res) => {
  res.send(JSON.stringify(urls));
});

app.get('/debug/:url', (req, res) => {
  res.send(JSON.stringify({ urls, exists: req.params.url in urls }));
});

app.post('/createNewLink', async (req, res) => {
  if (req.body.path && req.body.url) {
    db.collection('shortenedUrls')
      .doc(req.body.path)
      .create({ url: req.body.url })
      .then((_) => {
        res.send({ status: 'successful' });
      })
      .catch((error) => {
        res.send({ status: 'error', error });
      });
  } else {
    res.send({ status: 'error', error: 'Please provide path and url' });
  }
});

app.get('/:url', (req, res) => {
  const url: string = req.params.url;

  if (url in urls) {
    res.redirect(urls[url]);
  } else {
    res.send('That link doesnt exist');
  }
});

export const linkManager = functions.https.onRequest(app);
