const { default: axios } = require("axios");

const buscarCEP = async (req, res) => {
    try {
        let { cep } = req.params;
        
        // Remove todos os caracteres não numéricos
        cep = cep.replace(/\D/g, '');
        
        // Validação melhorada
        if (!cep || cep.length !== 8) {
            return res.status(400).json({ 
                error: 'CEP inválido',
                message: 'O CEP deve conter exatamente 8 dígitos numéricos',
                exemplo: 'Use formatos como 01001000 ou 01001-000'
            });
        }

        const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
        
        if (response.data.erro) {
            return res.status(404).json({ 
                error: 'CEP não encontrado',
                message: 'O CEP informado não foi encontrado na base de dados'
            });
        }

        res.json({
            cep: response.data.cep,
            logradouro: response.data.logradouro || 'Não informado',
            bairro: response.data.bairro || 'Não informado',
            cidade: response.data.localidade,
            estado: response.data.uf,
            complemento: response.data.complemento || 'Não informado',
            ibge: response.data.ibge || 'Não disponível'
        });

    } catch (error) {
        console.error('Erro ao buscar CEP:', error);
        res.status(500).json({ 
            error: 'Erro ao buscar CEP',
            message: 'Ocorreu um erro no servidor ao processar sua requisição',
            detalhes: error.message
        });
    }
};

module.exports = {
    buscarCEP
};