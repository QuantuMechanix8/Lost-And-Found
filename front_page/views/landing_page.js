const openMenuIcon = 'square-caret-down';
const closedMenuIcon = 'bars';

function toggleMenu() {
  //console.log("toggleMenu");
  var menu = document.getElementById('menu');
  var button = document.getElementById('menu-button');
  if (menu.style.display === 'flex') {
    menu.style.display = 'none';
    button.dataset.prefix = 'fas';
    button.dataset.icon = closedMenuIcon;
  } else {
    menu.style.display = 'flex';
    button.dataset.prefix = 'far';
    button.dataset.icon = openMenuIcon;
  }
}

function toggleDescription() {
  //console.log("toggleDescription");
  var description = document.getElementById('description');
  if (description.style.display === 'flex') {
    description.style.display = 'none';
  } else {
    description.style.display = 'flex';
  }
}