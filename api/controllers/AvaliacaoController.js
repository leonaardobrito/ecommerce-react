const mongoose = require("mongoose");

Avaliacao = mongoose.model("Avaliacao");
Produto = mongoose.model("Produto");

class AvaliacaoController {
    // GET / - index
    async index(req, res, next) {
        const { loja, produto } = req.query;
        try {
            const avaliacoes = await Avaliacao.find({ loja, produto });
            return res.send({ avaliacoes });
        } catch(e) {
            next(e);
        }
    }

    // GET /:id - show
    async show(req, res, next) {
        const { loja, produto } = req.query;
        const { id } = req.params;
        try {
            const avaliacoes = await Avaliacao.findOne({ _id, loja, produto });
            return res.send({ avaliacao });
        } catch(e) {
            next(e);
        }       
    }

    // POST / - store
    async store(req, res, next) {
        const { nome, texto, pontuacao } = req.body;
        const { loja, produto } = req.query;
        try {
            const avaliacao = new Avaliacao({ nome, texto, pontuacao, loja, produto });
            const _produto = Produto.findById(produto);
            _produto.avaliacoes.push(avaliacao._id);
            await _produto.save();
            await avaliacao.save();
            return res.send({ avaliacao });
        } catch(e) {
            next(e);
        }
    }

    // DELETE /:id - remove
    async remove(req, res, next) {
        try {
            const avaliacao = await Avaliacao.findById(req.params.id);
            const produto = await Produto.findById(avaliacao.produto);
            produto.avaliacoes = produto.avaliacoes.filter(item => item.toString() !== avaliacao._id.toString());
            await produto.save();
            await avaliacao.remove();
            return res.send({ deletado: true });
        } catch (e) {
            next(e)
        }
    }
}

module.exports = AvaliacaoController;