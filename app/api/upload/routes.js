import request from '../../shared/JSONRequest.js';
import {db_url} from '../config/database.js'
import multer from 'multer'

export default app => {
  var upload = multer({ dest: __dirname+'/../../../uploads/' });

  app.post('/api/upload', upload.any(), (req, res) => {
    request.get(db_url + '/' + req.body.document)
    .then((response) => {
      let doc = response.json;
      doc.file = req.files[0];

      return request.post(db_url, doc);
    })
    .then((response) => {
      res.json(response.json);
    })
    .catch(console.log)
  });

}
