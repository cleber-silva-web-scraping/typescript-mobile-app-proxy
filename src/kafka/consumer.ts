
import { sleep } from "../helpers/sleep";
import kafka from "./kafka";

const TOPIC_CONSUMER = `${process.env.TOPIC_CONSUMER}`
const AGENT_NAME = `${process.env.AGENT_NAME}`

type Payload ={
  from: string,
  times: number,
  chave: string,
  media: string,
  status: number,
  participacao?: string
}

export class SignaturesConsumer {
  private consumerCnn;
  private producerCnn;
  private busy: boolean = false;
  private name: string;
  //@ts-ignore
  constructor({ consumerCnn, producerCnn }) {
    this.consumerCnn = consumerCnn;
    this.producerCnn = producerCnn
    this.name = AGENT_NAME
  }


  public send = async (topic: string, payload: Payload) => {
    try {
      await this.producerCnn.send({
        topic,
        messages: [{ value: JSON.stringify(payload) }],
      });
    } catch (error) {
      console.error(error)
    }
  };


  public subscribe = async (runner: any) => {
    try {
      await this.consumerCnn.subscribe({ topic: TOPIC_CONSUMER });
      await this.consumerCnn.run({
        //@ts-ignore
        eachMessage: async ({ topic, partition, message }) => {
          try {
            if(this.busy){
              this.send(TOPIC_CONSUMER, message.value.toString())
            }else{
              this.busy = true
              const payload = JSON.parse(message.value.toString())
              if(payload.times < 3){
                const done = await runner(payload)
                if(done.status !== 200){
                  this.send(TOPIC_CONSUMER, {...done, times: done.times + 1, from: this.name})
                }
                console.log(done)
              }else{
                console.log({...payload, expirado: true})
              }
              await sleep(1)
              this.busy = false
            }
          } catch (err) {
            console.log(err)
            console.error("Error parsing schedule, the contract doesn't match!");
            return;
          }
        },
      });
    } catch (error) {
      console.error(error);
    }
  };
}

/**
 * Auto creator for dependency injection
 * @returns
 */
export const init = async (runner: any) => {
  const kafkaInstance = await kafka.init();
  const producerCnn = await kafka.producerConnection(kafkaInstance);
  const consumerCnn = await kafka.consumerConnection(kafkaInstance);
  const signaturesConsumer = new SignaturesConsumer({
    consumerCnn: consumerCnn, 
    producerCnn: producerCnn
  });
  await signaturesConsumer.subscribe(runner);
};

export default init;
