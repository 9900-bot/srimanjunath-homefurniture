export type CategoryId = 'living-room' | 'bedroom' | 'dining-room' | 'office-study' | 'entryway-utility'

export type Product = {
  slug: string
  name: string
  category: CategoryId
  type: string
  description: string
  material: string
  dimensions: string
  finish: string
  image: string
  featured?: boolean
}

export type Category = {
  id: CategoryId
  name: string
  eyebrow: string
  description: string
  image: string
  subcategories: string[]
}

const images = {
  living: 'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1600&q=85',
  lounge: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=85',
  chair: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1200&q=85',
  bedroom: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1600&q=85',
  bed: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=85',
  dining: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=85',
  office: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=85',
  entry: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=85',
  craft: 'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?auto=format&fit=crop&w=1600&q=85',
}

export const categories: Category[] = [
  { id: 'living-room', name: 'Living Room', eyebrow: 'The art of gathering', description: 'Thoughtful silhouettes for long conversations, slow mornings and everyday living.', image: images.living, subcategories: ['Sofa', 'Accent Chair', 'Coffee Table', 'TV Stand / Media Console', 'Bookshelf', 'Cabinet', 'Recliner', 'Console Table'] },
  { id: 'bedroom', name: 'Bedroom', eyebrow: 'A softer place to land', description: 'Restful, enduring pieces designed around how you live and unwind.', image: images.bedroom, subcategories: ['Bed Frame', 'Chest of Drawers', 'Cot', 'Dresser', 'Cradle', 'Nightstand', 'Vanity Table', 'Wardrobe / Almirah'] },
  { id: 'dining-room', name: 'Dining Room', eyebrow: 'Made for every gathering', description: 'Warm materials and considered proportions for meals worth lingering over.', image: images.dining, subcategories: ['Dining Table', 'Dining Chair', 'Bar Cabinet', 'Bar Stool', 'Buffet / Sideboard', 'China Cabinet'] },
  { id: 'office-study', name: 'Office & Study', eyebrow: 'Space to do good work', description: 'Beautifully practical furniture for focused work, study and creative thinking.', image: images.office, subcategories: ['Desk', 'Executive Desk', 'Computer Desk', 'Bookcase', 'Filing Cabinet', 'Office Chair'] },
  { id: 'entryway-utility', name: 'Entryway & Utility', eyebrow: 'The welcome home', description: 'Clever, welcoming pieces that make every arrival feel considered.', image: images.entry, subcategories: ['Shoe Rack', 'Hallway Bench', 'Coat Rack', 'Room Divider'] },
]

export const products: Product[] = [
  { slug: 'the-madurai-sofa', name: 'The Madurai Sofa', category: 'living-room', type: 'Sofa', description: 'A generous, low-slung sofa with a calm presence and deep, comfortable seating.', material: 'Solid wood frame, high-density foam', dimensions: '3 seater · 84″ W × 36″ D × 32″ H', finish: 'Natural oak, walnut or custom upholstery', image: images.lounge, featured: true },
  { slug: 'arc-lounge-chair', name: 'Arc Lounge Chair', category: 'living-room', type: 'Accent Chair', description: 'A sculptural reading chair that brings an easy, rounded rhythm to a room.', material: 'Solid wood legs, performance fabric', dimensions: '30″ W × 31″ D × 29″ H', finish: 'Teak, walnut or stained finish', image: images.chair, featured: true },
  { slug: 'serein-bed-frame', name: 'Serein Bed Frame', category: 'bedroom', type: 'Bed Frame', description: 'Quietly confident and made for unhurried mornings.', material: 'Seasoned hardwood, engineered support', dimensions: 'Available in single, double, queen and king', finish: 'Natural wood, honey oak or espresso', image: images.bed, featured: true },
  { slug: 'atelier-dining-table', name: 'Atelier Dining Table', category: 'dining-room', type: 'Dining Table', description: 'A beautifully proportioned centrepiece for everyday dinners and special occasions.', material: 'Solid wood top, hardwood base', dimensions: 'Custom sizes available', finish: 'Natural, walnut or custom stain', image: images.dining, featured: true },
  { slug: 'maker-writing-desk', name: 'Maker Writing Desk', category: 'office-study', type: 'Desk', description: 'A focused workspace with generous room for the things that matter.', material: 'Solid wood and powder-coated steel', dimensions: '48″ W × 24″ D × 30″ H', finish: 'Walnut, natural oak or matte black', image: images.office },
  { slug: 'linen-console', name: 'Linen Console', category: 'entryway-utility', type: 'Console Table', description: 'A slim, useful landing place for keys, objects and everyday rituals.', material: 'Solid wood, hand-finished', dimensions: '60″ W × 14″ D × 30″ H', finish: 'Natural oak or dark walnut', image: images.entry },
]

export const getCategory = (id: string) => categories.find((category) => category.id === id)
export const getProduct = (slug: string) => products.find((product) => product.slug === slug)
export const getCategoryProducts = (id: CategoryId) => products.filter((product) => product.category === id)

export const whatsappNumber = '918867778115'
export const displayPhone = '+91 7204283003'
export const contactPhone = '+91 9845384957'
export const whatsappLink = (message = 'Hi Sri Manjunath Home Furnitures, I would like to know more about your furniture collection.') =>
  `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
