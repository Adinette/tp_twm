import { prisma } from '@/lib/prisma'
import { NextRequest } from 'next/server'

export async function GET() {
  try {
    const movements = await prisma.movement.findMany({ orderBy: { createdAt: 'desc' } })
    return Response.json(movements)
  } catch {
    return Response.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { productId, productName, warehouseId, type, quantity, reason } = body

    if (!productId || !productName || !warehouseId || !type || !quantity) {
      return Response.json({ error: 'Champs requis manquants' }, { status: 400 })
    }

    if (!['IN', 'OUT'].includes(type)) {
      return Response.json({ error: 'Type doit être IN ou OUT' }, { status: 400 })
    }

    // Enregistrer le mouvement
    const movement = await prisma.movement.create({
      data: { productId, productName, warehouseId, type, quantity, reason }
    })

    // Mettre à jour le stock
    const stock = await prisma.stock.findFirst({ where: { productId, warehouseId } })
    if (stock) {
      await prisma.stock.update({
        where: { id: stock.id },
        data: { quantity: type === 'IN' ? stock.quantity + quantity : stock.quantity - quantity }
      })
    }

    return Response.json(movement, { status: 201 })
  } catch {
    return Response.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}