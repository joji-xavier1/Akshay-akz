<script setup>
import { ref, computed, onMounted } from 'vue'
import { useCartStore } from '../stores/cart'
import { ShoppingCart, Check, X, Trash2, Plus, Minus, Tag, Flame } from 'lucide-vue-next'

const cartStore = useCartStore()
const showCart = ref(false)
const isVisible = ref(false)
const addedToCart = ref(null)

const products = ref([
  {
    id: 1,
    name: 'Team Lava Hoodie',
    price: 1999,
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400',
    badge: 'Best Seller',
    description: 'Premium quality hoodie with Team Lava embroidery',
    category: 'Apparel'
  },
  {
    id: 2,
    name: 'Gaming Jersey - Pro Edition',
    price: 1499,
    image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400',
    badge: 'New',
    description: 'Breathable performance jersey for gaming sessions',
    category: 'Apparel'
  },
  {
    id: 3,
    name: 'Lava Phone Case',
    price: 599,
    image: 'https://images.unsplash.com/photo-1601593346740-925612772716?w=400',
    badge: null,
    description: 'Durable phone case with Team Lava logo',
    category: 'Accessories'
  },
  {
    id: 4,
    name: 'Team Lava Cap',
    price: 799,
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400',
    badge: 'Popular',
    description: 'Adjustable snapback cap with embroidered logo',
    category: 'Apparel'
  },
  {
    id: 5,
    name: 'Gaming Mousepad XL',
    price: 899,
    image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=400',
    badge: null,
    description: 'Extra large mousepad for precise gaming',
    category: 'Accessories'
  },
  {
    id: 6,
    name: 'Lava Sticker Pack',
    price: 299,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
    badge: null,
    description: 'Pack of 10 premium vinyl stickers',
    category: 'Accessories'
  },
  {
    id: 7,
    name: 'Team Lava T-Shirt',
    price: 999,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
    badge: 'Best Seller',
    description: '100% cotton t-shirt with printed graphics',
    category: 'Apparel'
  },
  {
    id: 8,
    name: 'Gaming Wristband Set',
    price: 349,
    image: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=400',
    badge: null,
    description: 'Set of 3 silicone wristbands',
    category: 'Accessories'
  }
])

const selectedCategory = ref('All')
const categories = ['All', 'Apparel', 'Accessories']

const filteredProducts = computed(() => {
  if (selectedCategory.value === 'All') {
    return products.value
  }
  return products.value.filter(p => p.category === selectedCategory.value)
})

const formatPrice = (price) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(price)
}

const addToCart = (product) => {
  cartStore.addToCart(product)
  addedToCart.value = product.id
  setTimeout(() => {
    addedToCart.value = null
  }, 1500)
}

onMounted(() => {
  setTimeout(() => isVisible.value = true, 100)
})
</script>

<template>
  <div class="min-h-screen py-8 lg:py-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div 
        class="text-center mb-12 transition-all duration-700"
        :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
      >
        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold mb-4">
          OFFICIAL <span class="text-gradient">MERCH</span>
        </h1>
        <p class="text-text-muted max-w-2xl mx-auto">
          Rep Team Lava with our exclusive merchandise. Premium quality, epic designs.
        </p>
      </div>

      <!-- Category Filter -->
      <div 
        class="flex flex-wrap gap-3 justify-center mb-10 transition-all duration-700 delay-100"
        :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
      >
        <button
          v-for="category in categories"
          :key="category"
          @click="selectedCategory = category"
          class="px-5 py-2 rounded-full font-medium transition-all"
          :class="selectedCategory === category 
            ? 'bg-gradient-to-r from-primary to-accent text-white' 
            : 'bg-surface text-text-muted hover:text-white hover:bg-surface/80'"
        >
          {{ category }}
        </button>
      </div>

      <!-- Products Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div
          v-for="(product, index) in filteredProducts"
          :key="product.id"
          class="card group overflow-hidden transition-all duration-700"
          :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
          :style="{ transitionDelay: `${index * 50}ms` }"
        >
          <div class="relative aspect-square rounded-lg overflow-hidden mb-4">
            <img
              :src="product.image"
              :alt="product.name"
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <span
              v-if="product.badge"
              class="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1"
              :class="{
                'bg-secondary text-background': product.badge === 'Best Seller',
                'bg-primary text-white': product.badge === 'New',
                'bg-accent text-white': product.badge === 'Popular'
              }"
            >
              <Tag v-if="product.badge === 'Best Seller'" class="w-3 h-3" />
              <Flame v-else class="w-3 h-3" />
              {{ product.badge }}
            </span>
          </div>
          
          <h3 class="font-heading text-lg font-semibold group-hover:text-primary transition-colors line-clamp-1">
            {{ product.name }}
          </h3>
          <p class="text-text-muted text-sm mt-1 line-clamp-2">{{ product.description }}</p>
          <div class="flex items-center justify-between mt-4">
            <p class="text-xl font-bold text-secondary">{{ formatPrice(product.price) }}</p>
            <button
              @click="addToCart(product)"
              class="p-3 rounded-lg transition-all"
              :class="addedToCart === product.id 
                ? 'bg-green-500 text-white' 
                : 'bg-primary/20 text-primary hover:bg-primary hover:text-white'"
            >
              <Check v-if="addedToCart === product.id" class="w-5 h-5" />
              <ShoppingCart v-else class="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <!-- Cart Summary (Floating) -->
      <Transition
        enter-active-class="transition-all duration-300"
        enter-from-class="opacity-0 translate-y-8"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition-all duration-200"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 translate-y-8"
      >
        <div
          v-if="cartStore.totalItems > 0"
          class="fixed bottom-6 left-4 right-4 sm:left-auto sm:right-6 sm:w-96 glass rounded-2xl p-4 z-40"
        >
          <div class="flex items-center justify-between mb-3">
            <span class="font-heading font-semibold flex items-center gap-2">
              <ShoppingCart class="w-5 h-5 text-primary" />
              Cart ({{ cartStore.totalItems }} items)
            </span>
            <button @click="showCart = !showCart" class="text-text-muted hover:text-white transition-colors">
              {{ showCart ? 'Hide' : 'Show' }}
            </button>
          </div>
          
          <Transition
            enter-active-class="transition-all duration-200"
            enter-from-class="opacity-0 max-h-0"
            enter-to-class="opacity-100 max-h-64"
            leave-active-class="transition-all duration-200"
            leave-from-class="opacity-100 max-h-64"
            leave-to-class="opacity-0 max-h-0"
          >
            <div v-if="showCart" class="space-y-2 mb-3 max-h-48 overflow-y-auto">
              <div
                v-for="item in cartStore.items"
                :key="item.id"
                class="flex items-center justify-between py-2 border-b border-white/10"
              >
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-medium truncate">{{ item.name }}</p>
                  <p class="text-xs text-text-muted">{{ formatPrice(item.price) }} × {{ item.quantity }}</p>
                </div>
                <div class="flex items-center gap-2 ml-2">
                  <button
                    @click="cartStore.removeFromCart(item.id)"
                    class="p-1 hover:text-primary transition-colors"
                  >
                    <Minus class="w-4 h-4" />
                  </button>
                  <span class="text-sm font-medium w-6 text-center">{{ item.quantity }}</span>
                  <button
                    @click="cartStore.addToCart(item)"
                    class="p-1 hover:text-primary transition-colors"
                  >
                    <Plus class="w-4 h-4" />
                  </button>
                  <button
                    @click="cartStore.removeItem(item.id)"
                    class="p-1 text-red-500 hover:text-red-400 transition-colors ml-1"
                  >
                    <Trash2 class="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </Transition>
          
          <div class="flex items-center justify-between pt-2 border-t border-white/10">
            <span class="font-heading font-bold text-lg text-secondary">
              {{ formatPrice(cartStore.totalPrice) }}
            </span>
            <button class="btn-primary text-sm px-6">
              Checkout
            </button>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<style scoped>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
