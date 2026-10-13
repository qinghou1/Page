/* Progressive enhancements. Essential content and PDF links remain accessible
   without JavaScript. No analytics, network requests, or third-party code. */
(() => {
  'use strict';
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];
  const nav = $('#site-nav');
  const menu = $('.menu-toggle');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const scrollToElement = element => element?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });

  function closeMenu() {
    nav?.classList.remove('open');
    menu?.setAttribute('aria-expanded', 'false');
  }
  menu?.addEventListener('click', () => {
    const open = menu.getAttribute('aria-expanded') !== 'true';
    menu.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('open', open);
  });
  $$('#site-nav a').forEach(a => a.addEventListener('click', closeMenu));
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && nav?.classList.contains('open')) { closeMenu(); menu.focus(); }
  });
  document.addEventListener('click', e => {
    if (nav?.classList.contains('open') && !e.target.closest('.site-header')) closeMenu();
  });
  window.matchMedia('(min-width: 781px)').addEventListener('change', e => { if(e.matches) closeMenu(); });

  // Current section and understated reading progress.
  let scrollPending = false;
  const navigationLinks = $$('#site-nav a');
  const navSections = navigationLinks.map(a => $(a.getAttribute('href'))).filter(Boolean);
  function updateScroll() {
    const max = document.documentElement.scrollHeight - innerHeight;
    $('.reading-progress')?.style.setProperty('--progress', `${max > 0 ? Math.min(100, Math.max(0, scrollY / max * 100)) : 0}%`);
    let current = '';
    for (const section of navSections) if (section.getBoundingClientRect().top <= 180) current = section.id;
    navigationLinks.forEach(a => {
      const active = a.getAttribute('href') === `#${current}`;
      a.classList.toggle('active', active);
      if (active) a.setAttribute('aria-current','location'); else a.removeAttribute('aria-current');
    });
    scrollPending = false;
  }
  window.addEventListener('scroll', () => {
    if (!scrollPending) { scrollPending = true; requestAnimationFrame(updateScroll); }
  }, { passive:true });
  window.addEventListener('resize', updateScroll);
  updateScroll();

  // Publication filters/search. The HTML retains all 19 entries for indexing.
  const publications = $$('.publication');
  const filterButtons = $$('.filter-button');
  const search = $('#publication-search');
  let activeFilter = 'selected';
  // Keep visible filter counts correct when entries are added or removed.
  filterButtons.forEach(button => {
    const f = button.dataset.filter;
    const total = publications.filter(item => f === 'all' || (f === 'selected' ? item.dataset.selected === 'true' : item.dataset.status === f)).length;
    const countNode = $('span',button);
    if(countNode) countNode.textContent = String(total);
  });
  function filterPublications(filter = activeFilter) {
    activeFilter = filter;
    const query = (search?.value || '').trim().toLocaleLowerCase();
    let count = 0;
    publications.forEach(item => {
      const inGroup = filter === 'all' || (filter === 'selected' ? item.dataset.selected === 'true' : item.dataset.status === filter);
      const inQuery = !query || item.textContent.toLocaleLowerCase().includes(query);
      item.hidden = !(inGroup && inQuery);
      if (!item.hidden) count++;
    });
    filterButtons.forEach(button => {
      const active = button.dataset.filter === activeFilter;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    const label = activeFilter === 'selected' ? 'selected works' : activeFilter === 'published' ? 'published works & reports' : activeFilter === 'review' ? 'manuscripts under review' : 'works';
    $('#publication-count').textContent = `${count} ${label}${query ? ' matching your search' : ''} · Academic record updated October 2026`;
    $('#no-results').hidden = count !== 0;
    updateScroll();
  }
  filterButtons.forEach(button => button.addEventListener('click', () => filterPublications(button.dataset.filter)));
  search?.addEventListener('input', () => filterPublications());
  filterPublications();

  $$('[data-search-topic]').forEach(button => button.addEventListener('click', () => {
    search.value = button.dataset.searchTopic;
    filterPublications('all');
    scrollToElement($('#publications'));
  }));
  $$('[data-show-paper]').forEach(button => button.addEventListener('click', () => {
    search.value = '';
    filterPublications('all');
    const paper = $(`#paper-${button.dataset.showPaper}`);
    scrollToElement(paper);
    paper?.setAttribute('tabindex','-1');
    if(paper) setTimeout(() => paper.focus({preventScroll:true}),reduceMotion ? 0 : 550);
  }));

  // Citation copying works on HTTPS, localhost, and (via fallback) file://.
  let toastTimer;
  function toast(message) {
    const node = $('#toast');
    node.textContent = message;
    node.classList.add('visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => node.classList.remove('visible'), 3000);
  }
  async function copyText(text) {
    if(navigator.clipboard && window.isSecureContext) {
      try { await navigator.clipboard.writeText(text); return true; } catch (_) { /* use fallback */ }
    }
    const field = document.createElement('textarea');
    field.value = text;
    field.setAttribute('readonly','');
    field.style.cssText = 'position:fixed;left:-9999px;top:0;';
    document.body.append(field);
    field.select();
    let success = false;
    try { success = document.execCommand('copy'); } catch (_) { /* report failure below */ }
    field.remove();
    return success;
  }
  $$('.copy-citation').forEach(button => button.addEventListener('click', async () => {
    const text = button.closest('.publication').dataset.citation;
    const success = await copyText(text);
    if(success) {
      $('span',button).textContent = 'Copied';
      toast('Citation copied to clipboard.');
      setTimeout(() => { $('span',button).textContent = 'Copy citation'; },2200);
    } else {
      // Display the exact citation for manual copying instead of reporting false success.
      window.prompt('Copy this citation:',text);
    }
    button.focus({preventScroll:true});
  }));

  // Native dialog provides focus containment, Escape support, and inert background.
  const dialog = $('#project-dialog');
  let projectOpener = null;
  $$('[data-project]').forEach(button => button.addEventListener('click', () => {
    const template = $(`#project-${button.dataset.project}`);
    if(!template || !dialog || typeof dialog.showModal !== 'function') {
      const pdf = button.closest('.project-card')?.querySelector('.project-bottom a');
      if(pdf) window.open(pdf.href,'_blank','noopener');
      return;
    }
    projectOpener = button;
    $('#dialog-content').replaceChildren(template.content.cloneNode(true));
    dialog.showModal();
    dialog.scrollTop = 0;
    document.body.classList.add('modal-open');
    $('.dialog-close',dialog).focus();
  }));
  $('.dialog-close')?.addEventListener('click', () => dialog.close());
  dialog?.addEventListener('click', e => {
    if (e.target !== dialog) return;
    const r = dialog.getBoundingClientRect();
    if(e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) dialog.close();
  });
  dialog?.addEventListener('close', () => {
    document.body.classList.remove('modal-open');
    projectOpener?.focus({preventScroll:true});
  });
})();
