import * as fs from './../shared/fs'
import { LAST_TEXT, TODO_FILE_NAME, KBD_MTCLK_TOUT, KBD_TYPE } from './constants'

export function readLastMessage() {
  const resData = fs.readFileSync(LAST_TEXT)
  return !resData ? '' : resData
}

export function writeLastMessage(data) {
  fs.writeFileSync(LAST_TEXT, data)
}

export function deleteLastMessage() {
  fs.writeFileSync(LAST_TEXT, '')
}



export function readTodoList() {
  const resData = fs.readFileSync(TODO_FILE_NAME)

  return !resData ? [] : JSON.parse(resData)
}

export function addTodoList(data, merge = true) {
  let params = []
  if (merge) {
    params = [...readTodoList()]
  }
  params.push(data)
  fs.writeFileSync(TODO_FILE_NAME, JSON.stringify(params))
}

export function removeItemTodoList(index) {
  let savedNotes = readTodoList();

  savedNotes.splice(index, 1)

  fs.writeFileSync(TODO_FILE_NAME, JSON.stringify(savedNotes))
}

export function deleteTodoList() {
  fs.writeFileSync(TODO_FILE_NAME, JSON.stringify([]))
}



export function readKeyBoardMultiTimeout() {
  const resData = fs.readFileSync(KBD_MTCLK_TOUT)
  return !resData ? 1000 : resData
}

export function writeKeyBoardMultiTimeout(data) {
  fs.writeFileSync(KBD_MTCLK_TOUT, JSON.stringify(data))
}




export function readKeyBoardType() {
  const resData = fs.readFileSync(KBD_TYPE)
  return !resData ? 0 : resData
}

export function writeKeyBoardType(data) {
  fs.writeFileSync(KBD_TYPE, JSON.stringify(data))
}
