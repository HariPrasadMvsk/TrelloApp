function TrelloApp(currState, action) {
  switch(action.type) {
    case 'ADD_CARD':
      const list = currState.currentBoard.lists.find(list => list.id === action.payload.listId);
      const index = currState.currentBoard.lists.indexOf(list);
      const newList = Object.assign({}, list, {
        cards: [...list.cards, { id: '' + Math.random()*89793113, text: action.payload.text }]
      });
      return Object.assign({}, currState, {
        currentBoard: Object.assign({}, currState.currentBoard, {
          lists: [
            ...currState.currentBoard.lists.slice(0, index),
            newList,
            ...currState.currentBoard.lists.slice(index+1)
          ]
        })
      });

    case 'EDIT_BOARD':
      currState.currentBoard.name = action.payload.name;
      return currState;

    case 'CREATE_LIST':
      const board = currState.currentBoard;
      
      currState.currentBoard.lists = [...currState.currentBoard.lists, {
          id: '' + Math.random() * 89793113,
          name: action.payload.name,
          cards: []
        }];
      return currState;
      
    case 'EDIT_CARD':
      const list1 = currState.currentBoard.lists.find(list => list.id === action.payload.listId);
      const index1 = currState.currentBoard.lists.indexOf(list1);
      const card1 = list1.cards.find(card => card.id === action.payload.cardId);
      const indexcard1 = list1.cards.indexOf(card1);
      const updateCard = { id : card1.id, text : action.payload.text };

      const newList1 = Object.assign({}, list1, {
        cards: [
          ...list1.cards.slice(0, indexcard1),
          updateCard,
          ...list1.cards.slice(indexcard1 + 1)
        ]
      });
      
      return Object.assign({}, currState, {
        currentBoard: Object.assign({}, currState.currentBoard, {
          lists: [
            ...currState.currentBoard.lists.slice(0, index1),
            newList1,
            ...currState.currentBoard.lists.slice(index1 + 1)
          ]
        })
      });
     

    case 'MOVE_LIST':
      const lists = currState.currentBoard.lists;
      const movingList = lists[action.payload.fromIndex];
      let arrayAfterRemoving = [...lists.splice(0, action.payload.fromIndex), ...lists.slice(action.payload.fromIndex + 1)];
      arrayAfterRemoving.splice(action.payload.toIndex, 0, movingList);
      currState.currentBoard.lists = arrayAfterRemoving;

      return currState;

    case 'EDIT_LIST':
      const list2 = currState.currentBoard.lists.find(list => list.id === action.payload.listId);
      const index2 = currState.currentBoard.lists.indexOf(list2);
      const updateList = {
        id: list2.id,
        name: action.payload.name,
        cards: list2.cards
      };

      return Object.assign({}, currState, {
        currentBoard: Object.assign({}, currState.currentBoard, {
          lists: [
            ...currState.currentBoard.lists.slice(0, index2),
            updateList,
            ...currState.currentBoard.lists.slice(index2 + 1)
          ]
        })
      });
      
    case 'MOVE_CARD':
      const cards = currState.currentBoard.lists[2].cards;
      const movingList1 = cards[action.payload.fromIndex];
      let arrayAfterRemoving1 = [...cards.splice(0, action.payload.fromIndex), ...cards.slice(action.payload.fromIndex + 1)];
      arrayAfterRemoving1.splice(action.payload.toIndex, 0, movingList1);
      currState.currentBoard.lists[2].cards = arrayAfterRemoving1;

      return currState;
    default:
      return currState;
  }
}

/*
  {
    currentBoard: {
      id: ,
      name: ,
      lists: [{
        id: ,
        name: ,
        text: 
      }]
    }
  }

  {
    type: 'ADD_CARD',
    payload: {
      listId: '',
      text: ''
    }
  }

  {
    type: 'CREATE_LIST',
    payload: {
      name: ''
    }
  }

  {
    type: 'EDIT_CARD',
    payload: {
      listId: ,
      cardId: ,
      newText: 
    }
  }

  {
    type: 'DELETE_CARD',
    payload: {
      listId: '',
      cardId: ''
    }
  }

  {
    type: 'DELETE_LIST',
    payload: {
      listId: ''
    }
  }

  {
    type: 'MOVE_CARD',
    payload: {
      fromListId: ,
      toListId: ,
      toListPosition: 
    }
  }

  {
    type: 'MOVE_LIST',
    payload: {
      fromPosition: '',
      toPosition: ''
    }
  }

  {
    type: 'EDIT_LIST',
    payload: {
      listId: '',
      newName:
    }
  }

  {
    type: 'EDIT_BOARD',
    payload: {
      newName:
    }
  }
*/

module.exports = TrelloApp;