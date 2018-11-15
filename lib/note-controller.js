(function(exports) {
  function NoteController(noteList) {
    this.noteList = noteList;
    this.noteListView = new NoteListView(noteList);
  }

  NoteController.prototype.loadNotesHTML = function() {
    var app = document.getElementById("app");
    app.innerHTML = this.noteListView.html();
  };

  NoteController.prototype._currentID = function() {
    return window.location.hash.split("/")[1];
  };

  NoteController.prototype._findNoteByID = function(id) {
    return this.noteList.notes().find((note) => {
      return String(note.id) === id;
    });
  };

  NoteController.prototype.displayNoteOnClick = function() {
    window.addEventListener("hashchange", () => {this.displayCurrentNote();});
  };

  NoteController.prototype.displayCurrentNote = function() {
    var note = this._findNoteByID(this._currentID());
    var view = new SingleNoteView(note);
    document.getElementById("app").innerHTML = view.html();
  };

  NoteController.prototype.listenForSubmit = function() {
    document.getElementById("text").addEventListener("submit", (event) => {
      event.preventDefault();
      this.noteList.create(event.target[0].value);
      this.loadNotesHTML();
    })
  };

  exports.NoteController = NoteController;
})(this);
