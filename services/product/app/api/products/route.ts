import { prisma } from '@/lib/prisma'
import { NextRequest } from 'next/server'

// GET — Liste tous les produits
export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return Response.json(products)
  } catch (error) {
    return Response.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

// POST — Créer un produit
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, category, unit, price, description } = body

    if (!name || !category || !unit || !price) {
      return Response.json({ error: 'Champs requis manquants' }, { status: 400 })
    }

    const product = await prisma.product.create({
      data: { name, category, unit, price: parseFloat(price), description }
    })

    return Response.json(product, { status: 201 })
  } catch (error) {
    return Response.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}