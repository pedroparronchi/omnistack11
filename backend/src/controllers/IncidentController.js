const connection = require('../database/connection');

module.exports = {

    async index(req, resp) {
        const { page = 1 } = req.query;

        const [count] = await connection('incidents').count();
        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .limit(5)
            .offset((page-1) * 5)
            .select(['incidents.*', 'ongs.name', 'ongs.whatsapp', 'ongs.email', 'ongs.city', 'ongs.uf']);

        resp.header('X-Total-Count', count['count(*)']);
        return resp.json(incidents);
    },

    async store(req, resp) {
        const { title, description, value } = req.body;
        const ong_id = req.headers.authorization;

        const [id] = await connection('incidents').insert({
            ong_id,
            title,
            description,
            value,
        })

        return resp.json({id});
    },

    async destroy(req, resp) {
        const {id} = req.params;
        const ong_id = req.headers.authorization;

        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first();

        if(!incident) {
            return resp.status(400).json({error: 'Ong não existe'});
        }

        if(incident.ong_id != ong_id) {
            return resp.status(401).json({error: 'Opetarion not permitted'});
        }

        await connection('incidents').where('id', id).delete();

        return resp.status(204).send();
    }
}