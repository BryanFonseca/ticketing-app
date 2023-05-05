import express from 'express';

const router = express.Router();

router.post('/api/users/signout', (req, res) => {
    // tell the user's browser to empty the cookie out
    req.session = null;
    res.send({});
});

export {router as signoutRouter};