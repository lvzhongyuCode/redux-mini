export function createStore(reducer, enhancer) {
  if (enhancer) {
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
  dispatch({type: '@@@@Lotatall'})
  return {getState, subscribe, dispatch}
}
function bindActionCreator(creator, dispatch) {
  return (...args) => {
    return dispatch(creator(...args))
  }
}
export function bindActionCreators(creators, dispatch) {
  // let bond = {}
  // Object.keys(creators).forEach(v => {
  //   let creator = creators[v]
  //   bond[v] = bindActionCreator(creator, dispatch)
  // })
  return Object.keys(creators).reduce((ret,item) => {
    console.log(ret, item)
    ret[item] = bindActionCreator(creators[item],dispatch)
    return ret
  },{})
  // return bond
}
export function applyMiddleware(middleware) {
  return createStore => (...args) => {
    const store = createStore(...args)
    let dispatch = store.dispatch
    const midApi = {
      getState: store.getState,
      dispatch: (...args) => dispatch(...args)
    }
    dispatch = middleware(midApi)(store.dispatch)
    return{
      ...store,
      dispatch
    }
  }
}