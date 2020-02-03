/**
 * Sporty's Theme default JS
 **/
'use strict';
function footerToMobileNav() {

    // Store elements
    const footerLinks = document.querySelectorAll('.footer-column-1 ul');
    const tab = document.querySelector('.nav-sections-item-title[aria-controls="store.links"]');
    const tabContents = document.querySelector('#store\\.links');
    const navHome = document.querySelector('.nav-sections-items');

    // Clone req. elements
    const lastTab = tab.cloneNode(true);
    const lastTabContents = tabContents.cloneNode(false);

    // Store clone child
    const tabA = lastTab.querySelector('a');

    // Alter clone attributes
    lastTab.setAttribute('aria-controls','store-more');
    lastTabContents.setAttribute('id','store-more');
    tabA.innerHTML = 'More';
    tabA.setAttribute('href','#store-more');

    // Place clones in DOM
    for (let i = 0; i < footerLinks.length; i ++) {
        lastTabContents.appendChild(footerLinks[i]);
    }
    navHome.append(lastTab);
    navHome.append(lastTabContents);

    // Add classes to clones for styling
    const finUl = document.querySelectorAll('#store-more ul, #store\\.links ul');
    const finNav = document.querySelectorAll('#store-more li, #store\\.links li');
    for (let m = 0; m < finNav.length; m++) {
        finNav[m].classList.add('level0');
    }
    for (let n = 0; n < finUl.length; n++) {
        finUl[n].classList.add('navigation');
    }

    // Click actions with references to siblings
    const priorNavs = document.querySelectorAll('.nav-sections-item-title:not([aria-controls="store-more"]');
    const priorTabs = document.querySelectorAll('.nav-sections-item-content:not(#store-menu)');
    lastTab.addEventListener('click', function(e) {
        e.preventDefault();
        if (lastTab.getAttribute('aria-selected') !== 'true') {
            lastTab.setAttribute('aria-selected', 'true');
            lastTab.setAttribute('aria-expanded', 'true');
            lastTab.classList.add('active');
            lastTabContents.style.display = 'block';
        }
        for(let j = 0; j < priorNavs.length; j++) {
            if (priorNavs[j].getAttribute('aria-selected') === 'true') {
                priorNavs[j].setAttribute('aria-selected', 'false');
                priorNavs[j].setAttribute('aria-expanded', 'false');
                priorNavs[j].classList.remove('active');
                priorTabs[j].style.display = 'none';
            }
        }
    });
    priorNavs.forEach(item => {
        item.addEventListener('click', event => {
            if (lastTab.getAttribute('aria-selected') === 'true') {
                lastTab.setAttribute('aria-selected', 'false');
                lastTab.setAttribute('aria-expanded', 'false');
                lastTab.classList.remove('active');
                lastTabContents.style.display = 'none';
            }
        })
    });
}

if (window.matchMedia('(max-width: 780px)')) footerToMobileNav();

