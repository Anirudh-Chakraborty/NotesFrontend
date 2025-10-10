/* UI helpers to render navbar and main content */
(function () {
	const notesListEl = () => document.getElementById('notesList');
	const mainContentEl = () => document.getElementById('mainContent');

	function renderNotesList(notes) {
		const list = notesListEl();
		if (!list) return;
		list.innerHTML = '';

		notes.forEach((n, idx) => {
			const li = document.createElement('li');
			li.className = 'nav-item';
			li.textContent = n.title || `Untitled ${idx+1}`;
			li.dataset.id = n.id;
			li.addEventListener('click', () => showNote(n.id));
			list.appendChild(li);
		});

		// mark first as active if present
		if (list.firstChild) list.firstChild.classList.add('active');
	}

	function showNote(id) {
		const notes = Storage.getNotes();
		const note = notes.find(n => n.id === id);
		const main = mainContentEl();
		if (!main) return;
		if (!note) {
			main.innerHTML = '<p class="hint">Note not found</p>';
			return;
		}
		main.innerHTML = `<article class="note-card"><h3 class="note-title">${escapeHtml(note.title)}</h3><div class="note-body">${escapeHtml(note.body)}</div><div class="note-meta">${new Date(note.createdAt).toLocaleString()}</div></article>`;
		// update active state in sidebar
		document.querySelectorAll('.nav-item').forEach(el => el.classList.toggle('active', el.dataset.id === id));
	}

	function escapeHtml(str) {
		if (!str) return '';
		return String(str).replace(/[&<>"']/g, s => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[s]);
	}

	window.UI = { renderNotesList, showNote };
})();
