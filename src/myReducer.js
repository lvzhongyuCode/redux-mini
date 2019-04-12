export function counter(state = 0, action) {
  switch (action.type) {
    case "ADD_GUN": return state + 1
    case "REMOVE_GUN": return state -1
    default: return 10
  }
}
function addGun() {
  return {type: 'ADD_GUN'}
}

function removeGun() {
  return {type: 'REMOVE_GUN'}
}

function addGunSync() {
  return dispath => {
    setTimeout(() => {
      dispath(addGun())
    },1000)
  }
}
export {addGun, removeGun, addGunSync }