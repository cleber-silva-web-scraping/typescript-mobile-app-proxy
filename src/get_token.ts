import fetch from 'node-fetch';

export const  getToken: any = async ({chave, crypted}: {chave: string, crypted: string}) => {
        const url = 'https://servicosonline.cpfl.com.br/agencia-webapi/api/token'
        const headers = {
            'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.0 Mobile/14E269 Safari/602.1',
            'Cookie': `rxvt=${chave}`,
        }
        const data = `client_id=agencia-virtual-cpfl-app&grant_type=instalacao_app&identificacao_encriptada=${crypted}`
        const response = await fetch(url, {method: 'POST', body: data, headers: headers});
       
        const tokens = await response.json();
    
        const token = tokens['access_token']
        const instalacao = JSON.parse(tokens['Instalacao'])

        const dados = {
            "Instalacao": instalacao['Instalacao'],
            "CodigoClasse": instalacao['CodClasse'],
            "CodEmpresaSAP": instalacao['CodEmpresaSAP'],
            "NumeroContrato": instalacao['Contrato'],
            "TipoGrafico":"Todos",
            "ParceiroNegocio": instalacao['ParceiroNegocio'],
            'client_id': 'agencia-virtual-cpfl-app',
            'grant_type': 'instalacao_app',
            identificacao_encriptada: `${crypted}`
        }

        const quitadas = {
            "RetornarDetalhes" : "true", 
            "CodigoFase": instalacao['CodigoFase'],
            "IndGrupoA": instalacao['IndGrupoA'],
            "Situacao": instalacao['Situacao'],
            "ContaContrato": instalacao['ContaContrato'],
            "GerarProtocolo": "true",
            "Instalacao": instalacao['Instalacao'],
            "CodigoClasse": instalacao['CodClasse'],
            "CodEmpresaSAP": instalacao['CodEmpresaSAP'],
            "NumeroContrato": instalacao['Contrato'],
            "ParceiroNegocio": instalacao['ParceiroNegocio'],
        }

        return {chave, token, histBody: dados, quitBody: quitadas }

    }