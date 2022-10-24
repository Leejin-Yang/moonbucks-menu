const $ = (selector) => document.querySelector(selector);

function App() {
  $('#espresso-menu-form').addEventListener('submit', (e) => {
    e.preventDefault();
  });

  const addEspressoMenuName = () => {
    const espressoMenuName = $('#espresso-menu-name').value;

    if (!espressoMenuName) {
      alert('값을 입력해주세요.');
      return;
    }

    const menuItemTemplate = (name) => `<li class="menu-list-item d-flex items-center py-2">
      <span class="w-100 pl-2 menu-name">${name}</span>
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
    </li>`;
    $('#espresso-menu-list').insertAdjacentHTML('beforeend', menuItemTemplate(espressoMenuName));

    const menuCount = $('#espresso-menu-list').querySelectorAll('li').length;
    $('.menu-count').innerText = `총 ${menuCount}개`;

    $('#espresso-menu-name').value = '';
  };

  $('#espresso-menu-submit-button').addEventListener('click', () => {
    addEspressoMenuName();
  });

  $('#espresso-menu-name').addEventListener('keypress', (e) => {
    if (e.key !== 'Enter') {
      return;
    }

    addEspressoMenuName();
  });

  $('#espresso-menu-list').addEventListener('click', (e) => {
    if (e.target.classList.contains('menu-edit-button')) {
      const $menuName = e.target.closest('li').querySelector('.menu-name');
      const newMenuName = prompt('메뉴명을 수정해주세요', $menuName.innerText);
      $menuName.innerText = newMenuName;
    }
  });
}

App();
