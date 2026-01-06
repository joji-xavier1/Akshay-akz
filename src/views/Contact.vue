<script setup>
import { ref, onMounted } from 'vue'
import { Mail, Copy, Check, Send, MapPin, Phone, MessageCircle, Youtube, Instagram, Twitter } from 'lucide-vue-next'

const isVisible = ref(false)
const copied = ref(false)
const isSubmitting = ref(false)
const isSubmitted = ref(false)

const email = 'akshayakz654@gmail.com'

const form = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const errors = ref({})

const contactInfo = [
  { icon: Mail, label: 'Email', value: email, link: `mailto:${email}` },
  { icon: MapPin, label: 'Location', value: 'India', link: null },
  { icon: Phone, label: 'Business Hours', value: 'Mon-Fri, 10AM-6PM IST', link: null }
]

const socialLinks = [
  { icon: Youtube, label: 'YouTube', url: 'https://youtube.com/@akshayakz', color: 'hover:bg-red-500' },
  { icon: Instagram, label: 'Instagram', url: 'https://instagram.com/akshayakz', color: 'hover:bg-pink-500' },
  { icon: Twitter, label: 'Twitter', url: 'https://twitter.com/akshayakz', color: 'hover:bg-blue-400' },
  { icon: MessageCircle, label: 'Discord', url: 'https://discord.gg/teamlava', color: 'hover:bg-indigo-500' }
]

const copyEmail = async () => {
  try {
    await navigator.clipboard.writeText(email)
    copied.value = true
    setTimeout(() => copied.value = false, 2000)
  } catch (err) {
    console.error('Failed to copy:', err)
  }
}

const validateForm = () => {
  errors.value = {}
  
  if (!form.value.name.trim()) {
    errors.value.name = 'Name is required'
  }
  
  if (!form.value.email.trim()) {
    errors.value.email = 'Email is required'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)) {
    errors.value.email = 'Please enter a valid email'
  }
  
  if (!form.value.subject.trim()) {
    errors.value.subject = 'Subject is required'
  }
  
  if (!form.value.message.trim()) {
    errors.value.message = 'Message is required'
  } else if (form.value.message.length < 20) {
    errors.value.message = 'Message must be at least 20 characters'
  }
  
  return Object.keys(errors.value).length === 0
}

const submitForm = async () => {
  if (!validateForm()) return
  
  isSubmitting.value = true
  
  // Simulate form submission
  await new Promise(resolve => setTimeout(resolve, 1500))
  
  isSubmitting.value = false
  isSubmitted.value = true
  
  // Reset form
  form.value = { name: '', email: '', subject: '', message: '' }
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
          GET IN <span class="text-gradient">TOUCH</span>
        </h1>
        <p class="text-text-muted max-w-2xl mx-auto">
          Have a business inquiry? Want to collaborate? Get in touch and let's create something amazing together!
        </p>
      </div>

      <div class="grid lg:grid-cols-2 gap-8 lg:gap-12">
        <!-- Contact Form -->
        <div 
          class="card transition-all duration-700 delay-100"
          :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
        >
          <h2 class="text-2xl font-heading font-bold mb-6">BUSINESS INQUIRY</h2>
          
          <Transition
            enter-active-class="transition-all duration-300"
            enter-from-class="opacity-0 scale-95"
            enter-to-class="opacity-100 scale-100"
          >
            <div v-if="isSubmitted" class="text-center py-12">
              <div class="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                <Check class="w-8 h-8 text-green-500" />
              </div>
              <h3 class="text-xl font-heading font-bold mb-2">Message Sent!</h3>
              <p class="text-text-muted">Thank you for reaching out. We'll get back to you soon!</p>
              <button
                @click="isSubmitted = false"
                class="btn-secondary mt-6"
              >
                Send Another Message
              </button>
            </div>
          </Transition>
          
          <form v-if="!isSubmitted" @submit.prevent="submitForm" class="space-y-5">
            <!-- Name -->
            <div>
              <label for="name" class="block text-sm font-medium mb-2">Your Name</label>
              <input
                id="name"
                v-model="form.name"
                type="text"
                placeholder="John Doe"
                class="w-full px-4 py-3 rounded-lg bg-background border transition-colors focus:outline-none focus:border-primary"
                :class="errors.name ? 'border-red-500' : 'border-white/10'"
              />
              <p v-if="errors.name" class="text-red-500 text-sm mt-1">{{ errors.name }}</p>
            </div>
            
            <!-- Email -->
            <div>
              <label for="email" class="block text-sm font-medium mb-2">Email Address</label>
              <input
                id="email"
                v-model="form.email"
                type="email"
                placeholder="john@example.com"
                class="w-full px-4 py-3 rounded-lg bg-background border transition-colors focus:outline-none focus:border-primary"
                :class="errors.email ? 'border-red-500' : 'border-white/10'"
              />
              <p v-if="errors.email" class="text-red-500 text-sm mt-1">{{ errors.email }}</p>
            </div>
            
            <!-- Subject -->
            <div>
              <label for="subject" class="block text-sm font-medium mb-2">Subject</label>
              <select
                id="subject"
                v-model="form.subject"
                class="w-full px-4 py-3 rounded-lg bg-background border transition-colors focus:outline-none focus:border-primary"
                :class="errors.subject ? 'border-red-500' : 'border-white/10'"
              >
                <option value="" disabled>Select a topic</option>
                <option value="sponsorship">Sponsorship Opportunity</option>
                <option value="collaboration">Collaboration Request</option>
                <option value="merchandise">Merchandise Partnership</option>
                <option value="media">Media & Press Inquiry</option>
                <option value="other">Other</option>
              </select>
              <p v-if="errors.subject" class="text-red-500 text-sm mt-1">{{ errors.subject }}</p>
            </div>
            
            <!-- Message -->
            <div>
              <label for="message" class="block text-sm font-medium mb-2">Your Message</label>
              <textarea
                id="message"
                v-model="form.message"
                rows="5"
                placeholder="Tell us about your proposal..."
                class="w-full px-4 py-3 rounded-lg bg-background border transition-colors focus:outline-none focus:border-primary resize-none"
                :class="errors.message ? 'border-red-500' : 'border-white/10'"
              ></textarea>
              <p v-if="errors.message" class="text-red-500 text-sm mt-1">{{ errors.message }}</p>
            </div>
            
            <button
              type="submit"
              :disabled="isSubmitting"
              class="btn-primary w-full flex items-center justify-center gap-2"
            >
              <span v-if="isSubmitting" class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              <Send v-else class="w-5 h-5" />
              {{ isSubmitting ? 'Sending...' : 'Send Message' }}
            </button>
          </form>
        </div>

        <!-- Contact Info -->
        <div 
          class="space-y-6 transition-all duration-700 delay-200"
          :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
        >
          <!-- Email Card (Click to Copy) -->
          <div class="card">
            <h3 class="font-heading font-semibold mb-4">QUICK CONTACT</h3>
            <button
              @click="copyEmail"
              class="w-full flex items-center justify-between p-4 rounded-lg bg-background border border-white/10 hover:border-primary transition-all group"
            >
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center group-hover:bg-primary transition-colors">
                  <Mail class="w-5 h-5 group-hover:text-white" :class="copied ? 'text-green-500' : 'text-primary'" />
                </div>
                <div class="text-left">
                  <p class="text-sm text-text-muted">Email</p>
                  <p class="font-medium">{{ email }}</p>
                </div>
              </div>
              <div class="flex items-center gap-2 text-sm" :class="copied ? 'text-green-500' : 'text-text-muted'">
                <Check v-if="copied" class="w-5 h-5" />
                <Copy v-else class="w-5 h-5" />
                {{ copied ? 'Copied!' : 'Click to copy' }}
              </div>
            </button>
          </div>

          <!-- Contact Info Cards -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div
              v-for="info in contactInfo.slice(1)"
              :key="info.label"
              class="card py-5"
            >
              <component :is="info.icon" class="w-6 h-6 text-primary mb-3" />
              <p class="text-sm text-text-muted">{{ info.label }}</p>
              <p class="font-medium">{{ info.value }}</p>
            </div>
          </div>

          <!-- Social Links -->
          <div class="card">
            <h3 class="font-heading font-semibold mb-4">CONNECT WITH US</h3>
            <div class="grid grid-cols-2 gap-3">
              <a
                v-for="social in socialLinks"
                :key="social.label"
                :href="social.url"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-3 p-3 rounded-lg bg-background border border-white/10 hover:border-transparent transition-all"
                :class="social.color"
              >
                <component :is="social.icon" class="w-5 h-5" />
                <span class="font-medium">{{ social.label }}</span>
              </a>
            </div>
          </div>

          <!-- Response Time -->
          <div class="card bg-gradient-to-r from-primary/10 to-accent/10 border-primary/30">
            <div class="flex items-start gap-4">
              <div class="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                <MessageCircle class="w-6 h-6 text-primary" />
              </div>
              <div>
                <h4 class="font-heading font-semibold">Response Time</h4>
                <p class="text-text-muted text-sm mt-1">
                  We typically respond to business inquiries within 24-48 hours. For faster responses, reach out via Discord!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
