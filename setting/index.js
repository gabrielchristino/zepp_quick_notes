import { gettext } from 'i18n'

AppSettingsPage({
  state: {
    notesList: [],
    props: {},
  },
  addNotesList(val) {
    if (!val) { return }
    this.state.notesList = [...this.state.notesList, val]
    this.setItem()
  },
  editNotesList(val, index) {
    this.state.notesList[index] = val
    this.setItem()
  },
  deleteNotesList(index) {
    var itemToDelete = this.state.notesList[index];
    this.state.notesList = this.state.notesList.filter((_, ind) => {
      return ind !== index
    })
    this.setItem()
    this.state.props.settingsStorage.setItem('noteIndexDelete', {index, itemToDelete})
  },
  deleteAllNotes() {
    this.state.notesList = [];
    this.setItem()
  },
  setItem() {
    const newString = JSON.stringify(this.state.notesList)
    this.state.props.settingsStorage.setItem('notesList', newString)
  },
  setState(props) {
    this.state.props = props
    if (props.settingsStorage.getItem('notesList')) {
      this.state.notesList = JSON.parse(
        props.settingsStorage.getItem('notesList'),
      )
    } else {
      this.state.notesList = []
    }
  },
  build(props) {
    this.setState(props)
    const contentItems = []
    const removeAllBTN = View(
      {
        style: {
          fontSize: '12px',
          lineHeight: '30px',
          borderRadius: '30px',
          background: '#D85E33',
          color: 'white',
          textAlign: 'center',
          padding: '0 15px',
          width: '30%',
          margin: '0 0 0 auto'
        },
      },
      [
        TextInput({
          label: gettext('removeAllNotes') + '?',
          onChange: (val) => {
            this.deleteAllNotes()
          },
        }),
      ],
    )
    const addBTN = View(
      {
        style: {
          fontSize: '12px',
          lineHeight: '30px',
          borderRadius: '30px',
          background: '#409EFF',
          color: 'white',
          textAlign: 'center',
          padding: '0 15px',
          width: '30%',
          margin: '0 auto 0 0'
        },
      },
      [
        TextInput({
          label: gettext('addTodo'),
          onChange: (val) => {
            this.addNotesList(val)
          },
        }),
      ],
    )
    this.state.notesList.forEach((item, index) => {
      contentItems.push(
        View(
          {
            style: {
              display: 'flex',
              flexDirection: 'row',
            },
          },
          [
            View(
              {
                style: {
                  borderRadius: '6px',
                  backgroundColor: 'white',

                  margin: '6px',

                  padding: '12px 12px',

                  flex: 1,
                  display: 'flex',
                  flexDirection: 'row',
                  justfyContent: 'center',
                  alignItems: 'center',
                },
              },
              [
                TextInput({
                  label: '',
                  bold: true,
                  value: item,
                  subStyle: {
                    color: '#333',
                    fontSize: '14px',
                  },
                  maxLength: 200,
                  onChange: (val) => {
                    if (val.length > 0 && val.length <= 200) {
                      this.editNotesList(val, index)
                    }
                  },
                }),
              ],
            ),
            Button({
              label: gettext('delete'),
              style: {
                margin: '6px',
                fontSize: '12px',
                borderRadius: '30px',
                background: '#D85E33',
                color: 'white',
              },
              onClick: () => {
                this.deleteNotesList(index)
              },
            }),
          ],
        ),
      )
    })
    return View(
      {
        style: {
          padding: '12px 20px'
        },
      },
      [
        View(
          {
            style: {
              display: 'flex',
              width: '100%'
            },
          },
            [
            removeAllBTN,
            addBTN
            ]
        ),
        contentItems.length > 0 &&
          View(
            {
              style: {
                marginTop: '12px',
              },
            },
            [...contentItems],
          ),
          contentItems.length == 0 &&
            View(
              {
                style: {
                  marginTop: '12px',
                },
              },
              [
                View(
                  {
                    style: {
                      borderRadius: '6px',
                      backgroundColor: 'white',
    
                      margin: '6px',
    
                      padding: '12px 12px',
    
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'row',
                      justfyContent: 'center',
                      alignItems: 'center',
                    },
                  },
                  [
                    TextInput({
                      label: '',
                      bold: true,
                      value: gettext('noNotesCreated'),
                      subStyle: {
                        color: '#333',
                        fontSize: '14px',
                      },
                      maxLength: 200,
                    }),
                  ],
                ),
              ],
            ),
      ],
    )
  },
})
