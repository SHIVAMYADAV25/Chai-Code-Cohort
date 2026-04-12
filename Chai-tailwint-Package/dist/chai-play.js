function observeChanges() {
  const observer = new MutationObserver(() => {
    run();
  });

  observer.observe(document.body, {
    attributes: true,
    childList: true,
    subtree: true
  });
}

// Init
document.addEventListener("DOMContentLoaded", () => {
  run();
  observeChanges(); // 🔥 live update
});