/**
  Copyright 2017, Atul Moglewar

  Permission to use, copy, modify, and/or distribute this
  software for any purpose with or without fee is hereby
  granted, provided that the above copyright notice and
  this permission notice appear in all copies.

  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS
  ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL
  IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO
  EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES 
  WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, 
  WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER 
  TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE
  USE OR PERFORMANCE OF THIS SOFTWARE.
*/

function Relevant() {
  var _api = {};
  var idCounter = 1;
  var elementDisplay = {};
  _api.showSpecific = function(relevantName) {
    _visitRelevant(function(element, rn) {
      if (relevantName === rn) {
        element.style.display = _getOriginalDisplay(element);
      } else {
        element.style.display = 'none';  
      }
    })
  };

  _api.showAll = function() {
    _visitRelevant(function(element) {
      element.style.display = _getOriginalDisplay(element);
    })
  }
  
  function _getOriginalDisplay(element) {
    var id = element.getAttribute('data-relevant-odid');
    return id ? elementDisplay[id] : ''; 
  }
  function _saveOriginalDisplay(element) {
    var originalDisplay = element.style.display;
    if (originalDisplay) {
      var id = element.getAttribute('data-relevant-odid');  
      if (!id) {
        element.setAttribute('data-relevant-odid', idCounter.toString()); 
        elementDisplay[idCounter] = originalDisplay
        idCounter++;  
      }
    }
  }
    
  function _init() {
    _visitRelevant(_saveOriginalDisplay);
  }
  
  function _visitRelevant(decorator) {
    var query = "[data-relevant-key]";
    var relevantElements = document.querySelectorAll(query);
    for (i = 0; i < relevantElements.length; i++) {
      var rn = relevantElements[i].getAttribute("data-relevant-key");
      decorator(relevantElements[i], rn.toLowerCase());  
    }
  }

  _init();
  return _api;
}