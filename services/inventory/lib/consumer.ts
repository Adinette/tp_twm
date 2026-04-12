import amqplib from 'amqplib'
import { prisma } from './prisma'

const RABBITMQ_URL = process.env.RABBITMQ_URL || 'amqp://guest:guest@localhost:5672'
const EXCHANGE = 'sfmc.events'

export async function startConsumer() {
  try {
    const conn = await amqplib.connect(RABBITMQ_URL)
    const ch = await conn.createChannel()

    await ch.assertExchange(EXCHANGE, 'topic', { durable: true })
    const q = await ch.assertQueue('inventory.order-created', { durable: true })
    await ch.bindQueue(q.queue, EXCHANGE, 'order.created')

    console.log('🐇 Consumer RabbitMQ démarré — en attente d\'événements order.created')

    ch.consume(q.queue, async (msg) => {
      if (!msg) return
      const data = JSON.parse(msg.content.toString())
      console.log('📦 OrderCreated reçu :', data)

      // Décrémenter le stock
      const stock = await prisma.stock.findFirst({
        where: { productId: data.productId }
      })

      if (stock) {
        const newQty = stock.quantity - data.quantity
        await prisma.stock.update({
          where: { id: stock.id },
          data: { quantity: newQty }
        })
        console.log(`✅ Stock mis à jour : ${stock.productName} → ${newQty} unités`)
      }

      ch.ack(msg)
    })
  } catch (error) {
    console.error('❌ Erreur consumer RabbitMQ :', error)
    setTimeout(startConsumer, 5000)
  }
}