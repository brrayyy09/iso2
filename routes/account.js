import Router from "express";
const accountRouter = Router();

import { createRequire } from "module";
const require = createRequire(import.meta.url);

const USERS_BD = require("./bd.cjs");

accountRouter.get('/:guid', (req, res) => {
    const user = USERS_BD.find(i => i.guid === req.params.guid);
    
    if (!user) return res.statusCode(404).send();

    return res.send();
});

//POST

accountRouter.post('/', (req, res) => {
    const {name, guid} = req.body;
    const user = USERS_BD.find(i => i.guid === guid);

    if (!name || !guid) return res.statusCode(400).send();
    if (user) return res.statusCode(409).send();

    USERS_BD.push({
        guid, name
    });
    return res.send();
});

//pacth

accountRouter.patch('/:guid', (req, res) => {
    const {name} = req.body;
    const user = USERS_BD.find(i => i.guid === req.params.guid);

    if (!name) return res.statusCode(400).send();
    if (!user) return res.statusCode(404).send();

    user.name = name;
    return res.send();
});

//delete

accountRouter.delete('/:guid', (req, res) => {
    const userIndex = USERS_BD.findIndex(i => i.guid === req.params.guid);
    
    if (userIndex === -1) return res.statusCode(404).send();

    USERS_BD.splice(userIndex, 1);
    
    return res.send();
});

export default accountRouter;