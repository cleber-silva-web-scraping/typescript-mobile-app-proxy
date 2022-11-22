
import fetch from 'node-fetch';

const avg_consumo = (historico: any) => {
    const grafico = historico['Graficos'].filter( (grafico: any) => grafico['TipoGrafico'] === 'HistoricoConsumo');
    const total = grafico[0]['Dados'].reduce( (acc: any, dado: any) => {
            return acc + parseFloat(dado['MediaConsumo']);
    }, 0.0)

    if(grafico[0]['Dados'].length > 0)
        return (total / grafico[0]['Dados'].length).toFixed(2);

    return 0.0
}

export const getHistorico: any = async (dados: any) => {
    const {chave, histBody, token} = dados
    const headers = {
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.0 Mobile/14E269 Safari/602.1',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Cookie': `rxvt=${chave}`,
    }
    const url = 'https://servicosonline.cpfl.com.br/agencia-webapi/api/historico-consumo/busca-graficos'

    const response = await fetch(url, {method: 'POST', body: JSON.stringify(histBody), headers: headers});
    const retorno = await response.json();
    const media = avg_consumo(retorno)
    return media
}