// script.js

import { router } from './router.js'; // Router imported so you can use it to manipulate your SPA app here
history.replaceState({page: 0}, 'main', '');
window.onpopstate = router.listener;

// Make sure you register your service worker here too

document.addEventListener('DOMContentLoaded', () => {
  fetch('https://cse110lab6.herokuapp.com/entries')
    .then(response => response.json())
    .then(entries => {
      entries.forEach(entry => {
        let newPost = document.createElement('journal-entry');
        newPost.entry = entry;
        document.querySelector('main').appendChild(newPost);
      });
    }).then(() => {
        document.querySelectorAll('main journal-entry').forEach((element, index) => {
            element.addEventListener('mouseup', e => {
                if(history.state.page === 0) {
                    router.setState(2, element.entry, index + 1);
                }
            })
        })
    })
});

document.querySelector('header img').addEventListener('mouseup', (e) => {
    router.setState(1);
});

document.querySelector('header h1').addEventListener('mouseup', () => {
    history.back();
    router.setState(0);
})