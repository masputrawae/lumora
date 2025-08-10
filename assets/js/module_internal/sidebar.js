import { $, $$ } from "./helper"

export function sidebarHandler() {
  const toggleButtons = $$('[data-sidebar]')

  toggleButtons.forEach(button => {
    const targetId = button.getAttribute('data-sidebar')
    const sidebar = $(`#${targetId}`)
    if (!sidebar) return

    button.addEventListener('click', () => {
      const isOpen = sidebar.classList.contains('sidebar--isOpen')
      
      $$('.sidebar--isOpen').forEach(sb => sb.classList.remove('sidebar--isOpen'))

      if (!isOpen) {
        sidebar.classList.add('sidebar--isOpen')
      }
    })
  })
}
