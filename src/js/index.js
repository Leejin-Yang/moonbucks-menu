const $ = (selector) => document.querySelector(selector);

const store = {
  setLocalStorage(menu) {
    localStorage.setItem('menu', JSON.stringify(menu));
  },
  getLocalStorage() {
    localStorage.getItem('menu');
  },
};

function App() {
  this.menu = [];

  const updateMenuCount = () => {
    const menuCount = $('#espresso-menu-list').querySelectorAll('li').length;
    $('.menu-count').innerText = `총 ${menuCount}개`;
  };

  const addMenuName = () => {
    const espressoMenuName = $('#espresso-menu-name').value;

    if (!espressoMenuName) {
      alert('값을 입력해주세요.');
      return;
    }

    this.menu.push({ name: espressoMenuName });
    store.setLocalStorage(this.menu);
    const template = this.menu
      .map(
        (item) => `<li class="menu-list-item d-flex items-center py-2">
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

    updateMenuCount();

    $('#espresso-menu-name').value = '';
  };

  const updateMenuName = (e) => {
    const $menuName = e.target.closest('li').querySelector('.menu-name');
    const newMenuName = prompt('메뉴명을 수정해주세요', $menuName.innerText);
    $menuName.innerText = newMenuName;
  };

  const removeMenuName = (e) => {
    if (confirm('정말 삭제하시겠습니까?')) {
      e.target.closest('li').remove();
      updateMenuCount();
    }
  };

  $('#espresso-menu-form').addEventListener('submit', (e) => {
    e.preventDefault();
  });

  $('#espresso-menu-submit-button').addEventListener('click', addMenuName);

  $('#espresso-menu-name').addEventListener('keypress', (e) => {
    if (e.key !== 'Enter') {
      return;
    }

    addMenuName();
  });

  $('#espresso-menu-list').addEventListener('click', (e) => {
    if (e.target.classList.contains('menu-edit-button')) {
      updateMenuName(e);
    }

    if (e.target.classList.contains('menu-remove-button')) {
      removeMenuName(e);
    }
  });
}

App();
