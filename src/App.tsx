import { useEffect, useState } from 'react'
import { Link, Navigate, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, Check, ChevronDown, ChevronLeft, ChevronRight, Instagram, Mail, MapPin, Menu, Phone, Quote, Ruler, Search, ShieldCheck, Sparkles, Star, X } from 'lucide-react'
import { categories, contactPhone, displayPhone, getCategory, getCategoryProducts, getProduct, products, whatsappLink, type CategoryId, type Product } from './data'

const navItems = [
  ['Living Room', '/living-room'], ['Bedroom', '/bedroom'], ['Dining Room', '/dining-room'],
  ['Office & Study', '/office-study'], ['Entryway & Utility', '/entryway-utility'],
]

function useScrollTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
}

function Navbar() {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  return <header className="fixed inset-x-0 top-0 z-50 border-b border-ink/10 bg-ivory/90 backdrop-blur-xl">
    <div className="container-wide flex h-[76px] items-center justify-between">
      <Link to="/" className="group flex items-center gap-3" onClick={() => setOpen(false)}>
        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-clay/50 font-serif text-xl text-clay">SM</span>
        <span className="max-w-[170px] text-[11px] font-semibold uppercase leading-[1.1] tracking-[0.16em] text-ink sm:max-w-none">Sri Manjunath<br /><span className="text-clay">Home Furnitures</span></span>
      </Link>
      <nav className="hidden items-center gap-7 lg:flex">
        <Link className={location.pathname === '/' ? 'nav-link active' : 'nav-link'} to="/">Home</Link>
        {navItems.map(([label, href]) => <Link className={location.pathname === href ? 'nav-link active' : 'nav-link'} to={href} key={href}>{label}</Link>)}
        <Link className="nav-link" to="/about">About</Link><Link className="nav-link" to="/contact">Contact</Link>
      </nav>
      <div className="hidden lg:block"><Link className="button button-dark !px-5 !py-3 text-[11px]" to="/custom-furniture">Get a Quote <ArrowUpRight size={15} /></Link></div>
      <button aria-label="Toggle menu" className="rounded-full p-2 lg:hidden" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
    </div>
    {open && <div className="border-t border-ink/10 bg-ivory px-6 pb-7 pt-3 lg:hidden">
      <div className="flex flex-col gap-1">{[['Home', '/'], ...navItems, ['Custom Furniture', '/custom-furniture'], ['About Us', '/about'], ['Contact', '/contact']].map(([label, href]) =>
        <Link onClick={() => setOpen(false)} className="border-b border-ink/10 py-3 font-serif text-2xl" to={href} key={href}>{label}</Link>)}</div>
    </div>}
  </header>
}

function WhatsAppButton() {
  return <a href={whatsappLink()} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp" className="whatsapp-float"><span className="text-xl">◔</span><span className="hidden sm:inline">Chat with us</span></a>
}

function Footer() {
  return <footer className="bg-walnut text-ivory">
    <div className="container-wide grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr_1fr] lg:py-20">
      <div><div className="mb-5 flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-full border border-sand/40 font-serif text-xl">SM</span><span className="text-[11px] font-semibold uppercase tracking-[0.16em]">Sri Manjunath<br />Home Furnitures</span></div><p className="max-w-xs text-sm leading-7 text-ivory/65">Thoughtfully made furniture for the way you live, work and gather.</p><div className="mt-7 flex gap-3"><a className="social" href="#"><Instagram size={16} /></a><a className="social" href="#"><span className="text-xs font-bold">f</span></a></div></div>
      <div><p className="footer-label">Explore</p><div className="footer-links"><Link to="/">Home</Link><Link to="/about">About Us</Link><Link to="/custom-furniture">Custom Furniture</Link><Link to="/contact">Contact</Link></div></div>
      <div><p className="footer-label">Collections</p><div className="footer-links">{categories.map((category) => <Link to={`/${category.id}`} key={category.id}>{category.name}</Link>)}</div></div>
      <div><p className="footer-label">Visit / Enquire</p><div className="footer-links"><a href={`tel:${contactPhone.replace(/\s/g, '')}`}><Phone size={14} /> {contactPhone}</a><a href={whatsappLink()} target="_blank" rel="noreferrer">WhatsApp enquiry</a><a href="mailto:sbeeresh1978@gmail.com"><Mail size={14} /> Email us</a></div></div>
    </div>
    <div className="border-t border-ivory/15"><div className="container-wide flex flex-col justify-between gap-3 py-5 text-[11px] uppercase tracking-[0.12em] text-ivory/45 sm:flex-row"><span>© {new Date().getFullYear()} Sri Manjunath Home Furnitures</span><span>Furniture made with intention.</span></div></div>
  </footer>
}

function SectionHeading({ eyebrow, title, text, centered = false }: { eyebrow: string, title: string, text?: string, centered?: boolean }) {
  return <div className={centered ? 'mx-auto max-w-2xl text-center' : 'max-w-xl'}><p className="eyebrow">{eyebrow}</p><h2 className="section-title">{title}</h2>{text && <p className="mt-5 text-base leading-7 text-ink/60">{text}</p>}</div>
}

function CategoryCard({ category, index }: { category: typeof categories[number], index: number }) {
  return <Link to={`/${category.id}`} className={`category-card ${index === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}><img src={category.image} alt={category.name} /><div className="category-overlay"><span className="text-xs uppercase tracking-[0.15em] text-ivory/70">{category.eyebrow}</span><h3 className="mt-2 font-serif text-3xl text-ivory md:text-4xl">{category.name}</h3><span className="mt-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.13em] text-ivory">Explore <ArrowUpRight size={14} /></span></div></Link>
}

function ProductCard({ product }: { product: Product }) {
  return <article className="group"><Link to={`/products/${product.slug}`} className="image-card block aspect-[4/4.5]"><img src={product.image} alt={product.name} /><span className="image-card-tag">{product.type}</span><span className="image-card-action"><ArrowUpRight size={18} /></span></Link><div className="flex items-start justify-between gap-4 pt-4"><div><h3 className="font-serif text-2xl">{product.name}</h3><p className="mt-1 text-sm text-ink/55">{product.description}</p></div><Link to={`/products/${product.slug}`} className="mt-1 shrink-0 text-clay"><ArrowRight size={19} /></Link></div></article>
}

function Home() {
  const featured = products.filter((product) => product.featured)
  return <><main>
    <section className="hero-section"><div className="hero-image"></div><div className="container-wide relative flex min-h-[700px] items-end pb-16 pt-32 lg:min-h-[780px] lg:pb-24"><div className="max-w-2xl animate-fade-up"><p className="eyebrow text-sand">Furniture, thoughtfully made</p><h1 className="hero-title">Furniture made for your home.<br /><em>Built to last.</em></h1><p className="mt-6 max-w-lg text-base leading-7 text-ivory/80">Quality furniture manufactured with attention to craftsmanship, comfort and timeless design.</p><div className="mt-9 flex flex-wrap gap-3"><Link to="/living-room" className="button button-light">Explore Collection <ArrowRight size={16} /></Link><Link to="/custom-furniture" className="button button-outline">Get a Quote <ArrowUpRight size={16} /></Link></div></div><div className="absolute bottom-9 right-6 hidden max-w-[190px] border-l border-ivory/40 pl-4 text-xs leading-5 text-ivory/70 lg:block">Made for your space.<br />Made to be lived in.</div></div></section>
    <section className="section-pad"><div className="container-wide"><div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end"><SectionHeading eyebrow="Explore the collection" title="Rooms with a point of view." text="Pieces that bring warmth, utility and an unmistakable sense of home to every corner." /><Link to="/living-room" className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-clay">View all furniture <ArrowUpRight size={15} /></Link></div><div className="category-grid">{categories.map((category, index) => <CategoryCard category={category} index={index} key={category.id} />)}</div></div></section>
    <section className="section-pad bg-paper"><div className="container-wide"><div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end"><SectionHeading eyebrow="A considered selection" title="Pieces to live with." text="Designed with honest materials, enduring proportions and the everyday in mind." /><Link to="/living-room" className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-clay">Browse pieces <ArrowUpRight size={15} /></Link></div><div className="grid gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">{featured.map((product) => <ProductCard product={product} key={product.slug} />)}</div></div></section>
    <CraftsmanshipSection />
    <section className="section-pad"><div className="container-wide grid items-center gap-12 lg:grid-cols-[.9fr_1.1fr]"><div><SectionHeading eyebrow="Built around you" title="Have something different in mind?" text="Tell us what you need and we'll help bring your furniture idea to life. From a first sketch to the final finish, our team works with you to make it yours." /><Link to="/custom-furniture" className="button button-dark mt-8">Start a conversation <ArrowUpRight size={16} /></Link></div><div className="rounded-[2px] bg-sand p-8 sm:p-12"><Quote className="mb-8 text-clay" size={28} /><p className="font-serif text-3xl leading-tight text-walnut sm:text-4xl">“Furniture should feel like it has always belonged in your home.”</p><div className="mt-8 flex items-center gap-3"><div className="h-px w-9 bg-clay"></div><p className="text-xs uppercase tracking-[0.15em] text-ink/60">Manjunath & Deekshith</p></div></div></div></section>
  </main></>
}

function CraftsmanshipSection() {
  return <section className="overflow-hidden bg-walnut text-ivory"><div className="container-wide grid items-center gap-0 lg:grid-cols-2"><div className="relative -mx-6 h-[420px] sm:-mx-8 lg:order-2 lg:mx-0 lg:h-[610px]"><img className="absolute inset-0 h-full w-full object-cover" src="https://images.unsplash.com/photo-1558997519-83ea9252edf8?auto=format&fit=crop&w=1400&q=85" alt="Craftsperson working on wooden furniture" /></div><div className="py-16 pr-0 lg:order-1 lg:py-24 lg:pr-20"><p className="eyebrow text-sand">The making of it</p><h2 className="section-title text-ivory">Made by hand.<br /><em>Made for living.</em></h2><p className="mt-6 max-w-md text-base leading-8 text-ivory/65">We manufacture furniture with a close eye on the details that matter: the feel of a finish, the strength of a joint, the way a piece settles into your space.</p><div className="mt-9 grid max-w-md grid-cols-2 gap-5 border-t border-ivory/20 pt-6 text-xs uppercase tracking-[0.12em] text-ivory/70"><span className="flex items-center gap-2"><Check size={15} className="text-clay" /> Direct from maker</span><span className="flex items-center gap-2"><Check size={15} className="text-clay" /> Made to order</span><span className="flex items-center gap-2"><Check size={15} className="text-clay" /> Quality materials</span><span className="flex items-center gap-2"><Check size={15} className="text-clay" /> Your way, always</span></div></div></div></section>
}

function CategoryPage() {
  const { categoryId } = useParams()
  const category = getCategory(categoryId || '')
  if (!category) return <Navigate to="/" replace />
  const categoryProducts = getCategoryProducts(category.id)
  return <main className="pt-[76px]"><section className="category-hero"><img src={category.image} alt={category.name} /><div className="container-wide relative flex min-h-[440px] items-end pb-14"><div><p className="eyebrow text-sand">{category.eyebrow}</p><h1 className="hero-title text-5xl sm:text-7xl">{category.name}</h1><p className="mt-4 max-w-lg text-base leading-7 text-ivory/80">{category.description}</p></div></div></section><section className="section-pad"><div className="container-wide"><div className="flex flex-col justify-between gap-7 border-b border-ink/15 pb-8 md:flex-row md:items-end"><div><p className="eyebrow">The collection</p><h2 className="section-title !text-5xl">{category.name} furniture</h2></div><p className="max-w-xs text-sm leading-6 text-ink/55">{category.subcategories.join(' · ')}</p></div>{categoryProducts.length > 0 ? <div className="mt-12 grid gap-x-5 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">{categoryProducts.map((product) => <ProductCard product={product} key={product.slug} />)}</div> : <div className="mt-16 max-w-xl"><p className="font-serif text-3xl">A collection is taking shape.</p><p className="mt-3 text-ink/60">We are curating pieces for this room. In the meantime, speak to us about a made-to-measure design.</p><Link className="button button-dark mt-7" to="/custom-furniture">Request a custom piece <ArrowUpRight size={16} /></Link></div>}</div></section><CtaBanner /></main>
}

function ProductDetail() {
  const { slug } = useParams()
  const product = getProduct(slug || '')
  if (!product) return <Navigate to="/" replace />
  const related = products.filter((item) => item.category === product.category && item.slug !== product.slug).slice(0, 2)
  return <main className="pt-[76px]"><section className="section-pad pb-12"><div className="container-wide grid gap-10 lg:grid-cols-[1.05fr_.95fr] lg:gap-20"><div className="grid grid-cols-2 gap-3"><img className="col-span-2 aspect-[4/3] w-full object-cover" src={product.image} alt={product.name} /><img className="aspect-square w-full object-cover" src={product.image} alt="" /><div className="flex aspect-square items-center justify-center bg-sand p-7"><Sparkles className="text-clay" size={28} /></div></div><div className="flex flex-col justify-center"><p className="eyebrow">{getCategory(product.category)?.name} · {product.type}</p><h1 className="section-title !text-6xl sm:!text-7xl">{product.name}</h1><p className="mt-6 text-base leading-8 text-ink/65">{product.description}</p><div className="my-8 border-y border-ink/15 py-6"><div className="detail-row"><span>Material</span><strong>{product.material}</strong></div><div className="detail-row"><span>Dimensions</span><strong>{product.dimensions}</strong></div><div className="detail-row"><span>Available finish</span><strong>{product.finish}</strong></div><div className="detail-row"><span>Customisation</span><strong>Available on request</strong></div></div><div className="flex flex-wrap gap-3"><a className="button button-dark" href={whatsappLink(`Hi Sri Manjunath Home Furnitures, I'm interested in ${product.name}. Please share the price and more details.`)} target="_blank" rel="noreferrer">Enquire on WhatsApp <ArrowUpRight size={16} /></a><Link className="button button-outline-dark" to="/custom-furniture">Request a quote <ArrowUpRight size={16} /></Link></div><p className="mt-4 text-xs text-ink/45">Pricing depends on size, material and customisation.</p></div></div></section>{related.length > 0 && <section className="section-pad bg-paper"><div className="container-wide"><SectionHeading eyebrow="You may also like" title="More from this room." /><div className="mt-10 grid gap-6 sm:grid-cols-2">{related.map((item) => <ProductCard key={item.slug} product={item} />)}</div></div></section>}</main>
}

function CustomFurniture() {
  return <main className="pt-[76px]"><section className="custom-hero"><div className="container-wide grid items-end gap-8 pb-16 pt-24 lg:grid-cols-[1fr_.8fr] lg:pb-24"><div><p className="eyebrow">Made around your life</p><h1 className="hero-title text-walnut">Have something<br /><em>different in mind?</em></h1></div><p className="max-w-md pb-1 text-base leading-8 text-ink/65">Tell us what you need and we'll help bring your furniture idea to life. Share a few details and we'll be in touch.</p></div></section><section className="section-pad"><div className="container-wide grid gap-16 lg:grid-cols-[.75fr_1.25fr]"><div><SectionHeading eyebrow="Start a conversation" title="Let's make room for your idea." text="Whether you have a clear drawing or just a feeling, tell us about it. We will help you think through materials, proportions and finish." /><div className="mt-10 space-y-5 text-sm text-ink/60"><div className="flex gap-3"><Ruler className="shrink-0 text-clay" size={19} /> Made to your required dimensions</div><div className="flex gap-3"><Sparkles className="shrink-0 text-clay" size={19} /> Materials and finishes to suit your space</div><div className="flex gap-3"><Phone className="shrink-0 text-clay" size={19} /> A friendly conversation, no obligation</div></div></div><QuoteForm /></div></section></main>
}

function QuoteForm() {
  const [sent, setSent] = useState(false)
  if (sent) return <div className="flex min-h-[400px] flex-col items-center justify-center bg-sand p-8 text-center"><Check className="mb-4 text-clay" size={35} /><h2 className="font-serif text-4xl">Thank you for reaching out.</h2><p className="mt-3 max-w-sm text-sm leading-6 text-ink/60">Your request is ready to be shared. We will get back to you soon.</p><a href={whatsappLink('Hi Sri Manjunath Home Furnitures, I would like to discuss a custom furniture quote.')} target="_blank" rel="noreferrer" className="button button-dark mt-7">Continue on WhatsApp <ArrowUpRight size={16} /></a></div>
  return <form onSubmit={(event) => { event.preventDefault(); setSent(true) }} className="grid gap-5 bg-paper p-6 sm:grid-cols-2 sm:p-10"><FormField label="Your name" placeholder="Full name" /><FormField label="Phone number" placeholder="+91" /><FormField label="Furniture type" placeholder="e.g. Dining table" /><FormField label="Budget range" placeholder="Approximate budget" /><FormField label="Required dimensions" placeholder="Length × width × height" /><FormField label="Material preference" placeholder="e.g. Solid wood" /><FormField label="Colour / finish" placeholder="Tell us your preference" /><div></div><label className="sm:col-span-2"><span className="form-label">Tell us more</span><textarea className="form-input min-h-[120px] resize-y" placeholder="Describe your idea, room or any details that will help us understand..." /></label><label className="sm:col-span-2"><span className="form-label">Reference image <span className="font-normal normal-case tracking-normal text-ink/40">(optional)</span></span><input type="file" className="form-input file:mr-4 file:border-0 file:bg-sand file:px-3 file:py-2 file:text-xs" /></label><button className="button button-dark mt-2 w-fit sm:col-span-2">Request custom quote <ArrowUpRight size={16} /></button></form>
}

function FormField({ label, placeholder }: { label: string, placeholder: string }) { return <label><span className="form-label">{label}</span><input className="form-input" placeholder={placeholder} required /></label> }

function About() {
  return <main className="pt-[76px]"><section className="section-pad"><div className="container-wide grid items-end gap-10 lg:grid-cols-[1.1fr_.9fr]"><div><p className="eyebrow">Our story</p><h1 className="section-title !text-7xl">Furniture with<br /><em>somewhere to go.</em></h1></div><p className="max-w-md pb-2 text-base leading-8 text-ink/65">Sri Manjunath Home Furnitures is a furniture manufacturer and retailer focused on creating reliable, considered furniture solutions for homes, offices and the spaces in between.</p></div><div className="mt-16 grid gap-4 sm:grid-cols-[1.3fr_.7fr]"><img className="h-[500px] w-full object-cover" src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1500&q=85" alt="Warm, considered living room" /><img className="h-[500px] w-full object-cover" src="https://images.unsplash.com/photo-1540574163026-643ea20ade25?auto=format&fit=crop&w=900&q=85" alt="Modern sofa detail" /></div></section><section className="section-pad bg-sand"><div className="container-wide grid gap-12 lg:grid-cols-2"><SectionHeading eyebrow="What we believe" title="The best furniture works quietly." text="It supports your routines, ages with grace and makes a room feel more like yours. We combine thoughtful design with the practical knowledge of making furniture for real homes." /><div className="grid grid-cols-2 gap-7 border-t border-ink/15 pt-6 text-sm leading-6 text-ink/65"><div><p className="font-serif text-2xl text-walnut">01</p><p className="mt-3">Craftsmanship that respects the material.</p></div><div><p className="font-serif text-2xl text-walnut">02</p><p className="mt-3">Reliable furniture, made to be used.</p></div><div><p className="font-serif text-2xl text-walnut">03</p><p className="mt-3">Solutions for the way your space works.</p></div><div><p className="font-serif text-2xl text-walnut">04</p><p className="mt-3">A personal approach from first chat to final piece.</p></div></div></div></section><section className="section-pad"><div className="container-wide flex flex-col items-start justify-between gap-8 border-b border-ink/15 pb-12 md:flex-row md:items-end"><div><p className="eyebrow">The people behind it</p><h2 className="section-title !text-6xl">Manjunath <em>&</em> Deekshith</h2></div><p className="max-w-sm text-sm leading-7 text-ink/60">A family-led furniture business focused on craftsmanship, customer satisfaction and helping you find the right piece for your space.</p></div></section></main>
}

function Contact() {
  return <main className="pt-[76px]"><section className="section-pad"><div className="container-wide grid gap-14 lg:grid-cols-[1fr_.85fr]"><div><p className="eyebrow">Come say hello</p><h1 className="section-title !text-7xl">Let’s find your<br /><em>next piece.</em></h1><p className="mt-6 max-w-md text-base leading-8 text-ink/60">Have a question about a product, a custom idea or our showroom? We’d love to hear from you.</p><div className="mt-10 flex flex-wrap gap-3"><a className="button button-dark" href={`tel:${contactPhone.replace(/\s/g, '')}`}><Phone size={16} /> Call now</a><a className="button button-outline-dark" href={whatsappLink()} target="_blank" rel="noreferrer">WhatsApp <ArrowUpRight size={16} /></a></div></div><div className="space-y-8 border-t border-ink/15 pt-6"><div><p className="footer-label text-ink/45">Phone</p><a className="mt-2 block font-serif text-3xl text-walnut" href={`tel:${contactPhone.replace(/\s/g, '')}`}>{contactPhone}</a><p className="mt-1 text-sm text-ink/50">WhatsApp: {displayPhone}</p></div><div><p className="footer-label text-ink/45">Email</p><a className="mt-2 block text-base text-walnut" href="mailto:sbeeresh1978@gmail.com">sbeeresh1978@gmail.com</a></div><div><p className="footer-label text-ink/45">Location</p><p className="mt-2 text-base text-ink/65">Business address — to be updated</p><a href="https://share.google/NUCIcQEci6zYb4F23" target="_blank" rel="noreferrer" className="mt-2 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[.12em] text-clay">Get directions <ArrowUpRight size={14} /></a></div><div><p className="footer-label text-ink/45">Hours</p><p className="mt-2 text-base text-ink/65">Business hours — to be updated</p></div></div></div></section><section className="section-pad bg-sand"><div className="container-wide"><div className="mb-7 flex items-end justify-between"><div><p className="eyebrow">Find us</p><h2 className="section-title !text-5xl">Visit the showroom</h2></div><MapPin className="text-clay" /></div><div className="flex h-[320px] items-center justify-center border border-ink/10 bg-ivory text-center"><div><MapPin className="mx-auto mb-3 text-clay" size={28} /><p className="font-serif text-2xl text-walnut">Google Maps embed placeholder</p><p className="mt-2 text-sm text-ink/50">Add your showroom address and map here.</p></div></div></div></section></main>
}

function CtaBanner() { return <section className="bg-sand"><div className="container-wide flex flex-col items-start justify-between gap-6 py-14 md:flex-row md:items-center"><div><p className="eyebrow">Made for your space</p><h2 className="font-serif text-4xl text-walnut">Want something made just for you?</h2></div><Link to="/custom-furniture" className="button button-dark">Start a custom enquiry <ArrowUpRight size={16} /></Link></div></section> }

function App() {
  useScrollTop()
  return <><Navbar /><Routes><Route path="/" element={<Home />} /><Route path="/:categoryId" element={<CategoryPage />} /><Route path="/products/:slug" element={<ProductDetail />} /><Route path="/custom-furniture" element={<CustomFurniture />} /><Route path="/about" element={<About />} /><Route path="/contact" element={<Contact />} /></Routes><Footer /><WhatsAppButton /></>
}

export default App
