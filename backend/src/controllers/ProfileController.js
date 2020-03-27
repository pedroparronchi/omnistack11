const connection = require('../database/connection');

module.exports = {
    async index(req, resp){
        const ong_id = q=req.headers.authorization;

        if(!ong_id) {
            resp.status(401).json({error: "Você precisa estar logado para isso"});
        }

        const incidents = await connection('incidents')
            .where('ong_id', ong_id)
            .select('*');
        
        return resp.json(incidents);
    }
}