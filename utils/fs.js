import * as fs from './../shared/fs'
import { LAST_TEXT, TODO_FILE_NAME, KBD_MTCLK_TOUT, KBD_TYPE, DEL_FILE_NAME } from './constants'

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



export function readDelList() {
  let resData = fs.readFileSync(DEL_FILE_NAME)
  resData = !resData ? [] : JSON.parse(resData)
  return resData;
}

export function addDelList(data) {
  let params = [...readDelList(), data]
  fs.writeFileSync(DEL_FILE_NAME, JSON.stringify(params))
}

export function dellList(data) {
  fs.writeFileSync(DEL_FILE_NAME, JSON.stringify(data))
}

export function deleteDelList() {
  fs.writeFileSync(DEL_FILE_NAME, JSON.stringify([]))
}



export function readTodoList() {
  let resData = fs.readFileSync(TODO_FILE_NAME)
  resData = !resData ? [] : JSON.parse(resData)
  return resData;
}

export function addTodoList(data) {
  let params = [...readTodoList(), data]
  fs.writeFileSync(TODO_FILE_NAME, JSON.stringify(params))
}

export function addList(data) {
  fs.writeFileSync(TODO_FILE_NAME, JSON.stringify(data))
}

export function removeItemTodoList(index, itemToRemove) {
  let savedNotes = readTodoList();

  if(savedNotes[index] != itemToRemove) {
    return
  }

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
