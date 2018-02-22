function unhighlightAllElements(el, index) {
  // We search and get the parent of the element to be able to
  // touch all their child nodes:
  el = el.parentNode.firstChild;

  // this block doesn't need explaing anything due it's simplicity.
  do {
    if (el.tagName === 'DIV') {
      el.classList.remove("item-pressed");
      el.classList.remove("item-highlighted");
    }
  } while(el = el.nextSibling);
};

function unmarkNextSiblings(el, index) {
  do {
    if (el.tagName === 'DIV') {
      if (el.tabIndex < index.tabIndex) {
        el.classList.remove("item-highlighted");
      };
    };
  } while(el = el.previousSibling);
};

function unmarkPreviousSiblings(el, index) {
  do {
    if (el.tagName === 'DIV') {
      if (el.tabIndex > index.tabIndex) {
        el.classList.remove("item-highlighted");
      };
    };
  } while(el = el.nextSibling);
};

function markPreviousSiblings(el, index) {
  unmarkNextSiblings(el, index);
  unmarkPreviousSiblings(el, index);
  do {
    if (el.tagName === 'DIV') {
      if (el.tabIndex > index.tabIndex) {
        el.classList.add("item-highlighted");
      };
    };
  } while(el = el.previousSibling);
};

function markNextSiblings(el, index) {
  unmarkNextSiblings(el, index);
  unmarkPreviousSiblings(el, index);
  do {
    if (el.tagName === 'DIV') {
      if (el.tabIndex < index.tabIndex) {
        el.classList.add("item-highlighted");
      };
    };
  } while(el = el.nextSibling);
};

// Get all elements with the className "item":
var div = document.querySelectorAll(".item");

// "el": used to hold an instance selected at first click.
var el = null;

// This loop helps us to iterate through all the elements:
for(var i = 0; i< div.length; i++) {

  // This closure helps us to get the approppiate index of the for loop
  // to use it in the event listeners later:
  (function(i) {

    // Event: "moursedown"
    div[i].addEventListener('mousedown', function(e) {

      // If the current target doesn't have the className "item-pressed", then:
      if (e.target.className.split(' ').indexOf('item-pressed') < 0) {

        // if "el" doesn't exists yet, then:
        if (!el) { // #1

          // Unmark all the previously marked (if they were marked)
          unhighlightAllElements(e.target);

          // Add the className "item-pressed"
          // to the current element clicked
          e.target.classList.add("item-pressed");

          // As "el" previously didn't exists, then
          // now it will hold the instance of this element:
          el = e.target;

        } else { // end.
          // Due to the "el" now holds an instance of first element clicked,
          // now this part marks the last element clicked:

          // If the current element is ahead of the first element, then:
          if (e.target.tabIndex > el.tabIndex) {

            // Highlight from the first element up-to this element:
            markPreviousSiblings(e.target, el);

          } else { // the current element is behind of the first element:

            // Highlight from the current element up-to the first element:
            markNextSiblings(e.target, el);
          };

          // Now that we have marked all the necessary elements we need to
          // highlight the current element to distinguish it better:
          e.target.classList.add("item-pressed");

          // As the process went well, now we can unset the first element,
          // having said that, we can re-select it as much as we need it again:
          el = null;
        };

      } else {
        // Due the current element have already the className "item-pressed"
        // We need track if the current element is the same as the last selected:

        // If the current element clicked is itself, then:
        if (el) { // #3

          // Unhighlight all the previous elements highlighted:
          unhighlightAllElements(el);

          // unset the value of this variable:
          el = null;

        } else { // #2
          // The variable "el" is currently unset.

          // When the click is performed in the first or in the last element:

          // Unhighlight all the previous elements highlighted:
          unhighlightAllElements(e.target);

          // Add the className "item-pressed"
          // to the current element clicked
          e.target.classList.add("item-pressed");

          // As "el" previously was unset,
          // now it will hold the instance of this element:
          el = e.target;
        };
      };
    });

    // Event: "moursedown"
    // Due the mouse will be passing over the elements
    // we are going to highlight the elements that are below of it:
    div[i].addEventListener('mouseover', function(e) {

      // If "el" holds the instance of the first element pressed, then:
      if (el) {

        // if the current element doesn't have a className "item-highlighted":
        if (e.target.className.split(' ').indexOf('item-highlighted') < 0) {

          // Add the className "item-highlighted"
          // to the current element
          e.target.classList.add("item-highlighted");
        };
      };
    });

  })(i);
};
