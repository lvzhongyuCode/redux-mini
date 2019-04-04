
export function createStore(reducer, enhancer) {
  if(enhancer) {
    return enhancer(createStore)(reducer)
  }
  let currentState = {}
  let currentListener = []
  function getState() {
    return currentState
  }
  function subscribe(listener) {
    currentListener.push(listener)
  }
  function dispatch(action) {
    currentState = reducer(currentState, action)
    currentListener.map(v => v())
    return action
  }
  dispatch({type: '@@@lzyLotatall'})
  return {getState, subscribe,dispatch}
}
function bindActionCreator(creator, dispatch) {
  return (...args) => {
    return dispatch(creator(...args))
  }
}
export function bindActionCreators(mapDispatchToProps, dispatch) {
  const bond = {}
  for (let i in mapDispatchToProps) {
    let creator = mapDispatchToProps[i]
    bond[i] = bindActionCreator(creator, dispatch)
  }
  return bond

}