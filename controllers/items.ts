import { v4 } from "https://deno.land/std/uuid/mod.ts";
import { Item } from '../types.ts'

let items: Item[] = [
  {
    id: "1",
    name: "Item One",
    description: "This is item one",
    price: 29.99,
  },
  {
    id: "2",
    name: "Item Two",
    description: "This is item Two",
    price: 39.99,
  },
  {
    id: "3",
    name: "Item Three",
    description: "This is item Three",
    price: 59.99,
  },
]

// @desc    Get all item
// @route   GET /api/v1/items
const getItems = ({ response }: { response: any }) => {
  response.body = {
    success: true,
    data: items
  }
}

// @desc    Get single item
// @route   GET /api/v1/items/:id
const getItem = ({ params, response }: { params: { id: string }, response: any }) => {
  const item: Item | undefined = items.find(p => p.id === params.id)

  if (item) {
    response.status = 200
    response.body = {
      success: true,
      data: item
    }
  }
  else {
    response.status = 404
    response.body = {
      success: false,
      msg: 'No item found'
    }
  }
}

// @desc    Add single item
// @route   POST /api/v1/items
const addItem = async ({ request, response }: { request: any, response: any }) => {
  const body = await request.body()

  if (!request.hasBody) {
    response.status = 400
    response.body = {
      success: false,
      msg: 'No data'
    }
  } else {
    const item: Item = body.value
    item.id = v4.generate()
    items.push(item)
    response.status = 201
    response.body = {
      success: true,
      data: item
    }
  }
}

// @desc    Update item
// @route   PUT /api/v1/items/:id
const updateItem = async ({ params, request, response }: { params: { id: string }, request: any, response: any }) => {
  const item: Item | undefined = items.find(p => p.id === params.id)

  if (item) {
    const body = await request.body()

    const updateData: { name?: string; description?: string; price?: number } = body.value

    items = items.map(p => p.id === params.id ? { ...p, ...updateData } : p)

    response.status = 200
    response.body = {
      success: true,
      data: items
    }
  }
  else {
    response.status = 404
    response.body = {
      success: false,
      msg: 'No item found'
    }
  }
}

// @desc    Delete single item
// @route   DELETE /api/v1/items/:id
const deleteItem = ({ params, response }: { params: { id: string }, response: any }) => {
  items = items.filter(p => p.id !== params.id)

  response.body = {
    success: true,
    msg: 'Item removed'
  }
}


export { getItems, getItem, addItem, updateItem, deleteItem }