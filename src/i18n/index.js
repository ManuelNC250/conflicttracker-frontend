import { computed, ref } from 'vue'

const locale = ref('ca')

const messages = {
  ca: {
    title: 'Panell global de conflictes',
    subtitle:
      'Una vista clara i humana dels conflictes actius i congelats arreu del mon. Filtra, consulta i aprofundeix.',
    filters: {
      title: 'Filtres intelligents',
      subtitle: 'Cerca en temps real per pais o actor implicat.',
      search: 'Cerca',
      searchPlaceholder: 'Cerca conflicte o actor',
      status: 'Estat',
      allStatuses: 'Tots els estats'
    },
    stats: {
      title: 'Panell de situacio',
      subtitle: 'Una lectura rapida de l estat global.'
    },
    list: {
      title: 'Conflictes monitoritzats',
      subtitle: 'Actualitza la vista i marca el que ja has llegit.'
    },
    empty: {
      title: 'Cap conflicte amb aquest filtre',
      message: 'Prova un altre estat o esborra el cercador.'
    },
    actions: {
      refresh: 'Recarrega',
      add: 'Afegir conflicte',
      markRead: 'Marcar llegit',
      markUnread: 'Marcar no llegit',
      delete: 'Eliminar'
    },
    labels: {
      total: 'Total',
      active: 'Actius',
      frozen: 'Congelats',
      resolved: 'Resolts',
      start: 'Inici',
      actors: 'Actors'
    },
    statusNames: {
      ACTIVE: 'Actiu',
      FROZEN: 'Congelat',
      RESOLVED: 'Resolt'
    },
    messages: {
      loading: 'Carregant conflictes...',
      loadError: 'No s han pogut carregar els conflictes.',
      saveError: 'No s ha pogut desar al backend.',
      deleteError: 'No s ha pogut eliminar al backend.'
    },
    form: {
      name: 'Nom del conflicte',
      startDate: 'Data d inici',
      status: 'Estat',
      description: 'Descripcio curta',
      countries: 'Codis de pais (separats per coma)',
      factions: 'Actors principals (separats per coma)',
      save: 'Guardar'
    },
    detail: {
      back: 'Tornar',
      context: 'Context i resum',
      actors: 'Actors principals',
      countries: 'Paisos implicats',
      status: 'Estat actual',
      start: 'Data d inici'
    }
  },
  en: {
    title: 'Global Conflict Dashboard',
    subtitle: 'A human, readable view of ongoing and frozen conflicts worldwide.',
    filters: {
      title: 'Smart filters',
      subtitle: 'Search in real time by country or actor.',
      search: 'Search',
      searchPlaceholder: 'Search conflict or actor',
      status: 'Status',
      allStatuses: 'All statuses'
    },
    stats: {
      title: 'Situation overview',
      subtitle: 'A quick pulse on global status.'
    },
    list: {
      title: 'Tracked conflicts',
      subtitle: 'Refresh the feed and mark items as read.'
    },
    empty: {
      title: 'No conflicts match these filters',
      message: 'Try another status or clear the search box.'
    },
    actions: {
      refresh: 'Refresh',
      add: 'Add conflict',
      markRead: 'Mark read',
      markUnread: 'Mark unread',
      delete: 'Delete'
    },
    labels: {
      total: 'Total',
      active: 'Active',
      frozen: 'Frozen',
      resolved: 'Resolved',
      start: 'Start',
      actors: 'Actors'
    },
    statusNames: {
      ACTIVE: 'Active',
      FROZEN: 'Frozen',
      RESOLVED: 'Resolved'
    },
    messages: {
      loading: 'Loading conflicts...',
      loadError: 'Failed to load conflicts.',
      saveError: 'Failed to save in backend.',
      deleteError: 'Failed to delete in backend.'
    },
    form: {
      name: 'Conflict name',
      startDate: 'Start date',
      status: 'Status',
      description: 'Short description',
      countries: 'Country codes (comma separated)',
      factions: 'Main actors (comma separated)',
      save: 'Save'
    },
    detail: {
      back: 'Back',
      context: 'Context and summary',
      actors: 'Main actors',
      countries: 'Countries involved',
      status: 'Current status',
      start: 'Start date'
    }
  }
}

export const useI18n = () => {
  const t = computed(() => messages[locale.value])
  const toggleLocale = () => {
    locale.value = locale.value === 'ca' ? 'en' : 'ca'
  }

  return {
    locale,
    t,
    toggleLocale
  }
}
