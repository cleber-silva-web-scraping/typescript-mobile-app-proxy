//import express from 'express'

import { getHistorico } from "./get_historico"
import { getParticipacao } from "./get_participacao"
import { getQuitada } from "./get_quitada"
import { getToken } from "./get_token"
import { encript } from "./pgp"
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
        
        const dados = await getToken({chave: payload.chave, crypted})
        

        if(payload.status === 1){
            refeitos++
            const quitada = await getQuitada({...dados, partBody: payload.body})
            
            const participacao = await getParticipacao({...dados, ...quitada})
            
            return ({...payload, ...participacao})
        }


        if(payload.status === 2){
            refeitos++
            console.log('Only participacao')
            const participacao = await getParticipacao({...dados, partBody: payload.body})
            
            return ({...payload, ...participacao})
        }

        if(!payload.status || payload.status === 0){
            if(payload.status) refeitos++;
            const media = await getHistorico(dados)
            
            const quitada = await getQuitada(dados)
            
            const participacao = await getParticipacao({...dados, ...quitada})
            
            return ({...payload, media, ...participacao})
        }
    }catch(err){
        return ({...payload, status: 0 })
    }
        
}


const app = express()


app.get('/', (_: any, res: any) =>{
    res.json({status: 'ok', feitos, refeitos, agent: `${process.env.AGENT_NAME}`})
})


app.get('/api/:instalacao/:documento',async  (req: any, res: any) =>{
    const payload = {
        times: 0,
        from: `${process.env.AGENT_NAME || 'AGENT_NODE_001'}`,
        chave: `${req.params.instalacao}|${req.params.documento}`, 
    }
    const calculado = await runner(payload)
    res.json(calculado)
})



app.listen(PORT, () => {
    
    console.log(`Express server is listening on ${PORT}`);
});

  
