import { MessageBuilder } from '../shared/message'

const messageBuilder = new MessageBuilder()

/*const fetchData = async (ctx) => {
  try {
    const {body:{name=''}={}} = await fetch({
      url: 'https://pokeapi.co/api/v2/pokemon/1',
      method: 'GET'
    })

    ctx.response({
      data: { result: name },
    })

  } catch (error) {
    ctx.response({
      data: { result: 'ERROR' },
    })
  }
}*/

AppSideService({
  onInit() {
    messageBuilder.listen(() => {})

    let savedNotes = settings.settingsStorage.getItem('notes');
    
    // send a message to Device App
    messageBuilder.call({ savedNotesStr: savedNotes })

    // receive a message from Device App
    messageBuilder.on('request', (ctx) => {
      const payload = messageBuilder.buf2Json(ctx.request.payload)

      let params = payload && payload.params ? payload.params : '';
      let method = payload && payload.method ? payload.method : '';

      if (method === 'GET_KBD_MTCLK_TOUT') {
        multiClickTimeout = settings.settingsStorage.getItem('multiClickTimeout');
        multiClickTimeout = multiClickTimeout && multiClickTimeout.length > 0 ? multiClickTimeout : 1000;
        ctx.response({
          data: { multiClickTimeout }
        })
      }

      if (method === 'SET_KBD_MTCLK_TOUT') {
        multiClickTimeout = params.multiClickTimeout && params.multiClickTimeout.length > 0 ? params.multiClickTimeout : 1000;
        settings.settingsStorage.setItem('multiClickTimeout', multiClickTimeout);
        ctx.response({
          data: { multiClickTimeout }
        })
      }

      if (method === 'GET_NOTES') {
        savedNotes = settings.settingsStorage.getItem('notes');

        ctx.response({
          data: { savedNotesStr: savedNotes && savedNotes.length > 0 ? savedNotes : '' }
        })
      }

      if (method === 'ADD_NOTE') {

        savedNotes = settings.settingsStorage.getItem('notes');

        if(savedNotes && savedNotes.length > 0) {
          savedNotes+=params.text+'/';
        } else {
          savedNotes = params.text+'/';
        }
        settings.settingsStorage.setItem('notes', savedNotes);

        ctx.response({
          data: { savedNotesStr: savedNotes }
        })
      }

      if (method === 'DELETE_ALL_NOTES') {
        savedNotes = '';
        settings.settingsStorage.setItem('notes', savedNotes)
        ctx.response({
          data: { savedNotesStr: savedNotes }
        })
      }

      if (method === 'DELETE_A_NOTE') {
        savedNotes = settings.settingsStorage.getItem('notes');

        let tempNotes = savedNotes && savedNotes.length > 0 ? savedNotes.split('/') : [];
        tempNotes.splice(params.savedNotesStr, 1)
        savedNotes = tempNotes.join('/');

        settings.settingsStorage.setItem('notes', savedNotes)
        ctx.response({
          data: { savedNotesStr: savedNotes && savedNotes.length > 0 ? savedNotes : '' }
        })
      }
    })

    messageBuilder.on('error', (error => {
      logger.warn('error aqui')
    }))
  },

  onRun() {
  },
})