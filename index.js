'use strict'

const config = {
  title: ':sushi: I want to buy you a sushi',
  body:
`I think your software is worth it, thank you! I will buy you a :sushi: if we meet.`,
}

const pageChangeObserver = new window.MutationObserver(() => {
  update()
})
const pjaxContainer = document.querySelector('#js-repo-pjax-container, .context-loader-container, [data-pjax-container]')
if (pjaxContainer) {
  pageChangeObserver.observe(pjaxContainer, {
    childList: true,
  })
  update()
}

function update() {
  const pageheadActions = document.querySelector('ul.pagehead-actions')

  if (pageheadActions) {
    pageheadActions.insertBefore(
      tag('li', {},
        tag('a', {
          class: 'btn btn-sm',
          href: buildIssueLink(config),
        }, '🍣')),
      pageheadActions.firstChild)
  }
}

function tag(tagName, attrs, child) {
  const element = document.createElement(tagName)

  for (let attrName of Object.keys(attrs)) {
    element.setAttribute(attrName, attrs[attrName])
  }

  if (typeof child === 'string') {
    child = document.createTextNode(child)
  }
  element.appendChild(child)

  return element
}

function buildIssueLink(config) {
  const repo = location.pathname.split('/').slice(0, 3).join('/')

  return `${location.origin}${repo}/issues/new?title=${encodeURIComponent(config.title)}&body=${encodeURIComponent(config.body)}`
}
