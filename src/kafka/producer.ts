import { init as InitKafka, producerConnection } from "./kafka";

/**
 * Producer User actions
 * @param kafka kafka Connection
 */
export class Producer {
  private kafka: any;
 

  constructor({ kafka }: {kafka: any}) {
    this.kafka = kafka;
  }

  public send = async (topic: string, payload: any) => {
    try {
      await this.kafka.producer.send({
        topic,
        messages: [{ value: payload }],
      });
    } catch (error) {
      console.error(error)
    }
  };
}

/**
 * Auto creator for dependency injection
 * @returns
 */
export const init = async () => {
  const kafka = InitKafka();
  await producerConnection(kafka);
  return new Producer({ kafka });
};

export default init;
