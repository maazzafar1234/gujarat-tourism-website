window.addEventListener('DOMContentLoaded', () => {
    fetch('../src/components/ui/footer.html')
      .then(response => response.text())
      .then(html => {
        document.getElementById('footer-container').innerHTML = html;
      });
  });