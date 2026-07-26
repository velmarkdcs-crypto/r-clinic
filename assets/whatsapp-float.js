(function () {
  const phoneNumber = '60178788774';
  const defaultLabel = 'Royall Clinic services';

  function cleanText(value) {
    return (value || '')
      .replace(/\s+/g, ' ')
      .replace(/\s*[-|–]\s*/g, ' ')
      .trim();
  }

  function getPageLabel() {
    const title = cleanText(document.title);
    if (title) return title;

    const heading = document.querySelector('h1, h2, .hero h1, .hero h2, .section-head h2');
    const headingText = cleanText(heading?.textContent || '');
    if (headingText) return headingText;

    const path = window.location.pathname.split('/').pop() || '';
    const slug = path.replace(/\.html$/i, '').replace(/-/g, ' ');
    return slug || defaultLabel;
  }

  function buildMessage(label) {
    return `Hi Royall Clinic, I'd like to enquire about ${label}.`;
  }

  function ensureWidget() {
    let wrapper = document.querySelector('.wa-wrapper');

    if (!wrapper) {
      wrapper = document.createElement('div');
      wrapper.className = 'wa-wrapper';
      wrapper.style.position = 'fixed';
      wrapper.style.right = '18px';
      wrapper.style.bottom = '18px';
      wrapper.style.left = 'auto';
      wrapper.style.top = 'auto';
      wrapper.style.zIndex = '2147483647';
      wrapper.innerHTML = `
        <div class="wa-chat-bubble">Book Your Treatment</div>
        <a href="#" target="_blank" class="wa-btn-container" aria-label="Contact via WhatsApp">
          <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp Icon" style="width: 45px; height: 45px;">
        </a>
      `;
      document.body.appendChild(wrapper);
    }

    const bubble = wrapper.querySelector('.wa-chat-bubble');
    const link = wrapper.querySelector('.wa-btn-container');
    const label = getPageLabel();

    if (bubble) {
      bubble.textContent = `Ask about ${label}`;
    }

    if (link) {
      link.href = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(buildMessage(label))}`;
      link.setAttribute('aria-label', `Contact via WhatsApp about ${label}`);
      link.setAttribute('rel', 'noopener noreferrer');
    }

    wrapper.style.position = 'fixed';
    wrapper.style.right = '18px';
    wrapper.style.bottom = '18px';
    wrapper.style.left = 'auto';
    wrapper.style.top = 'auto';
    wrapper.style.zIndex = '2147483647';
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ensureWidget);
  } else {
    ensureWidget();
  }
})();
