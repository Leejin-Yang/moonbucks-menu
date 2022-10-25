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
    this.menu = {
      espresso: [],
      frappuccino: [],
      blended: [],
      teavana: [],
      desert: [],
    };
    this.currentCategory = 'espresso';

    this.init();
  }

  init() {
    const localStorageMenu = store.getLocalStorage();

    if (localStorageMenu) {
      this.menu = localStorageMenu;
    }

    this.renderHTML();
    this.bindEventListeners();
  }

  bindEventListeners() {
    $('#menu-form').addEventListener('submit', (e) => {
      e.preventDefault();
    });

    $('#menu-submit-button').addEventListener('click', this.addMenuName);

    $('#menu-name').addEventListener('keypress', (e) => {
      if (e.key !== 'Enter') {
        return;
      }

      this.addMenuName();
    });

    $('#menu-list').addEventListener('click', (e) => {
      if (e.target.classList.contains('menu-edit-button')) {
        this.updateMenuName(e);
        return;
      }

      if (e.target.classList.contains('menu-remove-button')) {
        this.removeMenuName(e);
        return;
      }

      if (e.target.classList.contains('menu-sold-out-button')) {
        this.soldOutMenu(e);
      }
    });

    $('nav').addEventListener('click', (e) => {
      const isCategoryButton = e.target.classList.contains('cafe-category-name');
      if (!isCategoryButton) {
        return;
      }

      const { categoryName } = e.target.dataset;
      this.currentCategory = categoryName;
      $('#category-title').innerText = `${e.target.innerText} 메뉴 관리`;
      this.renderHTML();
    });
  }

  renderHTML() {
    const template = this.menu[this.currentCategory]
      .map(
        (
          item,
          index,
        ) => `<li data-menu-id="${index}" class="menu-list-item d-flex items-center py-2">
        <span class="${item.soldOut ? 'sold-out' : ''}  w-100 pl-2 menu-name">${item.name}</span>
        <button
          type="button"
          class="bg-gray-50 text-gray-500 text-sm mr-1 menu-sold-out-button"
        >
          품절
        </button>
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
    $('#menu-list').innerHTML = template;

    this.updateMenuCount();
  }

  updateMenuCount() {
    const menuCount = $('#menu-list').querySelectorAll('li').length;
    $('.menu-count').innerText = `총 ${menuCount}개`;
  }

  addMenuName() {
    const menuName = $('#menu-name').value;

    if (!menuName) {
      alert('값을 입력해주세요.');
      return;
    }

    this.menu[this.currentCategory].push({ name: menuName });
    store.setLocalStorage(this.menu);
    this.renderHTML();
    $('#menu-name').value = '';
  }

  updateMenuName(e) {
    const { menuId } = e.target.closest('li').dataset;
    const $menuName = e.target.closest('li').querySelector('.menu-name');
    const newMenuName = prompt('메뉴명을 수정해주세요', $menuName.innerText);
    this.menu[this.currentCategory][menuId].name = newMenuName;
    store.setLocalStorage(this.menu);
    $menuName.innerText = newMenuName;
  }

  removeMenuName(e) {
    if (confirm('정말 삭제하시겠습니까?')) {
      const { menuId } = e.target.closest('li').dataset;
      this.menu[this.currentCategory].splice(menuId, 1);
      e.target.closest('li').remove();
      store.setLocalStorage(this.menu);
      this.updateMenuCount();
    }
  }

  soldOutMenu(e) {
    const { menuId } = e.target.closest('li').dataset;
    this.menu[this.currentCategory][menuId].soldOut =
      !this.menu[this.currentCategory][menuId].soldOut;
    store.setLocalStorage(this.menu);
    this.renderHTML();
  }
}

new App();
