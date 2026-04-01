import './style.css'
import data from './data.json'

// Load data from JSON and populate the page
function loadData() {
  // Hero Section
  document.getElementById('heroTitle').textContent = data.hero.heading
  document.getElementById('heroSubtitle').textContent = data.hero.subheading
  document.getElementById('heroCta').textContent = data.hero.cta
  document.title = data.title

  // Features Section
  const featuresGrid = document.getElementById('featuresGrid')
  featuresGrid.innerHTML = data.features.map(feature => `
    <div class="feature-card">
      <div class="feature-card__icon">${feature.icon}</div>
      <h3 class="feature-card__title">${feature.title}</h3>
      <p class="feature-card__description">${feature.description}</p>
    </div>
  `).join('')

  // Free Trial Section
  document.getElementById('freeTrialTitle').textContent = data.freeTrial.title
  document.getElementById('freeTrialDescription').textContent = data.freeTrial.description
  document.getElementById('freeTrialNote').textContent = data.freeTrial.note
  
  const freeTrialList = document.getElementById('freeTrialList')
  freeTrialList.innerHTML = data.freeTrial.conditions.map(condition => `
    <li>${condition}</li>
  `).join('')

  // Reviews Section
  const reviewsGrid = document.getElementById('reviewsGrid')
  reviewsGrid.innerHTML = data.reviews.map(review => `
    <div class="review-card">
      <div class="review-card__header">
        <div class="review-card__avatar">${review.avatar}</div>
        <div class="review-card__info">
          <h3>${review.name}</h3>
          <p>${review.company}</p>
        </div>
      </div>
      <div class="review-card__rating">${'⭐'.repeat(review.rating)}</div>
      <p class="review-card__text">${review.text}</p>
    </div>
  `).join('')

  // Installment Section
  document.getElementById('installmentTitle').textContent = data.installment.title
  document.getElementById('installmentDescription').textContent = data.installment.description
  
  const installmentTerms = document.getElementById('installmentTerms')
  installmentTerms.innerHTML = data.installment.terms.map(term => `
    <li>${term}</li>
  `).join('')

  // Pricing
  const price = Number(data.pricing.monthly);
  if (price === 0) {
    document.getElementById('monthlyPrice').textContent = '0 тенге'
  } else {
    document.getElementById('monthlyPrice').textContent = `${price.toLocaleString('ru-RU')} тенге`
  }
  document.getElementById('priceNote').textContent = data.pricing.note
}

// Handle WhatsApp button
function setupWhatsAppButton() {
  const whatsappBtn = document.getElementById('whatsappBtn')
  const whatsappNumber = data.cta.whatsapp
  const message = encodeURIComponent(`Здравствуйте! Интересует реклама для бизнеса "${data.niche}". Хочу получить консультацию.`)
  
  whatsappBtn.href = `https://wa.me/${whatsappNumber}?text=${message}`
  whatsappBtn.target = '_blank'
}

// Setup CTA buttons to scroll to form
function setupCTAButtons() {
  const ctaButtons = document.querySelectorAll('.btn-primary, .btn-secondary')
  const ctaSection = document.querySelector('.cta-section')
  
  ctaButtons.forEach(button => {
    button.addEventListener('click', () => {
      ctaSection.scrollIntoView({ behavior: 'smooth', block: 'center' })
      
      // Focus on the first input field
      setTimeout(() => {
        const firstInput = document.querySelector('.form-input')
        if (firstInput) firstInput.focus()
      }, 500)
    })
  })
}

// Add smooth scroll behavior
function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute('href'))
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' })
      }
    })
  })
}

// Add animation on scroll
function setupScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1'
        entry.target.style.transform = 'translateY(0)'
      }
    })
  }, observerOptions)

  // Observe all cards
  document.querySelectorAll('.feature-card, .review-card, .price-card, .cta-box').forEach(el => {
    el.style.opacity = '0'
    el.style.transform = 'translateY(30px)'
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease'
    observer.observe(el)
  })
}

// Initialize the app
function init() {
  loadData()
  setupWhatsAppButton()
  setupCTAButtons()
  setupSmoothScroll()
  
  // Wait a bit for DOM to be fully ready
  setTimeout(setupScrollAnimations, 100)
  
  console.log('🚀 Лендинг загружен! Данные:', data)
  console.log('💡 Вы можете изменить файл src/data.json для другой ниши')
}

// Run when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init)
} else {
  init()
}
