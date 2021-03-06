import relationships from './relationships.js';
import needsAuthorization from '../auth/authMiddleware';

export default app => {
  app.post('/api/relationships/bulk', needsAuthorization(['admin', 'editor']), (req, res) => {
    relationships.bulk(req.body, req.language)
    .then(response => res.json(response))
    .catch(res.error);
  });

  app.post('/api/references', needsAuthorization(['admin', 'editor']), (req, res) => {
    relationships.save(req.body, req.language)
    .then(response => res.json(response))
    .catch(res.error);
  });

  app.delete('/api/references', needsAuthorization(['admin', 'editor']), (req, res) => {
    relationships.delete({_id: req.query._id}, req.language)
    .then(response => res.json(response))
    .catch(res.error);
  });

  app.get('/api/references/by_document/:id', (req, res) => {
    relationships.getByDocument(req.params.id, req.language)
    .then((response) => res.json(response))
    .catch(res.error);
  });

  app.get('/api/references/group_by_connection/:id', (req, res) => {
    relationships.getGroupsByConnection(req.params.id, req.language, {excludeRefs: true, user: req.user})
    .then((response) => {
      res.json(response);
    })
    .catch(res.error);
  });

  app.get('/api/references/search/:id', (req, res) => {
    req.query.filter = JSON.parse(req.query.filter || '{}');
    relationships.search(req.params.id, req.query, req.language, req.user)
    .then(results => {
      return res.json(results);
    })
    .catch(res.error);
  });

  app.get('/api/references/count_by_relationtype', (req, res) => {
    relationships.countByRelationType(req.query.relationtypeId)
    .then((response) => res.json(response))
    .catch(res.error);
  });
};
