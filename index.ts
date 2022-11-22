//import express from 'express'

import { getHistorico } from "./src/get_historico"
import { getParticipacao } from "./src/get_participacao"
import { getQuitada } from "./src/get_quitada"
import { getToken } from "./src/get_token"
import { encript } from "./src/pgp"
import { init as consumerKafka } from "./src/kafka/consumer"
import { sleep } from "./src/helpers/sleep"
import express from 'express'
const PORT: number = Number(process.env.PORT) || 3088

type Payload = {
    times: number,
    from: string,
    chave: string, 
    status?: number,
    media?: string,
    participacao?:string,
    body?: any
}

let feitos = 0
let refeitos = 0

const runner = async (payload: Payload) => {
    feitos++;
    try{

        console.log('Processando: ', payload)
        const crypted = await encript(payload.chave)
        await sleep(0.5)
        const dados = await getToken({chave: payload.chave, crypted})
        await sleep(0.5)

        if(payload.status === 1){
            refeitos++
            const quitada = await getQuitada({...dados, partBody: payload.body})
            await sleep(0.5)
            const participacao = await getParticipacao({...dados, ...quitada})
            await sleep(0.5)
            return ({...payload, ...participacao})
        }


        if(payload.status === 2){
            refeitos++
            console.log('Only participacao')
            const participacao = await getParticipacao({...dados, partBody: payload.body})
            await sleep(0.5)
            return ({...payload, ...participacao})
        }

        if(!payload.status || payload.status === 0){
            if(payload.status) refeitos++;
            const media = await getHistorico(dados)
            await sleep(0.5)
            const quitada = await getQuitada(dados)
            await sleep(0.5)
            const participacao = await getParticipacao({...dados, ...quitada})
            await sleep(0.5)
            return ({...payload, media, ...participacao})
        }
    }catch(err){
        console.log(err)
        return ({...payload, status: 0 })
    }
        
}

const consumerKfk = async () => {
    await consumerKafka(runner)
}
 const app = express()


app.get('/', (req, res) =>{
    res.json({status: 'ok', feitos, refeitos, agent: `${process.env.AGENT_NAME}`})
})


// Start Express Server
app.listen(PORT, () => {
    consumerKfk()
    console.log(`Express server is listening on ${PORT}`);
});

  
