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

![alternate text goes here](http://www.iconeasy.com/icon/ico/System/Artists%20Valley%20Sample/Business%20Man%20Blue.ico)

## Tables

First Name | Last Name
--|--
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
})

// MathJax.Hub.Config({
//   tex2jax: {
//     inlineMath: [ ['$','$'], ['\\(','\\)'] ]
//   }
// });