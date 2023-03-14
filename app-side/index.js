import { MessageBuilder } from '../shared/message'
const messageBuilder = new MessageBuilder()

function getNotesList() {
  return settings.settingsStorage.getItem('notesList')
    ? JSON.parse(settings.settingsStorage.getItem('notesList'))
    : []
}

AppSideService({
  onInit() {
    messageBuilder.listen(() => {});

    settings.settingsStorage.addListener(
      'change',
      ({ key, newValue, oldValue }) => {

        messageBuilder.call({
          newValue, oldValue
        })

      },
    )

    messageBuilder.on('request', (ctx) => {
      const payload = messageBuilder.buf2Json(ctx.request.payload)
      if (payload.method === 'GET_NOTES') {
        ctx.response({
          data: { result: getNotesList() },
        })
      } else if (payload.method === 'ADD_NOTE') {
        const { params: { new_item } = {} } = payload
        const notesList = getNotesList()
        const newNotesList = [...notesList, new_item]
        settings.settingsStorage.setItem('notesList', JSON.stringify(newNotesList))

        ctx.response({
          data: { result: newNotesList },
        })
      } else if (payload.method === 'DELETE_NOTE') {
        const { params: { indexToDelete } = {} } = payload
        const notesList = getNotesList()
        const newNotesList = notesList.filter((_, i) => i !== indexToDelete)
        settings.settingsStorage.setItem('notesList', JSON.stringify(newNotesList))

        ctx.response({
          data: { result: newNotesList },
        })
      } else if (payload.method === 'DELETE_ALL_NOTES') {
        const newNotesList = []
        settings.settingsStorage.setItem('notesList', JSON.stringify(newNotesList))

        ctx.response({
          data: { result: newNotesList },
        })
      }

    })
  },

  onRun() {
  },
})