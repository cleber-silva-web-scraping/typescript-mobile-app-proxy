import { Kafka } from "kafkajs";
import {v4 as uuidv4} from 'uuid';

let client: Kafka;
const myuuid = uuidv4();

const CLOUDKARAFKA_BROKERS =  `${process.env.CLOUDKARAFKA_BROKERS}`
const CLOUDKARAFKA_USERNAME = `${process.env.CLOUDKARAFKA_USERNAME}`
const CLOUDKARAFKA_PASSWORD = `${process.env.CLOUDKARAFKA_PASSWORD}`



const KafkaClient = () => {
  client = new Kafka({
    clientId: `${CLOUDKARAFKA_USERNAME}`,
    brokers: CLOUDKARAFKA_BROKERS.split(","),
    ssl: true,
    sasl: {
      mechanism: "scram-sha-512",
      username: CLOUDKARAFKA_USERNAME,
      password: CLOUDKARAFKA_PASSWORD,
    },
  });
};

/**
 * setProducer
 * @param setProducer
 */
export const producerConnection = async (kafka: any) => {
  if (!client) {
    KafkaClient();
  }

  const producer = kafka.producer();
  await producer.connect();

  return producer;
};

/**
 * setConsumer
 * @param setConsumer
 */
export const consumerConnection = async (kafka: any) => {
  if (!client) {
    KafkaClient();
  }

  const consumer = kafka.consumer({
    groupId:  `cpfl-agent-${myuuid}`,
  });
  await consumer.connect();
  return consumer;
};

export const init = () => {
  if (!client) {
    // tslint:disable-next-line: no-floating-promises
    KafkaClient();
  }
  return client;
};

export default { init, producerConnection, consumerConnection };
