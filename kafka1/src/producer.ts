import { Kafka, Producer } from 'kafkajs'
import * as winston from 'winston'

let producer: Producer
const kafka = new Kafka({ brokers: ["localhost:9092"] })

export async function producerInit() {
    producer = kafka.producer()
    await producer.connect()
}

const logConfiguration = {
    'transports': [
        new winston.transports.Console()
    ]
};

const logger = winston.createLogger(logConfiguration);


export async function send(text: any) {
    // new CustomLogger().showLogger('info', 'Enter into studentsService.ts: GpGetAllValues')
    logger.info('Hello, Winston!');

    let data = text.data

    await producer.send({

        topic: "KafkaTutorial1",
        messages: [
            {
                value: data
            }
        ]
    })
    try {
         producer.send({
            topic: "CreateTopic1mano1",
            messages: [
                {
                    value: data
                }
            ]
        })
        logger.info(' Message successfully sent');
        return "Message Published"
    } catch (error) {
        logger.error(' Unable to send Message');


    }


    return "Message Published"
}



