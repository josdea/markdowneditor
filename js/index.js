Vue.directive('highlightjs', {
  deep: true,
  bind: function(el, binding) {
    // on first bind, highlight all targets
    let targets = el.querySelectorAll('code')
    targets.forEach((target) => {
      // if a value is directly assigned to the directive, use this
      // instead of the element content.
      if (binding.value) {
        target.textContent = binding.value
      }
      hljs.highlightBlock(target)
    })
  },
  componentUpdated: function(el, binding) {
    // after an update, re-fill the content and then highlight
    let targets = el.querySelectorAll('code')
    targets.forEach((target) => {
      if (binding.value) {
        target.textContent = binding.value
        hljs.highlightBlock(target)
      }
    })
  }
})
new Vue({
  el: '#editor',
  data: {
    input: `Use the box in the far left to try our your markdown.

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

[Google Search](google.com)

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
`
  },
  computed: {
    compiledMarkdown: function () {
      
      return marked(this.input, { sanitize: false, gfm: true })
    },
        rawHTML: function () {
         
      return marked(this.input, { sanitize: false, gfm: true })
    }
  },
  methods: {
    update: _.debounce(function (e) {
      this.input = e.target.value
this.$nextTick(function() {
						 MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
					 });
    }, 300)
  }
})

MathJax.Hub.Config({
  tex2jax: {
    inlineMath: [ ['$$$','$$$'], ['\(','\)'] ]
  }
});