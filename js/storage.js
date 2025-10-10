/* Minimal localStorage-backed notes storage */
(function () {
	const KEY = 'notes:v1';

	function _load() {
		try { return JSON.parse(localStorage.getItem(KEY) || '[]'); }
		catch (e) { console.error('storage parse', e); return []; }
	}

	function _save(notes) { localStorage.setItem(KEY, JSON.stringify(notes)); }

	function getNotes() { return _load(); }

	function addNote(note) {
		const notes = _load();
		notes.unshift(note);
		_save(notes);
		return note;
	}

	function updateNote(id, patch) {
		const notes = _load().map(n => n.id === id ? Object.assign({}, n, patch) : n);
		_save(notes);
	}

	function deleteNote(id) {
		const notes = _load().filter(n => n.id !== id);
		_save(notes);
	}

	window.Storage = { getNotes, addNote, updateNote, deleteNote };
})();
