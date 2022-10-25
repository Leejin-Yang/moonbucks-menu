const $ = (selector) => document.querySelector(selector);

const store = {
  setLocalStorage(menu) {
    localStorage.setItem('menu', JSON.stringify(menu));
  },
  getLocalStorage() {
    return JSON.parse(localStorage.getItem('menu'));
  },
};

class App {
  constructor() {
    this.menu = [];

    this.init();
  }

  init() {
    const local = store.getLocalStorage();
    if (local.length > 0) {
      this.menu = local;
    }

    this.renderHTML();
    this.bindEventListeners();
  }

  bindEventListeners() {
    $('#espresso-menu-form').addEventListener('submit', (e) => {
      e.preventDefault();
    });

    $('#espresso-menu-submit-button').addEventListener('click', this.addMenuName);

    $('#espresso-menu-name').addEventListener('keypress', (e) => {
      if (e.key !== 'Enter') {
        return;
      }

      this.addMenuName();
    });

    $('#espresso-menu-list').addEventListener('click', (e) => {
      if (e.target.classList.contains('menu-edit-button')) {
        this.updateMenuName(e);
      }

      if (e.target.classList.contains('menu-remove-button')) {
        this.removeMenuName(e);
      }
    });
  }

  renderHTML() {
    const template = this.menu
      .map(
        (
          item,
          index,
        ) => `<li data-menu-id="${index}" class="menu-list-item d-flex items-center py-2">
    <span class="w-100 pl-2 menu-name">${item.name}</span>
    <button
      type="button"
      class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
    >
      수정
    </button>
    <button
      type="button"
      class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
    >
      삭제
    </button>
  </li>`,
      )
      .join('');
    $('#espresso-menu-list').innerHTML = template;

    this.updateMenuCount();
  }

  updateMenuCount() {
    const menuCount = $('#espresso-menu-list').querySelectorAll('li').length;
    $('.menu-count').innerText = `총 ${menuCount}개`;
  }

  addMenuName() {
    const espressoMenuName = $('#espresso-menu-name').value;

    if (!espressoMenuName) {
      alert('값을 입력해주세요.');
      return;
    }

    this.menu.push({ name: espressoMenuName });
    store.setLocalStorage(this.menu);
    this.renderHTML();
    $('#espresso-menu-name').value = '';
  }

  updateMenuName(e) {
    const { menuId } = e.target.closest('li').dataset;
    const $menuName = e.target.closest('li').querySelector('.menu-name');
    const newMenuName = prompt('메뉴명을 수정해주세요', $menuName.innerText);
    this.menu[menuId].name = newMenuName;
    store.setLocalStorage(this.menu);
    $menuName.innerText = newMenuName;
  }

  removeMenuName(e) {
    if (confirm('정말 삭제하시겠습니까?')) {
      const { menuId } = e.target.closest('li').dataset;
      this.menu.splice(menuId, 1);
      e.target.closest('li').remove();
      store.setLocalStorage(this.menu);
      this.updateMenuCount();
    }
  }
}

new App();
