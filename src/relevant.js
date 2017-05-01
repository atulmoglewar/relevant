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

export default class Relevant {
  constructor() {
    this.idCounter = 1;
    this.elementDisplay = {};
    this.groupIdAndKeys = {};
    this.visitRelevant(this.cacheRelevantAttributes);
  }
  showSpecificFromGroup (relevantName, groupId = "data-relevant-key-group-none") {
    const keys = this.groupIdAndKeys[groupId];
    if (keys && keys.indexOf(relevantName) !== -1) {
      this.visitRelevant(function(element) {
        const rn = element.getAttribute("data-relevant-key").toLowerCase();
        const rgid = this.getRelevantGroupId(element);
        if (rgid === groupId) {
          if (relevantName === rn) {
            element.style.display = this.getOriginalDisplay(element);
          } else {
            element.style.display = 'none';  
          }  
        }
      })  
    } 
  };

  showSpecificFromGroups(namesAndGroups) {
    let showSpecific = this.showSpecificFromGroup.bind(this);
    namesAndGroups.forEach(function(ng) {
      showSpecific(ng.name, ng.group);
    })
  }
  
  showAll() {
    this.visitRelevant(function(element) {
      element.style.display = this.getOriginalDisplay(element);
    });
  }
  
  cacheRelevantAttributes(element) {
    this.saveOriginalDisplay(element);
    this.saveGroupIdsAndKeys(element);
  }
  getOriginalDisplay(element) {
    const id = element.getAttribute('data-relevant-odid');
    return id ? this.elementDisplay[id] : ''; 
  }
  saveOriginalDisplay(element) {
    const originalDisplay = element.style.display;
    if (originalDisplay) {
      const id = element.getAttribute('data-relevant-odid');  
      if (!id) {
        element.setAttribute('data-relevant-odid', this.idCounter.toString()); 
        this.elementDisplay[this.idCounter] = originalDisplay
        this.idCounter++;  
      }
    }
  }

  saveGroupIdsAndKeys(element) {
    const rgid = this.getRelevantGroupId(element);
    const keys = this.getUpdatedRelevantKeys(element, rgid);
    this.groupIdAndKeys[rgid] = keys;
  }
  getUpdatedRelevantKeys(element, rgid) {
    const rn = element.getAttribute("data-relevant-key").toLowerCase();
    let keys = this.groupIdAndKeys[rgid];
    if (!keys) {
      keys = [];
    }
    if (keys.indexOf(rn) === -1) {
      keys.push(rn);  
    }
    return keys;
  }
  getRelevantGroupId(element) {
    let rgid = element.getAttribute("data-relevant-key-group");
    if (!rgid) {
      rgid = "data-relevant-key-group-none";
    }
    return rgid.toLowerCase();
  }
  visitRelevant(decorator) {
    const query = "[data-relevant-key]";
    const relevantElements = document.querySelectorAll(query);
    for (let i = 0; i < relevantElements.length; i++) {
      decorator.bind(this)(relevantElements[i]);  
    }
  }
}