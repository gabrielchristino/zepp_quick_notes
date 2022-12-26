import { MessageBuilder } from '../shared/message'

const messageBuilder = new MessageBuilder()

const fetchData = async (ctx) => {
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
}

AppSideService({
  onInit() {
    messageBuilder.listen(() => {})

    let savedNotes = settings.settingsStorage.getItem('notes');
    
    // send a message to Device App
    messageBuilder.call({ text: savedNotes })

    // receive a message from Device App
    messageBuilder.on('request', (ctx) => {
      const payload = messageBuilder.buf2Json(ctx.request.payload)
      // console.log('payload', payload);

      let params = payload && payload.params ? payload.params : '';
      let method = payload && payload.method ? payload.method : '';
      // console.log('params', params);
      // console.log('method', method);

      if (method === 'GET_NOTES') {
        savedNotes = settings.settingsStorage.getItem('notes');
        ctx.response({
          data: { text: savedNotes && savedNotes.length > 0 ? savedNotes : '' }
        })
      }

      if (method === 'ADD_NOTE') {
        // console.log('aqui');
        savedNotes = settings.settingsStorage.getItem('notes');
        // console.log('savedNotes', savedNotes);
        if(savedNotes && savedNotes.length > 0) {
          savedNotes+=params.text+'/';
        } else {
          savedNotes = params.text+'/';
        }
        settings.settingsStorage.setItem('notes', savedNotes);

        ctx.response({
          data: { text: savedNotes }
        })
      }

      if (method === 'DELETE_ALL_NOTES') {
        savedNotes = '';
        settings.settingsStorage.setItem('notes', savedNotes)
        ctx.response({
          data: { text: savedNotes }
        })
      }

      if (method === 'DELETE_A_NOTE') {
        savedNotes = settings.settingsStorage.getItem('notes');

        let tempNotes = savedNotes && savedNotes.length > 0 ? savedNotes.split('/') : [];
        tempNotes.splice(params.text, 1)
        savedNotes = tempNotes.join('/');

        settings.settingsStorage.setItem('notes', savedNotes)
        ctx.response({
          data: { text: savedNotes && savedNotes.length > 0 ? savedNotes : '' }
        })
      }

      /*if (method === 'GET') {
        return fetchData(ctx)
      }*/
    })
  },
})