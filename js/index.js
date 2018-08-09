Vue.directive('highlightjs', {
  deep: true,
  bind: function (el, binding) {
    let targets = el.querySelectorAll('code')
    targets.forEach((target) => {
      if (binding.value) {
        target.textContent = binding.value
      }
      hljs.highlightBlock(target)
    })
  },
  componentUpdated: function (el, binding) {
    let targets = el.querySelectorAll('code')
    targets.forEach((target) => {
      if (binding.value || binding.value == '') {
// debugger;

        target.textContent = binding.value
        hljs.highlightBlock(target)
      }
    })
  }
})
new Vue({
  el: '#editor',
  data: {
    input: `Use the box in the far left to try out your markdown. Data is saved in your local browser storage.

# Markdown Reference Guide
Download the HTML when you're finished.  The HTML file comes with support for math as well as Bootstrap 4 styling and functionality.  It also references a styles.css if available. 

## Emphasis
*Italics* or _Italics_
**Bold** or __Bold__

## Lists
### Unordered List
* Item 1
* Item 2
 * Sub-item 1
* Item 3

### Ordered List
Ordered List
1. item one
2. item two
 1. sub-item one
3. item three

## Links

An example link: [Printable Markdown Guide](./reference.html)

## Images

![alternate text goes here](./images/sample.jpg)

All images should be placed in an images folder.  The images folder should be in the same place as the HTML file that this markdown produces.

## Tables

First Name | Last Name
-|-
Billy | Rogers
Sally | Straum 

## Horizontal Rule
***

## Blockquote
> this is a quote
> quote continued

## Example Math Content

This is inline math \\\\(y=4x^2 - 2x=13\\\\) calling from the [MathJax](www.mathjax.org/) library.

This is math in block format on its own line. \\\\[y=4x^2 - 2x=13\\\\] 

`
  },
  computed: {
    compiledMarkdown: function () {
      return marked(this.input, { sanitize: false, gfm: true })
    },
    rawHTML: function () {
      // debugger;
      return marked(this.input, { sanitize: false, gfm: true })
    }
  },
  methods: {
    update: _.debounce(function (e) {
      this.input = e.target.value
      this.$nextTick(function () {
        MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
      });
    }, 300),
    updatelocalstorage: function () {
      // alert("in update local function");
      if (typeof Storage !== "undefined") {
        localStorage.input = this.input;
        console.log("this input" + this.input);
        // alert("local storage updated");
      }

    },
    retrievelocalstorage: function () {

      if (typeof Storage !== "undefined") {
        if (localStorage.input) {
          this.input = localStorage.input;
          // alert("local storage retrieved");
        } else {
          // alert("First time here");
          localStorage.input = this.input;
        }
      } else {
        alert("Sorry, your browser does not support web storage.  Changes will not be saved");
      }
    },
    resetls: function () {
      localStorage.clear();
      location.reload();
    },
    downloadHTML: function () {
 
      let pTitle = prompt("Please enter desired page title (displays in browser tab):", "Untitled");
      if (pTitle == null || pTitle == "") {
        pTitle = "";
      }
 
      let tStart = '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"><link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous"><script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.1/MathJax.js?config=TeX-MML-AM_HTMLorMML"></script><title>' + pTitle + '</title><link rel="stylesheet" type="text/css" href="styles.css"><style></style></head><body><main><div class="container">';
      let tEnd = '</div></main><script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script><script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script><script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script></body></html>';
      let text = tStart + this.rawHTML + tEnd;
      // let d = new Date();

      let filename = prompt("Please enter desired file name (ideally all lowercase and no spaces or special characters:", "index");
      if (filename == null || filename == "") {
        filename = "index";
      } else {
        console.log(filename);
      }

      filename = filename + ".html";
      download(filename, text);
      
      // console.log(this.rawHTML);
    }
  },
  created: function () {
    // alert("Hello! Vue Created");
    this.retrievelocalstorage();
    // 
  },
  updated: function () {
    this.updatelocalstorage();
  }
});

function download(filename, text) {
  var element = document.createElement("a");
  element.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(text)
  );
  element.setAttribute("download", filename);
  element.style.display = "none";
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

// MathJax.Hub.Config({
//   tex2jax: {
//     inlineMath: [ ['$','$'], ['\\(','\\)'] ]
//   }
// });