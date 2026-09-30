const clock = document.getElementById('clock');
const pathLabel = document.getElementById('pathLabel');
const links = [...document.querySelectorAll('.nav')];
const views = [...document.querySelectorAll('.view')];

function tick(){
  const d = new Date();
  clock.textContent = d.toLocaleTimeString('fr-FR',{hour:'2-digit',minute:'2-digit'});
}
tick();
setInterval(tick,30000);

const labels = {
  home:'~/home', about:'~/about', projects:'~/projects', skills:'~/skills',
  path:'~/path', creative:'~/creative', contact:'~/contact'
};

function showView(id, updateHash=true){
  const target = document.getElementById(id) || document.getElementById('home');
  const activeId = target.id;
  views.forEach(view => view.classList.toggle('active-view', view === target));
  links.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${activeId}`));
  pathLabel.textContent = labels[activeId] || `~/${activeId}`;
  if(updateHash && location.hash !== `#${activeId}`) history.pushState(null,'',`#${activeId}`);
}

function route(){ showView((location.hash || '#home').slice(1), false); }
window.addEventListener('hashchange', route);
route();

document.querySelectorAll('[data-copy]').forEach(el => {
  el.addEventListener('click', async () => {
    const value = el.dataset.copy;
    try {
      await navigator.clipboard.writeText(value);
      const original = el.innerHTML;
      el.innerHTML = `${value} <small>copié ✓</small>`;
      setTimeout(() => el.innerHTML = original, 1200);
    } catch {
      // Clipboard may be unavailable in local file mode.
    }
  });
});
