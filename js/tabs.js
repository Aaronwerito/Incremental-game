function  openTab(){
  const tabButtons = document.querySelectorAll('.tabButton');
  const tabPanels = document.querySelectorAll('.tab-panel');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetTab = button.dataset.tab;

      // Deactivate all tab panes
      tabPanels.forEach(panel => panel.classList.remove('active'));

      // Activate the selected tab pane
      document.querySelector(`#${targetTab}`).classList.add('active')
    });
  });
}
openTab();
