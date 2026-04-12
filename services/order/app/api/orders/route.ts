import { prisma } from '@/lib/prisma'
import { publishEvent } from '@/lib/rabbitmq'
import { NextRequest } from 'next/server'

export async function GET() {
  try {
    const orders = await prisma.order.findMany({ orderBy: { createdAt: 'desc' } })
    return Response.json(orders)
  } catch {
    return Response.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { clientName, productId, productName, quantity, totalPrice } = body

    if (!clientName || !productId || !productName || !quantity || !totalPrice) {
      return Response.json({ error: 'Champs requis manquants' }, { status: 400 })
    }

    const order = await prisma.order.create({
      data: { clientName, productId, quantity, productName, totalPrice: parseFloat(totalPrice), status: 'pending' }
    })

    // Publier l'événement OrderCreated vers RabbitMQ
    await publishEvent('order.created', {
      orderId: order.id,
      productId: order.productId,
      productName: order.productName,
      quantity: order.quantity,
      clientName: order.clientName
    })

    return Response.json(order, { status: 201 })
  } catch {
    return Response.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}