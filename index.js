console.log("from index.js")

const redux = require('redux')
const createStore = redux.createStore
const combineReducer = redux.combineReducers



//================= Single Reducer Function======================

// const BUYCAKE= "Buy a Code";


// function ActionCreator(){
//   return {
//     type:BUYCAKE,
//     info: "Some INformation"
//   }
// }



// const intialStore = {
//   numberOfCake : 10,

// }

// const Reducer =(state= intialStore, Action)=>{
//   switch(Action.type){
//     case BUYCAKE :
//       return{ ...state, numberOfCake : state.numberOfCake -1}
//       default: return state
//   }

// }


// const store = createStore(Reducer)

// console.log("initial state", store.getState())
// const unsubscribe=store.subscribe(()=>console.log('updated Store', store.getState()))
// store.dispatch(ActionCreator())
// store.dispatch(ActionCreator())
// store.dispatch(ActionCreator())
// unsubscribe()

// ==========================Multiples Reducer====================================


//================= Single Reducer Function======================

const BUYCAKE= "Buy a Code";
const BUYICECREAME= "Buy a ICECREAME";


function cakeCreator(){
  return {
    type:BUYCAKE,
    info: "Some INformation"
  }
}
function iceCreamCreator(){
  return {
    type:BUYICECREAME,
    info: "Some INformation"
  }
}


const initialCakes = {
  numberOfCake : 10,
}


const initialIceCream = {
  numberofIceCreame : 20,
}

const cakeReducer =(state= initialCakes, Action)=>{
  switch(Action.type){
    case BUYCAKE :
      return{ ...state, numberOfCake : state.numberOfCake -1}
      default: return state
  }

}

const iceCreameReducer =(state=initialIceCream, Action)=>{
  switch(Action.type){
    case BUYICECREAME:
    return {...state, iceCreameCount: state.numberofIceCreame-1}
    default: return state
  }
}

const reducer = combineReducer({
  cake: cakeReducer,
  iceCreame: iceCreameReducer
})

const store = createStore(reducer)

console.log("initial state", store.getState())
const unsubscribe=store.subscribe(()=>console.log('updated Store', store.getState()))
store.dispatch(cakeCreator())
store.dispatch(cakeCreator())
store.dispatch(cakeCreator())
store.dispatch(iceCreamCreator())
store.dispatch(iceCreamCreator())
unsubscribe()

