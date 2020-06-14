import { Router } from 'https://deno.land/x/oak/mod.ts'
import { getItems, getItem, addItem, updateItem, deleteItem } from './controllers/items.ts'

const router = new Router()

router.get('/api/v1/items', getItems)
  .get('/api/v1/items/:id', getItem)
  .post('/api/v1/items', addItem)
  .put('/api/v1/items/:id', updateItem)
  .delete('/api/v1/items/:id', deleteItem)

export default router