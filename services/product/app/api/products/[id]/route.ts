import { prisma } from '@/lib/prisma'
import { NextRequest } from 'next/server'

// GET — Un produit par ID
export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: parseInt(params.id) }
    })
    if (!product) return Response.json({ error: 'Produit non trouvé' }, { status: 404 })
    return Response.json(product)
  } catch {
    return Response.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

// PUT — Modifier un produit
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await req.json()
    const product = await prisma.product.update({
      where: { id: parseInt(params.id) },
      data: body
    })
    return Response.json(product)
  } catch {
    return Response.json({ error: 'Produit non trouvé' }, { status: 404 })
  }
}

// DELETE — Supprimer un produit
export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    await prisma.product.delete({ where: { id: parseInt(params.id) } })
    return Response.json({ message: 'Produit supprimé' })
  } catch {
    return Response.json({ error: 'Produit non trouvé' }, { status: 404 })
  }
}