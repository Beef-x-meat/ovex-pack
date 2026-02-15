// Static preview helper for the fallback HTML page.
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = `Copyright ${new Date().getFullYear()} SwissPack Studio`;
}
