describe("NoteController", function() {
  var noteList = new NoteList();
  var controller = new NoteController(noteList);

  describe("On initialization", function() {
    it("creates notelist view with notelist", function() {
      expect(controller.noteListView.noteList).toBe(noteList);
    });
  });

  describe(".loadNotesHTML()", function() {
    document.getElementByIdOriginal = document.getElementById;
    var htmlMock = {
      innerHTML: "string"
    };
    document.getElementById = function() { return htmlMock; };

    it("adds empty list to div on page", function() {
      controller.loadNotesHTML();
      expect(htmlMock.innerHTML).toBe("<ul></ul>");
    });
    it("displays items in list on page", function() {
      noteList.create("Favourite drink: seltzer");
      controller.loadNotesHTML();
      expect(htmlMock.innerHTML).toBe("<ul><li><a href='#notes/0'>Favourite drink: sel...</a></li></ul>");
    });
    document.getElementById = document.getElementByIdOriginal
  });

  describe(".displayCurrentNote()", function() {
    document.getElementByIdOriginal = document.getElementById;
    it("displays text of note on page", function() {
      var htmlMock = {
        innerHTML: "string"
      };
      document.getElementById = function() { return htmlMock; };
      window.location.hash = "#notes/0";
      controller.displayCurrentNote();
      expect(htmlMock.innerHTML).toBe("<div>Favourite drink: seltzer</div>");
    });
    document.getElementById = document.getElementByIdOriginal
  });

  describe(".displayNoteOnClick()", function() {
    it("adds event listener to display current note on hashchange", function() {
      var callbackMock = (() => {this.displayCurrentNote();});
      var expectedArguments = ["hashchange", callbackMock].toString();

      var eventListenerArguments = []
      window.addEventListener = function(event, callback) {
         eventListenerArguments = [event, callback.toString()].toString();
      };
      controller.displayNoteOnClick();

      expect(eventListenerArguments).toBe(expectedArguments);
    });
  });

  describe(".listenForSubmit()", function() {
    it("updates html upon submit event", function() {
      var div = document.createElement("div");
      div.id = "text";
      div[0] = {value: "TEST"};
      document.body.appendChild(div);

      var app = document.createElement("app");
      app.id = "app";
      document.body.appendChild(app);

      controller.listenForSubmit();
      var submit = new Event("submit");
      div.dispatchEvent(submit);
      expect(app.innerHTML).toBe('<ul><li><a href="#notes/0">Favourite drink: sel...</a></li><li><a href="#notes/1">TEST</a></li></ul>');
    })
  });

});
